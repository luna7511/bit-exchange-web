import { useEffect, useRef } from "react";
import {type CoinInfo, createDatafeed} from "./createDatafeed.ts"
import {getConfig} from "@/lib/kline/index.js";
import {formatDate} from "@/lib/utils/date.ts";


declare global {
    interface Window {
        TradingView: any;
    }
}
export type {
    CoinInfo
};

interface Props {
    interval?: string;
    theme?: "light" | "dark";
    height?: number | string;
    lang?: "en" | "zh" | "zh-TW";
    timestamp: number;
    coinInfo: CoinInfo;
}

export default function TradingViewChart({
                                             interval = "15",
                                             theme = "light",
                                             height = 600,
                                             lang = "en",
                                             timestamp = Date.now(),
                                             coinInfo
                                         }: Props) {

    const containerRef = useRef<HTMLDivElement | null>(null);
    const widgetRef = useRef<any>(null);


    const widgetId= `tv_chart_${coinInfo.symbol}_${Date.now()}`;

    // 主题 CSS

    useEffect(() => {
        const scriptLoaded = !!window.TradingView;

        function initChart() {
            if (!containerRef.current) return;

            const widget = new window.TradingView.widget({
                symbol: coinInfo.symbol,
                theme,
                debug: false,
                autosize: true,
                // 默认分辨率
                interval: interval,
                container_id: widgetId,
                datafeed: createDatafeed(coinInfo),
                library_path: '/charting_library/',
                custom_css_url: `../tradingview_${theme}.css`,
                locale: lang,

                // timezone: 'Asia/Hong_Kong',
                // 自定义日期格式化
                customFormatters: {
                    dateFormatter: {
                        format(date: Date) {
                            return formatDate(date.getTime(), 'DD/MM/YYYY')
                        }
                    },
                    timeFormatter: {
                        format(date: Date) {
                            return formatDate(date.getTime(), 'HH:mm:ss')
                        }
                    }
                },

                // preset: 'mobile',
                ...getConfig(theme)
            });

            widget.onChartReady(() => {
                // createStudy()
            })
            widgetRef.current = widget;
        }

        if (scriptLoaded) {
            initChart();
        } else {
            const script = document.createElement("script");
            script.src = "/charting_library/charting_library.min.js";
            script.onload = initChart;
            document.body.appendChild(script);
        }

        return () => {
            if (widgetRef.current) {
                widgetRef.current.remove();
            }
        };
    }, [coinInfo, interval, theme, lang, timestamp]);

    return (
        <>
            <div
                id={widgetId}
                ref={containerRef}
                style={{ height }}
            />
        </>
    );
}