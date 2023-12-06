// jshint esversion:6
import { INVOICE_TYPE } from "@/data/users/invoice"
import { ChangeEvent, useState, useEffect } from "react"

type SelectInvoiceProp = {
    invoiceType: INVOICE_TYPE | undefined
    setInvoice: (invoice: INVOICE_TYPE) => void
    next: () => void
}

export const SelectInvoice: React.FC<SelectInvoiceProp> = ({ invoiceType, setInvoice, next }) => {

    const [selectedInvoice, setSelectedInvoice] = useState<INVOICE_TYPE | undefined>(invoiceType);

    const [errorState, setErrorState] = useState<boolean>(false);

    // Clear error state
    useEffect(() => {
        if (selectedInvoice) {
            setErrorState(false);
        }
    }, [selectedInvoice])

    function submit() {
        if (!selectedInvoice) {
            setErrorState(true);
            return;
        }

        // Save selected invoice
        setInvoice(selectedInvoice);

        // Call next form
        next();
    }

    return (
        <>
            <h1 className="font-Inter-Bold sm:text-center text-2xl">Select Invoice Type</h1>

            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-9">
                <p className="text-placeholder font-Inter-Regular justify-self-end">Invoice Type:</p>

                <div className="flex flex-col gap-y-5">
                    {/* Select Invoice */}
                    <select
                        className={`bg-white border ${errorState ? "border-error" : "border-brandColor"} w-full sm:w-[280px] py-2 px-4 rounded`}
                        value={selectedInvoice}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            setSelectedInvoice(e.target.value as INVOICE_TYPE)
                        }}
                    >
                        <option value={undefined} selected className="text-placeholder">Select Invoice</option>
                        <option value={INVOICE_TYPE.SCHOOL_APPLICATION}>School Application</option>
                        <option value={INVOICE_TYPE.CURRICULUM_VITAE}>Curriculum Vitae</option>
                        <option value={INVOICE_TYPE.RESEARCH_PROPOSAL}>Research Proposal</option>
                        <option value={INVOICE_TYPE.STATEMENT_PURPOSE}>Statement of Purpose</option>
                    </select>

                    {/* Next Form */}
                    <button type="button" onClick={submit} className="font-Inter-Bold bg-brandColor text-white p-3 text-sm rounded w-max">Create Now</button>
                </div>
            </div>
        </>
    )
}