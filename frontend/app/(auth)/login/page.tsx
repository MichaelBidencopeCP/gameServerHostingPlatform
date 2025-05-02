'use client'

import { useEffect, useState } from 'react'
import { auth } from '../../lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

import Button from '@/app/components/button'
import HiddenInput from '@/app/components/hiddenInput'
import TextInput from '@/app/components/textInput'
import { useUser } from '@/app/lib/UserContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link';


export default function LoginPage() {
    const user = useUser()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)


        } catch (error: any) {
            setError(error.message)
        }
    }

    useEffect(() => {
        if (user?.firebase) {
            if (user.username === undefined) {
                router.push('/register')
            }
            else {
                router.push('/dashboard')
            }
        }
    }, [user])

    return (
        <div className="container mx-auto p-4">
            <div className="max-w-md mx-auto bg-element rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <TextInput label="Email" value={email} onChange={setEmail} placeholder="Email" />
                    </div>
                    <div className="mb-4">
                        <HiddenInput label="Password" value={password} onChange={setPassword} placeholder="Password" />
                    </div>
                    <p className="text-subtext mb-2">
                        Don’t have an account?{' '}
                        <Link href="/register" className="text-accent underline hover:text-accent-hover">
                            Register!
                        </Link>
                    </p>
                    <Button type="submit" className="w-full disabled:!cursor-default" disabled={!email || !password}>
                        Login
                    </Button>
                </form>
            </div>
        </div>
    )
}