// jshint esversion:6
import { getFormattedDate } from "@/utils/global"
import { PaymentStatusColor } from "@/data/admin/invoice"
import { PaymentResponse } from "@/data/admin/payments"
import { PAYMENT_NAVIGATION } from "@/data/admin/payments"


type PaymentActivityMVProp = {
    data: PaymentResponse[]
    type: PAYMENT_NAVIGATION
    handlePaymentClick(payment: PaymentResponse): void
}

export const AdminPaymentMV: React.FC<PaymentActivityMVProp> = ({ data, handlePaymentClick }) => {

    return (
        <div className="flex flex-col gap-y-2 divide-y divide-gray-300">
            {
                data.map((paymentData: PaymentResponse, index: number) => {

                    const { day, monthShort, year } = getFormattedDate(new Date())

                    return (
                        <div key={index} className="py-4 flex justify-between" onClick={() => handlePaymentClick(paymentData)}>
                            <div className="flex flex-col gap-y-1">

                                {/* Invoice number */}
                                <p className="text-placeholder text-sm">{paymentData.invoice_id}</p>

                                {/* Payer Name */}
                                {paymentData.paid_by ? (
                                    <p className="font-Inter-Bold text-lg capitalize">
                                        <span>{`${(paymentData.paid_by).toLowerCase()}`}</span>
                                    </p>
                                ) : (
                                    <p className="font-Inter-Bold text-sm">
                                        <span>{`${(paymentData.payer_email).toLowerCase()}`}</span>
                                    </p>
                                )}

                                {/* Time */}
                                <p className="text-placeholder text-sm">{`Date: ${day} ${monthShort}, ${year}`}</p>
                            </div>

                            <div className="flex flex-col gap-y-1 items-end">

                                {/* Status */}
                                <p className="rounded flex justify-between items-center p-2 py-1 gap-x-2 text-sm" style={{
                                    color: PaymentStatusColor[paymentData.status]?.color ?? "#333",
                                    backgroundColor: PaymentStatusColor[paymentData.status]?.backgroundColor ?? "#fff"
                                }}>
                                    <div className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: PaymentStatusColor[paymentData.status]?.color ?? "#333" }}></div>
                                    <div className="capitalize">{(paymentData.status).toLocaleLowerCase()}</div>
                                </p>

                                {/* Amount */}
                                <p>
                                    {paymentData.amount && (
                                        <div className="flex">
                                            <span>&#8358;</span>
                                            <span>{`${Number((paymentData).amount).toLocaleString() ?? "N / A"}`}</span>
                                        </div>
                                    )}
                                </p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}