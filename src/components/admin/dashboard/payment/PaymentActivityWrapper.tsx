// jshint esversion:6
// import { PAYMENT_STATUS } from "@/data/admin/dashboard"
// import { PaymentActivityType } from "@/data/admin/invoice"
import { PaymentActivity, PaymentActivityMV } from "."
import { useGetAllPaymentsQuery } from "@/app/services/admin/payments"
import { ReceiptSVG } from "@/components/global/svg/invoice"
import { CSSProperties, useState } from "react";
import { BeatLoader } from "react-spinners";
import { AdminPaymentInfo } from "../../payments";
import { Modal } from "@/components/global";
import { PaymentResponse } from "@/data/admin/payments";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/hooks/typedHooks";
import { USERROLES } from "@/data/global/auth";

const override: CSSProperties = {
    display: "inline-block",
    margin: "0 auto",
    borderColor: "red",
};

export const PaymentActivityWrapper: React.FC = () => {

    // user profile
    const { userProfile } = useAppSelector((state) => state.auth);

    // Fetching list of users
    const { data: allPaymentsData, isFetching: isAllPaymentsLoading } = useGetAllPaymentsQuery(undefined, { refetchOnMountOrArgChange: true });

    // Payment Info data
    const [paymentInfoData, setPaymentInfoData] = useState<PaymentResponse | null>(null)

    // handle payment click
    function handlePaymentClick(payment: PaymentResponse) {
        setPaymentInfoData(payment);
    }

    return (
        <div>
            {/* Table Header */}
            <div className="flex justify-between font-CabinetGrotesk-Bold text-lg mb-3">
                <h4>Payment Activity</h4>
                {(allPaymentsData && allPaymentsData.length > 0) && (
                    <Link to={`${userProfile?.role == USERROLES.USER ? "/payments" : "/admin/payments"}`} className="bg-brandColor text-white px-2 py-1 rounded">View more</Link>
                )}
            </div>

            {/* Users Wrapper */}
            {(isAllPaymentsLoading) ? (
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
                    {!allPaymentsData || allPaymentsData.length == 0 ? (
                        <div className="h-[30vh] flex flex-col justify-center items-center gap-y-5">

                            {/* No file found Icon */}
                            <div className="text-placeholder">
                                <ReceiptSVG width={64} height={64} />
                            </div>

                            {/* No files found */}
                            <p className="flex items-center justify-center gap-x-2 text-placeholder text-xl">No Payments Received</p>
                        </div>
                    ) : (
                        <div>
                            <div className="hidden sm:block">
                                <PaymentActivity data={allPaymentsData?.slice(0, 5)} handlePaymentClick={handlePaymentClick} />
                            </div>
                            <div className="sm:hidden">
                                <PaymentActivityMV data={allPaymentsData?.slice(0, 5)} handlePaymentClick={handlePaymentClick} />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {
                paymentInfoData && (
                    <Modal closeModal={() => setPaymentInfoData(null)}>
                        <AdminPaymentInfo paymentData={paymentInfoData} closeModal={() => setPaymentInfoData(null)} />
                    </Modal>
                )
            }
        </div >
    )
}