// // jshint esversion:6
// import { useBankTransferPayMutation } from "@/app/services/user/payments"
// import { MutationResultType } from "../../../data/global"
// import { getErrorMessage } from "../../../utils/global"

// type bankTransferPayProp = {
//     invoiceId: string
// }

// export const useBankTransferPayHook = () => {

//     // Login mutation for both users and admin
//     const [payBankTransfer, { isLoading, isError, isSuccess, reset }] = useBankTransferPayMutation()

//     async function bankTransferPay(fileData: bankTransferPayProp): Promise<MutationResultType> {
//         // Clear all errors and messages
//         let message = ""
//         let success = false;
//         let data;

//         // make request
//         try {
//             const uploadResponse = await payBankTransfer(fileData).unwrap();
//             data = uploadResponse;
//             success = true;
//         } catch (error) {
//             message = getErrorMessage(error);
//         }

//         return { success, message, data };
//     }

//     return { bankTransferPay, isLoading, isError, isSuccess, reset };
// }