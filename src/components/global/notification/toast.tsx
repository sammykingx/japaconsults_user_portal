// jshint esversion:6
import { IoIosCheckmark } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";


type ToastProp = {
    error?: boolean
    desc: string
    action: () => void
}

export const Toast: React.FC<ToastProp> = ({ error, desc, action }) => {
    return (
        <>
            <div
                onClick={action}
                className={`h-[50px] w-[90vw]  max-w-[400px] py-[1rem] fixed top-[4.6rem] right-5 transition-all ${error ? "bg-error" : "bg-[#1CBF74]"} text-white text-sm rounded-md flex gap-x-4 items-center justify-between px-4`}>

                {/* Check mark icon */}
                <div className="p-[1px] bg-white rounded-full">
                    <IoIosCheckmark size={16} className={`${error ? "text-error" : "text-green-700"}`} />
                </div>

                <p>{desc}</p>

                {/* Close ICON */}
                <div className="h-full border-l-[1px] pl-4 border-l-white flex items-center cursor-pointer">
                    <RxCross1 size={13} />
                </div>
            </div>
        </>
    )
}