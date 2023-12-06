// jshint esversion:6
import LogoutIcon from "@/assets/global/signout.png";

type SignoutProps = {
    loading?: boolean
    next: () => void
    cancel?: () => void
}

export const Signout: React.FC<SignoutProps> = ({ next, loading, cancel }) => {

    function nextAction() {
        next();
    }

    return (
        <div className="w-[300px] sm:w-[340px] px-1 sm:px-6 flex flex-col gap-y-8 rounded border-[0px] mt-7">
            <div className="flex gap-x-4">
                <img src={LogoutIcon} alt="delete icon" className="w-[30px] h-[30px]" />
                <div className="flex flex-col items-center gap-y-1">
                    <h2 className="text-[#C93636] text-lg font-CabinetGrotesk-Bold">Sign Out</h2>
                    <p className="text-sm">Are you sure you want to sign out</p>
                </div>
            </div>


            <div className="flex justify-between">
                <button className="py-3 w-[140px] bg-[#C93636] rounded font-bold text-white" onClick={nextAction}>{loading ? "Loading" : "Yes"}</button>
                <button className="py-3 w-[140px] rounded border-[1px] font-bold" onClick={cancel}>No</button>
            </div>
        </div>
    );
}