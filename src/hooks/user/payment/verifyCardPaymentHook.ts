// jshint esversion:6
import { useVerifyCardPaymentMutation } from "@/app/services/user/payments"
import { MutationResultType } from "../../../data/global"
import { getErrorMessage } from "../../../utils/global"

type VerifyCardPaymentProp = {
    otp: string,
    ref_id: string
}

export const useVerifyCardPaymentHook = () => {

    // Login mutation for both users and admin
    const [verifyTransfer, { isLoading, isError, isSuccess, reset }] = useVerifyCardPaymentMutation()

    async function verifyCardTransfer(fileData: VerifyCardPaymentProp): Promise<MutationResultType> {
        // Clear all errors and messages
        let message = ""
        let success = false;
        let data;

        // make request
        try {
            const response = await verifyTransfer(fileData).unwrap()
            data = response;
            success = true;
        } catch (error) {
            message = getErrorMessage(error);
        }

        return { success, message, data };
    }

    return { verifyCardTransfer, isLoading, isError, isSuccess, reset };
}