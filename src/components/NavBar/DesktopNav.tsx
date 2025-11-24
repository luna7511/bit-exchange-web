import { Box, Divider } from "@mui/material";
import { Button, IconButton } from "@/components/Button";
import { DrawMenu, DrawMenuItem } from "../DrawMenu";
import {type MenuItemType} from "./types";
import {cn} from "@/lib/utils.ts";

export default function DesktopNav({
                                       menuItems,
                                       userMenuItems,
                                   }: {
    menuItems: MenuItemType[];
    userMenuItems: MenuItemType[];
}) {
    const heightClass = "h-[var(--navbarHeight)]";
    return (
        <Box className="hidden lg:flex justify-between flex-1">
            {/* ------- 左侧菜单 ------- */}
            <Box className="flex gap-4">
                {menuItems.map((item) =>
                    item.children ? (
                        <DrawMenu
                            key={item.label}
                            triggerIcon={item.icon}
                            triggerLabel={item.label}
                        >
                            {item.children.map((child) => (
                                <DrawMenuItem
                                    key={child.label}
                                    icon={child.icon}
                                    label={child.label}
                                    description={child.desc}
                                    className="min-w-[250px]!"
                                />
                            ))}
                        </DrawMenu>
                    ) : (
                        <Button key={item.label} color="inherit" variant="text" className={heightClass}>
                            {item.icon}
                            {item.label}
                        </Button>
                    )
                )}
            </Box>

            {/* ------- 右侧用户菜单 ------- */}
            <Box className="flex gap-4 items-center">
                <div>
                    <Button color="info" size="small" sx={{
                        borderRadius: '35px',
                    }}>登录</Button>
                </div>
                <div>
                    <Button size="small" sx={{
                        borderRadius: '35px',
                    }}>注册</Button>
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
                                />
                            ))}
                        </DrawMenu>
                    ) : (
                        <IconButton key={item.label} color="inherit" sx={{
                            padding: "0 6px"
                        }} className={cn(heightClass)}>
                            {item.icon}
                        </IconButton>
                    )
                )}
            </Box>
        </Box>
    );
}