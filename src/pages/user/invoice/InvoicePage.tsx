// jshint esversion:6
import { CSSProperties, ChangeEvent } from "react";
import { PaidInvoiceType } from "@/data/admin/invoice/invoice";
import { useGetPaidInvoiceQuery, useGetPendingInvoiceQuery, useGetAllInvoiceQuery, useGetExpiredInvoiceQuery } from "@/app/services/admin/invoice";
import { useEffect, useState } from "react";
import { INVOICE_NAVIGATION } from "@/data/global";
import { BeatLoader } from "react-spinners";
import { ReceiptSVG } from "@/components/global/svg/invoice";
import { AdminInvoiceView, AdminInvoiceViewMV } from "@/components/admin/invoice";
import { Modal } from "@/components/global";
import { AdminInvoiceInfo } from "@/components/admin/invoice";

const override: CSSProperties = {
    display: "inline-block",
    margin: "0 auto",
    borderColor: "red",
};

export type InvoiceInfotype = {
    status: boolean,
    data: PaidInvoiceType | undefined
}

export const InvoicePage: React.FC = () => {

    const { data: AllInvoiceData, isLoading: isAllInvoiceLoading } = useGetAllInvoiceQuery(undefined, { refetchOnMountOrArgChange: true })
    const { data: PendingInvoiceData, isLoading: isPendingInvoiceLoading } = useGetPendingInvoiceQuery(undefined, { refetchOnMountOrArgChange: true })
    const { data: PaidInvoiceData, isLoading: isPaidInvoiceLoading } = useGetPaidInvoiceQuery(undefined, { refetchOnMountOrArgChange: true })
    const { data: ExpiredInvoiceData, isLoading: isExpiredInvoiceLoading } = useGetExpiredInvoiceQuery(undefined, { refetchOnMountOrArgChange: true })

    const [invoiceInfo, setInvoiceInfo] = useState<InvoiceInfotype>({ status: false, data: undefined });
    const [invoiceType, setInvoiceType] = useState<INVOICE_NAVIGATION>(INVOICE_NAVIGATION.ALL);
    const [invoiceData, setInvoiceData] = useState<PaidInvoiceType[]>([])

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
                case INVOICE_NAVIGATION.EXPIRED: {
                    setInvoiceData(ExpiredInvoiceData ?? []);
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


    return (
        <div>

            {/* Invoive Navigation */}
            <div className="flex flex-col gap-y-5 items-center mt-5">
                <h1 className="font-Inter-Bold text-2xl">Invoice Payment</h1>

                <select
                    name="folder"
                    className="p-2 bg-white border text-brandColor border-brandColor rounded cursor-pointer mx-auto"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        handleNavigationClick(e.target.value as INVOICE_NAVIGATION)
                    }}
                >
                    <option value={INVOICE_NAVIGATION.ALL} >All Invoices</option>
                    <option value={INVOICE_NAVIGATION.PENDING} >Pending Invoices</option>
                    <option value={INVOICE_NAVIGATION.PAID} >Paid Invoices</option>
                    <option value={INVOICE_NAVIGATION.EXPIRED} >Expired Invoices</option>
                </select>

                {/* <div className="hidden sm:block"> */}
                {/* <h3 onClick={() => handleNavigationClick(INVOICE_NAVIGATION.ALL)} className={`hidden sm:block cursor-pointer w-max py-1 ${invoiceType == INVOICE_NAVIGATION.ALL && "border-b-[2px] border-brandColor"}`}>All Invoices</h3>
                <h3 onClick={() => handleNavigationClick(INVOICE_NAVIGATION.PAID)} className={`hidden sm:block cursor-pointer w-max py-1 ${invoiceType == INVOICE_NAVIGATION.PAID && "border-b-[2px] border-brandColor"}`}>Paid Invoices</h3>
                <h3 onClick={() => handleNavigationClick(INVOICE_NAVIGATION.PENDING)} className={`hidden sm:block cursor-pointer w-max py-1 ${invoiceType == INVOICE_NAVIGATION.PENDING && "border-b-[2px] border-brandColor"}`}>Pending Invoices</h3> */}
                {/* </div> */}
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
                            <AdminInvoiceViewMV invoiceData={invoiceData} handleInvoiceClick={handleInvoiceClick} />
                        </div>
                        <div className="hidden sm:block">
                            <AdminInvoiceView invoiceData={invoiceData} handleInvoiceClick={handleInvoiceClick} />
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
        </div>
    )
}