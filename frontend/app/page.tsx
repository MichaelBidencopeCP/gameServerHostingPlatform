'use client'

import Link from "next/link";

import useUserStore from "./lib/user-store";


export default function Home() {
    let { username, } = useUserStore();
    return (
        <>
            <Link href="/login">
                Login
            </Link>
            {username}
        </>
    );

}
