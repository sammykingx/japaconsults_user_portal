// jshint esversion:6
import RevenueIcon from "@/assets/user/user-add.svg";
import { useGetAllUsersQuery } from "@/app/services/admin/users";
import { getMonthBoundaryMs } from "@/utils/admin";

export const TotalUsersOverviewBox: React.FC = () => {

    const { data: AllUsersData, isLoading: isAllUsersDataLoading } = useGetAllUsersQuery();

    const totalUsers = AllUsersData?.length ?? 0;

    // Filter all who joined this month
    const { firstDayMs, lastDayMs } = getMonthBoundaryMs()

    // Get users who joined this month
    const usersJoinedThisMonth = AllUsersData?.filter((user) => {
        const dateJoinedMs = new Date(user.date_joined).getTime();
        return ((dateJoinedMs > firstDayMs) && (dateJoinedMs < lastDayMs))
    }).length ?? 0


    return (
        <>
            <div className="w-[250px] rounded-xl bg-[#68EE76]/30 p-4 border">

                {/* Icon */}
                <div className="w-[30px] h-[30px] flex items-center justify-center rounded-lg bg-white">
                    <img src={RevenueIcon} alt={"wallet"} />
                </div>

                {/* Title */}
                <h2 className="font-Inter-Bold text-sm mt-3">Total Users</h2>

                {/* Amount */}
                <div className="flex justify-between items-center gap-x-2">
                    <p className="text-lg font-Inter-Bold">{isAllUsersDataLoading ? "..." : totalUsers?.toLocaleString()}</p>
                    <p className="text-xs text-green-700 truncate">{`+${((usersJoinedThisMonth / (totalUsers)) * 100)} % this month`}</p>
                </div>

            </div>
        </>
    )
}