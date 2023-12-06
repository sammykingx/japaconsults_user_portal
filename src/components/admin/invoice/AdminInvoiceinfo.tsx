// jshint esversion:6
import { PaidInvoiceType } from "@/data/admin/invoice/invoice"
import InvoiceIcon from "@/assets/admin/Invoice.svg"
import PaidInvoiceIcon from "@/assets/admin/Done.svg"
import { getFormattedDate } from "@/utils/global"
import { FaRegEdit } from "react-icons/fa"
import { useState } from "react"
import { UpdateInvoiceStatus } from "."
import { Modal } from "@/components/global"
import { useAppSelector } from "@/hooks/typedHooks"
import { USERROLES } from "@/data/global/auth"
import { INVOICE_STATUS } from "@/data/admin/invoice/invoice"

type AdminInvoiceInfoProp = {
    invoice: PaidInvoiceType
    closeModal: () => void
}

export const AdminInvoiceInfo: React.FC<AdminInvoiceInfoProp> = ({ invoice, closeModal }) => {

    const [updateStatus, setUpdateStatus] = useState<boolean>(false);

    const { userProfile } = useAppSelector((state) => state.auth)

    // Due date
    const { day: dayCreated, monthShort: monthShortCreated, year: yearCreated } = getFormattedDate(new Date(invoice.created_at))
    const { day: dayUpdated, monthShort: monthShortUpdated, year: yearUpdated } = getFormattedDate(new Date(invoice.updated_at ?? new Date()))

    return (
        <div className="w-[340px] p-5 bg-white flex flex-col items-center gap-y-5 rounded-lg">
            <h1 className="font-Inter-Bold text-lg">{invoice.title}</h1>
            <div className="w-[50px] h-[60px] relative">
                <img src={InvoiceIcon} className="w-full h-full" alt="invoice" />

                {invoice.paid && (
                    <img src={PaidInvoiceIcon} className="absolute top-0 right-[-40px]" alt="paid" />
                )}
            </div>

            {/* Status */}
            <p
                className={`${invoice.paid ? 'text-green-700' : invoice.status == INVOICE_STATUS.EXPIRED ? 'text-error' : 'text-brandColor'} self-end`}
            >
                {invoice.paid ? "Paid" : (
                    <div className="flex gap-x-3 items-center">
                        {invoice.status == INVOICE_STATUS.EXPIRED ? (
                            <span>Expired</span>
                        ) : (
                            <>
                                <span>Pending</span>

                                {(userProfile?.role !== USERROLES.USER) && (
                                    <span onClick={() => setUpdateStatus(true)} className="text-placeholder cursor-pointer">
                                        <FaRegEdit />
                                    </span>
                                )}
                            </>
                        )}


                    </div>
                )}
            </p>

            {/* Invoice details */}
            <div className="w-full border-t border-t-placeholder py-3 flex flex-col gap-y-1 mt-[-1rem] text-sm">

                {/* User */}
                <div className=" flex justify-between">
                    <p className="text-placeholder">To:</p>
                    <span className="text-black">{invoice.to_email}</span>
                </div>

                {/* Created At */}
                <div className=" flex justify-between">
                    <p className="text-placeholder">Created At:</p>
                    <span className="text-black">{`${dayCreated} ${monthShortCreated}, ${yearCreated}`}</span>
                </div>

                {/* Created By */}
                <div className=" flex justify-between">
                    <p className="text-placeholder">Created by:</p>
                    <span className="text-black">{invoice.created_by}</span>
                </div>

                {/* Updated At */}
                {invoice.updated_at && (
                    <div className=" flex justify-between">
                        <p className="text-placeholder">Updated At:</p>
                        <span className="text-black">{`${dayUpdated} ${monthShortUpdated}, ${yearUpdated}`}</span>
                    </div>
                )}

                {/* Updated By */}
                {invoice.updated_by && (
                    <div className=" flex justify-between">
                        <p className="text-placeholder">Updated By:</p>
                        <span className="text-black">{invoice.updated_by ?? "N/A"}</span>
                    </div>
                )}

                {/* Desc */}
                <div className=" flex justify-between">
                    <p className="text-placeholder">Desc:</p>
                    <textarea disabled className="w-2/3 h-[70px] p-1 text-sm resize-none overflow-auto outline-none border text-right" value={invoice.desc}></textarea>
                </div>

            </div>

            {/* Update Invoice Sttaus */}
            {updateStatus && (
                <Modal bare closeModal={closeModal}>
                    <UpdateInvoiceStatus invoice={invoice} closeModal={closeModal} />
                </Modal>
            )}
        </div>
    )
}