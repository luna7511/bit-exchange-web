import {type FC, memo, useCallback} from "react";
import {useTradeStore} from "@/store/useTradeStore.ts";
import type {TradingPair} from "@/api/type/kline.ts";

const QuoteList: FC<{
    itemChange?: (value: TradingPair) => void;
}> = ({itemChange}) => {
    const tradePairList = useTradeStore(state => state.tradePairList);
    const setCurrentTradePair = useTradeStore(state => state.setCurrentTradePair);
    const currentTradePair = useTradeStore(state => state.currentTradePair);

    const changeSymbol = useCallback((value: TradingPair) => {
        if (currentTradePair.id !== value.id) {
            setCurrentTradePair(value);
            itemChange?.(value)
        }
    }, [currentTradePair])
    return (
        <div className={""}>
            {
                tradePairList?.map((item) => {
                    return (
                        <div className={"flex items-center gap-2 p-2 cursor-pointer"} key={item.id} onClick={() => changeSymbol(item)}>
                            <img src={item.pairIcon} width={15} height={15} />
                            {item.pairName}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default memo(QuoteList);