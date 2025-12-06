import {type FC, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import Transactions from "@/pages/tradePage/Trade/components/Transactions";
import OrderBookLatest from "@/pages/tradePage/Trade/components/OrderBookLatest ";
import type {CoinInfo} from "@/components/TradingViewWidget";
import {cn} from "@/lib/utils";
import Divider from "@mui/material/Divider";

const MarketDepth: FC<{
    coinInfo: CoinInfo
    type: "all" | "orderBook" | "trades"
}> = ({coinInfo, type = "all"}) => {
    const { t } = useTranslation("kline");
    const showTypeList = useMemo(() => {
        const list = [];
        if (type === "all" || type === "orderBook") {
            list.push({ value: "orderBookName" });
        }
        if (type === "all" || type === "trades") {
            list.push({ value: "tradesName" });
        }
        return list;
    }, [type]);

    const [showType, setShowType] = useState(showTypeList[0].value);
    return (
        <div className={"h-full flex flex-col"}>
            <div className={"p-2 flex gap-4 h-11 items-center"}>
                {
                    showTypeList.map(d => (
                        <span key={d.value} className={cn(
                            "text-sm cursor-pointer",
                            showType === d.value ? "text-white" : "text-white/40"
                        )} onClick={() => setShowType(d.value)}>
                            {t(`${d.value}`)}
                        </span>
                    ))
                }
            </div>
            <Divider className={""} />

            <div className={"flex-1 overflow-hidden"}>
                {
                    showType === "orderBookName" ? (
                        <OrderBookLatest coinInfo={coinInfo} tradeDetailInfo={{close: 125.2365}} />
                    ) : (
                        <Transactions coinInfo={coinInfo} />
                    )
                }
            </div>
        </div>
    )
}
export default MarketDepth