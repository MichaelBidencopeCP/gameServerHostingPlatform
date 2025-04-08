'use client'

import { useEffect } from "react";
import DashboardNav from "../components/dashboardNav";
import { useRouter } from "next/navigation";

import {loadStripe} from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import { useUser } from "../lib/UserContext";

const stripe = loadStripe('pk_test_51QCQhmHkPPvIEywRGx0LRF2jX7ICDTQNsJmQXxSVQzDd17p1eSFRMiRcyNrXzY4IvLsiUz2zWkc4iuTYkP97Jtkm008cCCYlah')



export default function Layout({ children }: { children: React.ReactNode }) {

    const user = useUser()
    const router = useRouter()
    useEffect(() => {
        if (!user) {
            router.push('/auth/login')
        }
        if (user?.username === undefined) {
            router.push('/register')
        }
    }, [user])
    

    const options = {
        appearance : {
            rules: {
                '.Input': {
                    backgroundColor: '#273469',
                    color: '#ffffff',
                    border: '1px solid #ffffff',
                    borderRadius: '4px',
                    padding: '10px',
                },
                '.Label': {
                    color: '#ffffff',
                },
                '.Input--invalid': {
                    border: '1px solid #ff0000',
                },
            },
        }
        
      };
      
    return (
        <div className="flex overflow-clip">
            {/* Sidebar */}
            <div className="w-64 ">
                <DashboardNav />
            </div>
            
            {/* Main Content */}
            <div className="h-screen w-full bg-white">
                <Elements stripe={stripe} options={options}>   
                    {children}
                </Elements>
            </div>

        </div>
    )
}