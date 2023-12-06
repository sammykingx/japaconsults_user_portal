// // jshint esversion:6
// import { useState, useEffect, CSSProperties } from "react"
// import { PaidInvoiceType } from "@/data/admin/invoice/invoice"
// import { Toast } from "@/components/global"
// // import { useNavigate } from "react-router-dom"
// import { useRaveCheckoutModalQuery } from "@/app/services/user/payments"
// import { BeatLoader } from "react-spinners"
// import { ReceiptSVG } from "@/components/global/svg/invoice"
// import { getErrorMessage } from "@/utils/global"

// type CardTransferPayProp = {
//     invoice: PaidInvoiceType
// }

// let timeoutId: any;

// const override: CSSProperties = {
//     display: "inline-block",
//     margin: "0 auto",
//     borderColor: "red",
// };

// export const CardTransferPay: React.FC<CardTransferPayProp> = ({ invoice }) => {

//     // const navigate = useNavigate();

//     const { data: raveData, isFetching: isRaveCheckoutLoading, isError: isRaveCheckoutError, error: raveCheckoutError } = useRaveCheckoutModalQuery({ invoiceId: invoice.inv_id });

//     console.log(raveData)

//     // payment successful
//     // const [paymentSuccessful, setPaymentSuccessful] = 

//     // Define Error message
//     const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);


//     useEffect(() => {
//         return () => {
//             clearTimeout(timeoutId);
//         }
//     }, [])

//     if (isRaveCheckoutLoading) {
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

//     if (isRaveCheckoutError) {
//         return (
//             <div className="h-[30vh] flex flex-col justify-center items-center gap-y-5">

//                 {/* No file found Icon */}
//                 <div className="text-error">
//                     <ReceiptSVG width={64} height={64} />
//                 </div>

//                 {/* No files found */}
//                 <p className="flex items-center justify-center gap-x-2 text-placeholder text-xl">{getErrorMessage(raveCheckoutError)}</p>
//             </div>
//         )
//     }

//     return (
//         <div className="w-[300px] sm:w-[320px] mx-auto">

//             <div className="flex flex-col gap-y-3">
//                 <p className="font-Inter-Regular">Click to pay with Flutterwave</p>

//                 <div className="bg-brandColor font-Inter-Medium text-white text-center cursor-pointer w-[300px] mx-auto">
//                     <a className="block py-3 w-full h-full" href={raveData?.link ?? "/invoice/pay"} rel="noopener noreferrer">
//                         Pay Now
//                     </a>
//                 </div>
//             </div>

//             {errorMessage && (
//                 <Toast error desc={errorMessage ?? "An error occurred"} action={() => setErrorMessage(undefined)} />
//             )}
//         </div>
//     )
// }