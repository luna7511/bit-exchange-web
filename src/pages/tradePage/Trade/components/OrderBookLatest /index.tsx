import { useEffect, useMemo, useState, useRef } from "react";
import {cn, throttle} from "@/lib/utils";
import type {CoinInfo} from "@/components/TradingViewWidget";
import OrderBookSellIcon from '@/assets/icons/trade/orderBook_sell.svg'
import OrderBookBuyIcon from '@/assets/icons/trade/orderBook_buy.svg'
import OrderBookMixedIcon from '@/assets/icons/trade/orderBook_mixed.svg'
import {useTranslation} from "react-i18next";
import {formatNumber, mul, div, roundNumber} from "@/lib/utils/number.ts";
import Divider from "@mui/material/Divider";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {DrawMenu, DrawMenuItem} from "@/components/DrawMenu";
import {Button} from "@/components/Button";

export default function OrderBookLatest({
                                      coinInfo,
                                      rows = 40,
                                      tradeDetailInfo,
                                  }: {
    coinInfo: CoinInfo;
    rows?: number;
    tradeDetailInfo?: {close: number}
}) {
    const {t} = useTranslation("kline")
    const showTypeList = useRef([
        { name: "Default", value: 0, icon: <OrderBookMixedIcon />, color: "var(--ex-default-font-color)" },
        { name: "Buy", value: 2, icon: <OrderBookBuyIcon />, color: "#04A981FF" },
        { name: "Sell", value: 1, icon: <OrderBookSellIcon />, color: "#f54751" },
    ]);
    const [showType, setShowType] = useState(showTypeList.current[0]);


    const depthDict = [
        // { name: "0.00000001", value: 0, min: 0.00000001 },
        // { name: "0.0000001", value: 1, min: 0.0000001 },
        // { name: "0.000001", value: 2, min: 0.000001 },
        // { name: "0.00001", value: 3, min: 0.00001 },
        { name: "0.0001", value: 4, min: 0.0001 },
        { name: "0.001", value: 3, min: 0.001 },
        { name: "0.01", value: 2, min: 0.01 },
        { name: "0.1", value: 1, min: 0.1 },
        // { name: "1", value: 8, min: 1 },
        // { name: "10", value: 9, min: 10 },
    ];

    const [showDepth, setShowDepth] = useState(depthDict[0]);
    const [asks, setAsks] = useState<Array<{ price: number | string; count: number; }>>([]);
    const [bids, setBids] = useState<Array<{ price: number | string; count: number; }>>([]);

    const updateMock = () => {
        const price = tradeDetailInfo?.close;
        if (!price) return;


        const COUNT_MIN = 6000;
        const COUNT_MAX = 100000;

        const random = roundNumber(6, 15);
        const PRICE_MIN = random - 2;
        const PRICE_MAX = random + 2;
        const makeList = (mult: 1 | -1) => {
            const list: Array<{ price: number; count: number }> = [];

            for (let i = 1; i <= rows; i++) {
                // 价格 = 当前价 + i * 深度 * 1~1.2 随机系数，保证不全相同
                const randomFactor = div(roundNumber(PRICE_MIN * 10000, PRICE_MAX * 10000), 10000);
                // let p = price + mult * i * depth * randomFactor;


                // 保留深度小数位
                const p = randomFactor;

                // 数量随机 [6000, 1000000]
                const c = Math.floor(COUNT_MIN + Math.random() * (COUNT_MAX - COUNT_MIN));

                list.push({ price: p, count: c });
            }

            return list.sort((a, b) => (mult > 0 ? a.price - b.price : b.price - a.price));
        };

        const askList = makeList(-1);
        const bidList = makeList(1);

        setAsks(askList);
        setBids(bidList);
    };

    const updateMockThrottle = useMemo(() => throttle(updateMock, 1000), [rows, showDepth.min]);
    useEffect(() => {
        const interval = setInterval(() => {
            updateMockThrottle(); // 每秒刷新一次
        }, 5000);

        return () => clearInterval(interval); // 卸载清理
    }, [updateMockThrottle]);

    useEffect(() => {
        updateMock();
    }, [tradeDetailInfo?.close, showType]);

    return (
        <div className="handicapBox h-full text-xs flex flex-col pt-1">
            <div className={"flex items-center gap-2 px-2"}>
                {
                    showTypeList.current.map((item) => (
                        <div key={item.value} className={cn(
                            " rounded-xs p-0.5 cursor-pointer",
                            item.value === showType.value ? "border-1 border-[var(--primary)]" : "bg-white/20",
                        )} onClick={() => setShowType(item)}>
                            {item.icon}
                        </div>
                    ))
                }

                <div className={"ml-auto"}>
                    <DrawMenu
                        triggerClass={"p-0!"}
                        triggerIcon={<ArrowDropDownIcon className="text-md! -ml-0.5" />}
                        TriggerComponent={
                            <Button size={"extraSmall"} color={"inherit"} sx={{
                                padding: "0 !important",
                                fontSize: "12px !important",
                                minWidth: "auto"
                            }} variant={"text"}>
                                {showDepth?.name}
                            </Button>
                        }
                    >
                        {
                            depthDict.map((item) => (
                                <DrawMenuItem key={item.value} sx={{
                                    minHeight: "30px !important",
                                }} className={"min-w-[80px] text-center"} label={item.name} onClick={() => setShowDepth(item)}  />
                            ))
                        }
                    </DrawMenu>
                </div>
            </div>
            <div>
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
                        <div className="name">{t("totalPrice")}</div>
                        <div className="unit">({coinInfo.coinUpperCase})</div>
                    </div>
                </div>
                <Divider />
            </div>


            {showType.value !== 2 && (
                <div className="itemList asks flex-1 overflow-auto scrollbar-custom">
                    {asks.slice(0, rows).map((e, i) => (
                        <div key={i} className="item flex items-center justify-between py-0.5 relative px-2">
                            <div className="fall text-error font-bold w-1/3 text-left">{formatNumber(e.price, { decimals: showDepth.value, padZero: true, useGrouping: true })}</div>
                            <div className="itemName font-bold w-1/3 text-center">{formatNumber(e.count, { decimals: 4, padZero: true, useGrouping: true })}</div>
                            <div className="itemName font-bold w-1/3 text-right">{formatNumber(mul(e.count, e.price), {decimals: 3, padZero: true, useGrouping: true})}</div>
                            <div className="hightItem fall absolute opacity-30 bg-error top-0 bottom-0 right-0" style={{ width: `${mul(div(e.count, asks[0].count), 100)}%` }} />
                        </div>
                    ))}
                </div>
            )}

            <div>
                <Divider />
                <div className="itemCenter text-xl px-2 py-1.5">
                    <div>{tradeDetailInfo?.close}</div>
                </div>
                <Divider />
            </div>

            {showType.value !== 1 && (
                <div className="itemList flex-1 overflow-auto scrollbar-custom">
                    {bids.slice(0, rows).map((e, i) => (
                        <div key={i} className="item flex items-center justify-between py-0.5 relative px-2">
                            <div className="fall text-success font-bold w-1/3 text-left">{formatNumber(e.price, { decimals: showDepth.value, padZero: true, useGrouping: true })}</div>
                            <div className="itemName font-bold w-1/3 text-center">{formatNumber(e.count, { decimals: 4, padZero: true, useGrouping: true })}</div>
                            <div className="itemName font-bold w-1/3 text-right">{formatNumber(mul(e.count, e.price), {decimals: 3, padZero: true, useGrouping: true})}</div>
                            <div className="hightItem fall absolute opacity-30 bg-success top-0 bottom-0 right-0" style={{ width: `${mul(div(e.count, asks[0].count), 100)}%` }} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}