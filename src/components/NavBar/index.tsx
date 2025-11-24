import MUIAppBar, {type AppBarProps} from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import {useEffect, useState} from "react";

import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import {type MenuItemType} from "./types";
import {styled} from "@mui/material/styles";
import {cn} from "@/lib/utils.ts";
import {useGlobalStore} from "@/store/useGlobalStore.ts";
import {themeColor} from "@/theme";


const AppBar = styled(({className, ...props}: AppBarProps) => (
    <MUIAppBar
        className={cn(className, "")}
        {...props}
    />
))(() => ({
    boxShadow: "none",
}));

const NAV_HEIGHT = 64;
export default function NavBar({
                                   menuItems,
                                   userMenuItems,
                                   height = NAV_HEIGHT
                               }: {
    menuItems: MenuItemType[];
    userMenuItems: MenuItemType[];
    height?: number;
}) {
    const theme = useGlobalStore(state => state.theme);
    const [mobileOpen, setMobileOpen] = useState(false);

    const [navHeight, setNavHeight] = useState(height);
    useEffect(() => {
        setNavHeight(height);
    }, [height])

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    "--navbarHeight": `${navHeight}px`,
                    "--navbarBg": themeColor[theme].navBarColor,
                    backgroundColor: "var(--navbarBg)",
                    backgroundImage: "none",
                    color: theme === "light" ? "var(--default)" : "white",
                }}
            >
                <Toolbar className="container mx-auto flex gap-6 px-6 justify-between min-h-auto! max-w-[inherit]!">
                    <Box sx={{ fontWeight: 700, fontSize: 24, lineHeight: navHeight + "px" }}>
                        BitoPro
                    </Box>

                    <DesktopNav menuItems={menuItems} userMenuItems={userMenuItems} />

                    <IconButton className="lg:hidden!" onClick={() => setMobileOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <MobileNav
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                menuItems={menuItems}
                userMenuItems={userMenuItems}
            />
        </>
    );
}