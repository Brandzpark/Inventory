import { NextRequest } from "next/server";
import { printPurchaseOrderApi } from "@/api/purchaseOrder";
import { notFound, redirect } from "next/navigation";
type ParamsType = { params: { code: string } };
export async function GET(request: NextRequest, { params }: ParamsType) {
  const { code } = params;
  const { data } = await printPurchaseOrderApi({ code });
  const pdfArray: number[] = Object.values(data?.pdfBuffer);

  if (pdfArray?.length == 0) {
    redirect("/404");
  }
  const buffer = Buffer.from(pdfArray);
  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
