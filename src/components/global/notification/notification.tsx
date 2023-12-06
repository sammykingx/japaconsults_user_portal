// jshint esversion:6
import { ReactElement } from "react"

type NotificationProps = {
    title: string,
    desc: ReactElement
    action: () => void
    buttonTitle: string
    error?: boolean
}

export const Notification: React.FC<NotificationProps> = ({ title, desc, action, buttonTitle, error }) => {
    return (
        <>
            {/* Information container */}
            <div className="w-[310px]">

                {/* information Details */}
                <div className="flex flex-col gap-y-2">
                    <h1 className={`font-CabinetGrotesk-Bold text-xl ${error ? "text-error" : "text-brandColor"} text-center`}>{title}</h1>

                    {/* description */}
                    <div className="font-Inter-Regular text-sm text-center">{desc}</div>
                </div>

                {/* CTA Button*/}
                <button
                    type="button"
                    onClick={action}
                    className={`h-[40px] px-12 mt-7 ${error ? "bg-error" : "bg-brandColor hover:bg-brandColor/90"}  text-white block w-full  font-Inter-Regular text-base text-center transition-colors duration-150  border border-transparent rounded  focus:outline-none focus:shadow-outline-blue`}
                >
                    {buttonTitle}
                </button>
            </div>
        </>
    )
}