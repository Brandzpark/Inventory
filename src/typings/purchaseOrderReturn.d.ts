import { IPurchaseOrder } from "./purchaseOrder"
import { ISupplier } from "./supplier"

export type IPurchaseOrderReturn = {
    _id: string
    code: string
    date: string
    purchaseOrderCode: string
    purchaseOrder: IPurchaseOrder
    supplier: ISupplier
    remark: string
    subTotal: string
    total: string
    items: IPurchaseOrderReturnItem[]
}

export type IPurchaseOrderReturnItem = {
    code: string
    name: string
    remark: string
    quantity: string
    rate: string
    subTotal: string
    total: string
}