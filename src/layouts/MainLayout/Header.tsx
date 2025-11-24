import HomeIcon from "@mui/icons-material/Home";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import type {MenuItemType} from "@/components/NavBar/types.ts";
import NavBar from "@/components/NavBar";
import {useEffect, useRef, useState} from "react";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import QrCodeIcon from '@mui/icons-material/QrCode';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import {cn} from "@/lib/utils.ts";
import { useTranslation } from "react-i18next";

const colorSize = {
    fontSize: "20px"
}
export default function Header() {
    const {t} = useTranslation("header");
    const MENU_ITEMS: MenuItemType[] = [
        { label: t("oneClickTrade") },
        {
            label: t("trade"),
            children: [
                { label: t("spotTrade"), desc: t("multiOrderSupport"), icon: <HomeIcon sx={colorSize} /> },
                { label: t("networkBot"),desc: t("autoTrading"),  icon: <CreditCardIcon sx={colorSize} /> },
            ],
        },
        {
            label: t("finance"),
            children: [
                { label: "Debt", icon: <HomeIcon sx={colorSize} /> },
                { label: t("fixedInvestment"), icon: <AccessTimeIcon sx={colorSize} /> },
            ],
        },
        { label: t("referralReward") },
        { label: "BITO" },
    ];

    const USER_MENU_ITEMS: MenuItemType[] = [
        { label: t("notification"), icon: <NotificationsNoneOutlinedIcon sx={colorSize} /> },
        {
            label: t("customerService"),
            icon: <HomeIcon sx={colorSize} />,
        },
        {
            label: t("qrCode"),
            icon: <QrCodeIcon sx={colorSize} />,
        },
        {
            label: t("help"),
            icon: <InfoOutlineIcon sx={colorSize} />,
            children: [
                { label: t("faq")},
                { label: t("limitsFees")},
                { label: t("contactUs") },
            ],
        },
    ];

    const [isFixed, setIsFixed] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < lastScrollY.current) {
                // 向上滚动
                setIsFixed(true);
            } else {
                // 向下滚动
                setIsFixed(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navHeight = 64;
    return (
        <>
            <div className={cn(
                "fixed left-0 w-full z-50 transition-transform duration-300 ease-in-out",
                isFixed ? "translate-y-0" : "-translate-y-full"
            )}>
                <NavBar
                    menuItems={MENU_ITEMS}
                    userMenuItems={USER_MENU_ITEMS}
                    height={navHeight}
                />
            </div>
            <div style={{
                height: `${navHeight}px`,
            }} />
        </>
    );
}