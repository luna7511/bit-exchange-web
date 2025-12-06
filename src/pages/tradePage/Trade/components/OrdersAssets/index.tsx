import {type FC, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import type {CoinInfo} from "@/components/TradingViewWidget";
import {cn} from "@/lib/utils";
import Divider from "@mui/material/Divider";
import OrdersList from "@/pages/tradePage/Trade/components/OrdersList";
import AssetsList from "@/pages/tradePage/Trade/components/AssetsList";

const OrdersAssets: FC<{
    coinInfo: CoinInfo
    type: Array<"all" | "openOrders" | "filledOrders" | "canceledOrders" | "assets">
}> = ({coinInfo, type = ["all"]}) => {
    const { t } = useTranslation("kline");
    const showTypeList = useMemo(() => {
        const list = [];
        if (type.indexOf("all") !== -1 || type.indexOf("openOrders") !== -1) {
            list.push({ value: "openOrders", component: <OrdersList type={"open"} /> });
        }
        if (type.indexOf("all") !== -1 || type.indexOf("filledOrders") !== -1) {
            list.push({ value: "filledOrders", component: <OrdersList type={"filled"} /> });
        }
        if (type.indexOf("all") !== -1 || type.indexOf("canceledOrders") !== -1) {
            list.push({ value: "canceledOrders", component: <OrdersList type={"canceled"} /> });
        }
        if (type.indexOf("all") !== -1 || type.indexOf("assets") !== -1) {
            list.push({ value: "assets", component: <AssetsList /> });
        }
        return list;
    }, [type]);

    const [showType, setShowType] = useState(showTypeList[0]);
    return (
        <div className={"h-full flex flex-col"}>
            <div className={"flex gap-4 items-center px-2"}>
                {
                    showTypeList.map(d => (
                        <span key={d.value} className={cn(
                            "text-[13px] cursor-pointer h-11 px-1 flex items-center",
                            showType.value === d.value ? "text-white border-b" : "text-white/40"
                        )} onClick={() => setShowType(d)}>
                            <span>
                                {t(`${d.value}`)}
                            </span>
                        </span>
                    ))
                }
            </div>
            <Divider className={""} />

            <div className={"flex-1 overflow-hidden"}>
                {
                    showType.component
                }
            </div>
        </div>
    )
}
export default OrdersAssets