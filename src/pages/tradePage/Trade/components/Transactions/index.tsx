import type {FC} from "react";
import Divider from "@mui/material/Divider";
import {useTranslation} from "react-i18next";
import type {CoinInfo} from "@/components/TradingViewWidget";
import {formatNumber, mul} from "@/lib/utils/number.ts";

const Transactions:FC<{
    coinInfo: CoinInfo
}> = ({
                             coinInfo
                         }) => {
    const { t } = useTranslation("kline");
    const listData = [];
    return (
        <div className={"h-full flex flex-col"}>
            <div className={"text-xs"}>
                <div className="title flex justify-between px-2 text-white/40 py-2">
                    <div className="title_left flex items-center gap-0.5">
                        <div className="name">{t("price")}</div>
                        <div className="unit">({coinInfo.quoteCoinUpperCase})</div>
                    </div>
                    <div className="title_left flex items-center gap-0.5">
                        <div className="name">{t("number")}</div>
                        <div className="unit">({coinInfo.quoteCoinUpperCase})</div>
                    </div>
                    <div className="title_right flex items-center gap-0.5">
                        <div className="name">{t("time")}</div>
                    </div>
                </div>
                <Divider />
            </div>

            <div className={"flex-1"}>
                <div className="itemList flex-1 overflow-auto scrollbar-custom">
                    {listData.map((e, i) => (
                        <div key={i} className="item flex items-center justify-between py-0.5 relative px-2">
                            <div className="fall text-success font-bold w-1/3 text-left">{formatNumber(e.price, { decimals: 4, padZero: true, useGrouping: true })}</div>
                            <div className="itemName font-bold w-1/3 text-center">{formatNumber(e.count, { decimals: 4, padZero: true, useGrouping: true })}</div>
                            <div className="itemName font-bold w-1/3 text-right">{formatNumber(mul(e.count, e.price), {decimals: 3, padZero: true, useGrouping: true})}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Transactions;