'use client'

import Link from "next/link";
import { useUser } from "./lib/UserContext";

export default function Home() {
    let user = useUser();
    return (
        <>
            <Link href="/login">
                Login
            </Link>
            {user?.username}
        </>
    );

}
