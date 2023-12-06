import { getFormattedDate } from ".";

export function getFileDate(date: Date | string) {
    // Get the date
    const tradeDate = new Date(date);

    // Get formatted date
    const { year, month, day, time} = getFormattedDate(tradeDate);

    return (
        `${day} ${month}, ${year} ${time}`
    )
}