// jshint esversion:6

export function getDaysBetweenDate(firstDate: Date, secondDate: Date): number {
    // Calculate time differencte between two dates
    const difference_in_time = secondDate.getTime()  - firstDate.getTime();

    const difference_in_days = difference_in_time / (1000 * 3600 * 24)

    return difference_in_days;
}