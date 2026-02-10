const KATHMANDU_TZ = "Asia/Kathmandu";
const KATHMANDU_OFFSET_MINUTES = 5 * 60 + 45;

const kathmanduFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: KATHMANDU_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
});

export const getKathmanduDateString = (date: Date = new Date()) =>
    kathmanduFormatter.format(date);

export const addDays = (date: Date, days: number) => {
    const next = new Date(date);
    next.setUTCDate(next.getUTCDate() + days);
    return next;
};

export const kathmanduStartOfDayUtc = (dateStr: string) => {
    const parts = dateStr.split("-").map((part) => Number(part));
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    if (year === undefined || month === undefined || day === undefined) {
        throw new Error(`Invalid date string: ${dateStr}`);
    }

    const utcMs =
        Date.UTC(year, month - 1, day, 0, 0, 0) -
        KATHMANDU_OFFSET_MINUTES * 60 * 1000;
    return new Date(utcMs);
};

export const kathmanduEndOfDayUtcExclusive = (dateStr: string) => {
    const start = kathmanduStartOfDayUtc(dateStr);
    return new Date(start.getTime() + 24 * 60 * 60 * 1000);
};
