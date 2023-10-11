// USER ROLES
export enum USERROLES {
    USER = "user",
    ADMIN = "ADMIN"
}

export enum USERSTATUS {
    UNVERIFIED = "Unverified"
}

export type LoginTokenDecodeType = {
    sub: number,
    name: string,
    email: string,
    role: USERROLES,
    is_verified: boolean,
    iat: number,
    exp: number
}