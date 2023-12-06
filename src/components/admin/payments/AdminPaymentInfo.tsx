// jshint esversion:6
import PaymentIcon from "@/assets/payments/payment.png"
import PaidInvoiceIcon from "@/assets/admin/Done.svg"
import { getFormattedDate } from "@/utils/global"
import { PaymentResponse } from "@/data/admin/payments"
import { PAYMENT_STATUS } from "@/data/admin/dashboard"
import { useLazyVerifyPaymentQuery } from "@/app/services/user/payments"
import { useState, useEffect } from "react"
import { Toast } from "@/components/global";
import { PaymentNotification } from "@/components/user/payments"
import { Modal } from "@/components/global"

type AdminInvoiceInfoProp = {
    paymentData: PaymentResponse
    closeModal: () => void
}

function getPaymentDate(date: Date) {
    const { day, monthShort, year } = getFormattedDate(new Date(date))
    return `${day} ${monthShort}, ${year}`
}


let timeoutId: any;

export const AdminPaymentInfo: React.FC<AdminInvoiceInfoProp> = ({ paymentData, closeModal }) => {

    // Verfy Transfer
    const [verifyPayment, { isLoading: isVerificationLoading }] = useLazyVerifyPaymentQuery()

    // Define Error message
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // Verification successful
    const [success, setSuccess] = useState<boolean>(false);

    // Clear timeout
    useEffect(() => {
        return () => {
            clearTimeout(timeoutId);
        }
    }, [])


    async function verifyBankDetail() {
        const response = await verifyPayment({ refId: paymentData.ref_id ?? "" });


        if (response?.data?.status == PAYMENT_STATUS.ERROR || response?.data?.status == PAYMENT_STATUS.FAILED) {
            setErrorMessage(response.data?.msg)
            return;
        }

        setSuccess(true);

        timeoutId = setTimeout(() => {
            setSuccess(false);
            closeModal();
        }, 3000)
    }

    return (
        <>
            <div className="w-[300px] py-5 bg-white flex flex-col items-center gap-y-5 rounded-lg sm:mx-[-1rem] my-[-1.5rem]">

                <h1 className="font-Inter-Bold text-lg">{paymentData.title ?? "Payment"}</h1>

                <div className="relative flex items-start">
                    <img src={PaymentIcon} className="w-[70px] h-[60px]" alt="invoice" />

                    {paymentData.status == PAYMENT_STATUS.PAID && (
                        <img src={PaidInvoiceIcon} alt="paid" />
                    )}
                </div>

                {/* Status */}
                <p
                    className={`${paymentData.status == PAYMENT_STATUS.PAID && 'text-green-700'} ${paymentData.status == PAYMENT_STATUS.PENDING && 'text-brandColor'} ${(paymentData.status == PAYMENT_STATUS.CANCELLED || (paymentData.status == PAYMENT_STATUS.ERROR || paymentData.status == PAYMENT_STATUS.FAILED)) && 'text-error'} self-end`}
                >
                    {paymentData.status == PAYMENT_STATUS.PAID && (
                        <span>Paid</span>
                    )}

                    {paymentData.status == PAYMENT_STATUS.PENDING && (
                        <span>Payment Pending</span>
                    )}

                    {paymentData.status == PAYMENT_STATUS.CANCELLED && (
                        <span>Payment Cancelled</span>
                    )}

                    {paymentData.status == PAYMENT_STATUS.ERROR && (
                        <span>Payment Error</span>
                    )}

                    {paymentData.status == PAYMENT_STATUS.FAILED && (
                        <span>Payment Failed</span>
                    )}

                    {paymentData.status == PAYMENT_STATUS.CHECKING && (
                        <span>Checking Payment</span>
                    )}
                </p>

                {/* Invoice details */}
                <div className="w-full border-t border-t-placeholder py-3 flex flex-col gap-y-1 mt-[-1rem] text-sm">

                    {/* Ref ID */}
                    <div className="flex flex-wrap justify-between">
                        <p className="text-placeholder">Invoice ID:</p>
                        <span className="text-black">{paymentData.invoice_id}</span>
                    </div>

                    {/* Ref ID */}
                    <div className="flex flex-wrap justify-between">
                        <p className="text-placeholder">Ref ID:</p>
                        <span className="text-black">{paymentData.ref_id}</span>
                    </div>

                    {/* Rave Ref ID */}
                    {/* {paymentData.rave_txRef &&
                        <div className="flex flex-wrap justify-between">
                            <p className="text-placeholder">Flutterwave Ref</p>
                            <span className="text-black">{paymentData.rave_txRef}</span>
                        </div>
                    } */}
                    <div className="flex flex-wrap justify-between">
                        <p className="text-placeholder">Flutterwave Ref</p>
                        <span className="text-black">{paymentData?.rave_txRef ?? "N/A"}</span>
                    </div>

                    {/* User */}
                    <div className=" flex flex-wrap justify-between">
                        <p className="text-placeholder">Payer Email:</p>
                        <span className="text-black">{paymentData.payer_email}</span>
                    </div>

                    {/* Amount At */}
                    {paymentData.status == PAYMENT_STATUS.PAID && (
                        <div className="flex justify-between">
                            <p className="text-placeholder">Amount:</p>
                            <span className="text-black">{Number((paymentData as PaymentResponse).amount).toLocaleString()}</span>
                        </div>
                    )}

                    {/* Created At */}
                    {paymentData.status == PAYMENT_STATUS.PAID && (
                        <div className=" flex justify-between">
                            <p className="text-placeholder">Paid At:</p>
                            {paymentData.paid_at != null ? (
                                <span className="text-black">{getPaymentDate((paymentData).paid_at)}</span>
                            ) : (
                                <span>N/A</span>
                            )}
                        </div>
                    )}

                    {/* Payment Type */}
                    <div className=" flex justify-between">
                        <p className="text-placeholder">Mode:</p>
                        <span className="text-black capitalize">{(paymentData as PaymentResponse)?.checkout_type}</span>
                    </div>
                </div>

                {paymentData.status == PAYMENT_STATUS.CHECKING && (
                    <button onClick={verifyBankDetail} className="w-max p-2 mt-[-1rem] text-white bg-brandColor text-center rounded">{isVerificationLoading ? "Verifying..." : "Verify Payment"}</button>
                )}
            </div >

            {/* Error message */}
            {
                errorMessage && (
                    <>
                        <Toast error desc={errorMessage ?? "An error occurred"} action={() => setErrorMessage(undefined)} />
                    </>
                )
            }

            {
                success && (
                    <>
                        <Toast desc={"Payment verified successful"} action={() => setErrorMessage(undefined)} />
                        <Modal closeModal={closeModal}>
                            <PaymentNotification buttonTitle="Close" action={closeModal} />
                        </Modal>
                    </>
                )
            }
        </>
    )
}