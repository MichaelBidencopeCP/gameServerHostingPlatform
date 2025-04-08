'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";

const UserContext = createContext<{
    "firebase": User,
    "credits"?: number,
    "username"?: string,
    "firstName"?: string,
    "lastName"?: string,
} | null>(null);
//add loading to the context if load times become a problem
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    
    const [user, setUser] = useState<{
        "firebase": User,
        "credits"?: number,
        "username"?: string,
        "firstName"?: string,
        "lastName"?: string,
    } | null>(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const token = await firebaseUser.getIdToken();
                let serverResponse = await fetch('http://localhost:8000/auth/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': `${token}`,
                    },
                })
                let returns = await serverResponse.json()
                //if signup field is true and in the object
                if (returns.signup) {
                    setUser({
                        firebase: firebaseUser,
                    })
                }
                else {
                    setUser({
                        firebase: firebaseUser,
                        username: returns.username,
                        firstName: returns.firstName,
                        lastName: returns.lastName,
                        credits: returns.credits,
                    })
                }
            }
        });

        return () => unsubscribe(); // clean up on unmount
    }, [auth]);

    return (
        <UserContext.Provider value={user}>{children}</UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);