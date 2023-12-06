import { useState } from "react"
import { Modal } from "@/components/global";
import { getFormattedDate } from ".";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

type DatePickerProps = {
    startDate: Date
    title: string
    setDate: (date: any) => void
}

export const DatePicker: React.FC<DatePickerProps> = ({ setDate, startDate, title }) => {
    // Modal to open start date picker
    const [isStartDateModalOpen, setIsStartDateModalOpen] = useState<boolean>(false);

    // Handle start select date click
    function handleSetStartDateClick(date: any) {

        // Set the start Date
        setDate(date)

        // Close the date modal
        setIsStartDateModalOpen(false);
    }

    function getFilterFormattedDate(date: Date) {
        const { year, day, monthShort } = getFormattedDate(date);
        return (`${day} ${monthShort}, ${year}`);
    }

    return (
        <>
            <div className="text-base">
                <div className="text-gray-600">
                    <div className="flex flex-col gap-y-1 font-CabinetGrotesk-Medium">
                        <p>{title}</p>
                        <div className="mt-2 bg-[#eec46b] h-[70px] w-[145px] rounded-md relative" onClick={() => setIsStartDateModalOpen(true)}>
                            <div className="absolute inset-0 flex justify-between items-center px-3 cursor-pointer" >
                                <span>{getFilterFormattedDate(startDate)}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* ***************** DATE MODAL ********************** */}
            {
                // Start Date Modal
                isStartDateModalOpen && (
                    <Modal closeModal={() => setIsStartDateModalOpen(false)}>
                        <DayPicker mode="single" captionLayout="dropdown-buttons" fromYear={1900} toYear={2050} selected={startDate} onDayClick={handleSetStartDateClick} />
                    </Modal>
                )
            }
        </>
    );
}