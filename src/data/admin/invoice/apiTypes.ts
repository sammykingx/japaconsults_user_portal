import { PaidInvoiceType } from "./invoice";

export type GetPaidInvoiceResponse = PaidInvoiceType[]

export type GetAllInvoiceResponse = PaidInvoiceType[]

export type GetPendingInvoiceResponse = PaidInvoiceType[]

export type GetExpiredInvoiceResponse = PaidInvoiceType[]

export type GetTotalRevenueResponse = {
    year?: {
        "January"?: number
        "February"?: number
        "March"?: number
        'April'?: number
        "June"?: number
        "July"?: number
        "August"?: number
        "September"?: number
        "October"?: number
        "November"?: number
        "December"?: number
    }
}

export type CreateInvoiceRequest = {
    "desc": string,
    "due_date": Date | string,
    "price": number,
    "title": string,
    "to_email": string
}

export type UpdateInvoiceRequest = {
    "desc": string,
    "due_date": Date | string,
    "inv_id": string,
    "price": number,
    "title": string,
}

export type UpdateInvoiceResponse = {
    msg?: string
    detail?: string
    details?: string
}

export type CreateInvoiceResponse = {
    msg?: string
    detail?: string
    details?: string
}

export type UpdateInvoiceStatusRequest = {
    invoiceId: string
}

export type UpdateInvoiceStatusResponse = {
    msg?: string
    detail?: string
    details?: string
}

export type AdminDeleteInvoiceRequest = {
    invoiceId: string
}

export type AdminDeleteInvoiceResponse = {
    msg?: string
    detail?: string
    details?: string
}