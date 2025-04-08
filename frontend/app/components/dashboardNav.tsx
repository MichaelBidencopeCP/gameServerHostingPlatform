
import Link from 'next/link';
import DashboardSidebarItem from './dashboardSidebarItem';


export default function DashboardNav() {

    return (

        <div className="flex flex-col h-full">
            <div className="flex flex-col p-4">
                <DashboardSidebarItem href="/dashboard" text="Dashboard" />
                <DashboardSidebarItem href="/dashboard/payments" text="Payments" />
                <DashboardSidebarItem href="/dashboard/settings" text="Settings" />
            </div>
        </div>
    )
}
