import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

// 持续时间国际化
const TIME_UNITS: Record<
    string,
    {
        day: string;
        hour: string;
        minute: string;
        second: string;
    }
> = {
    "zh-cn": {
        day: "天",
        hour: "时",
        minute: "分",
        second: "秒",
    },
    en: { day: "d", hour: "h", minute: "m", second: "s" },
};

/**
 * 格式化持续时间
 */
export function formatDuration(seconds: number): string {
    if (isNaN(seconds) || seconds < 0) return "0";

    const locale = dayjs.locale();
    const units = TIME_UNITS[locale] || TIME_UNITS.en;

    const d = dayjs.duration(seconds, "seconds");
    const days = Math.floor(d.asDays());
    const hours = d.hours();
    const minutes = d.minutes();
    const secs = d.seconds();

    let result = "";
    if (days > 0) result += `${days}${units.day}`;
    if (hours > 0) result += `${hours}${units.hour}`;
    if (minutes > 0) result += `${minutes}${units.minute}`;
    if (secs > 0 || result === "") result += `${secs}${units.second}`;

    return result;
}

/**
 * 通用时间格式化
 * @param timestamp
 * @param format
 */
export function formatDate(timestamp: number | Date, format = "YYYY-MM-DD HH:mm:ss") {
    return dayjs(timestamp).format(format);
}
