// jshint esversion:6
import { useSendEmailTokenMutation } from "@/app/services/auth"
import { MutationResultType } from "../../../data/global"
import { getErrorMessage } from "../../../utils/global"
import { EMAIL_VERIFICATION_TYPE } from "@/data/global/auth/apiTypes"

export const useAuthSendEmailTokenHook = () => {

    // Login mutation for both users and admin
    const [sendToken, { isLoading, isError, isSuccess, reset }] = useSendEmailTokenMutation()

    async function authSendEmailToken(mail: string, verv_type: EMAIL_VERIFICATION_TYPE): Promise<MutationResultType> {
        // Clear all errors and messages
        let message = ""
        let success = false;
        let data;

        // make request
        try {
            const response = await sendToken({ mail, verv_type }).unwrap();
            data = response;
            success = true;
        } catch (error) {
            message = (error as any)?.status == 404 ? "Email not found" : getErrorMessage(error);
        }

        return { success, message, data };
    }

    return { authSendEmailToken, isLoading, isError, isSuccess, reset };
}