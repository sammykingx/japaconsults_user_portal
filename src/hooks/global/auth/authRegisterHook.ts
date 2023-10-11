// jshint esversion:6
import { useSignupMutation } from "@/app/services/user"
import { MutationResultType } from "../../../data/global"
import { getErrorMessage } from "../../../utils/global"
import { USERROLES } from "@/data/global/auth"

type RegisterUserType = {
    firstname: string,
    lastname: string,
    phone: string,
    email: string,
    password: string
    role: USERROLES
}

export const useAuthRegisterHook = () => {

    // Login mutation for both users and admin
    const [registerUser, { isLoading, isError, isSuccess, reset }] = useSignupMutation()

    async function authRegister(data: RegisterUserType): Promise<MutationResultType> {
        // destructure properties
        const { firstname, lastname, phone, email, password, role } = data

        // Clear all errors and messages
        let message = ""
        let success = false;

        // Build Form Body
        const formBody = { name: `${firstname} ${lastname}`, email, password, "phone_num": phone, role }

        // make request
        try {
            const signUpResponse = await registerUser(formBody).unwrap();
            console.log(signUpResponse)
            success = true;
        } catch (error) {
            console.log(error);
            console.log(isError);
            console.log(getErrorMessage(error))
            message = (error as any)?.status == 409 ? "Account already exist!" : getErrorMessage(error);
            console.log(message);
        }

        return { success, message };
    }

    return { authRegister, isLoading, isError, isSuccess, reset };
}