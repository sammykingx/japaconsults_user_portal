// jshint esversion:6
import { Link } from "react-router-dom"
import PlusIcon from "@/assets/global/Plus.svg";
import { useGetAllInvoiceQuery } from "@/app/services/admin/invoice";
import { useGetPendingInvoiceQuery } from "@/app/services/admin/invoice";
import { useGetPaidInvoiceQuery, useGetExpiredInvoiceQuery } from "@/app/services/admin/invoice";
import { CSSProperties, useState } from "react";
import { BeatLoader } from "react-spinners";
import { INVOICE_NAVIGATION } from "@/data/global";
import { PaidInvoiceType } from "@/data/admin/invoice/invoice";
import { AdminInvoiceView, AdminInvoiceViewMV } from "@/components/admin/invoice";
import { useEffect } from "react";
import { ReceiptSVG } from "@/components/global/svg/invoice";
import { Modal } from "@/components/global";
import { AdminInvoiceInfo } from "@/components/admin/invoice";
import { useDeleteInvoiceHook } from "@/hooks/admin/invoice";
import { Toast } from "@/components/global";
import { DeleteConfirmation } from "@/components/admin/users";
import { UpdateInvoice } from "@/components/admin/invoice/UpdateInvoice";
import { INVOICE_TYPE } from "@/data/users/invoice";

const override: CSSProperties = {
    display: "inline-block",
    margin: "0 auto",
    borderColor: "red",
};

export type InvoiceInfotype = {
    status: boolean,
    data: PaidInvoiceType | undefined
}

let timeoutID: any;

let actionToExecute: () => void

