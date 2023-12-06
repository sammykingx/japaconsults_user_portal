// jshint esversion:6
import successfulPayment from "@/assets/payments/success.svg";
import failPayment from "@/assets/payments/fail.svg";


type PaymentNotificationProp = {
    error?: boolean
    errorMessage?: string
    buttonTitle: string
    action: () => void
}

export const PaymentNotification: React.FC<PaymentNotificationProp> = ({ error, errorMessage, buttonTitle, action }) => {
    return (
        <>
            <div className="w-[250px] flex flex-col gap-y-5 items-center">
                <img className="w-[80px] h-[80px]" src={error ? failPayment : successfulPayment} alt="info" />

                <p className="font-Inter-Bold">{error ? "Payment failed" : "Payment Successful"}</p>

                {errorMessage && (
                    <p>{errorMessage}</p>
                )}

                <button onClick={action} className="w-[250px] mx-auto border py-2 rounded">{buttonTitle}</button>
            </div>

        </>
    )
}