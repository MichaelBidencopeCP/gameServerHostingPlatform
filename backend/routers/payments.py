from fastapi import APIRouter, HTTPException, Request, Header
from sqlmodel import select
from dotenv import load_dotenv
import os
import stripe


from ..dependencies import FirebaseUserDep, SessionDep
from ..project_types.payment_types import CreditPaymentIntent, StripePaymentConfirm
from ..models import User

load_dotenv()

#STRIPE_KEY = os.getenv("TEST_stripe_secret_key")
STRIPE_KEY = "whsec_cbb8a42523b8f3833bdc11825d42fe75ede69b7787900ce35983fa404d0e3c19"



stripe.api_key = STRIPE_KEY

router = APIRouter(
    prefix='/payment',
    tags=['payment']
)

@router.post("/credits")
async def credit_payment_intent(session: SessionDep, user:FirebaseUserDep, credits:CreditPaymentIntent):
    #get user credits
    print(credits)
    credits = credits.credits
    amount = credits * 1.25
    cents = int(amount * 100) 
    print(credits)
    userInfo = select(User.credits).where(User.id == user['user_id'])
    userCredits = session.exec(userInfo).first()
    if credits < 0 or credits > 400:
        raise HTTPException(status_code=400,detail={'message':"out of bounds", 'code':1})
    intent = stripe.PaymentIntent.create(
        amount=cents,
        currency="usd",
        metadata={
            'user_id': user['user_id'],
        }
    )


    return {
        "paymentIntent":intent
    }

@router.post("/stripe/webhook")
async def stripe_webhook(request: Request, session:SessionDep, stripe_signature: str = Header(None)):
    webhook_secret = STRIPE_KEY
    data = await request.body()
    try:
        event = stripe.Webhook.construct_event(
            payload=data,
            sig_header=stripe_signature,
            secret=webhook_secret
        )
        event_data = event['data']
    except ValueError as e:
        # Invalid payload
        raise HTTPException(status_code=400, detail={'message':"Invalid payload", 'code':2})
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        raise HTTPException(status_code=400, detail={'message':"Invalid signature", 'code':3})
 
    # Handle the event
    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        print(payment_intent)
        userInfo = select(User).where(User.id == payment_intent['metadata']['user_id'])
        user = session.exec(userInfo).first()
        print(user)
        if user is None:
            raise HTTPException(status_code=404, detail={'message':"User not found", 'code':5})
        print(event['data']['object']['amount_received'])
        user.credits += event['data']['object']['amount_received'] / 125
        session.add(user)
        session.commit()

    else:
        # Unexpected event type
        raise HTTPException(status_code=400, detail={'message':"Unexpected event type", 'code':4})
    return {
        'status': 'success'
    }