export const AdminInvoicePage: React.FC = () => {

    // Error message
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const [updateInvoiceOpen, setUpdateInvoiceOpen] = useState<PaidInvoiceType | undefined>(undefined);

    // Consnt to delete file
    const [actionConsent, setActionConsent] = useState<boolean>(false);

    const { data: AllInvoiceData, isFetching: isAllInvoiceLoading } = useGetAllInvoiceQuery()
    const { data: PendingInvoiceData, isFetching: isPendingInvoiceLoading } = useGetPendingInvoiceQuery()
    const { data: PaidInvoiceData, isFetching: isPaidInvoiceLoading } = useGetPaidInvoiceQuery()
    const { data: ExpiredInvoiceData, isFetching: isExpiredInvoiceLoading } = useGetExpiredInvoiceQuery()

    // Delete Invoice
    const { deleteUserInvoice, isLoading: isDeleteInvoiceLoading } = useDeleteInvoiceHook();

    const [invoiceInfo, setInvoiceInfo] = useState<InvoiceInfotype>({ status: false, data: undefined });

    const [invoiceType, setInvoiceType] = useState<INVOICE_NAVIGATION>(INVOICE_NAVIGATION.ALL);

    const [invoiceData, setInvoiceData] = useState<PaidInvoiceType[]>([])

    useEffect(() => {
        return () => {
            clearTimeout(timeoutID);
        }
    }, [])

    // Fetch users 
    useEffect(() => {
        if (!invoiceType) {
            return;
        }

        (async function () {
            switch (invoiceType) {

                // Fetch All files in General
                case INVOICE_NAVIGATION.ALL: {
                    setInvoiceData(AllInvoiceData ?? []);
                    break;
                }
                case INVOICE_NAVIGATION.PAID: {
                    setInvoiceData(PaidInvoiceData ?? []);
                    break;
                }
                case INVOICE_NAVIGATION.PENDING: {
                    setInvoiceData(PendingInvoiceData ?? []);
                    break;
                }

                default:
                    break;
            }
        })()

    }, [invoiceType, AllInvoiceData, PendingInvoiceData, PaidInvoiceData])

    function handleInvoiceClick(data: InvoiceInfotype) {
        setInvoiceInfo((prev) => ({ ...prev, ...data }))
    }

    // Handle navigation click
    function handleNavigationClick(navigation: INVOICE_NAVIGATION) {
        switch (navigation) {
            case INVOICE_NAVIGATION.ALL: {
                if (AllInvoiceData) {
                    setInvoiceData(AllInvoiceData)
                }
                setInvoiceType(INVOICE_NAVIGATION.ALL)
                break;
            }
            case INVOICE_NAVIGATION.PENDING: {
                if (PendingInvoiceData) {
                    setInvoiceData(PendingInvoiceData)
                }
                setInvoiceType(INVOICE_NAVIGATION.PENDING)
                break;
            }
            case INVOICE_NAVIGATION.PAID: {
                if (PaidInvoiceData) {
                    setInvoiceData(PaidInvoiceData)
                }
                setInvoiceType(INVOICE_NAVIGATION.PAID)
                break;
            }
            case INVOICE_NAVIGATION.EXPIRED: {
                if (ExpiredInvoiceData) {
                    setInvoiceData(ExpiredInvoiceData)
                }
                setInvoiceType(INVOICE_NAVIGATION.EXPIRED)
                break;
            }
            default:
                if (AllInvoiceData) {
                    setInvoiceData(AllInvoiceData)
                }
                setInvoiceType(INVOICE_NAVIGATION.ALL)
                break;
        }
    }

    function handleUpdateInvoiceClick(invoice: PaidInvoiceType | undefined) {
        setUpdateInvoiceOpen(invoice);
    }

    async function handleInvoiceDeleteClick(invoiceId: string) {
        const response = await deleteUserInvoice({ invoiceId });

        if (!response.success) {
            setErrorMessage("Cannot perform operation!");
            timeoutID = setTimeout(() => {
                setErrorMessage(undefined);
            }, 3000)

            setActionConsent(false);
            return;
        }

        // Close modal
        setActionConsent(false);
    }

    function deleteInvoice(invoiceId: string) {
        actionToExecute = () => handleInvoiceDeleteClick(invoiceId);
        setActionConsent(true)
    }

    return (
        <div className="py-5">

            {/* Create Invoice */}
            <div className="w-[100px] h-[100px] bg-white flex items-center justify-center rounded-md border border-gray-200">
                <Link to={"create"} className="w-full h-full flex items-center justify-center">
                    <img src={PlusIcon} alt="Add note" />
                </Link>
            </div>
            <p className="font-Inter-Regular text-sm mt-2">Create Invoice</p>


            {/* Invoive Navigation */}
            <div className="flex [&>*]:flex-1 sm:[&>*]:flex-grow-[0] sm:[&>*]:basis-auto gap-x-3 justify-center sm:justify-start mt-5">
                <h3 onClick={() => handleNavigationClick(INVOICE_NAVIGATION.ALL)} className={`cursor-pointer w-max py-1 ${invoiceType == INVOICE_NAVIGATION.ALL && "border-b-[2px] border-brandColor"}`}>All Invoices</h3>
                <h3 onClick={() => handleNavigationClick(INVOICE_NAVIGATION.PAID)} className={`cursor-pointer w-max py-1 ${invoiceType == INVOICE_NAVIGATION.PAID && "border-b-[2px] border-brandColor"}`}>Paid Invoices</h3>
                <h3 onClick={() => handleNavigationClick(INVOICE_NAVIGATION.PENDING)} className={`cursor-pointer w-max py-1 ${invoiceType == INVOICE_NAVIGATION.PENDING && "border-b-[2px] border-brandColor"}`}>Pending Invoices</h3>
                <h3 onClick={() => handleNavigationClick(INVOICE_NAVIGATION.EXPIRED)} className={`cursor-pointer w-max py-1 ${invoiceType == INVOICE_NAVIGATION.EXPIRED && "border-b-[2px] border-brandColor"}`}>Expired Invoices</h3>
            </div>

            {/* Invoice Data Wrapper */}
            {(isAllInvoiceLoading || isPendingInvoiceLoading || isPaidInvoiceLoading || isExpiredInvoiceLoading) ? (
                <div className="w-full flex items-center justify-center">
                    <div className="my-[5rem] mx-auto">
                        <BeatLoader
                            color={"#E1AE3C"}
                            loading={true}
                            cssOverride={override}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </div>
            ) : (
                invoiceData.length == 0 ? (
                    <div className="h-[30vh] flex flex-col justify-center items-center gap-y-5">

                        {/* No file found Icon */}
                        <div className="text-placeholder">
                            <ReceiptSVG width={64} height={64} />
                        </div>

                        {/* No files found */}
                        <p className="flex items-center justify-center gap-x-2 text-placeholder text-xl">No Invoice Found</p>
                    </div>
                ) : (
                    <div>
                        <div className="sm:hidden">
                            <AdminInvoiceViewMV handleUpdateInvoiceClick={handleUpdateInvoiceClick} invoiceData={invoiceData} handleInvoiceClick={handleInvoiceClick} deleteInvoice={deleteInvoice} />
                        </div>
                        <div className="hidden sm:block">
                            <AdminInvoiceView handleUpdateInvoiceClick={handleUpdateInvoiceClick} invoiceData={invoiceData} handleInvoiceClick={handleInvoiceClick} deleteInvoice={deleteInvoice} />
                        </div>
                    </div>
                )
            )}

            {/* More Info about Invoice */}
            {invoiceInfo.status && invoiceInfo.data && (
                <Modal bare closeModal={() => setInvoiceInfo({ status: false, data: undefined })}>
                    <AdminInvoiceInfo closeModal={() => setInvoiceInfo({ status: false, data: undefined })} invoice={invoiceInfo.data} />
                </Modal>
            )}

            {updateInvoiceOpen && (
                <Modal closeModal={() => setUpdateInvoiceOpen(undefined)}>
                    <UpdateInvoice closeModal={() => setUpdateInvoiceOpen(undefined)} invoice={updateInvoiceOpen} invoiceType={updateInvoiceOpen.title as INVOICE_TYPE} />
                </Modal>
            )}

            {/* Error message */}
            {errorMessage && (
                <Toast error desc={errorMessage ?? "An error occurred"} action={() => setErrorMessage(undefined)} />
            )}

            {actionConsent && (
                <Modal closeModal={() => setActionConsent(false)}>
                    <DeleteConfirmation
                        title="Delete Invoice"
                        desc="Are you sure you want to delete this invoice?"
                        cancel={() => setActionConsent(false)}
                        next={() => {
                            actionToExecute()
                        }}
                        isLoading={isDeleteInvoiceLoading}
                        loadingTitle="Deleting..."
                    />
                </Modal>
            )}
        </div>
    )
}