import Link from "next/link";



export default function DashboardSidebarItem({href, text}: Readonly<{href: string, text: string}>) {
    return (
        <div className='hover:h-12 flex items-center text-three bg-one rounded-lg'>
            <Link href={href}>
                <h1 className='text-2xl'><b>{text}</b></h1>
            </Link>
        </div>
    )
}