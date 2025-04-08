"use client"

import Button from "@/app/components/button";
import TextInput from "@/app/components/textInput";
import { useUser } from "@/app/lib/UserContext";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";



export default function SignUp(){
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const user = useUser()
    const router = useRouter()


    const onSubmit = async (e:FormEvent) => {
        if(user){
            const token = await user.firebase.getIdToken();
        
            
            e.preventDefault();
            let result = await fetch("http://localhost:8000/auth/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": token || "",
                },
                body: JSON.stringify({
                    "username":username,
                    "first_name":firstName,
                    "last_name":lastName
                })
            })
            if(result.ok){
                let data = await result.json()
                user.firstName = data.first_name
                user.lastName = data.last_name
                user.username = data.username
                router.push('/dashboard')
            }
            else{
                let error = await result.json()
                console.log(error)
            }
        }
        else{
            router.push('/login')
        }
        

    }

    return(
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-96">
                <div className="rounded-lg bg-two p-4 mb-4">
                    <h1 className="text-3xl font-bold text-center">Sign Up</h1>
                    <form onSubmit={onSubmit}>
                        <TextInput label="Username" value={username} onChange={setUsername} placeholder="Username" />
                        <TextInput label="First Name" value={firstName} onChange={setFirstName} placeholder="First Name" />
                        <TextInput label="Last Name" value={lastName} onChange={setLastName} placeholder="Last Name" />

                        <Button type="submit" className="w-full mt-4">Sign Up</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}