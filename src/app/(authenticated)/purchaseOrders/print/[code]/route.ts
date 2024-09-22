
import { NextResponse, NextRequest } from "next/server";
import instance from "@/api/base";
import { printPurchaseOrderApi } from '@/api/purchaseOrder'
import { notFound, redirect } from "next/navigation";

type ParamsType = { params: { code: string } }
export async function GET(request: NextRequest, { params }: ParamsType) {
    const { code } = params
    const { data } = await printPurchaseOrderApi({ code })
    if (!data?.pdfBuffer) {
        redirect('/404')
    }
    const pdfArray: number[] = Object.values(data?.pdfBuffer);
    const buffer = Buffer.from(pdfArray);
    return new Response(buffer, {
        headers: {
            'Content-Type': 'application/pdf',
        },
    })
}