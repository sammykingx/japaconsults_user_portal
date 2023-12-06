// jshint esversion:6
// import { useState } from "react";
import { LineChart } from "./LineChart";
import { useGetTotalRevenueQuery } from "@/app/services/admin/invoice";

const dateToday = new Date()

const currentMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const LineChartWrapper: React.FC = () => {

    // Hold revenue by month
    let currentRevenue: number[] = []

    // Revenue data
    const { data: totalRevenueData } = useGetTotalRevenueQuery();

    // Get current year
    let currentYear: string = String(dateToday.getFullYear())

    // Extract data
    if (totalRevenueData && currentYear in totalRevenueData) {
        const revenueByMonth = totalRevenueData[currentYear as keyof typeof totalRevenueData];

        // Get values for each months
        currentMonths.forEach((month) => {
            if (revenueByMonth && month in revenueByMonth) {
                currentRevenue.push(revenueByMonth[month as keyof typeof revenueByMonth] ?? 0);
                return
            }
            currentRevenue.push(0);
        })
    }

    else {
        currentRevenue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }

    const monthlabel = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    return (
        <>
            {/* Line Chart */}
            <div className="w-max flex-shrink-0 border-[1px] bg-white rounded-2xl p-5">

                {/* Line Chart Body */}
                <div className="mb-3">
                    <LineChart monthlabel={monthlabel} withdrawalData={currentRevenue} />
                </div>
            </div>
        </>
    );
}