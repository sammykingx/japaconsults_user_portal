// jshint esversion:6
import AllManagersIcon from "@/assets/admin/AllManagers.svg";
import BackArrow from "@/assets/admin/BackArrow.svg";

type AllAdminsOverviewBoxProp = {
    active: boolean;
}

export const AllManagersOverviewBox: React.FC<AllAdminsOverviewBoxProp> = ({ active }) => {

    return (
        <>
            <div className={`w-[250px] rounded-xl bg-[#68EE76]/30 p-4 border ${active && "border border-brandColor"}`}>

                {/* Icon */}
                <div className="w-[30px] h-[30px] flex items-center justify-center rounded-lg bg-white">
                    <img src={AllManagersIcon} alt={"wallet"} />
                </div>

                {/* Title */}
                <h2 className="font-Inter-Regular text-sm mt-3">See all</h2>

                {/* Amount */}
                <p className="text-xl font-Inter-Bold flex items-center justify-between">
                    <span>Managers</span>
                    <img className={`${active && "rotate-180 border border-brandColor"}`} src={BackArrow} alt="arrow" />
                </p>


            </div>
        </>
    )
}