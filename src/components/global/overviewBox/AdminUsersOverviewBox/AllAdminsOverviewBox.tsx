// jshint esversion:6
import AllUsersIcon from "@/assets/admin/AllAdmins.svg";
import BackArrow from "@/assets/admin/BackArrow.svg";

type AllAdminsOverviewBoxProp = {
    active: boolean;
}

export const AllAdminsOverviewBox: React.FC<AllAdminsOverviewBoxProp> = ({active}) => {

    return (
        <>
            <div className={`w-[250px] rounded-xl bg-[#E1AE3C]/30 p-4 border ${active && "border border-brandColor"}`}>

                {/* Icon */}
                <div className="w-[30px] h-[30px] flex items-center justify-center rounded-lg bg-white">
                    <img src={AllUsersIcon} alt={"wallet"} />
                </div>

                {/* Title */}
                <h2 className="font-Inter-Regular text-sm mt-3">See all</h2>

                {/* Amount */}
                <p className="text-xl font-Inter-Bold flex items-center justify-between">
                    <span>Admin</span>
                    <img className={`${active && "rotate-180 border border-brandColor"}`} src={BackArrow} alt="arrow" />
                </p>


            </div>
        </>
    )
}