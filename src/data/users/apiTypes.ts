import { USERROLES } from "../global/auth"

export type GetUserProfileResponse = {
    user_id: number
    name: string
    email: string
    phone_num: string
    role: USERROLES
    is_verified: boolean
    profile_pic: null | string
}