import { AddressElement, CardCvcElement, CardElement, Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from "./button";
import { use, useEffect, useState } from "react";

export default function StripePayment({stripeIntent, open, setPyamentCompleteStatus}:Readonly<{stripeIntent:any, open:boolean, setPyamentCompleteStatus:Function}>){
    const stripe = useStripe();
    const elements = useElements();
    const [cardComplete, setCardComplete] = useState(false);
    const [billingComplete, setBillingComplete] = useState(false);

    const options = {
        style: {
            base: {
              iconColor: '#ffffff',
              color: '#ffffff',
              fontWeight: '500',
              fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
              fontSize: '16px',
              fontSmoothing: 'antialiased',
              ':-webkit-autofill': {
                color: '#000000',
              },
              '::placeholder': {
                color: '#ffffff',
              },
              componentBorder:'#ffffff'
            },
            invalid: {
              iconColor: '#ffffff',
              color: '#D1603D',
            },
        }

    };

    const handleCardChange = async (event:any) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        console.log(event);
        setCardComplete(false);
        if (event.error) {
            console.log(event.error.message);
        }
        if (event.complete) {
            console.log('Card details are complete');
            setCardComplete(true);
        }
        if (event.empty) {
            console.log('Card details are empty');
        }
    };
    
    const handleBillingChange = async (event:any) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        console.log(event);
        setBillingComplete(false);

        if (event.complete) {
            console.log('Card details are complete');
            setBillingComplete(true);
        }
        if (event.empty) {
            console.log('Card details are empty');
        }
    };
    const handleSubmit = async () => {
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable the button until Stripe.js has loaded.
            return;
        }
        const cardElement = elements.getElement(CardElement);
        const billingElement = elements.getElement(AddressElement);
        if (cardElement == null || billingElement == null) {
            console.log("Card or billing element is null");
            return;
        }
        const address = await billingElement.getValue();
        const { error, paymentIntent } = await stripe.confirmCardPayment(stripeIntent.client_secret, 
            {
                payment_method: {
                    card: cardElement,
                    billing_details: address.value,
                },
            }
        );
        if (error) {
            console.log(error);
        } else {
            console.log('PaymentIntent', paymentIntent);
            setPyamentCompleteStatus(paymentIntent);

            
            
        }
    };



    

    

    return(
        <div className={`${!open && "hidden"}`}>
            <form>
                Enter payment information:
                <CardElement options={options} onChange={handleCardChange} className={"bg-two text-white border-white border-1 p-[.75rem] rounded-sm autofill:text-black"}/>
                <div className={cardComplete?"":"hidden"}>
                    Billing Address:
                    <AddressElement options={{mode:"billing"}} onChange={handleBillingChange} />
                </div>

                <Button className="w-full mt-2" disabled={!(cardComplete && billingComplete)} onClick={handleSubmit}>
                    Buy {stripeIntent.amount / 1.25} credits for ${stripeIntent.amount/100}
                </Button>
            </form>


            
        </div>
    )
}