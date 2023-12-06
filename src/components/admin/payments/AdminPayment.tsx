// jshint esversion:6
import { getFormattedDate } from "@/utils/global"
import { PaymentStatusColor } from "@/data/admin/invoice"
import { PaymentResponse } from "@/data/admin/payments"
import { PAYMENT_NAVIGATION } from "@/data/admin/payments"

type PaymentActivityProp = {
    data: PaymentResponse[]
    type: PAYMENT_NAVIGATION
    handlePaymentClick(payment: PaymentResponse): void
}

export const AdminPayment: React.FC<PaymentActivityProp> = ({ data, handlePaymentClick }) => {

    const { day, monthShort, year } = getFormattedDate(new Date())

    return (
        <>
            <>
                {/* Table */}
                <div className="w-full h-full mt-3 relative">
                    <table className="w-full border-spacing-1 table-fixed px-5 py-3">

                        {/* Table header */}
                        <thead>
                            <tr className="font-Inter-Bold [&>*]:p-2 [&>*]:py-4 pointer-events-none">
                                <th className="text-sm font-medium text-left w-[12%]">
                                    <span>Name</span>
                                </th>
                                <th className="text-sm font-medium text-left w-[9%]">
                                    <span>Invoice ID</span>
                                </th>
                                <th className="text-sm font-medium text-left w-[9%]">
                                    <span>Amount</span>
                                </th>
                                <th className="text-sm font-medium text-left w-[10%]">
                                    <span>Status</span>
                                </th>
                                <th className="text-sm font-medium text-left w-[10%]">
                                    <span>Date</span>
                                </th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y-[1px] font-Manrope-Regular">
                            {data
                                // .slice(11, 12)
                                .map((paymentData: PaymentResponse, index: number) => {

                                    return (

                                        // Trade Item Data
                                        <tr
                                            key={index}
                                            className="font-Manrope-Regular text-[15px] [&>*]:p-2 [&>*]:py-3 cursor-pointer"
                                            onClick={() => handlePaymentClick(paymentData)}
                                        >
                                            <td className={`w-full truncate capitalize`}>
                                                {paymentData.paid_by && (
                                                    <span>{`${((paymentData)?.paid_by ?? "N/A").toLowerCase()}`}</span>
                                                )}
                                            </td>

                                            <td className="w-full truncate capitalize">
                                                <span>{paymentData.invoice_id}</span>
                                            </td>

                                            <td className="w-full truncate text-[#AFAFAF]">
                                                {paymentData.amount && (
                                                    <div className="flex">
                                                        <span>&#8358;</span>
                                                        <span>{`${Number((paymentData as PaymentResponse).amount).toLocaleString() ?? "N / A"}`}</span>
                                                    </div>
                                                )}
                                            </td>

                                            <td className={`w-full truncate capitalize`}>
                                                <span
                                                    className="rounded-full py-1 px-3 flex gap-x-2 items-center w-max"
                                                    style={{
                                                        color: PaymentStatusColor[paymentData.status]?.color ?? "#333",
                                                        backgroundColor: PaymentStatusColor[paymentData.status]?.backgroundColor ?? "#fff"
                                                    }}
                                                >
                                                    <div className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: PaymentStatusColor[paymentData.status]?.color ?? "#333" }}></div>
                                                    {(paymentData.status).toLocaleLowerCase()}
                                                </span>
                                            </td>
                                            <td className="w-full truncate text-[#AFAFAF]">
                                                <span>{`${day} ${monthShort}, ${year}`}</span>
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div >
            </>
        </>
    )
}