import { ClubDataType } from "./ClubDataType"

export type AuthDataType = {
    auth_token: string,
    user: UserDataType
}

export type UserDataType = {
    id: string,
    role: string,
    phone_verified: number,
    first_name: string,
    email: string,
    is_active: number,
    last_name: string,
    clubs: ClubDataType[]
}

export type AdminRegFormData = {
    photo: string,
    role: string,
    club_name: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    country: string
}

export type LoginFormDataType = {
    email: string,
    password: string
}