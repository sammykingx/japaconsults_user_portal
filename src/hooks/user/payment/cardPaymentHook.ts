// jshint esversion:6
import { useCardPaymentMutation } from "@/app/services/user/payments"
import { MutationResultType } from "../../../data/global"
import { getErrorMessage } from "../../../utils/global"

type CardTransferPayProp = {
    invoiceId: string
    "cardno": string,
    "cvv": string,
    "expirymonth": string,
    "expiryyear": string,
    "pin": string
}

export const useCardPaymentHook = () => {

    // Login mutation for both users and admin
    const [payCardTransfer, { isLoading, isError, isSuccess, reset }] = useCardPaymentMutation()

    async function cardTransferPay(fileData: CardTransferPayProp): Promise<MutationResultType> {
        // Clear all errors and messages
        let message = ""
        let success = false;
        let data;

        const { invoiceId, cardno, cvv, expirymonth, expiryyear, pin } = fileData

        // make request
        try {
            const response = await payCardTransfer({
                params: {
                    invoiceId
                },
                body: {
                    cardno, cvv, expirymonth, expiryyear, pin
                }
            }).unwrap()

            data = response;
            success = true;
        } catch (error) {
            message = getErrorMessage(error);
        }

        return { success, message, data };
    }

    return { cardTransferPay, isLoading, isError, isSuccess, reset };
}