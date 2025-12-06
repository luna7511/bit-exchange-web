import TradingViewChart, { type CoinInfo } from "@/components/TradingViewWidget";
import {useGlobalStore} from "@/store/useGlobalStore.ts";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {useTranslation} from "react-i18next";
import {getIntervalList} from "@/lib/kline/index.js";
import RefreshIcon from '@mui/icons-material/Refresh';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import QuoteNavBar from "@/pages/tradePage/Trade/components/QuoteNavBar";
import Divider from "@mui/material/Divider";
import {Button, IconButton} from "@/components/Button";
import {DrawMenu, DrawMenuItem} from "@/components/DrawMenu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const KLine = ({ coinInfo }: {coinInfo: CoinInfo}) => {
    const theme = "dark";
    const lang = useGlobalStore(state => state.lang);


    const [timestamp, setTimestamp] = useState(Date.now());
    const refresh = () => {
        setTimestamp(Date.now());
    }

    const intervalList = getIntervalList();
    const [interval, setInterval] = useState(intervalList[0]);
    const {t} = useTranslation("kline");


    const [isFull, setIsFull] = useState(false);

    // 进入全屏
    function toFull() {
        const el = document.getElementById("kline-container");
        if (!el) return;

        if (el.requestFullscreen) {
            el.requestFullscreen();
        } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
        } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
        }
    }

    // 退出全屏
    function exitFull() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    // 全屏状态监听
    useEffect(() => {
        function handleFullChange() {
            const isFullscreen =
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.msFullscreenElement;

            setIsFull(!!isFullscreen);
        }

        document.addEventListener("fullscreenchange", handleFullChange);
        document.addEventListener("webkitfullscreenchange", handleFullChange);
        document.addEventListener("msfullscreenchange", handleFullChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullChange);
            document.removeEventListener("webkitfullscreenchange", handleFullChange);
            document.removeEventListener("msfullscreenchange", handleFullChange);
        };
    }, []);


    return (
        <div className="h-full flex flex-col" id={"kline-container"}>
            {
                isFull && (
                    <div className={"px-4"}>
                        <QuoteNavBar />
                        <Divider className={"my-1"} />
                    </div>
                )
            }
            <div className={cn(
                ' flex py-2 px-4 items-center gap-4',
                !isFull ? 'justify-between' : undefined
            )}>
                <span className={"lg:hidden mr-auto text-sm"}>
                    {t("trendChart")}
                </span>
                <div className={'hidden lg:flex gap-x-4 gap-y-1 items-center flex-wrap'}>
                    {
                        intervalList.map((item: {interval: string; labelKey: string; labelPrefix: string})  => (
                            <span key={item.interval} className={cn(
                                "text-[13px] text-white/70 cursor-pointer",
                                interval.interval === item.interval ? "text-primary" : undefined
                            )} onClick={() => setInterval(item)}>
                            {`${item.labelPrefix}${t(t(item.labelKey))}`}
                        </span>
                        ))
                    }
                </div>
                <div className={"lg:hidden"}>
                    <DrawMenu
                        className={"border px-1"}
                        TriggerComponent={
                            <Button variant={"text"} size={"extraSmall"} sx={{
                                minWidth: "auto",
                                padding: "0 4px",
                            }}>{`${interval.labelPrefix}${t(t(interval.labelKey))}`}</Button>
                        }
                        triggerIcon={<ExpandMoreIcon className="-ml-1" />}
                        direction={"horizontal"}
                        slot={{
                            Paper: {
                                sx: {
                                    maxWidth: "250px"
                                }
                            }
                        }}
                    >
                        {intervalList.map((item) => (
                            <DrawMenuItem
                                className={"min-w-auto! text-sm!"}
                                key={item.labelKey}
                                label={`${item.labelPrefix}${t(t(item.labelKey))}`}
                                onClick={() => setInterval(item)}
                            />
                        ))}
                    </DrawMenu>
                </div>
                <div className={'flex gap-4 items-center'}>
                    <div className={cn(
                        "lg:hidden",
                        isFull && "lg:block"
                    )}>
                        <Divider flexItem orientation="vertical" sx={{
                            height: "24px",
                        }}  />
                    </div>

                    <RefreshIcon className={"cursor-pointer"} onClick={refresh} />
                    <div className={"hidden lg:block"}>
                        {
                            isFull ? (
                                    <FullscreenExitIcon className={"cursor-pointer"} onClick={exitFull} />
                                ) :
                                <FullscreenIcon className={"cursor-pointer"} onClick={toFull} />
                        }
                    </div>
                </div>
            </div>
            <Divider />
            <TradingViewChart
                interval={interval}
                theme={theme}
                height={`100%`}
                lang={lang === "zh-CN" ? "zh" : lang}
                timestamp={timestamp}
                coinInfo={coinInfo}
            />
        </div>
    )
}

export default KLine