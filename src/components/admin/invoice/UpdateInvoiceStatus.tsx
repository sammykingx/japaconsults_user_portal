// jshint esversion:6
import { PaidInvoiceType } from "@/data/admin/invoice/invoice"
import { useState, useEffect, ChangeEvent } from "react"
import { useUpdateInvoiceStatusHook } from "@/hooks/admin/invoice/updateInvoiceStatusHook"
import { Toast } from "@/components/global"


type UpdateInvoiceStatusProp = {
    invoice: PaidInvoiceType
    closeModal: () => void
}

enum INVOICE_STATUS {
    PAID = "PAID",
    PENDING = "PENDING"
}

let timeoutID: any;


export const UpdateInvoiceStatus: React.FC<UpdateInvoiceStatusProp> = ({ invoice, closeModal }) => {

    // Error message
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // Verification successful
    const [success, setSuccess] = useState<boolean>(false);

    // Update invoice status
    const { updateInvoiceStatus, isLoading, } = useUpdateInvoiceStatusHook();

    // Set the invoice status
    const [newStatus, setNewStatus] = useState<INVOICE_STATUS | undefined>(invoice.paid ? INVOICE_STATUS.PAID : INVOICE_STATUS.PENDING);

    // Clear timeout when component unmounts
    useEffect(() => {
        return () => {
            clearTimeout(timeoutID);
        }
    }, [])


    async function update() {
        const response = await updateInvoiceStatus({ invoiceId: invoice.inv_id });

        if (!response.success) {
            setErrorMessage(response.message);
            timeoutID = setTimeout(() => {
                setErrorMessage(undefined);
            }, 3000)
            return;
        }
        // Success changing the role
        setSuccess(true);

        // timeout
        timeoutID = setTimeout(() => {
            setSuccess(false);
            closeModal();
        }, 2000)
    }

    return (
        <div className="p-5 py-7 px-9 bg-white rounded-lg">
            {/* Error message */}
            {/* {errorMessage && <p className="text-error text-sm text-center py-3">{errorMessage}</p>} */}

            {/* Update Invoice Status */}
            <div className="flex gap-x-2 items-center">
                <p>Update Status to: </p>

                <select
                    name="folder"
                    value={newStatus}
                    className="p-2 bg-white border border-brandColor rounded cursor-pointer"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        setNewStatus(e.target.value as INVOICE_STATUS)
                    }}
                >
                    <option value={INVOICE_STATUS.PAID} disabled={invoice.paid}>Paid</option>
                    <option value={INVOICE_STATUS.PENDING} disabled={!invoice.paid}>Pending</option>
                </select>

            </div>

            {/* CTA Button*/}
            <button
                type="button"
                onClick={update}
                disabled={newStatus == INVOICE_STATUS.PENDING}
                className={`h-[40px] px-12 mt-5 ${errorMessage ? "bg-error" : "bg-brandColor hover:bg-brandColor/90"}  text-white block w-full  font-Inter-Regular text-base text-center transition-colors duration-150  border border-transparent rounded  focus:outline-none focus:shadow-outline-blue`}
            >
                {isLoading ? "Updating..." : "Update"}
            </button>

            {/* Toast message to inform user */}
            {
                errorMessage && (
                    <Toast error desc={errorMessage ?? "An error occurred"} action={() => setErrorMessage(undefined)} />
                )
            }
            {
                success && (
                    <>
                        <Toast desc={"Invoice status has been updated!"} action={() => {
                            setSuccess(false);
                            closeModal();
                        }} />
                    </>
                )
            }
        </div>
    )
}