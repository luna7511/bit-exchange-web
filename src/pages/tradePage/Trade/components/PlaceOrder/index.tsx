import {type FC, useState} from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {Button} from "@/components/Button";
import { Input } from "@/components/Input";
import {useTranslation} from "react-i18next";
import {cn} from "@/lib/utils";
import type {CoinInfo} from "@/components/TradingViewWidget";
import {CheckBox} from "@/components/ChenkBox";
import {useGlobalStore} from "@/store/useGlobalStore.ts";
import {useNavigate} from "react-router-dom";
import Slider from "@mui/material/Slider";
import FormControlLabel from "@mui/material/FormControlLabel";
import {styled} from "@mui/material/styles";
import {Fragment} from "react/jsx-runtime";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@/components/Dialog";
import { Tooltip } from "@/components/Tooltip";


const PrettySlider = styled(Slider)({
    color: 'rgba(225, 225, 225, 0.2)',
    height: 6,
    '& .MuiSlider-track': {
        // border: "5px solid rgb(19, 21, 26)',"
    },
    '& .MuiSlider-mark[data-index="0"]': {
        transform: "translate(-1px, -50%)",
    },
    '& .MuiSlider-mark': {
        width: '10px',
        height: '10px',
        border: "2px solid #fff6",
        borderRadius: '100%',
        backgroundColor: '#000',
        transform: "translate(-10px, -50%)",
    },
    '& .MuiSlider-thumb': {
        height: 18,
        width: 18,
        backgroundColor: '#000',
        border: '3px solid var(--primary)',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&::before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: "var(--primary)",
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&::before': {display: 'none'},
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
});

const PlaceOrder: FC<{
    coinInfo: CoinInfo;
}> = ({
                            coinInfo
                        }) => {
    const isLoggedIn = useGlobalStore(state => state.isLoggedIn);
    const {t} = useTranslation(["kline", "auth", "common"]);

    const orderDirList = [
        {value: "buy", label: "buy", color: "success"},
        {value: "sell", label: "sell", color: "error"},
    ];
    const [orderDir, setOrderDir] = useState(orderDirList[0]);
    const orderTypeList = [
        {value: "priceLimit", label: "priceLimit"},
        {value: "marketPrice", label: "marketPrice"},
        {value: "priceHits", label: "priceHits"}
    ]

    const [orderType, setOrderType] = useState(orderTypeList[0].value);


    const marks = [
        {
            value: 0,
        },
        {
            value: 25,
        },
        {
            value: 50,
        },
        {
            value: 75,
        },
        {
            value: 100,
        },
    ];

    const navigate = useNavigate();
    const handleSubmit = () => {
        if (!isLoggedIn) {
            navigate("/users/signIn")
            return;
        }
    }

    const [openDialog, setOpenDialog] = useState(false);
    const handleClose = () => {
        setOpenDialog(false);
    }
    const toMarkOrder = () => {
        setOpenDialog(false);
        setOrderType("marketPrice");
    }
    const changeOrderType = (value: string) => {
        if (value === orderType) {
            return;
        }
        if (value === "marketPrice") {
            setOpenDialog(true);
            return
        }
        setOrderType(value);
    }
    return (
        <Box className={"px-1"}>
            <div className={'-mt-2'}>
                <div className={" text-base lg:text-lg inline-flex items-center px-1 text-primary border-b-2 border-primary h-11"}>
                    <span>
                        {t("spotGoods")}
                    </span>
                </div>
                <Divider  />
            </div>

            <div className={"pb-4 pt-5"}>
                <div className={"flex rounded-lg bg-[#424242]"}>
                    {
                        orderDirList.map(item => (
                            <Button onClick={() => setOrderDir(item)} fullWidth color={item.value === orderDir.value ? item.color :  "inherit"}
                                   className={item.value !== orderDir.value ? "text-white/40!" : ""} size={"extraSmall"}>{t(item.label)}</Button>
                        ))
                    }
                </div>

                <div className={"flex gap-4 text-sm pb-2 pt-4"}>
                    {orderTypeList.map(item => {
                        if (item.value === "priceHits") {
                            return (
                                <Tooltip title={
                                    <span className={"text-base"}>
                                        {t("priceHitsTips")}
                                    </span>
                                }>
                                    <span className={cn(
                                        "cursor-pointer",
                                        orderType === item.value ? "text-primary font-bold" : "text-white",
                                        "border-b-2 border-dashed",
                                    )} onClick={() => changeOrderType(item.value)}>
                                        {t(item.label)}
                                    </span>
                                </Tooltip>

                            )
                        } else {
                            return (
                                <span className={cn(
                                    "cursor-pointer",
                                    orderType === item.value ? "text-primary font-bold" : "text-white",
                                    item.value === "priceHits" ? "border-b-2 border-dashed" : "",
                                )} onClick={() => changeOrderType(item.value)}>
                                    {t(item.label)}
                                </span>
                            )
                        }
                    })}
                </div>

                <Input
                    size={"small"}
                    fullWidth
                    placeholder=""
                    sx={{
                        '& .MuiInputBase-input': {
                            textAlign: "right"
                        }
                    }}
                    slotProps={{
                        input: {
                            startAdornment: <span className={"text-sm text-white/50 whitespace-nowrap"}>{t("price")}</span>,
                            endAdornment: <span className={"text-sm text-white/50 whitespace-nowrap"}>{coinInfo.quoteCoinUpperCase}</span>,
                        },
                    }}
                />
                <Input
                    size={"small"}
                    fullWidth
                    placeholder=""
                    sx={{
                        '& .MuiInputBase-input': {
                            textAlign: "right"
                        }
                    }}
                    slotProps={{
                        input: {
                            startAdornment: <span className={"text-sm text-white/50 whitespace-nowrap"}>{t("number")}</span>,
                            endAdornment: <span className={"text-sm text-white/50 whitespace-nowrap"}>{coinInfo.coinUpperCase}</span>,
                        },
                    }}
                />
                <div className={"px-2"}>
                    <PrettySlider
                        defaultValue={0}
                        marks={marks}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `${value}%`}
                    />
                </div>
                <Input
                    size={"small"}
                    fullWidth
                    placeholder=""
                    sx={{
                        '& .MuiInputBase-input': {
                            textAlign: "right"
                        }
                    }}
                    slotProps={{
                        input: {
                            startAdornment: <span className={"text-sm text-white/50 whitespace-nowrap"}>{t("totalPrice")}</span>,
                            endAdornment: <span className={"text-sm text-white/50 whitespace-nowrap"}>{coinInfo.quoteCoinUpperCase}</span>,
                        },
                    }}
                />


                <div className={"p-2 pt-4 pb-5"}>
                    <FormControlLabel control={
                        <CheckBox size={"small"} />
                    } label={
                        <Tooltip placement={"top"} title={
                            <div>
                                <div>{t("onlyMakerOderTips1")}</div>
                                <div className={"h-4"} />
                                <div>{t("onlyMakerOderTips2")}</div>
                            </div>
                        }>
                            <span className={"border-b-2 border-dashed text-sm"}>
                                {t("onlyMakerOder")}
                            </span>
                        </Tooltip>
                    } />
                    <div className={"mt-1"}>
                        <FormControlLabel control={
                            <CheckBox size={"small"} />
                        } label={
                            <Tooltip title={t("takeProfitTips")} placement={"top"}>
                                <span className={"border-b-2 border-dashed text-sm"}>
                                    {t("takeProfit")}
                                </span>
                            </Tooltip>
                        } />
                        <FormControlLabel className={"ml-2!"} control={
                            <CheckBox size={"small"} />
                        } label={
                            <Tooltip title={t("stopLossTips")} placement={"top"}>
                                <span className={"border-b-2 border-dashed text-sm"}>
                                    {t("stopLoss")}
                                </span>
                            </Tooltip>
                        } />
                    </div>
                </div>

                <Button onClick={() => handleSubmit()} fullWidth color={orderDir.color} sx={{
                    borderRadius: "45px",
                }}
                >{isLoggedIn ? t(orderDir.label) : t("auth:sigIn")}</Button>


                <div className={"px-2 pt-3"}>
                    <FormControlLabel control={
                        <CheckBox size={"small"} />
                    } label={
                        <span className={"text-sm"}>
                            {t("payTransactionFee")}
                        </span>
                    } />
                </div>
            </div>

            <Fragment>
                <Dialog
                    open={openDialog}
                    onClose={handleClose}
                    maxWidth={"xs"}
                >
                    <DialogTitle>
                        {t("marketPriceTipsTitle")}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t("marketPriceTipsContent")}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color={"inherit"} size={"small"} variant={"outlined"} onClick={toMarkOrder}>
                            {t("common:continue")}
                        </Button>
                        <Button onClick={handleClose} autoFocus size={"small"}>
                            {t("common:cancel")}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        </Box>
    )
}

export default PlaceOrder;