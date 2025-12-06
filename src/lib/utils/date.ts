import dayjs from "dayjs";
import duration, {type DurationUnitType} from "dayjs/plugin/duration";
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/zh-tw'

dayjs.extend(duration);

// 持续时间国际化
const TIME_UNITS: Record<
    string,
    {
        month: string;
        week: string;
        day: string;
        hour: string;
        minute: string;
        second: string;
    }
> = {
    "zh-CN": {
        month: "月",
        week: "周",
        day: "天",
        hour: "时",
        minute: "分",
        second: "秒",
    },
    en: { month: "M", week: "W", day: "D", hour: "h", minute: "m", second: "s" },
};

/**
 * 格式化持续时间
 */
export function formatDuration(seconds: number, unit: DurationUnitType = "seconds"): string {
    if (isNaN(seconds) || seconds < 0) return "0";

    const locale = dayjs.locale();
    const units = TIME_UNITS[locale] || TIME_UNITS.en;

    const d = dayjs.duration(seconds, unit);
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
