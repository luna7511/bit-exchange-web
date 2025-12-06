import Box from "@mui/material/Box";
import {DrawMenu} from "@/components/DrawMenu";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Divider from "@mui/material/Divider";
import {useTradeStore} from "@/store/useTradeStore.ts";
import QuoteList from "../QuoteList";
import {useTranslation} from "react-i18next";
import {useState} from "react";

const QuoteNavBar = () => {
    const { t } = useTranslation("kline");
    const currentTradePair = useTradeStore(state => state.currentTradePair);

    const [openQuoteList, setOpenQuoteList] = useState(false)
    return (
        <>
            <Box className={" h-auto md:h-[var(--navBarHeight)] bg-black flex items-center gap-3 absolute z-30 ml-4  md:ml-[140px] top-1 md:top-0 lg:hidden"}>
                <div >
                    <div className={"flex items-center gap-1"}>
                        <img width={15} height={15} src={currentTradePair?.pairIcon} />
                        <div className={"flex items-center"}>
                            <span className="font-normal">{currentTradePair?.pairName}</span>
                            {/*<ArrowDropDownIcon className="text-xl! -ml-1" />*/}
                        </div>
                    </div>
                    <div className="text-white/50 text-xs text-left">{t("chooseTradePair")}</div>
                </div>

                <Box>
                    <span className="tracking-wider text-sm ">615 TWD</span>
                    <Box className="text-xs text-white/50">
                        {t("latestTradePrice")}
                    </Box>
                </Box>

                <Box>
                    <span className="tracking-wider text-sm  text-success">+0.64%</span>
                    <Box className="text-xs text-white/50">
                        {t("last24h")}
                    </Box>
                </Box>
            </Box>
            <Box className={"hidden lg:flex  items-center p-2 h-[var(--navBarHeight)] gap-4"}>
                <DrawMenu
                    open={openQuoteList}
                    onOpenChange={setOpenQuoteList}
                    triggerClass={"p-0!"}
                    triggerIcon={<ArrowDropDownIcon className="text-3xl! ml-1" />}
                    triggerLabel={
                        <div className={"flex items-center gap-2"}>
                            <img  width={35} height={35} src={currentTradePair?.pairIcon} />
                            <span className="text-lg font-bold">{currentTradePair?.pairName}</span>
                        </div>
                    }
                >
                    <QuoteList itemChange={() => setOpenQuoteList(false)} />
                </DrawMenu>

                <Divider flexItem orientation="vertical" sx={{
                    height: "100%",
                }}  />

                <Box className={"flex items-center gap-6"}>
                    <Box className="tracking-widest">
                        <Box className="text-xl font-bold text-success">
                            <span>96.356</span>
                            <span className="ml-1">TWD</span>
                        </Box>
                        <span className="text-sm text-white/60">≈3075.8059</span>
                    </Box>
                    <Box>
                        <Box className="text-xs text-white/60">
                            {t("last24hChange")}
                        </Box>
                        <span className="tracking-wider text-sm  text-success font-bold">615(+0.64%)</span>
                    </Box>
                    <Box>
                        <Box className="text-xs text-white/60">
                            {t("last24hHigh")}
                        </Box>
                        <span className="tracking-wider text-sm font-bold">615(+0.64%)</span>
                    </Box>
                    <Box>
                        <Box className="text-xs text-white/60">
                            {t("last24hLow")}
                        </Box>
                        <span className="tracking-wider text-sm font-bold">615(+0.64%)</span>
                    </Box>
                    <Box>
                        <Box className="text-xs text-white/60">
                            {t("last24hVolume")}
                        </Box>
                        <span className="tracking-wider text-sm font-bold">615(+0.64%)</span>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default QuoteNavBar