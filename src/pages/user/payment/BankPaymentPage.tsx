// jshint esversion:6
import { Modal } from "@/components/global";
import { useNavigate } from "react-router-dom";
import { PaymentNotification } from "@/components/user/payments";
import { CSSProperties } from "react";
import { BeatLoader } from "react-spinners";
import copyIcon from "@/assets/payments/copyIcon.svg";
import { PaidInvoiceType } from "@/data/admin/invoice/invoice";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useBankTransferPayQuery } from "@/app/services/user/payments";
import { ReceiptSVG } from "@/components/global/svg/invoice";
import { useLazyVerifyPaymentQuery } from "@/app/services/user/payments";
import { Toast } from "@/components/global";
import { convertMsToTime } from "@/utils/global";
import { Navigate } from "react-router-dom";
import { getErrorMessage } from "@/utils/global";
import { PAYMENT_STATUS } from "@/data/admin/dashboard";

const override: CSSProperties = {
    display: "inline-block",
    margin: "0 auto",
    borderColor: "red",
};

let copytimeout: any;

export const BankPaymentPage: React.FC = () => {
    // GET Navigator
    const navigate = useNavigate();

    // Define Error message
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // Copy message
    const [copiedMessage, setCopiedMessage] = useState<null | boolean>(null)

    // Get State from Page
    const { state } = useLocation();

    const invoice = (state?.invoice as PaidInvoiceType)

    if (state == null || !invoice) {
        return <Navigate to={"/invoice/pay"} />;
    }

    const { data: bankDetails, isFetching: isBankDetailsLoading, isError: isBankDetailsError, error: bankDetailsError } = useBankTransferPayQuery({ invoiceId: invoice.inv_id });

    // Verfy Transfer
    const [verifyPayment, { isLoading: isVerificationLoading }] = useLazyVerifyPaymentQuery()

    const [success, setSuccess] = useState<boolean>(false);

    // Payment verification loading
    if (isBankDetailsLoading) {
        return (
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

                <p className="mt-2 text-center font-Inter-Regular"> Fetching Bank details...</p>
            </div>
        )
    }


    if (isBankDetailsError) {
        return (
            <div className="h-[30vh] flex flex-col justify-center items-center gap-y-5">

                {/* No file found Icon */}
                <div className="text-error">
                    <ReceiptSVG width={64} height={64} />
                </div>

                {/* No files found */}
                <p className="flex items-center justify-center gap-x-2 text-placeholder text-xl">{getErrorMessage(bankDetailsError)}</p>
            </div>
        )
    }

    // Copt transaction ID to clip board
    const handleCopyId = async () => {
        // Clear any previous tiemout set
        clearTimeout(copytimeout);

        // Copy text to clipboard
        navigator.clipboard
            .writeText(bankDetails?.bank_account ?? "")
            .then(() => {
                // Success copy indication
                setCopiedMessage(true);
            })
            .catch(() => {
                // Success copy indication
                setCopiedMessage(false);
            }).finally(() => {
                // Revert icon
                copytimeout = setTimeout(() => {
                    setCopiedMessage(null);
                }, 2000);
            });
    };

    async function verifyBankDetail() {
        const response = await verifyPayment({ refId: bankDetails?.ref_id ?? "" });

        if (response?.data?.status == PAYMENT_STATUS.ERROR || response?.data?.status == PAYMENT_STATUS.FAILED) {
            setErrorMessage(response.data?.msg)
            return;
        }

        setSuccess(true);
    }

    return (
        <>
            {/* Invoice details */}
            <div className="flex flex-col gap-y-1 mt-5">
                <h1 className="text-xl font-Inter-Bold">{invoice.title}</h1>

                <div className="flex">
                    <span>&#8358;</span>
                    <p>{`${Number(invoice.price).toLocaleString()}`}</p>
                </div>
            </div>

            <div className="w-[280px] sm:w-[350px] bg-[#F6F6F6] mx-auto p-6 flex flex-col gap-y-4 rounded-md">
                <div>
                    <h2 className="text-xs font-Inter-Regular">Bank Name</h2>
                    <p className="font-Inter-Bold text-lg">{bankDetails?.bank_name ?? "No Bank name"}</p>
                </div>
                <div>
                    <h2 className="text-xs font-Inter-Regular">Account Number</h2>
                    <div className="flex justify-between">
                        <p className="font-Inter-Bold text-lg">{bankDetails?.bank_account ?? "No acct"}</p>
                        {
                            copiedMessage ? (
                                <span>Copied</span>
                            ) : (
                                <img className="cursor-pointer" onClick={handleCopyId} src={copyIcon} alt="copy" />
                            )
                        }
                    </div>
                </div>
                <div>
                    <h2 className="text-xs font-Inter-Regular">Amount</h2>
                    <p className="font-Inter-Bold text-lg">{Number(bankDetails?.transfer_amount).toLocaleString()}</p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-y-5">
                {/* Expiry */}
                <div className="text-center mt-3">
                    <p>Expires in <span className="text-brandColor">{convertMsToTime(new Date(bankDetails?.expires_in ?? new Date()).getTime() ?? 1699487109095)}</span> </p>
                </div>

                {/* Button confirmation */}
                <button onClick={verifyBankDetail} className="w-[300px] rounded border border-brandColor py-2 px-9 text-brandColor">{isVerificationLoading ? "Verifying..." : "I’ve made the transfer"}</button>
            </div>


            {/* Error message */}
            {errorMessage && (
                <>
                    <Toast error desc={errorMessage ?? "An error occurred"} action={() => setErrorMessage(undefined)} />
                    <Modal closeModal={() => setErrorMessage(undefined)}>
                        <PaymentNotification error errorMessage={errorMessage ?? "An error occurred. Please try again"} buttonTitle="Close" action={() => setErrorMessage(undefined)} />
                    </Modal>
                </>
            )}

            {success && (
                <Modal closeModal={() => navigate("/invoice")}>
                    <PaymentNotification buttonTitle="Close" action={() => navigate("/invoice")} />
                </Modal>
            )}
        </>
    )
}