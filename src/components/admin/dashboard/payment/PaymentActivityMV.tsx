// jshint esversion:6
import { getFormattedDate } from "@/utils/global"
import { PaymentStatusColor } from "@/data/admin/invoice"
import { PaymentResponse } from "@/data/admin/payments"

type PaymentActivityMVProp = {
    data: PaymentResponse[]
    handlePaymentClick(payment: PaymentResponse): void
}


export const PaymentActivityMV: React.FC<PaymentActivityMVProp> = ({ data, handlePaymentClick }) => {

    return (
        <div className="flex flex-col gap-y-2">
            {
                data.map((paymentData: PaymentResponse, index: number) => {

                    const { day, monthShort, year } = getFormattedDate(new Date())

                    return (
                        <div key={index}
                            className="bg-white p-4 px-5 rounded flex justify-between"
                            onClick={() => handlePaymentClick(paymentData)}
                        >
                            <div className="flex flex-col gap-y-1">

                                {/* Invoice number */}
                                <p className="text-placeholder text-sm">{paymentData.invoice_id}</p>

                                {/* Payer Name */}
                                <p className="font-Inter-Bold text-lg">
                                    <span className="capitalize">{`${((paymentData)?.paid_by ?? "<no name>").toLowerCase()}`}</span>
                                </p>

                                {/* Time */}
                                <p className="text-placeholder text-sm">{`Date: ${day} ${monthShort}, ${year}`}</p>
                            </div>

                            <div className="flex flex-col gap-y-1 items-end">

                                {/* Status */}
                                <p className="rounded flex justify-between items-center p-2 py-1 gap-x-3 text-sm" style={{
                                    color: PaymentStatusColor[paymentData.status]?.color ?? "#333",
                                    backgroundColor: PaymentStatusColor[paymentData.status]?.backgroundColor ?? "#fff"
                                }}>
                                    <div className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: PaymentStatusColor[paymentData.status]?.color ?? "#333" }}></div>
                                    <div className="capitalize">{(paymentData.status).toLocaleLowerCase()}</div>
                                </p>

                                {/* Amount */}
                                <p>
                                    <span>{`${Number((paymentData).amount).toLocaleString() ?? "N / A"}`}</span>
                                </p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}