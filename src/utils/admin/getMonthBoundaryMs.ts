// jshint esversion:6

export function getMonthBoundaryMs() {
    let date_today = new Date();

    let firstDay = new Date(date_today.getFullYear(), date_today.getMonth(), 1);

    let lastDay = new Date(date_today.getFullYear(), date_today.getMonth() + 1, 0);

    return (
        {
            firstDayMs: firstDay.getTime(),
            lastDayMs: lastDay.getTime()
        }
    )
}