// jshint esversion:6
import { useLazyLogoutQuery } from "@/app/services/auth"
import { MutationResultType } from "../../../data/global"
import { getErrorMessage } from "../../../utils/global"

export const useAuthLogoutHook = () => {

    // Login mutation for both users and admin
    const [logout, { isLoading, isError, isSuccess }] = useLazyLogoutQuery()

    async function authLogout(): Promise<MutationResultType> {
        // Clear all errors and messages
        let message = ""
        let success = false;

        // make Logout request to invalidate token
        try {
            await logout().unwrap();
            success = true;
        } catch (error) {
            message = getErrorMessage(error);
        }

        return { success, message };
    }

    return { authLogout, isLoading, isError, isSuccess };
}