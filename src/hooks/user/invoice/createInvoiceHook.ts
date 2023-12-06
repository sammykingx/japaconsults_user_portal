// // jshint esversion:6
import { useState } from "react"
import { INVOICE_TYPE } from "@/data/users/invoice"

export const useCreateInvoiceHook = () => {
    
    // Index of current rendered form
    const [currentIndex, setCurrentIndex] = useState(0);

    // Invoice type
    const [invoiceType, setInvoiceType] = useState<INVOICE_TYPE | undefined>(undefined);

    // Set Amount 
    const [amount, setAmount] = useState<string>()

    function setInvoice(invoice: INVOICE_TYPE) {
        setInvoiceType(invoice);
    }

    function next() {
        setCurrentIndex((prev) => (prev += 1));
    }

    function prev() {
        setCurrentIndex((prev) => (prev -= 1));
    }

    return {
        currentIndex,
        invoiceType,
        setInvoice,
        amount,
        setAmount,
        prev,
        next
    }
}