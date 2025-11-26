import {matchRoutes, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {router} from "@/router";
import {useGlobalStore} from "@/store/useGlobalStore.ts";
import {themeColor} from "@/theme";

const usePageTheme = () => {
    const setTheme = useGlobalStore(state => state.setTheme);
    const location = useLocation();

    useEffect(() => {
        const matches = matchRoutes(router.routes, location);
        if (!matches || matches.length === 0) return;

        const lastMatch = matches[matches.length - 1].route;
        const pageTheme = lastMatch.handle?.theme ?? "light";
        const pageBgColor = lastMatch.handle?.pageBgColor ?? themeColor[pageTheme]?.pageBgColor;

        setTheme(pageTheme);
        document.documentElement.style.backgroundColor = pageBgColor;
    }, [location, setTheme]);
}

export default usePageTheme;