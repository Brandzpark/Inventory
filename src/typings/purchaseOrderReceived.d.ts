import { ISupplier } from "./supplier"

export type IPurchaseOrderReceived = {
    _id: string
    code: string
    purchaseOrderCode: string
    receivedDate: string
    remark: string
    discount: string
    totalDiscount: string
    subTotal: string
    supplier: ISupplier
    total: string
    items: IPurchaseOrderReceivedItem[]
}

export type IPurchaseOrderReceivedItem = {
    code: string
    name: string
    orderedQuantity: string
    receivedQuantity: string
    requestAmount: string
    amount: string
}