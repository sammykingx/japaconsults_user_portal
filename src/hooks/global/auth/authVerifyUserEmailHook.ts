// jshint esversion:6
import { useLazyVerifyEmailTokenQuery } from "@/app/services/auth"
import { MutationResultType } from "../../../data/global"
import { getErrorMessage } from "../../../utils/global"

export const useAuthVerifyEmailTokenHook = () => {

    // Login mutation for both users and admin
    const [verifyToken, { isLoading, isError, isSuccess }] = useLazyVerifyEmailTokenQuery()

    async function authVerifyEmailToken(token: string): Promise<MutationResultType> {
        // Clear all errors and messages
        let message = ""
        let success = false;
        let data;

        // make request
        try {
            const response = await verifyToken({ token }).unwrap();
            data = response;
            success = true;
        } catch (error) {
            message = getErrorMessage(error);
        }
        return { success, message, data };
    }

    return { authVerifyEmailToken, isLoading, isError, isSuccess, };
}