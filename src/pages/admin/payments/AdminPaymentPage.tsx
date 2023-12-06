// jshitn esversion:6
import { PAYMENT_NAVIGATION } from "@/data/admin/payments"
import { useState, ChangeEvent, useEffect, CSSProperties } from "react"
import { PaymentResponse } from "@/data/admin/payments";
import { useLazyGetAllPaymentsQuery, useLazyGetPendingPaymentsQuery, useLazyGetCancelledPaymentsQuery, useLazyGetPaidPaymentsQuery, useLazyGetErrorPaymentsQuery, useLazyGetFailedPaymentsQuery } from "@/app/services/admin/payments";
import { getErrorMessage } from "@/utils/global";
import { Toast } from "@/components/global";
import { ReceiptSVG } from "@/components/global/svg/invoice";
import { BeatLoader } from "react-spinners";
import { AdminPayment, AdminPaymentMV, AdminPaymentInfo } from "@/components/admin/payments";
import { Modal } from "@/components/global";
import { PAYMENT_STATUS } from "@/data/admin/dashboard";

let timeoutID: any;

const override: CSSProperties = {
    display: "inline-block",
    margin: "0 auto",
    borderColor: "red",
};

export const AdminPaymentPage: React.FC = () => {

    // Error message
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // Selected Users
    const [selectedPayment, setSelectedPayment] = useState<PAYMENT_NAVIGATION>(PAYMENT_NAVIGATION.ALL);

    // Fetching list of users
    const [getAllPayments, { isFetching: isAllPaymentsLoading }] = useLazyGetAllPaymentsQuery()
    const [getPendingPayments, { isFetching: isPendingPaymentsLoading }] = useLazyGetPendingPaymentsQuery()
    const [getPaidPayments, { isFetching: isPaidPaymentsLoading }] = useLazyGetPaidPaymentsQuery()
    const [getCancelledPayments, { isFetching: isCancelledPaymentsLoading }] = useLazyGetCancelledPaymentsQuery()
    const [getFailedPayments, { isFetching: isFailedPaymentsLoading }] = useLazyGetFailedPaymentsQuery()
    const [getErrorPayments, { isFetching: isErrorPaymentsLoading }] = useLazyGetErrorPaymentsQuery()

    // List to hold selected users
    const [paymentList, setPaymentList] = useState<PaymentResponse[]>([]);


    // Payment Info data
    const [paymentInfoData, setPaymentInfoData] = useState<PaymentResponse | null>(null)

    // Fetch users 
    useEffect(() => {
        if (!selectedPayment) {
            return;
        }

        (async function () {
            switch (selectedPayment) {
                // Fetch All Payments
                case PAYMENT_NAVIGATION.ALL: {
                    try {
                        const data = await getAllPayments().unwrap();
                        setPaymentList(data);
                    } catch (error) {
                        setPaymentList([]);
                        setErrorMessage(getErrorMessage(error));
                        timeoutID = setTimeout(() => {
                            setErrorMessage(undefined);
                        }, 2000)
                    }
                    break;
                }
                // Fetch pending payments
                case PAYMENT_NAVIGATION.PENDING: {
                    try {
                        const data = await getPendingPayments().unwrap();
                        setPaymentList(data.filter((payment) => {
                            return payment.status == PAYMENT_STATUS.PENDING
                        }));
                    } catch (error) {
                        setPaymentList([]);
                        setErrorMessage(getErrorMessage(error));
                        timeoutID = setTimeout(() => {
                            setErrorMessage(undefined);
                        }, 2000)
                    }
                    break;
                }

                // Fetch paid payments
                case PAYMENT_NAVIGATION.PAID: {
                    try {
                        const data = await getPaidPayments().unwrap();
                        setPaymentList(data.filter((payment) => {
                            return payment.status == PAYMENT_STATUS.PAID
                        }));
                    } catch (error) {
                        setPaymentList([]);
                        setErrorMessage(getErrorMessage(error));
                        timeoutID = setTimeout(() => {
                            setErrorMessage(undefined);
                        }, 2000)
                    }
                    break;
                }

                // Fetch cancelled payments
                case PAYMENT_NAVIGATION.CANCELLED: {
                    try {
                        const data = await getCancelledPayments().unwrap();
                        setPaymentList(data.filter((payment) => {
                            return payment.status == PAYMENT_STATUS.CANCELLED
                        }));
                    } catch (error) {
                        setPaymentList([]);
                        setErrorMessage(getErrorMessage(error));
                        timeoutID = setTimeout(() => {
                            setErrorMessage(undefined);
                        }, 2000)
                    }
                    break;
                }

                // Fetch failed payments
                case PAYMENT_NAVIGATION.FAILED: {
                    try {
                        const data = await getFailedPayments().unwrap();
                        setPaymentList(data.filter((payment) => {
                            return payment.status == PAYMENT_STATUS.FAILED
                        }));
                    } catch (error) {
                        setPaymentList([]);
                        setErrorMessage(getErrorMessage(error));
                        timeoutID = setTimeout(() => {
                            setErrorMessage(undefined);
                        }, 2000)
                    }
                    break;
                }
                // Fetch cancelled payments
                case PAYMENT_NAVIGATION.ERROR: {
                    try {
                        const data = await getErrorPayments().unwrap();
                        setPaymentList(data.filter((payment) => {
                            return payment.status == PAYMENT_STATUS.ERROR
                        }));
                    } catch (error) {
                        setPaymentList([]);
                        setErrorMessage(getErrorMessage(error));
                        timeoutID = setTimeout(() => {
                            setErrorMessage(undefined);
                        }, 2000)
                    }
                    break;
                }
                default:
                    break;
            }
        })()

        return () => {
            clearTimeout(timeoutID);
        }

    }, [selectedPayment])

    function handleNavigationClick(payment: PAYMENT_NAVIGATION) {
        setSelectedPayment(payment);
    }

    function handlePaymentClick(payment: PaymentResponse) {
        setPaymentInfoData(payment);
    }

    return (

        <div className="py-5">
            {/* Payment Navigation */}
            <div className="flex flex-col gap-y-5 items-center mt-5">
                <h1 className="font-Inter-Bold text-2xl">View Payments</h1>
                <div>
                    <select
                        name="folder"
                        className="p-2 bg-white border border-brandColor rounded cursor-pointer mx-auto outline-none"
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            handleNavigationClick(e.target.value as PAYMENT_NAVIGATION)
                        }}
                    >
                        <option value={PAYMENT_NAVIGATION.ALL} >All Payments</option>
                        <option value={PAYMENT_NAVIGATION.PENDING} >Pending Payments</option>
                        <option value={PAYMENT_NAVIGATION.PAID} >Paid Payments</option>
                        <option value={PAYMENT_NAVIGATION.CANCELLED} >Cancelled Payments</option>
                        <option value={PAYMENT_NAVIGATION.FAILED} >Failed Payments</option>
                        <option value={PAYMENT_NAVIGATION.ERROR} >Error Payments</option>
                    </select>
                </div>
            </div>

            {/* Users Wrapper */}
            {(isAllPaymentsLoading || isPendingPaymentsLoading || isCancelledPaymentsLoading || isPaidPaymentsLoading || isFailedPaymentsLoading || isErrorPaymentsLoading) ? (
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

                <div className="mt-5">
                    {paymentList.length == 0 ? (
                        <div className="h-[30vh] flex flex-col justify-center items-center gap-y-5">

                            {/* No file found Icon */}
                            <div className="text-placeholder">
                                <ReceiptSVG width={64} height={64} />
                            </div>

                            {/* No files found */}
                            <p className="flex items-center justify-center gap-x-2 text-placeholder text-xl">No Payments Found</p>
                        </div>
                    ) : (
                        <div>
                            <div className="hidden sm:block">
                                <AdminPayment data={paymentList} type={selectedPayment} handlePaymentClick={handlePaymentClick} />
                            </div>
                            <div className="sm:hidden">
                                <AdminPaymentMV data={paymentList} type={selectedPayment} handlePaymentClick={handlePaymentClick} />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {
                errorMessage && (
                    <Toast error desc={errorMessage ?? "An error occurred"} action={() => setErrorMessage(undefined)} />
                )
            }

            {
                paymentInfoData && (
                    <Modal closeModal={() => setPaymentInfoData(null)}>
                        <AdminPaymentInfo paymentData={paymentInfoData} closeModal={() => setPaymentInfoData(null)} />
                    </Modal>
                )
            }
        </div>
    )
}