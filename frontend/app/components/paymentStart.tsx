'use client'

import { useEffect, useState } from "react";
import Button from "./button";
import NumberInput from "./numberInput";
import TextInput from "./textInput";

const dollarSignDecorator = (
    <div 
        className="ml-2 mr-2 my-2"
    >
        $
    </div>
)


export default function PaymentStart({amount, amountChange, priceStr, priceChange, confirmCreditAmount, paymentStage}:Readonly<{
    amount:number,
    amountChange:(value:number)=>void,
    priceStr:string,
    priceChange:(value:string)=>void,
    confirmCreditAmount:()=>void,
    paymentStage:number
    
}>){
    const [classInfo, setClassInfo] = useState("")
    useEffect(()=>{
        if(paymentStage!=0){
            setClassInfo('opacity-50')
        }
    },[paymentStage])
    
    const confirm = () => {
        //move curtain to front(or back I guesss)
        
        confirmCreditAmount()
    }

    return(
    
        <div className={`max-w-md mx-auto bg-gray-500 rounded-lg shadow-md ${classInfo}`} >
        <div className={`h-full w-full bg-two p-6 rounded-lg`}>
            
                <h1 className="text-3xl font-semibold text-center">Payments</h1>
                <div className=" font-semibold">
                    Pay as you go yada yada yada
                </div>
                <h1 className="text-2xl font-semibold">add credits</h1>
                
                <div className="flex justify-center">
                    <div className="grid grid-cols-2 gap-2">
                        <NumberInput label="Amount" value={amount} onChange={amountChange}/>
                        <TextInput label="price" startDecorator={dollarSignDecorator} className="text-end" value={priceStr} onChange={priceChange} disabled={true} />
                    </div>
                    
                </div>
                {
                    amount<1?
                    <div className="text-xs pt-1">
                        Minimum of 1 credit
                    </div>:''
                }
                <Button className="w-full mt-2" onClick={confirm} disabled={amount<1?true:false}>
                    Confirm & Checkout
                </Button>
            </div>

        </div>
    )
}