// jshint esversion:6
import RevenueIcon from "@/assets/user/user-tick.svg";
import { useGetAllUsersQuery } from "@/app/services/admin/users";
import { getDaysBetweenDate } from "@/utils/admin";

export const ActiveUsersOverviewBox: React.FC = () => {

    const { data: AllUsersData, isLoading: isAllUsersDataLoading } = useGetAllUsersQuery();

    const AllUsersLastLoginDays =  AllUsersData?.map((user) => {
        const date_joined = new Date(user.date_joined)
        const last_login = new Date(user.last_login ?? user.date_joined);    
        return (getDaysBetweenDate(date_joined, last_login ?? date_joined));
    })

    const ActiveUsers = AllUsersLastLoginDays?.filter((value) => {
        return value < 30
    })

    // Get % drop

    return (
        <>
            <div className="w-[250px] rounded-xl bg-[#8D7986]/30 p-4 border">

                {/* Icon */}
                <div className="w-[30px] h-[30px] flex items-center justify-center rounded-lg bg-white">
                    <img src={RevenueIcon} alt={"wallet"} />
                </div>

                {/* Title */}
                <h2 className="font-Inter-Bold text-sm mt-3">Active Users</h2>

                {/* Amount */}
                <div className="flex justify-between items-center gap-x-2">
                    <p className="text-lg font-Inter-Bold">{isAllUsersDataLoading ? "..." : ActiveUsers?.length.toLocaleString()}</p>
                    <p className="text-xs text-error truncate">{"-0% this month"}</p>
                </div>

            </div>
        </>
    )
}