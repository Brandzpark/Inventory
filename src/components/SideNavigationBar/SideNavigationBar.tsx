import React from 'react'
import SideNavigationBarItem from './SideNavigationBarItem'
import { AreaChartIcon, ContactIcon, DollarSignIcon, FileSpreadsheetIcon, LayoutDashboardIcon, ShoppingCartIcon, SquareUserRoundIcon, UndoDotIcon, UsersIcon } from 'lucide-react'

type Props = {}

export default function SideNavigationBar({ }: Props) {
    return (
        <div className='hidden lg:block min-w-[17rem] bg-white shadow-lg border-r min-h-screen px-5' >
            <div className='h-[6rem] flex justify-center items-center bg-gray-300 mb-5 mt-2' >LOGO</div>
            <SideNavigationBarItem
                title={"Dashboard"}
                icon={<LayoutDashboardIcon className='w-5 h-5' />}
                href="/dashboard"
                active={false}
            />
            <div className='text-sm text-slate-500 my-5 uppercase' >Inventory</div>
            <SideNavigationBarItem
                title={"Inventory Manage"}
                icon={<UsersIcon className='w-5 h-5' />}
                href="/inventory"
                active={true}
            />

            <div className='text-sm text-slate-500 my-5 uppercase' >Purchases</div>
            <div className='grid gap-3' >
                <SideNavigationBarItem
                    title={"Vendors"}
                    icon={<SquareUserRoundIcon className='w-5 h-5' />}
                    href="/inventory"
                    active={false}
                />
                <SideNavigationBarItem
                    title={"Purchase Order"}
                    icon={<ShoppingCartIcon className='w-5 h-5' />}
                    href="/inventory"
                    active={false}
                />
            </div>
            <div className='text-sm text-slate-500 my-5 uppercase' >Sales</div>
            <div className='grid gap-3' >
                <SideNavigationBarItem
                    title={"Customers"}
                    icon={<UsersIcon className='w-5 h-5' />}
                    href="/inventory"
                    active={false}
                />
                <SideNavigationBarItem
                    title={"Invoices"}
                    icon={<FileSpreadsheetIcon className='w-5 h-5' />}
                    href="/inventory"
                    active={false}
                />
                <SideNavigationBarItem
                    title={"Payments Received"}
                    icon={<DollarSignIcon className='w-5 h-5' />}
                    href="/inventory"
                    active={false}
                />
                <SideNavigationBarItem
                    title={"Sales Returns"}
                    icon={<UndoDotIcon className='w-5 h-5' />}
                    href="/inventory"
                    active={false}
                />
            </div>
            <div className='text-sm text-slate-500 my-5 uppercase' >Other</div>
            <SideNavigationBarItem
                title={"Analytical Reports"}
                icon={<AreaChartIcon className='w-5 h-5' />}
                href="/inventory"
                active={false}
            />
        </div>
    )
}