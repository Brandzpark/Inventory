export type IPurchaseOrder = {
    _id: string
    code: string
    orderDate: string
    requiredDate: string
    remark: string
    supplier: IPurchaseOrderSupplier | ISupplier
    items: IPurchaseOrderItem[]
    totalDiscount: string
    subTotal: string
    total: string
    history: IPurchaseOrderHistory[]
}


export type IPurchaseOrderItem = {
    code: string
    name: string
    remark: string
    quantity: string
    rate: string
    discount: string
    discountAmount: string
    subTotal: string
    total: string
}

export type IPurchaseOrderSupplier = {
    _id: string
    code: string
}

export type IPurchaseOrderHistory = {
    event: string
    user: string
    timestamps: string
}