// jshint esversion:6
import { Modal } from "@/components/global";
import { useNavigate } from "react-router-dom";
import { PaymentNotification } from "@/components/user/payments";
import { PAYMENT_STATUS } from "@/data/admin/dashboard";
import { useRavePaymentCallbackQuery } from "@/app/services/user/payments";
import { CSSProperties } from "react";
import { BeatLoader } from "react-spinners";
import { getErrorMessage } from "@/utils/global";

const override: CSSProperties = {
    display: "inline-block",
    margin: "0 auto",
    borderColor: "red",
};

export const CallBackPage: React.FC = () => {
    // GET Navigator
    const navigate = useNavigate();

    const queryParameters = new URLSearchParams(window.location.search)

    // Fetch query parameters
    const status = queryParameters.get("status");
    const ref_id = queryParameters.get("tx_ref");
    const transaction_id = queryParameters.get("transaction_id");

    const { data: paymentData, isLoading: isPaymentDataLoading, isError: isPaymentDataError, error: paymentDataError } = useRavePaymentCallbackQuery({ tx_ref: ref_id ?? "", tx_status: status ?? "false", transaction_id: transaction_id ?? 0 })

    // Payment verification loading
    if (isPaymentDataLoading) {
        <div>
            <div className="w-full flex items-center justify-center mt-[5rem]">
                <div className="mt-[5rem] mx-auto">
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

            <p className="mt-2 text-center font-Inter-Regular"> We are currently processing your payment...</p>
        </div>
    }

    // Payment successful
    if (paymentData?.status == PAYMENT_STATUS.COMPLETED) {
        return (
            <Modal closeModal={() => navigate("/invoice")}>
                <PaymentNotification buttonTitle="Close" action={() => navigate("/invoice")} />
            </Modal>
        )
    }


    // Cancelled Payment status
    if (paymentData?.status == PAYMENT_STATUS.CANCELLED) {
        return (
            <Modal closeModal={() => navigate("/invoice")}>
                <PaymentNotification error errorMessage="You cancelled your payment" buttonTitle="Close" action={() => navigate("/invoice")} />
            </Modal>
        )
    }

    // Failed Payment status
    if (paymentData?.status == PAYMENT_STATUS.FAILED) {
        return (
            <Modal closeModal={() => navigate("/invoice")}>
                <PaymentNotification error errorMessage={isPaymentDataError ? getErrorMessage(paymentDataError) : "Your payment was not successful."} buttonTitle="Close" action={() => navigate("/invoice")} />
            </Modal>
        )
    }

    return (
        <>
            <Modal closeModal={() => navigate("/invoice")}>
                <PaymentNotification error errorMessage="Your payment could not be processed at this time." buttonTitle="Close" action={() => navigate("/invoice")} />
            </Modal>
        </>
    )
}