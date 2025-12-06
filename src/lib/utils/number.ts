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
    /** 不够小数位时是否补零，默认false */
    padZero?: boolean;
    /** 是否使用千分位分隔，默认false */
    useGrouping?: boolean;
}

/**
 * 格式化数字
 * - 有小数显示指定小数位
 * - 整数不显示小数
 * - 可选择末尾补零
 */
export const formatNumber = (
    value: number | string,
    options: FormatNumberOptions = {}
): string => {
    const { decimals = 2, padZero = false, useGrouping = false } = options;

    if (value === null || value === undefined || value === "") return "0";

    const num = Number(value);
    if (isNaN(num)) return "0";

    let integer = Math.trunc(num).toString(); // 整数部分
    let fraction = "";

    if (!Number.isInteger(num)) {
        // 小数部分截取
        fraction = (num % 1).toFixed(decimals).slice(2); // 四舍五入到 decimals 位

        if (!padZero) {
            // 去掉末尾多余的 0
            fraction = fraction.replace(/0+$/, "");
        }
    } else if (padZero && decimals > 0) {
        fraction = "0".repeat(decimals);
    }

    if (useGrouping) {
        integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return fraction ? `${integer}.${fraction}` : integer;
};


/**
 * 数量格式化
 * @param {*} val
 * @returns
 */
export const countFormat = (val: number) => {
    if (!val) {
        return 0
    }
    let temp = "0"
    // 数量
    if (val > 1000000000000) {
        // T 1兆
        temp = `${formatNumber(div(val, 1000000000000), {
            
        })}T`
    } else if (val > 1000000000) {
        // B 十亿
        temp = `${formatNumber(div(val, 1000000000))}B`
    } else if (val > 1000000) {
        // M 百万
        temp = `${formatNumber(div(val, 1000000))}M`
    } else if (val > 1000) {
        // M 千
        temp = `${formatNumber(div(val, 1000))}K`
    } else if (val > 100) {
        temp = formatNumber(val)
    } else if (val < 0.00001) {
        temp = formatNumber(val, {
            decimals: 6,
            padZero: true
        })
    } else if (val < 0.0001) {
        temp = formatNumber(val, {
            decimals: 5,
            padZero: true
        })
    } else if (val < 0.001) {
        temp = formatNumber(val, {
            decimals: 4,
            padZero: true
        })
    } else {
        temp = formatNumber(val, {
            decimals: 4,
        })
    }
    if (`${temp}`.indexOf('e') > -1) {
        temp = _SN2D(temp)
    }
    return temp
}

/**
 * 价格格式化
 * @param {*} val
 * @returns
 */
export const priceFormat = (val: number, num: number = 0) => {
    if (!val) {
        return '0.00'
    }
    let temp = "0"

    if (num) {
        temp = formatNumber(val, {
            decimals: num,
        })
    } else {
        // 金额
        if (val < 0.00001) {
            temp = formatNumber(val, {
                decimals: 6,
                padZero: true
            })
        } else if (val < 0.0001) {
            temp = formatNumber(val, {
                decimals: 4,
                padZero: true
            })
        } else if (val < 0.001) {
            temp = formatNumber(val, {
                decimals: 2,
                padZero: true
            })
        } else if (val < 10) {
            temp = formatNumber(val, {
                decimals: 6,
            })
        } else if (val < 100) {
            temp = formatNumber(val, {
                decimals: 4,
            })
        } else {
            temp = formatNumber(val)
        }
    }

    // 检测计算值
    if (`${temp}`.indexOf('e') > -1) {
        temp = _SN2D(`${temp}`)
    }
    return temp
}

/**
 * 国际货币计量单位 格式化
 */
export const currencyFormat = (val: number, num?: number) => {
    if (!val) {
        return 0
    }
    let temp = "0"
    if (num) {
        temp = formatNumber(val, {
            decimals: num
        })
    } else {
        if (val > 1000000000) {
            temp = formatNumber(div(val, 1000000000))
            temp += ' B'
        } else if (val > 1000000) {
            temp = formatNumber(div(val, 1000000))
            temp += ' M'
        } else if (val > 1000) {
            temp = formatNumber(div(val, 1000))
            temp += ' K'
        } else {
            temp = formatNumber(div(val, 1000), {
                decimals: 4
            })
        }
    }
    if (temp.indexOf('e') && val < 1000) {
        return _SN2D(temp)
    } else {
        return temp
    }
}

/**
 * 科学计数法2小数
 * @param {*} val
 * @returns
 */
export const _SN2D = (val) => {
    const e = String(val)
    const rex = /^([0-9])\.?([0-9]*)e-([0-9]*)/
    if (!rex.test(e)) return val
    const numArr = e.match(rex)
    const n = Number('' + numArr[1] + (numArr[2] || ''))
    const num = '0.' + String(Math.pow(10, Number(numArr[3]) - 1)).substring(1) + n
    return num.replace(/0*$/, '')
}

export const roundNumber = (min: number, max: number) => {
    return Math.floor(min + Math.random() * (max - min));
}