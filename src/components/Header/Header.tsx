import React, { Fragment } from 'react'

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { BreadcrumbType } from '@/typings/typings'
import Link from 'next/link'
import { BellIcon, SettingsIcon } from 'lucide-react'
import User from './User'



type Props = {
    breadcrumbs?: BreadcrumbType[]
    title?: string
}

export default function Header({ breadcrumbs, title }: Props) {
    return (
        <div className='flex justify-between items-center mb-8' >
            {title ?
                <div className='text-3xl font-semibold' >{title}</div>
                :
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        {breadcrumbs && breadcrumbs?.length > 0 && <BreadcrumbSeparator />}
                        {breadcrumbs?.map((row, index) => {
                            if (breadcrumbs?.length - 1 == index) {
                                return (
                                    <BreadcrumbItem key={row.title} >
                                        <BreadcrumbPage>{row?.title}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                )
                            }
                            return (
                                <Fragment key={row.title}>
                                    <BreadcrumbItem >
                                        <BreadcrumbLink href={row?.href}>{row?.title}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                </Fragment>
                            )
                        })}

                    </BreadcrumbList>
                </Breadcrumb>
            }
            <div className='flex gap-5 items-center' >
                <Link href={'/'}>
                    <div className='group transition-all  w-10 h-10 border bg-white rounded-full flex justify-center items-center' >
                        <BellIcon className='w-5 h-5 transition-all text-[#B2B2B2] group-hover:text-black' />
                    </div>
                </Link>
                <Link href={'/settings/user-management'}>
                    <div className='group transition-all  w-10 h-10 border bg-white rounded-full flex justify-center items-center' >
                        <SettingsIcon className='w-5 h-5 transition-all text-[#B2B2B2] group-hover:text-black' />
                    </div>
                </Link>
                <User />
            </div>
        </div>
    )
}