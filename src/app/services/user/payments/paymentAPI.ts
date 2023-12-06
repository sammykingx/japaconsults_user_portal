// jshint esversion:6
import { emptySplitApi } from "../../api";
import {
    BankTransferPaymentRequest, BankTransferPaymentResponse,
    VerifyPaymentRequest, VerifyPaymentResponse, GetUserTotalSpendResponse,
    CardPaymentRequest, CardPaymentResponse, VerifyCardPaymentRequest,
    VerifyCardPaymentResponse, GetRaveCheckoutLinkRequest, GetRaveCheckoutResponse,
    VerifyRaveCheckoutPayment, GetRavePaymentCallbackRequest, GetRavePaymentCallbackResponse
} from "@/data/users/payments";

export const paymentsAPI = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({

        // Get user profile
        userTotalSpend: builder.query<GetUserTotalSpendResponse, void>({
            query: () => ({
                url: `payments/totalSpend`,
            }),
        }),

        // Get user profile
        bankTransferPay: builder.query<BankTransferPaymentResponse, BankTransferPaymentRequest>({
            query: (params) => ({
                url: `flutterwave/bankTransfer`,
                params
            }),
        }),

        verifyPayment: builder.query<VerifyPaymentResponse, VerifyPaymentRequest>({
            query: (params) => ({
                url: `flutterwave/verifyPayments`,
                params,
            })
        }),

        cardPayment: builder.mutation<CardPaymentResponse, CardPaymentRequest>({
            query: (credentials) => ({
                url: "card/pay",
                method: "POST",
                params: credentials.params,
                body: credentials.body
            }),
        }),

        verifyCardPayment: builder.mutation<VerifyCardPaymentResponse, VerifyCardPaymentRequest>({
            query: (credentials) => ({
                url: "card/verify",
                method: "POST",
                body: credentials
            }),
        }),

        raveCheckoutModal: builder.query<GetRaveCheckoutResponse, GetRaveCheckoutLinkRequest>({
            query: (params) => ({
                url: `flutterwave/checkoutModal`,
                params
            }),
        }),

        ravePaymentCallback: builder.query<GetRavePaymentCallbackResponse, GetRavePaymentCallbackRequest>({
            query: (params) => ({
                url: `flutterwave/paymentCallback`,
                params
            }),
        }),

        verifyCheckoutPay: builder.query<VerifyRaveCheckoutPayment, void>({
            query: () => ({
                url: `raveCheckout/verifyPayments`,
            }),
        }),


    })
})

export const {
    useLazyBankTransferPayQuery, useVerifyPaymentQuery,
    useLazyVerifyPaymentQuery, useCardPaymentMutation,
    useVerifyCardPaymentMutation, useUserTotalSpendQuery, useBankTransferPayQuery,
    useRaveCheckoutModalQuery, useLazyRaveCheckoutModalQuery, useLazyVerifyCheckoutPayQuery, useRavePaymentCallbackQuery
} = paymentsAPI