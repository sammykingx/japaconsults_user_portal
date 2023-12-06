// jshint esversion:6

import { useChangePasswordMutation } from "@/app/services/auth"
import { MutationResultType } from "../../../data/global"
import { getErrorMessage } from "../../../utils/global"

type AuthChangePasswordType = {
    token: string,
    "new_pwd": string
}

export const useAuthChangePasswordHook = () => {

    // Login mutation for both users and admin
    const [changePassword, { isLoading, isError, isSuccess, reset }] = useChangePasswordMutation()

    async function authChangePassword(authData: AuthChangePasswordType): Promise<MutationResultType> {
        // Clear all errors and messages
        let message = ""
        let success = false;
        let data;

        // make request
        try {
            const loginResponse = await changePassword(authData).unwrap();
            data = loginResponse;
            success = true;
        } catch (error) {
            message = getErrorMessage(error);
        }

        return { success, message, data };
    }

    return { authChangePassword, isLoading, isError, isSuccess, reset };
}