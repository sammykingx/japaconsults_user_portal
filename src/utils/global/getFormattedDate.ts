// jshint esversion:6

export function getFormattedDate(date: Date = new Date()) {
    const time = date.toLocaleTimeString(["en-US"], { hour: "2-digit", minute: "2-digit" });

    const year = date.getFullYear();

    const month = date.toLocaleString('default', { month: "long" });

    const monthShort = date.toLocaleString('default', { month: "short" });

    const day = date.toLocaleString('default', { day: "2-digit" });

    const hours = date.getHours();

    const minutes = date.getMinutes()

    return { year, month, monthShort, day, time, hours, minutes };
}