// jshint esversion:6
import { useUpdateUserRoleMutation } from "@/app/services/admin/users"
import { MutationResultType } from "../../../data/global"
import { getErrorMessage } from "../../../utils/global"
import { UpdateUserRoleRequest } from "@/data/admin/users"

export const useUpdateUserRoleHook = () => {

    // Login mutation for both users and admin
    const [updayeInvoice, { isLoading, isError, isSuccess, reset }] = useUpdateUserRoleMutation()

    async function updateUserRole(roleData: UpdateUserRoleRequest): Promise<MutationResultType> {
        // Clear all errors and messages
        let message = ""
        let success = false;
        let data;

        // make request
        try {
            const response = await updayeInvoice(roleData).unwrap();
            data = response;
            success = true;
        } catch (error) {
            message = getErrorMessage(error);
        }

        return { success, message, data };
    }

    return { updateUserRole, isLoading, isError, isSuccess, reset };
}