// jshint esversion:6
import { SelectInvoice, EnterInvoiceDetails } from "@/components/user/invoice"
import { useCreateInvoiceHook } from "@/hooks/user/invoice"

export const CreateInvoicePage: React.FC = () => {

    // Create invoice props
    const { currentIndex, invoiceType, setInvoice, amount, setAmount, next, prev } = useCreateInvoiceHook();

    // Hold multi form to display
    const multiForms = [
        <SelectInvoice invoiceType={invoiceType} setInvoice={setInvoice} next={next} />,
        <EnterInvoiceDetails next={next} invoiceType={invoiceType} amount={amount} setAmount={setAmount} prev={prev} />
    ]


    return (
        <>
            <div className="pt-9 sm:pt-3">
                <div className="bg-white p-7 px-5 sm:p-9 rounded h-[85vh] overflow-scroll">

                    {/* Render multi form */}
                    {multiForms[currentIndex]}

                </div>
            </div>
        </>
    )
}