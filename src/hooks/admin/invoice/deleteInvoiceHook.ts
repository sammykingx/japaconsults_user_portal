// jshint esversion:6
import { useDeleteInvoiceMutation } from "@/app/services/admin/invoice/invoiceAPI"
import { MutationResultType } from "../../../data/global"
import { getErrorMessage } from "../../../utils/global"

type InvoiceData = {
    invoiceId: string
}

export const useDeleteInvoiceHook = () => {

    // Login mutation for both users and admin
    const [deleteInvoice, { isLoading, isError, isSuccess, reset }] = useDeleteInvoiceMutation()

    async function deleteUserInvoice(invoiceData: InvoiceData): Promise<MutationResultType> {

        // Clear all errors and messages
        let message = ""
        let success = false;
        let data;

        // make request
        try {
            const response = await deleteInvoice(invoiceData).unwrap();
            data = response;
            success = true;
        } catch (error) {
            message = getErrorMessage(error);
        }

        return { success, message, data };
    }

    return { deleteUserInvoice, isLoading, isError, isSuccess, reset };
}