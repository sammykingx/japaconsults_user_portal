// jshint esversion:6
import { TotalSpentOverviewBox } from "@/components/global/overviewBox"
import { PaymentActivityWrapper } from "@/components/admin/dashboard/payment"
import { UserDocumentUploadDoughnutChart } from "@/components/user/dashboard"
import { TotalNotesReceivedOverviewBox } from "@/components/global/overviewBox"
import { TotalNotesCreatedOverviewBox } from "@/components/global/overviewBox"

export const DashboardPage: React.FC = () => {
    return (
        <div className="py-5">
            <div className="no-scroll flex items-start flex-wrap overflow-auto gap-3 gap-y-5">

                {/* Overview boxes */}
                <div className="flex flex-wrap justify-center items-start gap-3">
                    <TotalSpentOverviewBox />
                    <TotalNotesCreatedOverviewBox />
                    <TotalNotesReceivedOverviewBox />
                    <UserDocumentUploadDoughnutChart />
                </div>
            </div>

            {/* Payment Activity */}
            <div className="mt-5">
                <PaymentActivityWrapper />
            </div>
        </div>
    )
}   