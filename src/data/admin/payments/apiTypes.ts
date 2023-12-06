import { PAYMENT_STATUS } from "../dashboard"

export type PaymentResponse = {
    "ref_id": string,
    "rave_txRef"?: string,
    "invoice_id": string,
    "paid": boolean,
    "payer_email": string,
    "paid_by"?: string,
    "amount"?: number,
    "paid_at"?: Date | null,
    "checkout_type": string,
    "title": null | string,
    "status": PAYMENT_STATUS,
}

export type PendingPaymentResponse = {
    "ref_id": string,
    "rave_txRef": string,
    "invoice_id": string,
    "paid": boolean,
    "payer_email": string,
    "title": string | null,
    "status": PAYMENT_STATUS | null,
    "payment_type": "Bank Transfer"
}


export type GetAllPaymentsResponse = PaymentResponse[]
export type GetPendingPaymentsResponse = PaymentResponse[]
export type GetPaidPaymentsResponse = PaymentResponse[]
export type GetCancelledPaymentsResponse = PaymentResponse[]
export type GetErrorPaymentsResponse = PaymentResponse[]
export type GetFailedPaymentsResponse = PaymentResponse[]