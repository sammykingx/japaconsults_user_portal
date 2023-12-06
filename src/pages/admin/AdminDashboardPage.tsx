// jshint esversion:6
import { TotalRevenueOverviewBox, TotalUsersOverviewBox, ActiveUsersOverviewBox } from "@/components/global/overviewBox"
import { PaymentActivityWrapper } from "@/components/admin/dashboard/payment"
import { DocumentUploadDoughnutChart } from "@/components/admin/dashboard/document"
import { LineChartWrapper } from "@/components/admin/dashboard/linechart"

export const AdminDashboardPage: React.FC = () => {
    return (
        <div className="py-5">
            <div className="no-scroll flex items-start flex-wrap overflow-auto gap-3 gap-y-5">

                {/* Overview boxes */}
                <div className="flex flex-wrap items-start justify-center gap-3">
                    <TotalRevenueOverviewBox />
                    <TotalUsersOverviewBox />
                    <ActiveUsersOverviewBox />
                    <DocumentUploadDoughnutChart />
                </div>
            </div>

            {/* Chart */}
            <div className="w-full   mt-5">
                <h1 className="font-Inter-Bold text-xl mb-3">Revenue Analytics</h1>
                <div className="no-scroll w-full overflow-x-auto">
                    <div className="w-max">
                        <LineChartWrapper />
                    </div>
                </div>
            </div>


            {/* Payment Activity */}
            <div className="mt-5">
                <PaymentActivityWrapper />
            </div>
        </div>
    )
}   