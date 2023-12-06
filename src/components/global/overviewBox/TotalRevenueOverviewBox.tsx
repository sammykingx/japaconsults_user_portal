// jshint esversion:6
import RevenueIcon from "@/assets/user/wallet.svg";
import { useGetTotalRevenueQuery } from "@/app/services/admin/invoice";
import { useEffect, useState } from "react";

export const TotalRevenueOverviewBox: React.FC = () => {

    const [totalRevenue, setTotalRevenue] = useState<number>(0);

    // Revenue data
    const { data: totalRevenueData, isFetching: isTotalRevenueLoading } = useGetTotalRevenueQuery(undefined, { refetchOnMountOrArgChange: true });

    useEffect(() => {
        if (!totalRevenueData) {
            return;
        }

        let revenue: number = 0;

        const years = Object.keys(totalRevenueData);

        years.forEach((year) => {
            const monthlyRevenue = totalRevenueData[year as keyof typeof totalRevenueData];

            if (monthlyRevenue) {
                const AllMonthRevenue = Object.values(monthlyRevenue);

                // Add each revenue for the year
                AllMonthRevenue.forEach((revenueData: number) => {
                    revenue += revenueData;
                })
            }

            setTotalRevenue(revenue);
        })

    }, [totalRevenueData])

    return (
        <>
            <div className="w-[250px] rounded-xl bg-[#E1AE3C]/30 p-4 border">

                {/* Icon */}
                <div className="w-[30px] h-[30px] flex items-center justify-center rounded-lg bg-white">
                    <img src={RevenueIcon} alt={"wallet"} />
                </div>

                {/* Title */}
                <h2 className="font-Inter-Bold text-sm mt-3">Total Revenue</h2>

                {/* Amount */}
                <div className="flex justify-between items-center gap-x-2">
                    <p className="text-lg font-Inter-Bold">{isTotalRevenueLoading ? "..." : totalRevenue.toLocaleString()}</p>
                    <p className="text-xs text-green-700 truncate">{isTotalRevenueLoading ? "..." : "+0% this month"}</p>
                </div>

            </div>
        </>
    )
}