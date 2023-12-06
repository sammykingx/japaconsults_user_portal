import { USERROLES } from "@/data/global/auth"
import { UserType } from "../dashboard/dashboard"

export type GetAllUsersResponse = UserType[]
export type GetAllStaffsResponse = UserType[]
export type GetAllManagersResponse = UserType[]
export type GetAllAdminsResponse = UserType[]

export type UpdateUserRoleRequest = {
    "user_email": string,
    "role": USERROLES
}

export type UpdateUserRoleResponse = {
    msg?: string
    detail?: string
    details?: string
}