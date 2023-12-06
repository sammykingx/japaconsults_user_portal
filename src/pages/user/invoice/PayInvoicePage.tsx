// jshint esversion:6
import { useLocation } from "react-router-dom"
import { Navigate } from "react-router-dom";
import { useState, CSSProperties, useEffect } from "react";
import bankDarkIcon from "@/assets/payments/bankDark.svg";
import flutterWaveIcon from "@/assets/payments/flutterwave.png"
import { PaidInvoiceType } from "@/data/admin/invoice/invoice";
import { FaAngleRight } from "react-icons/fa6";
import { useLazyRaveCheckoutModalQuery } from "@/app/services/user/payments";
import { Toast } from "@/components/global";
import { BeatLoader } from "react-spinners";
import { getErrorMessage } from "@/utils/global";
import { Link } from "react-router-dom";

const override: CSSProperties = {
    display: "inline-block",
    margin: "0 auto",
    borderColor: "red",
};

let timeoutId: any;

let link: HTMLAnchorElement;

export const PayInvoicePage: React.FC = () => {
    // Get State from Page
    const { state } = useLocation();

    const invoice = (state?.invoice as PaidInvoiceType)

    // Define Error message
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    if (state == null || !invoice) {
        return <Navigate to={"/invoice"} />
    }

    const [trigger, result,] = useLazyRaveCheckoutModalQuery();

    useEffect(() => {
        return () => {
            if (link) {
                document.body.removeChild(link);
            }
            clearTimeout(timeoutId);
        }
    }, [])


    async function handleRaveClick() {
        const response = await trigger({ invoiceId: invoice.inv_id });

        if (response.isError) {
            setErrorMessage(getErrorMessage(response.error));
            timeoutId = setTimeout(() => {
                setErrorMessage(undefined);
            }, 3000)
            return;
        }


        // Fetch link
        const fileLink = response.data?.link ?? "#";

        // Create link element
        link = document.createElement("a");

        // Set the href attribute
        link.href = fileLink;

        // Open Link in the same window
        link.target = "_self";

        // Append child to body
        document.body.appendChild(link);

        link.click();
    }


    return (
        <>
            <div className="pt-9 sm:pt-3">
                <div className="bg-[#f7f5f5] p-7 pt-2 px-5 sm:p-9 mx-[-15px] rounded h-[85vh] overflow-scroll">
                    {/* Invoice details */}
                    <div className="flex flex-col gap-y-1">
                        <h1 className="text-xl font-Inter-Bold">{invoice.title}</h1>

                        <div className="flex">
                            <span>&#8358;</span>
                            <p>{`${Number(invoice.price).toLocaleString()}`}</p>
                        </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-y-3">

                        {/* Flutter wave payment */}
                        <div onClick={handleRaveClick} className="flex items-center gap-x-4 h-[60px] bg-white shadow py-2 px-3 rounded cursor-pointer transition-all ease-in-out hover:scale-[1.001]">
                            <img className="w-[40px] h-[40px]" src={flutterWaveIcon} alt="" />
                            <p className="text-lg">Pay with Flutterwave</p>
                            <div className="ml-auto">
                                {result.isLoading ? (
                                    <div className="mt-2">
                                        <BeatLoader
                                            color={"#E1AE3C"}
                                            loading={true}
                                            cssOverride={override}
                                            size={10}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    </div>
                                ) : (
                                    <FaAngleRight />
                                )}
                            </div>
                        </div>

                        {/* Flutter wave payment */}
                        <Link to={"bank"} state={{ invoice }} className="flex items-center gap-x-4 h-[60px] bg-white shadow py-2 px-3 rounded cursor-pointer transition-all ease-in-out hover:scale-[1.001]">
                            <div className="p-2">
                                <img className="w-[25px] h-[25px]" src={bankDarkIcon} alt="" />
                            </div>
                            <p className="text-lg">Bank Transfer</p>
                            <div className="ml-auto">
                                <FaAngleRight />
                            </div>
                        </Link>

                    </div>
                </div>
            </div>

            {errorMessage && (
                <Toast error desc={errorMessage ?? "An error occurred"} action={() => setErrorMessage(undefined)} />
            )}
        </>
    )
}