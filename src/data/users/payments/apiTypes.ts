export type BankTransferPaymentRequest = {
    invoiceId: string
}

export type BankTransferPaymentResponse = {
    "ref_id": string,
    "bank_name": string,
    "bank_account": string,
    "expires_in": Date,
    "message": string,
    "transfer_amount": number
}

export type VerifyPaymentRequest = {
    refId: string
}

export type VerifyPaymentResponse = {
    status: string,
    "msg": string,
    "transactionComplete": boolean
}

export type CardPaymentRequest = {
    params: {
        invoiceId: string
    },
    body: {
        "cardno": string,
        "cvv": string,
        "expirymonth": string,
        "expiryyear": string,
        "pin": string
    }
}

export type CardPaymentResponse = {
    "ref_id": string,
    "validationRequired": boolean
}

export type VerifyCardPaymentRequest = {
    otp: string,
    "ref_id": string,
}

export type VerifyCardPaymentResponse = {
    "transactionComplete": true,
    "ref_id": "string",
    "inv_id": "string",
    "amount": 0,
    "chargedamount": 0,
    "currency": "string"
}


export type GetUserTotalSpendResponse = {
    "name": string,
    "email": string,
    "total_spend": number
}

export type GetRaveCheckoutLinkRequest = {
    invoiceId: string
}

export type GetRaveCheckoutResponse = {
    "ref_id": string,
    "status": string,
    "link": string,
    "link_type": string
}

export type VerifyRaveCheckoutPayment = {
    "msg": string,
}

export type GetRavePaymentCallbackRequest = {
    tx_ref: string,
    tx_status: string,
    transaction_id?: string | number
}

export type GetRavePaymentCallbackResponse = {
    "status": string,
    "ref_id": string
}