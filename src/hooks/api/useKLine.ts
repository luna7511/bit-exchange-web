import {useQuery} from "@tanstack/react-query";
import {getTradePairList} from "@/api/kline.ts";
import {useTradeStore} from "@/store/useTradeStore.ts";
import type {TradingPair} from "@/api/type/kline.ts";

export const useGetTradingPairList = () => {
    const setTradePairList = useTradeStore(state => state.setTradePairList);
    const collectTradePairList = useTradeStore(state => state.collectTradePairList);
    const currentTradePair = useTradeStore(state => state.currentTradePair);
    const setCurrentTradePair = useTradeStore(state => state.setCurrentTradePair);
    return useQuery({
        queryFn: async () => {
            const data = await getTradePairList();
            const tradePairList: TradingPair[] = data?.sort((a, b) => a?.sortValue - b?.sortValue) ?? []
            setTradePairList(tradePairList);

            if (!currentTradePair.id) {
                if (collectTradePairList.length) {
                    setCurrentTradePair(collectTradePairList[0]);
                } else {
                    setCurrentTradePair(tradePairList[0]);
                }
            }
            return data;
        },
        queryKey: ["getTradingPairList"],
    })
}