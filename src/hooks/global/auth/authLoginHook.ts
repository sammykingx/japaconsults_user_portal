// jshint esversion:6
import { useLoginMutation } from "../../../app/services/user"
import { MutationResultType } from "../../../data/global"
import { getErrorMessage } from "../../../utils/global"

export const useAuthLoginHook = () => {

    // Login mutation for both users and admin
    const [login, { isLoading, isError, isSuccess, reset }] = useLoginMutation()

    async function authLogin(username: string, password: string): Promise<MutationResultType> {
        // Clear all errors and messages
        let message = ""
        let success = false;
        let data;

        // Build Form Body
        const formBody = new URLSearchParams({
            username,
            password
        })

        // make request
        try {
            const loginResponse = await login(formBody).unwrap();
            data = loginResponse;
            console.log(loginResponse)
            success = true;
        } catch (error) {
            console.log(error);
            console.log(isError);
            message = (error as any)?.status == 404 ? "Invalid username or password" : getErrorMessage(error);
            console.log(message);
        }

        return { success, message, data };
    }

    return { authLogin, isLoading, isError, isSuccess, reset };
}