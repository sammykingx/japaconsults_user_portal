// jshint esversion:6
import { emptySplitApi } from "../api";
import {
    AuthLoginResponse, AuthUserRegisterRequest,
    AuthUserRegisterResponse, AuthSendEmailToken,
    AuthLogoutResponse, AuthVerifyEmailTokenRequest,
    AuthVerifyEmailTokenResponse, AuthChangePasswordRequest,
    AuthChangePasswordResponse
} from "../../../data/global/auth";

export const authAPI = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        // Define your user endpoints here
        login: builder.mutation<AuthLoginResponse, URLSearchParams>({
            query: (credentials) => ({
                url: 'auth/',
                method: 'POST',
                body: credentials,
            }),
        }),

        // Sign UP USER
        signup: builder.mutation<AuthUserRegisterResponse, AuthUserRegisterRequest>({
            query: (credentials) => ({
                url: 'user/register',
                method: 'POST',
                body: credentials,
            }),
        }),

        // Send Email token
        sendEmailToken: builder.mutation<unknown, AuthSendEmailToken>({
            query: (params) => ({
                url: 'auth/generate/emailToken',
                method: 'POST',
                params
            }),
        }),

        // Verify Email token
        verifyEmailToken: builder.query<AuthVerifyEmailTokenResponse, AuthVerifyEmailTokenRequest>({
            query: (params) => ({
                url: 'auth/verifyEmail',
                method: 'GET',
                params
            }),
        }),

        // Change Password
        changePassword: builder.mutation<AuthChangePasswordResponse, AuthChangePasswordRequest>({
            query: (credentials) => ({
                url: 'auth/changePassword',
                method: 'PATCH',
                body: credentials,
            }),
        }),

        // Logout User
        logout: builder.query<AuthLogoutResponse, void>({
            query: () => ({ url: "auth/logout" }),
        }),
    })
})

export const { useLoginMutation, useSignupMutation, useSendEmailTokenMutation, useLazyLogoutQuery, useLazyVerifyEmailTokenQuery, useChangePasswordMutation } = authAPI