import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { formatYAxisLabel, getLongestLabelLength, getYAxisWidth } from "@/data/admin/dashboard/chart";

type LineChartType = {
    monthlabel?: string[]
    withdrawalData: number[]
}

export const LineChart: React.FC<LineChartType> = ({ monthlabel, withdrawalData }) => {

    const data = monthlabel?.map((month: string, index: number) => {
        return (
            {
                name: month,
                disbursement: withdrawalData[index],
            }
        )
    })

    return (
        <div>
            <AreaChart
                width={320}
                height={170}
                data={data}
                margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0
                }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0 0" />
                <XAxis dataKey="name" tickMargin={5} tick={{ fontSize: "0.8rem" }} tickLine={false} axisLine={false} />
                <YAxis
                    tickFormatter={label => formatYAxisLabel(label)} width={getYAxisWidth(getLongestLabelLength(data, "disbursement"))} tickSize={4} tick={{ fontSize: "0.8rem" }} tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="disbursement" stroke="#1352F1" fill="url(#colorUv)" />
            </AreaChart>
        </div>
    )
}