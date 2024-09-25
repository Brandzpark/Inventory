import React from "react";
import Header from "@/components/Header/Header";
import { Metadata } from "next";
import PurchaseOrderView from "@/components/PurchaseOrders/PurchaseOrderView";
import puppeteer from "puppeteer";
import { printPurchaseOrderApi } from "@/api/purchaseOrder";

type Props = {
  params: {
    code: string;
  };
};

export const metadata: Metadata = {
  title: "Purchase Order View",
};

async function fetchPdf(code: string) {
  const { data } = await printPurchaseOrderApi({ code });
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(data?.htmlContent);
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });
  await browser.close();

  const pdfArray: number[] = Object.values(pdfBuffer);
  // const buffer = Buffer.from(pdfArray);
  // console.log(buffer);
  return pdfArray;
  // return new Response(buffer, {
  //   headers: {
  //     "Content-Type": "application/pdf",
  //   },
  // });
}

export default async function page({ params }: Props) {
  const { code } = params;
  const pdfArray = await fetchPdf(code);
  const breadcrubmbs = [
    {
      title: "Purchase Orders",
      href: "/purchaseOrders",
    },
    {
      title: `View - ${code}`,
      href: "",
    },
  ];
  return (
    <div>
      <Header breadcrumbs={breadcrubmbs} />
      <PurchaseOrderView code={code} pdfArray={pdfArray} />
    </div>
  );
}
