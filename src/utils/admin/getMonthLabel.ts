// jshint esversion:5
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',]

const firstQuaterMonthlabel = ['Jan', 'Feb', 'Mar', 'Apr',];
const secondQuaterMonthlabel = ['May', 'Jun', 'Jul', 'Aug',];
const thirdQuaterMonthlabel = ['Sep', 'Oct', 'Nov', 'Dec',];

export const getDefaultMonthlabel = (): string[] => {
    const currentMonth = MONTHS[new Date().getMonth()];
    if (currentMonth in firstQuaterMonthlabel) return firstQuaterMonthlabel
    if (currentMonth in secondQuaterMonthlabel) return secondQuaterMonthlabel
    return thirdQuaterMonthlabel
}

export function getMonthFromLabel(value: string) {
    return MONTHS.findIndex((month) => {
        return month == value;
    })
}

export const formatYAxisLabel = (ylabel: string, prefix = "") => {
    const label = ylabel.toString();

    if (label.length <= 3)
        return prefix + label;

    if (label.length > 3 && label.length <= 6)
        return `${prefix}${((Number(label) * 1.0) / 1000).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}k`

    if (label.length > 6 && label.length <= 9)
        return `${prefix}${((Number(label) * 1.0) / 1000000).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M`

    if (label.length > 9)
        return `${prefix}${((Number(label) * 1.0) / 1000000000).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}B`

    return prefix + label.substring(0, 3).concat("...")
}

export const getLongestLabelLength = (data: any, accessProperty: string): number => {
    return data
        .map((c: any) => c[accessProperty]?.toLocaleString() ?? "")
        .reduce((acc: any, cur: any) => (cur.length > acc ? cur.length : acc), 0)
}

export function getYAxisWidth(labelLength: number) {
    switch (labelLength) {
        case 1:
            return 20
        case 2:
            return 30
        case 3:
            return 40
        default:
            return 50;
    }
}