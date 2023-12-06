import { USERROLES } from "@/data/global/auth"

export enum PAYMENT_STATUS {
    COMPLETED = "completed",
    CANCELLED = 'cancelled',
    PENDING = 'pending',
    PAID = "paid",
    FAILED = 'failed',
    ERROR = "error",
    CHECKING = "checking"
}

export type UserType = {
    "user_id": number,
    "name": string,
    "email": string,
    "phone_num": string,
    "role": USERROLES,
    "is_verified": boolean,
    "profile_pic": null | string,
    "date_joined": Date,
    "last_login": Date
}