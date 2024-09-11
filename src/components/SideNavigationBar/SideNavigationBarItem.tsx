import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
    title: string
    icon: JSX.Element
    href: string
    active: boolean
}

export default function SideNavigationBarItem({ href, icon, title, active }: Props) {
    return (
        <Link href={href} className={
            cn('flex items-center gap-3 p-2 rounded-sm font-medium transition-colors text-sm',
                active ? "bg-primary text-white" : 'hover:bg-slate-200')}
        >
            {icon}
            {title}
        </Link>
    )
}