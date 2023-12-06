// jshint esversion:6
import { INVOICE_TYPE } from "@/data/users/invoice"
import { useState, useEffect } from "react"
import { Modal } from "@/components/global"
import { SelectUserToSendInvoice } from "@/components/admin/invoice/SelectUserToSendInvoice"
import { UserType } from "@/data/admin/dashboard/dashboard"
import { getFormattedDate } from "@/utils/global"
import { FaRegEdit } from "react-icons/fa"
import { DatePicker } from "@/utils/global/DatePicker"
import { useUpdateInvoiceHook } from "@/hooks/admin/invoice"
import { Toast } from "@/components/global"
import { Notification } from "@/components/global"
// import { useNavigate } from "react-router-dom"
import { PaidInvoiceType } from "@/data/admin/invoice/invoice"

type SelectInvoiceProp = {
    invoiceType: INVOICE_TYPE | undefined
    invoice: PaidInvoiceType
    closeModal: () => void
}

type ErrorState = {
    title: boolean,
    amount: boolean,
    desc: boolean
}

let timeoutID: any;

export const UpdateInvoice: React.FC<SelectInvoiceProp> = ({ invoiceType, invoice, closeModal }) => {

    // const navigate = useNavigate()

    const [title, setTitle] = useState<string>(invoice.title ?? "");

    // Create invoice hook
    const { updateUserInvoice, isLoading: isUpdateInvoiceLoading, } = useUpdateInvoiceHook()

    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

    const [createInvoiceSuccess, setCreateInvoiceSuccess] = useState<boolean>(false);

    // State to hold amount
    const [enteredAmount, setEnteredAmount] = useState<number | undefined>(invoice.price);

    // Handle description
    const [desc, setDesc] = useState<string>(invoice.desc);

    // User to send invoice to
    const [selectedUser, setSelectedUser] = useState<UserType | undefined>(undefined)

    // Handle Date Selection
    const [date, setDate] = useState<Date>(new Date(invoice.due_date));

    // Modal to select date range
    const [isDatePickerOpen, setDatePickerOpen] = useState<boolean>(false);

    // All Users modal
    const [selectUserModal, setSelectUserModal] = useState<boolean>(false);

    // Form Error State
    const [errorState, setErrorState] = useState<ErrorState>({ title: false, amount: false, desc: false });

    // Clear error state
    useEffect(() => {
        if (title) {
            setErrorState((prev) => ({ ...prev, title: false }));
        }

        if (enteredAmount) {
            setErrorState((prev) => ({ ...prev, amount: false }));
        }

        if (selectedUser) {
            setErrorState((prev) => ({ ...prev, user: false }));
        }

        return () => {
            clearTimeout(timeoutID);
        }
    }, [enteredAmount, selectedUser])

    // Submit
    async function submit() {
        if (!enteredAmount || !desc || !title) {
            !title && setErrorState((prev) => ({ ...prev, title: true }));
            !enteredAmount && setErrorState((prev) => ({ ...prev, amount: true }));
            !desc && setErrorState((prev) => ({ ...prev, desc: true }));
            return;
        }

        const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${('0' + date.getDate()).slice(-2)}`

        // Update invoice request
        const response = await updateUserInvoice({
            title: (invoiceType as string),
            desc,
            due_date: formattedDate,
            price: Number(enteredAmount ?? 0),
            inv_id: invoice.inv_id
        });

        // Not successful
        if (!response.success) {
            // fail
            setErrorMessage(response.message);
            timeoutID = setTimeout(() => {
                setErrorMessage(undefined);
            }, 4000)
            return;
        }


        // Success  
        setCreateInvoiceSuccess(true);

        timeoutID = setTimeout(() => {
            setCreateInvoiceSuccess(false);
            close()
        }, 2000)
    }

    function getInvoiceDate(date: Date) {
        // Get the date
        const tradeDate = new Date(date);

        // Get formatted date
        const { year, month, day } = getFormattedDate(tradeDate);

        return (
            `${day} ${month}, ${year}`
        )
    }

    function close() {
        closeModal();
    }

    return (
        <div>
            <h1 className="font-Inter-Bold text-center text-2xl">Update Invoice</h1>

            <div className="flex justify-center gap-x-3 mt-5">
                <div className="w-[300px] sm:w-[400px] flex flex-col gap-y-5">

                    {/* Invoice Type */}
                    <div className="flex flex-col sm:flex-row gap-y-1 justify-between sm:items-center">
                        <label htmlFor="email">Title:</label>
                        <input type="text" className={`w-full sm:w-[280px] border ${errorState.amount && "border-error"} outline-none focus:border-brandColor rounded p-2 text-[#666666]`} value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    {/* Email Input */}
                    {/* <div className="flex flex-col sm:flex-row gap-y-1 justify-between sm:items-center">
                        <label htmlFor="email">User:</label>
                        <div onClick={() => setSelectUserModal(true)} className={`cursor-pointer w-full sm:w-[280px] border ${errorState.user && "border-error"} rounded p-2 text-[#666666] flex justify-between items-center`}>
                            <div>
                                {selectedUser == undefined ? (
                                    <span>Select User</span>
                                ) : (
                                    <span className="truncate">{selectedUser.name}</span>
                                )}
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                        </div>
                    </div> */}

                    {/* Invoice Type */}
                    {/* <div className="flex flex-col sm:flex-row gap-y-1 justify-between sm:items-center">
                        <label htmlFor="email">Invoice Type:</label>
                        <input type="text" className="w-full sm:w-[280px] border rounded p-2 text-[#666666]" value={invoiceType} disabled />
                    </div> */}

                    {/* Amount */}
                    <div className="flex flex-col sm:flex-row gap-y-1 justify-between sm:items-center">
                        <label htmlFor="email">Amount</label>
                        <input
                            type="tel"

                            // Ensure only digits from 1 to 9 is entered and nothing else
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
                            }}

                            // Set the Amount
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setEnteredAmount(Number(e.target.value));
                            }}

                            className={`w-full sm:w-[280px] border ${errorState.amount && "border-error"} outline-none focus:border-brandColor rounded p-2 text-[#666666]`} value={Number(enteredAmount ?? 0).toLocaleString()} />
                    </div>

                    {/* Due Date */}
                    <div className="flex flex-col sm:flex-row gap-y-1 justify-between sm:items-center">
                        <label htmlFor="email">Due Date</label>
                        <div className="relative w-full sm:w-[280px]">
                            <div onClick={() => setDatePickerOpen(true)} className="cursor-pointer w-full py-[0.8rem] font-Manrope-Regular text-base px-2 border-[1px] bg-inputFieldBg rounded-[6px] outline-none focus:border-brandColor">
                                {getInvoiceDate(date)}
                            </div>
                            <div className="absolute top-1/2 translate-y-[-50%] right-4 cursor-pointer">
                                <FaRegEdit />
                            </div>
                        </div>
                    </div>

                    {/* Invoice Type */}
                    <div className="flex flex-col sm:flex-row gap-y-1 justify-between sm:items-start">
                        <label htmlFor="email">Description</label>
                        <textarea
                            value={desc}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDesc(e.target.value)}
                            className={`w-full sm:w-[280px] leading-tight h-[100px] resize-none border ${errorState.desc && "border-error"} outline-none focus:border-brandColor rounded p-2 text-[#666666]`}
                        />
                    </div>

                    {/* Next Form */}
                    <div className="w-full flex justify-end gap-x-5 mt-2">
                        <button type="button" onClick={submit} className="font-Inter-Bold bg-brandColor text-white p-3 px-9 text-sm rounded w-max">{isUpdateInvoiceLoading ? "Updating..." : "Update"}</button>
                    </div>
                </div>
            </div>

            {/* Modal to select user */}
            {selectUserModal && (
                <Modal bare closeModal={() => setSelectUserModal(false)}>
                    <SelectUserToSendInvoice setUser={(user) => setSelectedUser(user)} closeModal={() => setSelectUserModal(false)} />
                </Modal>
            )}


            {/* Modal to select Date Input */}
            {isDatePickerOpen && (
                <Modal bare closeModal={() => setDatePickerOpen(false)}>
                    <div className="p-9">
                        <DatePicker
                            startDate={date}
                            setDate={setDate}
                            title="Select Due Date"
                        />
                    </div>
                </Modal>
            )}

            {/* Create Invoice success */}
            {createInvoiceSuccess && (
                <Modal closeModal={() => {
                    setCreateInvoiceSuccess(false)
                    close()
                }}>
                    <Notification title="Success" desc={<p>Invoice has been updated succesfully!</p>} buttonTitle="Close" action={close} />
                </Modal>
            )}


            {/* Create Invoice Successs */}
            {createInvoiceSuccess && (
                <Toast desc={"Invoice has been created!"} action={() => setCreateInvoiceSuccess(false)} />
            )}

            {/* Error creating invoice */}
            {errorMessage && (
                <Toast error desc={errorMessage ?? "An error occurred"} action={() => setErrorMessage(undefined)} />
            )}
        </div>
    )
}