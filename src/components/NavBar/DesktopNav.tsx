import { Box, Divider } from "@mui/material";
import { Button, IconButton } from "@/components/Button";
import { DrawMenu, DrawMenuItem } from "../DrawMenu";
import {type MenuItemType} from "./types";
import {cn} from "@/lib/utils";
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";
import {useTranslation} from "react-i18next";

export default function DesktopNav({
                                       menuItems,
                                       userMenuItems,
                                   }: {
    menuItems: MenuItemType[];
    userMenuItems: MenuItemType[];
}) {
    const {t} = useTranslation("auth")
    const heightClass = "h-[var(--navbarHeight)]";

    const navigate = useNavigate();

    const toLink = useCallback((url?: string) => {
        if (url) {
            navigate(url);
        }
    }, []);

    return (
        <Box className="hidden lg:flex justify-between flex-1">
            {/* ------- 左侧菜单 ------- */}
            <Box className="flex gap-4">
                {menuItems.map((item) =>
                    item.children ? (
                        <DrawMenu
                            key={item.label}
                            TriggerComponent={
                                <Button
                                    className={heightClass}
                                    color="inherit"
                                    variant="text"
                                    sx={{
                                        paddingInline: "8px !important",
                                        "&:hover": {
                                            backgroundColor: "transparent"
                                        }
                                    }}
                                >
                                    {item.icon}
                                    {item.label}
                                </Button>
                            }
                        >
                            {item.children.map((child) => (
                                <DrawMenuItem
                                    key={child.label}
                                    icon={child.icon}
                                    label={child.label}
                                    description={child.desc}
                                    className="min-w-[250px]!"
                                    onClick={() => toLink(child.url)}
                                />
                            ))}
                        </DrawMenu>
                    ) : (
                        <Button key={item.label} color="inherit" variant="text" sx={{
                            paddingInline: "8px !important",
                            "&:hover": {
                                backgroundColor: "transparent"
                            }
                        }} className={heightClass} onClick={() => toLink(item.url)}>
                            {item.icon}
                            {item.label}
                        </Button>
                    )
                )}
            </Box>

            {/* ------- 右侧用户菜单 ------- */}
            <Box className="flex gap-4 items-center">
                <div>
                    <Button color="info" size="extraSmall" sx={{
                        borderRadius: '35px',
                    }} onClick={() => toLink("/users/signIn")}>{t("sigIn")}</Button>
                </div>
                <div>
                    <Button size="extraSmall" sx={{
                        borderRadius: '35px',
                    }} onClick={() => toLink("/users/signUp")}>{t("signUp")}</Button>
                </div>
                <Divider flexItem orientation="vertical" sx={{
                    height: "30px",
                    alignSelf: "center",
                }}  />

                {userMenuItems.map((item) =>
                    item.children ? (
                        <DrawMenu
                            key={item.label}
                            triggerIcon={item.icon}
                            hideArrow
                            TriggerComponent={
                                <IconButton key={item.label} color="inherit" sx={{
                                    padding: "0 6px"
                                }} className={heightClass}>
                                    {item.icon}
                                </IconButton>
                            }
                        >
                            {item.children.map((child) => (
                                <DrawMenuItem
                                    key={child.label}
                                    icon={child.icon}
                                    label={child.label}
                                    onClick={() => toLink(child.url)}
                                />
                            ))}
                        </DrawMenu>
                    ) : (
                        <IconButton key={item.label} color="inherit" sx={{
                            padding: "0 6px"
                        }} className={cn(heightClass)} onClick={() => toLink(item.url)}>
                            {item.icon}
                        </IconButton>
                    )
                )}
            </Box>
        </Box>
    );
}