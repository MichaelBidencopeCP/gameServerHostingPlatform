'use client'

import Link from "next/link";
import { useUser } from "./lib/UserContext";
import { useRouter } from "next/navigation";
import HomeSection from "./components/homeSection";
import Button from "./components/button";

export default function Home() {
    let user = useUser();
    const router = useRouter();

    return (
        <>
            <HomeSection index={0}>
                <h1 className="text-4xl font-bold mb-2">Cloud Game Services</h1>
                <h2 className=" text-3xl text-accent mb-2">Game servers for everyone, pay for what you need and nothing else</h2>
                <p className="text-subtext">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </HomeSection>

            <HomeSection index={1}>
                <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-3xl font-semibold mb-2">So many games</h2>
                    <p className="text-subtext">
                    We support any game you can think of
                    </p>
                </div>
                    <div  className="bg-element hover:bg-element-hover rounded-lg shadow-md ml-2 p-6 h-48 w-48">
                        <h1 className="text-2xl font-semibold text-center">Minecraft</h1>
                        <p className="text-center">Starting at $1.25</p>
                    </div>
                </div>
            </HomeSection>

            <HomeSection index={2}>
                <h2 className="text-3xl font-semibold mb-2">Get Started Today</h2>
                <Button className="" onClick={() => router.push('/login')}>
                Create Account
                </Button>
            </HomeSection>
        </>
    );

}
