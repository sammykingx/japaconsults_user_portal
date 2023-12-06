// jshint esversion:6
export const delayTimeout = (delay: number) => {
    return new Promise(res => setTimeout(res, delay));
}