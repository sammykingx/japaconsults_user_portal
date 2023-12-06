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
                width={820}
                height={270}
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
                        <stop offset="5%" stopColor="#E1AE3C" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#E1AE3C" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0 0" />
                <XAxis dataKey="name" tickMargin={5} tick={{ fontSize: "0.8rem" }} tickLine={false} axisLine={false} />
                <YAxis
                    tickFormatter={label => formatYAxisLabel(label)} width={getYAxisWidth(getLongestLabelLength(data, "traffic"))} tickSize={4} tick={{ fontSize: "0.8rem" }} tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="disbursement" stroke="#E1AE3C" fill="url(#colorUv)" />
            </AreaChart>
        </div>
    )
}