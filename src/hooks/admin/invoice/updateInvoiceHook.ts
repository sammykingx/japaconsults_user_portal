// jshint esversion:6
import { useUpdateInvoiceMutation } from "@/app/services/admin/invoice"
import { MutationResultType } from "../../../data/global"
import { getErrorMessage } from "../../../utils/global"
import { UpdateInvoiceRequest } from "@/data/admin"

export const useUpdateInvoiceHook = () => {

    // Login mutation for both users and admin
    const [updayeInvoice, { isLoading, isError, isSuccess, reset }] = useUpdateInvoiceMutation()

    async function updateUserInvoice(invoiceData: UpdateInvoiceRequest): Promise<MutationResultType> {

        // Clear all errors and messages
        let message = ""
        let success = false;
        let data;

        // make request
        try {
            const response = await updayeInvoice(invoiceData).unwrap();
            data = response;
            success = true;
        } catch (error) {
            message = getErrorMessage(error);
        }

        return { success, message, data };
    }

    return { updateUserInvoice, isLoading, isError, isSuccess, reset };
}