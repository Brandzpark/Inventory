import { NextResponse, NextRequest } from "next/server";
import instance from "@/api/base";
import { printPurchaseOrderApi } from "@/api/purchaseOrder";
import { notFound, redirect } from "next/navigation";
import puppeteer from "puppeteer";
type ParamsType = { params: { code: string } };
export async function GET(request: NextRequest, { params }: ParamsType) {
  const { code } = params;
  const { data } = await printPurchaseOrderApi({ code });
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(data?.htmlContent);
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });
  await browser.close();

  if (pdfBuffer?.length == 0) {
    redirect("/404");
  }
  const pdfArray: number[] = Object.values(pdfBuffer);
  const buffer = Buffer.from(pdfArray);
  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
