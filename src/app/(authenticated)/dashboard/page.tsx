import Header from '@/components/Header/Header'
import React from 'react'

type Props = {}


const breadcrubmbs = [
    {
        title: "Invoices",
        href: "/"
    },
    {
        title: "123inv",
        href: "/"
    }
]

export default function page({ }: Props) {
    return (
        <div>
            <Header breadcrumbs={breadcrubmbs} />
        </div>
    )
}