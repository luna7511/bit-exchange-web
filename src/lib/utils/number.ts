import Big from "big.js";

/** 安全处理 undefined/null/空字符串，默认视为 0 */
export function safeBig(value: string | number | undefined | null): Big {
    if (value === undefined || value === null || value === "") return new Big(0);
    return new Big(value);
}

/** 加法 */
export function add(a: string | number | undefined | null, b: string | number | undefined | null): string {
    return safeBig(a).plus(safeBig(b)).toString();
}

/** 减法 */
export function sub(a: string | number | undefined | null, b: string | number | undefined | null): string {
    return safeBig(a).minus(safeBig(b)).toString();
}

/** 乘法 */
export function mul(a: string | number | undefined | null, b: string | number | undefined | null): string {
    return safeBig(a).times(safeBig(b)).toString();
}

/**
 * 除法
 * @param scale 保留小数位（可选，默认 2 位截断）
 */
export function div(a: string | number | undefined | null, b: string | number | undefined | null): string {
    if (safeBig(b).eq(0)) return "0"; // 避免除以 0
    return safeBig(a).div(safeBig(b)).toString(); // 默认截断
}

/**
 * 比较大小
 * @returns 1: a > b, 0: a = b, -1: a < b
 */
export function compare(a: string | number | undefined | null, b: string | number | undefined | null): -1 | 0 | 1 {
    return safeBig(a).cmp(safeBig(b));
}

interface FormatNumberOptions {
    /** 固定小数位数，默认2 */
    decimals?: number;
    /** 不够小数位时是否补零，默认true */
    padZero?: boolean;
    /** 保留原始小数位而非四舍五入，默认false */
    keepOriginalDecimals?: boolean;
    /** 是否使用千分位分隔，默认true */
    useGrouping?: boolean;
}

/**
 * 格式化数字
 * - 有小数显示指定小数位
 * - 整数不显示小数
 * - 可保留原始小数位或固定小数位
 * - 可选择末尾补零
 */
export const formatNumber = (value: number | string, options: FormatNumberOptions = {}): string => {
    const {
        decimals = 2,
        padZero = true,
        keepOriginalDecimals = false,
        useGrouping = true,
    } = options;

    if (value === null || value === undefined || value === "") return "0";

    const num = Number(value);
    if (isNaN(num)) return "0";

    let [integer, fraction] = String(num).split(".");

    // 小数处理
    if (fraction !== undefined && fraction.length > 0) {
        if (keepOriginalDecimals) {
            // 保留原始小数位
            if (padZero && fraction.length < decimals) {
                fraction = fraction.padEnd(decimals, "0");
            }
        } else {
            // 固定小数位
            fraction = Number(`0.${fraction}`).toFixed(decimals).slice(2);
        }
    } else {
        // 整数
        fraction = "";
    }

    // 千分位处理
    if (useGrouping) {
        integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return fraction !== undefined ? `${integer}.${fraction}` : integer;
};