// jshint esversion:6

type DeleteConfirmationProps = {
    title: string,
    desc: string
    next: () => void
    cancel?: () => void
    reverse?: boolean
    isLoading?: boolean
    loadingTitle?: string
}

export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ title, desc, next, cancel, reverse, isLoading = false, loadingTitle = "" }) => {

    function nextAction() {
        next();
    }

    return (
        <div className="w-[300px] sm:w-[340px] px-1 sm:px-6 flex flex-col items-center gap-y-8 rounded border-[0px] mt-7">
            <div className="flex gap-x-4">
                {/* <img src={LogoutIcon} alt="delete icon" className="w-[30px] h-[30px]" /> */}
                <div className="flex flex-col items-center gap-y-1">
                    <h2 className={`${reverse ? "text-brandColor" : "text-[#C93636]"} text-lg font-CabinetGrotesk-Bold`}>{title}</h2>
                    <p className="text-sm">{desc}</p>
                </div>
            </div>


            <div className="flex justify-between shrink-0 w-full">
                <button className={`py-3 w-[140px] ${reverse ? "bg-brandColor" : "bg-[#C93636]"} rounded font-bold text-white`} onClick={nextAction}>{isLoading ? loadingTitle : "Yes"}</button>
                <button className="py-3 w-[140px] rounded border-[1px] font-bold" onClick={cancel}>No</button>
            </div>
        </div>
    );
}