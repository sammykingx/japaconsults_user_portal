import { USERROLES } from "."
import { USERSTATUS } from "./auth"

export enum EMAIL_VERIFICATION_TYPE {
    NEW_USER = 'new_user',
    PASSWORD_CHANGE = 'password_change'
}

export type AuthLoginRequest = {
    username: string
    password: string
}

export type AuthLoginResponse = {
    "detail"?: "Invalid credentials"
    "access_token"?: "string",
    "token_type"?: "string"
}

export type AuthUserRegisterRequest = {
    "first_name": string,
    "last_name": string,
    "email": string,
    "password": string,
    "phone_num": string,
    "role": USERROLES
}

export type AuthUserRegisterResponse = {
    "detail"?: string,
    "details"?: string,
    "status": USERSTATUS,
    "token": "string"
}

export type AuthSendEmailToken = {
    "mail": string
    "verv_type": EMAIL_VERIFICATION_TYPE
}

export type AuthVerifyEmailTokenRequest = {
    token: string
}

export type AuthVerifyEmailTokenResponse = {
    detail?: string,
    msg?: string
}

export type AuthLogoutResponse = {
    "msg": string
}

export type AuthChangePasswordRequest = {
    "token": string,
    "new_pwd": string
}

export type AuthChangePasswordResponse = {
    detail: string
}