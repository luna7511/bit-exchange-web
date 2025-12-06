import { create } from "zustand";
import type {KlineTicker, TradingPair} from "@/api/type/kline.ts";
import {persist} from "zustand/middleware";
import {MarketEnum} from "@/lib/enum.ts";

interface TradeState {
    // 交易市场
    market: MarketEnum;
    // 交易对列表
    tradePairList: TradingPair[];
    setTradePairList: (tradePairList: TradingPair[]) => void;

    // 当前选中的交易对
    currentTradePair: Partial<TradingPair>;
    setCurrentTradePair: (tradePair: Partial<TradingPair>) => void;


    // 收藏的交易对
    collectTradePairList: TradingPair[];
    addCollectTradePair: (data: TradingPair) => void;
    removeCollectTradePair: (id: number) => void;

    // k线刻度
    klineTicker: Partial<KlineTicker & {}>;
    setKlineTicker: (data: Partial<KlineTicker>) => void;
}

export const useTradeStore = create<TradeState>()(persist((set, getState) => ({
    market: MarketEnum.BINANCE,
    tradePairList: [],
    setTradePairList: (data: TradingPair[]) => {
        set({tradePairList: data});
    },
    currentTradePair: {},
    setCurrentTradePair: (tradePair: Partial<TradingPair>) => {
        set({currentTradePair: tradePair});
    },


    collectTradePairList: [],
    addCollectTradePair: (data: TradingPair) => {
        set((pre) => {
            // 如果已存在，返回原状态
            if (pre.collectTradePairList.some(d => d.id === data.id)) {
                return pre;
            }

            // 不存在 → 添加进列表
            return {
                ...pre,
                collectTradePairList: [...pre.collectTradePairList, data],
            };
        });
    },
    removeCollectTradePair: (id: number) => {
        set((pre) => {
            return {
                ...pre,
                collectTradePairList: pre.collectTradePairList.filter((d) => d.id !== id),
            };
        });
    },


    klineTicker: {},
    setKlineTicker: (data: Partial<KlineTicker>) => {
        set({
            klineTicker: data,
        })
    }
}), {
    name: "trade-storage",
    partialize: (state) => ({
        collectTradePairList: state.collectTradePairList,
    })
}));