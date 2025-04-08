'use client';

import Link from 'next/link'
import { useUser } from '../lib/UserContext';



export default function TopNavBar() {
    const user = useUser()
    return(
        <nav className="bg-two text-text">
          <div className="grid grid-cols-3 gap-4 p-4">
            <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold">Cloud Game Services</h1>
            </Link>
            </div>
            <div className="col-start-3 flex items-center justify-end">
                {user?.username}
                { user?.username ? (
                    
                    <Link href="/dashboard">
                        <h1 className="text-xl font-bold">Dashboard</h1>
                    </Link>
                ) : (
                    <Link href="/login">
                        <h1 className="text-xl font-bold">Login</h1>
                    </Link>
                )}
              
            </div>

          </div>

        </nav>
    )
}