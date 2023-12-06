// // jshint esversion:6
// import { useState, useEffect } from "react"
// import { useCardPaymentHook } from "./cardPaymentHook"

// type CardDetailsType = {
//     "cardno": string,
//     "cvv": string,
//     "expirymonth": string,
//     "expiryyear": string,
//     "pin": string
// }

// type VerifyDetail = {
//     ref_id: string,
//     otp: string
// }

// const formLength = 2;

// export const useCardPaymentFlowHook = () => {




//     // Define the Invoice ID
//     const [invoiceId, setInvoiceId] = useState<string | undefined>(undefined);

//     // Set the card payments
//     const [cardDetails, setCardDetails] = useState<CardDetailsType>({ cardno: "", cvv: '', expirymonth: '', expiryyear: '', pin: '' })

//     // Card Payment hook
//     const { cardTransferPay, isLoading, isError, isSuccess, reset } = useCardPaymentHook();

//     // Index of current rendered form
//     const [currentIndex, setCurrentIndex] = useState<number>(0);

//     // Last form ? Validate and submit.
//     const [lastForm, setLastForm] = useState<boolean | null>(null);

//     useEffect(() => {

//         // Don't fire on initial render
//         if (lastForm == null) return;

//         (async function () {
//             // try {
//             //     // Verify PIn 
//             //     await verifyPin({ pin: Number(transactionPin) }).unwrap();

//             //     // Verify User Bank Details
//             //     const verififyBankDetailsResponse = await verifyUserBankDetails({
//             //         bankCode: bankDetails.bankCode,
//             //         bankName: bankDetails.bankName,
//             //         accountNumber: bankDetails.accountNumber
//             //     }).unwrap();

//             //     setVerifiedBankDetails(verififyBankDetailsResponse.data?.accountDetails.firstname, verififyBankDetailsResponse.data?.accountDetails.lastname)

//             // } catch (error) {
//             //     // Could not add bank, add unverified bank
//             //     const errorData = getErrorMessage(error);
//             //     setErrorMessage(errorData);
//             //     setIsAddUnverifiedBankAvailable(true);
//             // }
//         })()
//     }, [lastForm])

//     function next() {
//         if (currentIndex == formLength - 1) {
//             // Just force a re-render to grab last state 
//             setLastForm((previousValue) => !previousValue);
//             return;
//         }

//         // Increment index to render next form
//         setCurrentIndex(currentIndex + 1);
//     }

//     return (
//         {
//             invoiceId,
//             setInvoiceId,
//             cardDetails,
//             setCardDetails,
//         }
//     )



// }