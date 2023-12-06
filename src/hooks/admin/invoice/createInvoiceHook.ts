// jshint esversion:6
import { useCreateInvoiceMutation } from "@/app/services/admin/invoice"
import { MutationResultType } from "../../../data/global"
import { getErrorMessage } from "../../../utils/global"

type InvoiceData = {
    "desc": string,
    "due_date": Date | string,
    "price": number,
    "title": string,
    "to_email": string
}

export const useCreateInvoiceHook = () => {

    // Login mutation for both users and admin
    const [createInvoice, { isLoading, isError, isSuccess, reset }] = useCreateInvoiceMutation()

    async function createUserInvoice(invoiceData: InvoiceData): Promise<MutationResultType> {

        // Clear all errors and messages
        let message = ""
        let success = false;
        let data;

        // make request
        try {
            const response = await createInvoice(invoiceData).unwrap();
            data = response;
            success = true;
        } catch (error) {
            message = getErrorMessage(error);
        }

        return { success, message, data };
    }

    return { createUserInvoice, isLoading, isError, isSuccess, reset };
}