// jshint esversion:6
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CardPaymentResponse } from "@/data/users/payments";
import { PaidInvoiceType } from "@/data/admin/invoice/invoice";
import { useVerifyCardPaymentHook } from "@/hooks/user/payment/verifyCardPaymentHook";
import { Toast } from "@/components/global";
import { PaymentNotification } from "@/components/user/payments";
import { Modal } from "@/components/global";

type VerifyDetail = {
    ref_id: string,
    otp: string
}

let timeoutId: any;

export const VerifyCardPaymentPage: React.FC = () => {

    // Define Error message
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const navigate = useNavigate()

    // Get State from Page
    const { state } = useLocation();

    // Verify Card details
    const invoice = (state?.invoice as PaidInvoiceType)

    const paymentData = (state?.paymentData as CardPaymentResponse)

    if (state == null || !invoice || !paymentData.ref_id || !paymentData.validationRequired) {
        return <Navigate to={"/invoice"} />
    }

    const [verifyDetail, setVerifyDetail] = useState<VerifyDetail>({ otp: "", ref_id: paymentData.ref_id })

    const { verifyCardTransfer, isLoading, isSuccess, } = useVerifyCardPaymentHook()

    useEffect(() => {
        return () => {
            clearTimeout(timeoutId);
        }
    }, [])

    async function verifyTransfer() {
        const response = await verifyCardTransfer({ ...verifyDetail });

        if (!response.success) {
            setErrorMessage(response.message);
            timeoutId = setTimeout(() => {
                setErrorMessage(undefined);
            }, 3000)
            return;
        }

        timeoutId = setTimeout(() => {
            navigate("/invoice");
        }, 4000)
    }

    return (
        <>
            <div className="pt-9 sm:pt-3">
                <div className="bg-white p-7 px-5 sm:p-9 rounded h-[85vh] overflow-scroll">

                    {/* Invoice details */}
                    <div className="flex flex-col gap-y-1">
                        <h1 className="text-xl font-Inter-Bold">{invoice.title}</h1>
                        <p>{`$${Number(invoice.price).toLocaleString()}`}</p>
                    </div>

                    <h1 className="text-lg text-center font-Inter-Bold mt-2">Enter OTP </h1>

                    {/* OTP */}
                    <div className="flex justify-center mt-5">
                        <input
                            placeholder="Enter your One Time Password OTP"

                            className="w-[350px] mx-auto border border-grey-300 rounded p-2 outline-none focus:border-brandColor" type="text" required

                            value={verifyDetail.otp}

                            maxLength={16}

                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVerifyDetail((prev) => ({ ...prev, otp: e.target.value }))}

                            // Ensure only digits from 1 to 9 is entered and nothing else
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/\s+/g, '');
                            }}
                        />
                    </div>

                    <div className="flex justify-center mt-5">
                        <button disabled={isSuccess} onClick={verifyTransfer} className="w-[250px] bg-brandColor font-Inter-Medium p-3 mt-3 text-white rounded">{isLoading ? "Verifying..." : "Pay"}</button>
                    </div>


                </div>
            </div>

            {errorMessage && (
                <Toast error desc={errorMessage ?? "An error occurred"} action={() => setErrorMessage(undefined)} />
            )}

            {errorMessage && (
                <>
                    <Toast error desc={errorMessage ?? "An error occurred"} action={() => setErrorMessage(undefined)} />
                    <Modal closeModal={() => setErrorMessage(undefined)}>
                        <PaymentNotification error errorMessage={errorMessage} buttonTitle="Close" action={() => setErrorMessage(undefined)} />
                    </Modal>
                </>
            )}

            {isSuccess && (
                <>
                    <Toast desc={"Payment successfully verified"} action={() => navigate("/invoice")} />
                    <Modal closeModal={() => navigate("/invoice")}>
                        <PaymentNotification buttonTitle="Close" action={() => navigate("/invoice")} />
                    </Modal>
                </>
            )}

        </>
    );
}