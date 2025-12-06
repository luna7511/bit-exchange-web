import {KlineIntervalEnum, StatusEnum} from "@/lib/enum.ts";

export interface TradingPair {
    /** 基础货币，例如 BTC/ETH 等交易对的基础货币 */
     baseCurrency: string;

     /** 创建此交易对的用户或系统标识  */
     createBy: string;

     /** 创建时间，ISO 8601 时间字符串，例如 "2025-12-01T10:00:00Z" */
     createTime: string;

     /** 交易对唯一标识 ID  */
     id: number;

     /** 最大交易数量限制  */
     maxTradeAmount: number;

     /** 最小交易数量限制  */
     minTradeAmount: number;

     /** 交易对图标 URL 或路径  */
     pairIcon: string;

     /** 交易对名称，例如 "BTC/USDT"  */
     pairName: string;

     /** 价格精度，例如 2 表示价格保留 2 位小数  */
     pricePrecision: number;

     /** 计价货币，例如 USDT/ETH  */
     quoteCurrency: string;

     /** 备注信息，可用于记录交易对说明或附加信息  */
     remark: string;

     /** 排序值，用于在列表中排序显示 */
     sortValue: number;

     /** 交易对状态，例如 0 表示禁用，1 表示启用  */
     status: StatusEnum;

     /** 最近一次更新此交易对的用户或系统标识  */
     updateBy: string;

     /** 最近更新时间，ISO 8601 时间字符串 */
    updateTime: string;
}



export interface KLineHistoryReq {
    /** K 线结束时间，单位毫秒 */
    end?: number;
    /** K 线周期
     * "ONE_MIN","FIVE_MIN","FIFTEEN_MIN","THIRTY_MIN","ONE_HOUR",
     * "TWO_HOUR","SIX_HOUR","ONE_DAY","TWO_DAY","SEVEN_DAY"
     * */
    interval?: KlineIntervalEnum;

    /** 当前市场名称 */
    market?: string;

    /** 所有可用市场列表 */
    markets?: string[];

    /** SDK 内部使用的周期标识 */
    nsdkInterval?: string;

    /** 当前交易对符号 */
    symbol?: string;

    /** 可用交易对列表 */
    symbols?: string[];
}


export interface KlineTicker{
    highPrice: number;
    lowPrice: number;
    symbol: string;
    volume: number;
}
export interface KlineHistoryResponse {
    historyKline: Array<{
        close: number;
        high: number;
        low: number;
        open: number;
        timestamp: number;
        volume: number;
    }>,
    ticker: KlineTicker,
}