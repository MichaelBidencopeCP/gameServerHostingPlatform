'use client'


import PaymentStart from "@/app/components/paymentStart"
import {  useEffect, useState } from "react"

import useUserStore from "@/app/lib/user-store"
import CompletePayment from "@/app/components/completePayment"
import ErrorBar from "@/app/components/errorBar"
import PaymentComplete from "@/app/components/paymentComplete"
import { auth } from "@/app/lib/firebase"

export default function PaymentsPage() {
    const [amount, setAmount] = useState(0)
    const [priceStr, setPriceStr] = useState("0.00")
    const [paymentStage, setPaymentStage] = useState(0)
    const [error, setError] = useState(0)
    const [stripeIntent, setStripeIntent] = useState({amount:0, clientSecret:""})
    const [paymentCompleteStatus, setPyamentCompleteStatus] = useState({
        "id": "",
        "object": "",
        "amount": 0,
        "amount_details": {
          "tip": {}
        },
        "automatic_payment_methods": {
          "allow_redirects": "",
          "enabled": true
        },
        "canceled_at": null,
        "cancellation_reason": null,
        "capture_method": "",
        "client_secret": "",
        "confirmation_method": "",
        "created": 0,
        "currency": "usd",
        "description": null,
        "last_payment_error": null,
        "livemode": false,
        "next_action": null,
        "payment_method": "",
        "payment_method_configuration_details": {
          "id": "",
          "parent": null
        },
        "payment_method_types": [
          "card",
          "klarna",
          "link",
          "cashapp",
          "amazon_pay"
        ],
        "processing": null,
        "receipt_email": null,
        "setup_future_usage": null,
        "shipping": null,
        "source": null,
        "status": ""
    })
    const user = useUserStore((state)=>state)

    useEffect(()=>{
        if(paymentCompleteStatus.status == "succeeded"){
            console.log(paymentCompleteStatus)
            setPaymentStage(1)
        }
    }, [paymentCompleteStatus])

    const errorMessages = (value:number) => {
        switch(value){
            case 1:
                return "The value entered is out of range. Right now we will not accept any payments over 400$ or less than 0$"
            default:
                return "Unkown error please try again later"
        }
    }

    const amountChange = (value:number) => {
        if(value%1==0 && value>=0){
            setAmount(value)
            setPriceStr((value*1.25).toFixed(2))
        }
    }
        
        
    const priceChange = (value:string)=>{
        /*
        setPriceStr(value)
        setAmount((Number(value)*(0.75)))
        */
    }

    const confirmCreditAmount = async () => {
        let token = auth.currentUser?.getIdToken()
        if(!token){
            user.clearUser()
            return
        }
        const response = await fetch('http://localhost:8000/payment/credits', {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'token':`${token}`
            },
            body: JSON.stringify({'credits':amount})

        })
        if(response.ok){
            setPaymentStage(1)
            let data = await response.json()
            console.log(data)
            setStripeIntent(data.paymentIntent)
            console.log(data.paymentIntent)
        }
        if(response.status === 400){
            let code = await response.json()
            console.log(code.detail.code)
            if (code.detail.code==1){
                setError(1)
            }
            else{
                setError(2)
            }
                
        }
        if(response.status === 401){
            user.clearUser()
        }
        
    }


    

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-3">
                <div className={`${paymentStage === 0 ? "col-start-2":""}`}>
                    <ErrorBar className={`${error==0?"hidden":""}`}>{errorMessages(error)}:{error}</ErrorBar>
                    <PaymentStart amount={amount} amountChange={amountChange} priceStr={priceStr} priceChange={priceChange} paymentStage={paymentStage} confirmCreditAmount={confirmCreditAmount} />
                </div>
                <div className={`${paymentStage === 1 ? "hidden":""}`}>
                    <PaymentComplete amount={0}/>
                </div>
                <div>
                    <CompletePayment setPyamentCompleteStatus={setPyamentCompleteStatus} paymentStage={paymentStage} stripeIntint={stripeIntent}/>
                </div>
            </div>
        </div>
    )
}