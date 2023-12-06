import { PAYMENT_STATUS } from "../dashboard"

export enum INVOICE_STATUS {
    EXPIRED = 'expired'
}

export type PaymentActivityType = {
    name: string,
    invoiceID: string,
    amount: string,
    status: PAYMENT_STATUS,
    date: string
}

export type PaidInvoiceType = {
    "inv_id": string,
    "title": string,
    "desc": string,
    "price": number,
    "to_email": string,
    "created_at": Date,
    "created_by": string,
    "updated_at": Date | null,
    "updated_by": string | null,
    "due_date": Date,
    "paid": boolean,
    "paid_at": Date,
    rave_txref?: string;
    ref_id?: string;
    status?: INVOICE_STATUS;
}

type PaymentStatusInterface = {
    [key: string]: {
        color: string;
        backgroundColor: string;
    };
}

// Styles for the Debit Status category
export const PaymentStatusColor: PaymentStatusInterface = {
    completed: {
        color: "#68EE76",
        backgroundColor: "#68EE764D",
    },
    Completed: {
        color: "#68EE76",
        backgroundColor: "#68EE764D",
    },
    pending: {
        color: "#FFC727",
        backgroundColor: "#FFC7274D",
    },
    Pending: {
        color: "#FFC727",
        backgroundColor: "#FFC7274D",
    },
    canceled: {
        color: "#FF4848",
        backgroundColor: "#FF48484D",
    },
    Canceled: {
        color: "#FF4848",
        backgroundColor: "#FF48484D",
    },
    cancelled: {
        color: "#FF4848",
        backgroundColor: "#FF48484D",
    },
    Cancelled: {
        color: "#FF4848",
        backgroundColor: "#FF48484D",
    },
    error: {
        color: "#FF4848",
        backgroundColor: "#FF48484D",
    },
    Error: {
        color: "#FF4848",
        backgroundColor: "#FF48484D",
    },
    paid: {
        color: "#68EE76",
        backgroundColor: "#68EE764D",
    },
    Paid: {
        color: "#68EE76",
        backgroundColor: "#68EE764D",
    },
};
