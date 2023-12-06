// // jshint esversin:6
// import { useLazyBankTransferPayQuery } from "@/app/services/user/payments";
// import { CSSProperties, useEffect, useState } from "react";
// import { BeatLoader } from "react-spinners";
// import { BankTransferPaymentResponse } from "@/data/users/payments";
// import { ReceiptSVG } from "@/components/global/svg/invoice";
// import { PaidInvoiceType } from "@/data/admin/invoice/invoice";
// import copyIcon from "@/assets/payments/copyIcon.svg";
// import { convertMsToTime } from "@/utils/global";
// import { useLazyVerifyTransferQuery } from "@/app/services/user/payments";
// import { Toast } from "@/components/global";
// import { getErrorMessage } from "@/utils/global";
// import { PaymentNotification } from ".";
// import { Modal } from "@/components/global";
// import { useNavigate } from "react-router-dom";

// type BankTransferPayProp = {
//     invoice: PaidInvoiceType
// }

// const override: CSSProperties = {
//     display: "inline-block",
//     margin: "0 auto",
//     borderColor: "red",
// };

// let timeoutId: any;

// let copytimeout: any;

// export const BankTransferPay: React.FC<BankTransferPayProp> = ({ invoice }) => {

//     const invoiceId = invoice.inv_id;

//     const navigate = useNavigate()

//     const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

//     const [bankDetails, setBankDetails] = useState<BankTransferPaymentResponse | undefined>(undefined);

//     // Copy message
//     const [copiedMessage, setCopiedMessage] = useState<null | boolean>(null)

//     // Verfy Transfer
//     const [verifyTransfer, { isLoading: isVerificationLoading, isSuccess: isVerifyTransferSuccess }] = useLazyVerifyTransferQuery()

//     const [bankTransferPay, { isLoading, isError }] = useLazyBankTransferPayQuery();

//     useEffect(() => {
//         (async function () {
//             try {
//                 const response = await bankTransferPay({ invoiceId }).unwrap();
//                 // Success
//                 setBankDetails(response as BankTransferPaymentResponse);
//             } catch (error) {
//                 setErrorMessage(getErrorMessage(error));
//             }
//         })()

//         return () => {
//             clearTimeout(timeoutId);
//         }
//     }, [])

//     if (isLoading) {
//         return (
//             <div className="w-full flex items-center justify-center">
//                 <div className="my-[5rem] mx-auto">
//                     <BeatLoader
//                         color={"#E1AE3C"}
//                         loading={true}
//                         cssOverride={override}
//                         size={20}
//                         aria-label="Loading Spinner"
//                         data-testid="loader"
//                     />
//                 </div>
//             </div>
//         )
//     }

//     if (isError) {
//         return (
//             <div className="h-[30vh] flex flex-col justify-center items-center gap-y-5">

//                 {/* No file found Icon */}
//                 <div className="text-error">
//                     <ReceiptSVG width={64} height={64} />
//                 </div>

//                 {/* No files found */}
//                 <p className="flex items-center justify-center gap-x-2 text-placeholder text-xl">{errorMessage}</p>
//             </div>
//         )
//     }

//     async function verifyUserTransfer() {
//         try {
//             await verifyTransfer({ refId: bankDetails?.ref_id ?? "" }).unwrap();
//         } catch (error) {

//             setErrorMessage(getErrorMessage(error));

//             timeoutId = setTimeout(() => (
//                 setErrorMessage(undefined)
//             ), 3000)
//         }
//     }

//     // Copt transaction ID to clip board
//     const handleCopyId = async () => {
//         // Clear any previous tiemout set
//         clearTimeout(copytimeout);

//         // Copy text to clipboard
//         navigator.clipboard
//             .writeText(bankDetails?.bank_account ?? "")
//             .then(() => {
//                 // Success copy indication
//                 setCopiedMessage(true);
//             })
//             .catch(() => {
//                 // Success copy indication
//                 setCopiedMessage(false);
//             }).finally(() => {
//                 // Revert icon
//                 copytimeout = setTimeout(() => {
//                     setCopiedMessage(null);
//                 }, 2000);
//             });
//     };

//     return (
//         <>
//             <div className="w-[280px] sm:w-[350px] bg-[#F6F6F6] mx-auto p-6 flex flex-col gap-y-4 rounded-md">
//                 <div>
//                     <h2 className="text-xs font-Inter-Regular">Bank Name</h2>
//                     <p className="font-Inter-Bold text-lg">{bankDetails?.bank_name ?? "No Bank name"}</p>
//                 </div>
//                 <div>
//                     <h2 className="text-xs font-Inter-Regular">Account Number</h2>
//                     <div className="flex justify-between">
//                         <p className="font-Inter-Bold text-lg">{bankDetails?.bank_account ?? "No acct"}</p>
//                         {
//                             copiedMessage ? (
//                                 <span>Copied</span>
//                             ) : (
//                                 <img className="cursor-pointer" onClick={handleCopyId} src={copyIcon} alt="copy" />
//                             )
//                         }
//                     </div>
//                 </div>
//                 <div>
//                     <h2 className="text-xs font-Inter-Regular">Amount</h2>
//                     <p className="font-Inter-Bold text-lg">{Number(bankDetails?.transfer_amount).toLocaleString()}</p>
//                 </div>
//             </div>

//             <div className="flex flex-col items-center gap-y-5">
//                 {/* Expiry */}
//                 <div className="text-center mt-3">
//                     <p>Expires in <span className="text-brandColor">{convertMsToTime(new Date(bankDetails?.expires_in ?? new Date()).getMilliseconds() ?? 1699487109095)}</span> </p>
//                 </div>

//                 {/* Button confirmation */}
//                 <button onClick={verifyUserTransfer} className="w-[300px] rounded border border-brandColor py-2 px-9 text-brandColor">{isVerificationLoading ? "Verifying..." : "I’ve made the transfer"}</button>
//             </div>


//             {/* Error message */}
//             {errorMessage && (
//                 <>
//                     <Toast error desc={errorMessage ?? "An error occurred"} action={() => setErrorMessage(undefined)} />
//                     <Modal closeModal={() => setErrorMessage(undefined)}>
//                         <PaymentNotification error errorMessage={errorMessage} buttonTitle="Close" action={() => setErrorMessage(undefined)} />
//                     </Modal>
//                 </>
//             )}

//             {isVerifyTransferSuccess && (
//                 <Modal closeModal={() => navigate("/invoice")}>
//                     <PaymentNotification buttonTitle="Close" action={() => navigate("/invoice")} />
//                 </Modal>
//             )}
//         </>
//     )
// }