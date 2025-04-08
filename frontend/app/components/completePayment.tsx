import { useState } from "react"
import PaymentTypeSelector from "./paymentType"
import StripePayment from "./stripePayment"


export default function CompletePayment({paymentStage, stripeIntint, setPyamentCompleteStatus}:Readonly<{paymentStage:number, stripeIntint:any, setPyamentCompleteStatus:Function}>){
    const [paymentType, setPaymentType ] = useState(0)

    const selectPaymentMethod = (method:number) => {
        setPaymentType(method)
    }

    return(
        <>
            <div className={`max-w-md mx-auto bg-gray-500 rounded-lg shadow-md ${!paymentStage?"hidden":""}`} >
                
                <div className={`h-full w-full bg-two p-6 rounded-lg`}>
                    <h1 className="text-2xl w-full text-center">Payment Method</h1>
                    <div className={`flex-col ${paymentType==1 && "border-4 border-three"} rounded-sm p-2 mt-2`} onClick={()=>{selectPaymentMethod(1)}}>
                        <PaymentTypeSelector check={paymentType==1?true:false} handleCheck={()=>{}} name="Card"/>
                        <StripePayment open={paymentType==1?true:false} stripeIntent={stripeIntint} setPyamentCompleteStatus={setPyamentCompleteStatus}/>
                    </div>
                    <div className={`flex-col ${paymentType==2 && "border-4 border-three"} rounded-sm p-2 `} onClick={()=>{selectPaymentMethod(2)}}>
                        <PaymentTypeSelector check={paymentType==2?true:false} handleCheck={()=>{}} name="Paypal"/>
                    </div>

                </div>
            </div>
        </>
    )
}