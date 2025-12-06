import Tab from "@mui/material/Tab";
import Tabs, {tabsClasses} from "@mui/material/Tabs";
import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";
import QuoteNavBar from "@/pages/tradePage/Trade/components/QuoteNavBar";
import PlaceOrder from "@/pages/tradePage/Trade/components/PlaceOrder";
import KLine from "@/pages/tradePage/Trade/components/KLine";
import {useGetTradingPairList} from "@/hooks/api/useKLine.ts";
import Loading from "@/components/Loading";
import {usePlatformStore} from "@/store/usePlatformStore.ts";
import {useTradeStore} from "@/store/useTradeStore.ts";
import MarketDepth from "@/pages/tradePage/Trade/components/MarketDepth";
import OrdersAssets from "@/pages/tradePage/Trade/components/OrdersAssets";
import QuoteList from "@/pages/tradePage/Trade/components/QuoteList";



const Item = styled(Paper)(({ theme }) => ({
    borderRadius: 0,
    backgroundColor: '#fff',
    padding: theme.spacing(1),
    color: "#fff",
    height: "100%",
    ...theme.applyStyles('dark', {
        backgroundColor: 'rgb(19, 21, 26)',
    }),
}));




const Quote = () => <div className="p-4">报价内容</div>;
const Market = () => <div className="p-4">市场内容</div>;
const OrderForm = () => <div className="p-4">下单区域</div>;
const Orders = () => <div className="p-4">订单内容</div>;
const Assets = () => <div className="p-4">资产内容</div>;

const tabBarHeight = 60;
const TradeHome = () => {
    const [tab, setTab] = useState("quote");

    const tabs = [
        { label: "报价", value: "quote" },
        { label: "市场", value: "market" },
        { label: "下单", value: "order" },
        { label: "订单", value: "orders" },
        { label: "资产", value: "assets" },
    ];

    const platformConfig = usePlatformStore(state => state.platformConfig);
    const market = useTradeStore(state => state.market);
    const currentTradePair = useTradeStore(state => state.currentTradePair);

    const symbol = currentTradePair.pairName as string;
    const coin = currentTradePair.baseCurrency as string
    const quoteCoin = currentTradePair.quoteCurrency as string
    const coinInfo = {
        platformName: platformConfig.platformName as string,
        symbol,
        symbolUpperCase: symbol,
        coin: coin,
        coinUpperCase: coin,
        quoteCoin: quoteCoin,
        quoteCoinUpperCase: quoteCoin,
        priceScale: 100000,
        market
    }

    const { isPending } = useGetTradingPairList();

    if (isPending) {
        return <Loading />;
    }

    return (
        <div className="w-full">
            <div className={"lg:hidden"}>
                <QuoteNavBar />
            </div>
            {/* PC Layout */}
            <Box
                className="hidden lg:grid grid-cols-12 gap-1"
                sx={{ height: '120vh' }}
            >
                <Box className="col-span-12">
                    <Item>
                        <QuoteNavBar />
                    </Item>
                </Box>

                <Box className="col-span-6 h-[70vh]">
                    <Item sx={{
                        padding: 0,
                    }}>
                        <KLine coinInfo={coinInfo} />
                    </Item>
                </Box>

                <Box className="col-span-3 h-[70vh]">
                    <Item sx={{
                        padding: 0,
                    }}>
                        <MarketDepth coinInfo={coinInfo} type={"all"} />
                    </Item>
                </Box>

                <Box className="col-span-3 row-span-2">
                    <Item>
                        <PlaceOrder coinInfo={coinInfo} />
                    </Item>
                </Box>

                <Box className="col-span-9 h-[50vh]">
                    <Item sx={{
                        padding: 0,
                    }}>
                        <OrdersAssets coinInfo={coinInfo} type={["all"]} />
                    </Item>
                </Box>
            </Box>


            {/* Mobile Layout */}
            <div className="lg:hidden" style={{
                paddingBottom: `${tabBarHeight}px`,
            }}>
                {tab === "quote" && (
                    <div className={"p-2"}>
                        <Item>
                            <QuoteList />
                        </Item>
                    </div>
                )}
                {tab === "market" && (
                    <div className={"p-2"}>
                        <div className="h-[400px]">
                            <Item>
                                <KLine coinInfo={coinInfo} />
                            </Item>
                        </div>
                        <div className={"h-2"} />
                        <Item>
                            <MarketDepth coinInfo={coinInfo} type={"trades"} />
                        </Item>
                    </div>
                )}
                {tab === "order" && (
                    <div className={"p-2"}>
                        <Item>
                            <PlaceOrder coinInfo={coinInfo} />
                        </Item>
                        <div className={"h-2"} />
                        <Item>
                            <MarketDepth coinInfo={coinInfo} type={"orderBook"} />
                        </Item>
                    </div>
                )}
                {tab === "orders" && (
                    <div className={"p-2"}>
                        <Item>
                            <OrdersAssets coinInfo={coinInfo} type={["openOrders", "filledOrders"]} />
                        </Item>
                    </div>
                )}
                {tab === "assets" && (
                    <div className={"p-2"}>
                        <Item>
                            <OrdersAssets coinInfo={coinInfo} type={["assets"]} />
                        </Item>
                    </div>
                )}

                <Tabs
                    value={tab}
                    variant="fullWidth"
                    onChange={(_, newValue) => setTab(newValue)}
                    sx={{
                        position: "fixed",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 100,
                        // marginBlock: "12px",
                        backgroundColor: "rgb(37, 53, 80)",
                        [`& .${tabsClasses.indicator}`]: {
                            height: 0,
                        },
                    }}
                >
                    {tabs.map((item) => (
                        <Tab
                            key={item.value}
                            label={item.label}
                            value={item.value}
                            disableRipple
                            sx={{
                                minWidth: "auto",
                                paddingInline: "0",
                                height: `${tabBarHeight}px`,
                                color: "#fff",
                                "&.Mui-selected": { color: "var(--primary)" },
                            }}
                        />
                    ))}
                </Tabs>
            </div>
        </div>
    );
}

export default TradeHome;