// jshint esversion:6
import { useUpdateInvoiceStatusMutation } from "@/app/services/admin/invoice"
import { MutationResultType } from "../../../data/global"
import { getErrorMessage } from "../../../utils/global"

type InvoiceData = {
    invoiceId: string
}

export const useUpdateInvoiceStatusHook = () => {

    // Login mutation for both users and admin
    const [updateInvoice, { isLoading, isError, isSuccess, reset }] = useUpdateInvoiceStatusMutation()

    async function updateInvoiceStatus(invoiceData: InvoiceData): Promise<MutationResultType> {

        // Clear all errors and messages
        let message = ""
        let success = false;
        let data;

        // make request
        try {
            const response = await updateInvoice(invoiceData).unwrap();
            data = response;
            success = true;
        } catch (error) {
            message = getErrorMessage(error);
        }

        return { success, message, data };
    }

    return { updateInvoiceStatus, isLoading, isError, isSuccess, reset };
}