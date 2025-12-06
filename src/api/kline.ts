import request from "@/lib/request";
import type {KLineHistoryReq, KlineHistoryResponse, TradingPair} from "@/api/type/kline.ts";

/**
 * 获取交易对
 */
export const getTradePairList = () => {
    return request.get<Array<TradingPair>>("/api/trading/pair/list")
}

export const getKLineHistoryList = (data: KLineHistoryReq) => {
    return request.post<KlineHistoryResponse>("/api/common/api/kline", data);
}