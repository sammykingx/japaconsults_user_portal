// jshint esversion:6
import { INVOICE_STATUS, PaidInvoiceType } from "@/data/admin/invoice/invoice"
import { getFormattedDate } from "@/utils/global"
import { InvoiceInfotype } from "@/pages/admin/invoices/AdminInvoicePage"
import { useAppSelector } from "@/hooks/typedHooks"
import { USERROLES } from "@/data/global/auth"
import { useNavigate } from "react-router-dom"
import { TrashSVG } from "@/components/global/svg/trash"
import { EditSVG } from "@/components/global/svg/invoice"

type InvoiceView = {
    invoiceData: PaidInvoiceType[]
    handleInvoiceClick: (data: InvoiceInfotype) => void
    handleUpdateInvoiceClick?: (invoice: PaidInvoiceType | undefined) => void
    deleteInvoice?: (invoiceId: string) => void
}

export const AdminInvoiceViewMV: React.FC<InvoiceView> = ({ invoiceData, handleInvoiceClick, handleUpdateInvoiceClick, deleteInvoice }) => {

    const { userProfile } = useAppSelector((state) => state.auth);

    const navigate = useNavigate();

    return (
        <>
            <div className="flex flex-col gap-y-5 mt-5 divide-y [&>*:first-child]:pt-0 cursor-pointer">
                {invoiceData
                    .map((invoice: PaidInvoiceType, index: number) => {

                        // Due date
                        const { day: dayDue, monthShort: monthShortDue, year: yearDue } = getFormattedDate(new Date(invoice.due_date))

                        return (
                            <div key={index} className="pt-5" onClick={() => handleInvoiceClick({ status: true, data: invoice })}>

                                {/* Invoice info */}
                                <div className="font-Inter-Regular">
                                    <div className="w-full flex justify-between items-center">
                                        <p className="font-Inter-Bold">{invoice.title}</p>
                                        {<span
                                            className={`${invoice.paid ? 'text-green-700' : invoice.status == INVOICE_STATUS.EXPIRED ? 'text-error' : 'text-brandColor'} self-end`}
                                        >
                                            {invoice.paid ? "Paid" : invoice.status == INVOICE_STATUS.EXPIRED ? 'Expired' : "Pending"}
                                        </span>}
                                    </div>
                                    <div className="mt-1 flex flex-col gap-y-1">
                                        <p className="text-sm flex gap-x-2">
                                            <span>To:</span>
                                            <span className="text-placeholder">{invoice.to_email}</span>
                                        </p>
                                        <p className="text-sm flex gap-x-2">
                                            <span>Due:</span>
                                            <span className="text-placeholder">{`${dayDue} ${monthShortDue}, ${yearDue}`}</span>
                                        </p>
                                        <p className="text-sm flex gap-x-2">
                                            <span>Amount:</span>
                                            <span className="">{Number(invoice.price).toLocaleString()}</span>
                                        </p>

                                        {/* Pay now */}
                                        {userProfile?.role == USERROLES.USER && invoice.status != INVOICE_STATUS.EXPIRED &&
                                            invoice.paid == false && (
                                                <div className="w-full text-right truncate text-[#AFAFAF]">
                                                    <button onClick={() => navigate("pay", { state: { invoice } })} className="px-2 py-1 text-white bg-brandColor rounded">Pay now</button>
                                                </div>
                                            )}

                                        {/* Trash icon */}
                                        {(userProfile?.role == USERROLES.ADMIN || userProfile?.role == USERROLES.MANAGER) && deleteInvoice && (
                                            <div className="flex gap-x-3">
                                                <div className="w-max truncate flex items-center gap-x-2 justify-ensd text-error mt-1" onClick={(e: any) => {
                                                    // Stop propagation
                                                    e.stopPropagation();
                                                    deleteInvoice(invoice.inv_id)
                                                }}>
                                                    <TrashSVG />
                                                    <span>Delete</span>
                                                </div>

                                                {!invoice.paid && (
                                                    <div className="w-max truncate flex items-center gap-x-2 justify-ensd text-brandColor mt-1" onClick={(e: any) => {
                                                        // Stop propagation
                                                        e.stopPropagation();
                                                        handleUpdateInvoiceClick?.(invoice);
                                                    }}>
                                                        <EditSVG />
                                                        <span>Update</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        )
                    })}
            </div>
        </>
    )
}