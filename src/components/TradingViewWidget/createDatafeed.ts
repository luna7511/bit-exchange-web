import { getKLineHistoryList } from "@/api/kline"; // 你的接口
import { getIntervalList } from "@/lib/kline/index.js";
import Datafeeds from "@/lib/kline/datafees.js";
import {useTradeStore} from "@/store/useTradeStore.ts";
import {type KlineIntervalEnum, SSETypeENum} from "@/lib/enum.ts";

import { API_BASE_URL } from "@/config";

export interface CoinInfo {
    platformName: string;
    symbol: string;
    symbolUpperCase: string;
    coin: string;
    coinUpperCase: string;
    quoteCoin: string;
    quoteCoinUpperCase: string;
    market: string;
    priceScale: number;
}

export interface Bar {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface Interval {
    interval: string;
    key: string;
}

export interface TradingViewDatafeed {
    getConfig: (cb: (config: any) => void) => void;
    resolveSymbol: () => void;
    getBars: (data: {symbolInfo: CoinInfo, resolution: string, from: number, firstDataRequest: boolean; onErrorCallback: (e: Error) => void}) => Promise<Array<any>>;
    getServerTime: (cb: (time: number) => void) => void;

    startSSE: (data: {symbol: string, interval: string, onMessage: (bar: Bar) => void}) => EventSource;
    stopSSE: (instance: EventSource) => void;
}

export function createDatafeed(coinInfo: CoinInfo): Datafeeds {
    const intervalList: Interval[] = getIntervalList();
    const supportedResolutions = intervalList.map((i) => i.interval);

    const config: TradingViewDatafeed = {
        getConfig: (callback) => {
            setTimeout(() => {
                callback({
                    supported_resolutions: supportedResolutions,
                    supports_marks: false,
                    supports_timescale_marks: true,
                    supports_time: true,
                });
            }, 0);
        },
        getServerTime: (callback) => {
            if (callback) {
                const time = +new Date()
                callback(time)
            }
        },

        resolveSymbol: () => {
            return {
                name: coinInfo.symbolUpperCase,
                symbol: coinInfo.symbol,
                symbolUpperCase: coinInfo.symbolUpperCase,
                coin: coinInfo.coin,
                coinUpperCase: coinInfo.coinUpperCase,
                market: coinInfo.market,
                session: "24x7",
                description: coinInfo.symbolUpperCase,
                // resolution: '1m',
                fractional: false,
                // 显示商品是否具有历史数据
                has_intraday: true,
                //设置是否支持周月线
                has_weekly_and_monthly: true,
                // 布尔值显示商品是否具有以日为单位的历史数据
                // has_daily: true,
                // 交易所名称
                exchange: coinInfo.platformName,
                //设置价格精度  100表示保留两位小数   1000三位   10000四位
                pricescale: coinInfo.priceScale,
                // 最小波动
                minmov: 1,
                // 分辨率数组
                supported_resolutions: supportedResolutions
            }
        },

        getBars: async ({symbolInfo, resolution, from, firstDataRequest, onErrorCallback}) => {
            try {
                const intervalObj = intervalList.find((i) => i.interval === resolution);
                if (!intervalObj) {
                    return [];
                }

                const data = await getKLineHistoryList({
                    symbol: symbolInfo.symbol,
                    interval: intervalObj.key as KlineIntervalEnum,
                    market: symbolInfo.market,
                    end: from || 0,
                });

                const barList: Bar[] =
                    data?.historyKline
                        ?.map((item) => ({
                            time: item.timestamp,
                            ...item
                        }))
                        ?.sort((a, b) => (
                            a.time - b.time
                        ))
                    ?? [];

                const { setKlineTicker } = useTradeStore.getState();
                if (firstDataRequest && barList.length > 0) {
                    setKlineTicker(data.ticker);

                    // subscribeTrades({
                    //     coin: symbolInfo.coin,
                    //     symbol: symbolInfo.symbol,
                    //     interval: intervalObj.key,
                    //     firstDataRequest: true,
                    // });
                }

                console.log("barList 1", barList)
                return barList;
            } catch (err: any) {
                onErrorCallback(err);
                // unsubscribeTrades(true);
                return [];
            }
        },

        startSSE: ({  symbol, interval, onMessage}) => {
            const url = `${API_BASE_URL}/api/sse/subscribe`;
            const sse = new EventSource(url);

            sse.onmessage = (e) => {
                const data: {
                    data: {
                        ch: string;
                        tick: Omit<Bar, "time"> & {id: number},
                        ts: number
                    },
                    symbol: string,
                    type: SSETypeENum,
                } = JSON.parse(e.data);

                if (
                    data.symbol === symbol && data.type === SSETypeENum.KLINE
                ) {
                    const bar = {
                        ...data.data.tick,
                        time: data.data.ts,
                    };
                    onMessage(bar);
                }
            };

            return sse; // 返回句柄，用于关闭
        },

        stopSSE: (sseInstance) => {
            sseInstance?.close();
        }
    };

    return new Datafeeds(config);
}