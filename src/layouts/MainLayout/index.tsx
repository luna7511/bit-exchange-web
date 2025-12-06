import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import usePageTheme from "@/hooks/usePageTheme.ts";
import {type FC, useEffect, useState} from "react";

const MainLayout: FC<{
    hiddenFooter?: boolean;
}> = ({
                            hiddenFooter
                        }) => {

    const [navHeight, setNavHeight] = useState(56);

    useEffect(() => {
        const updateHeight = () => {
            const height = window.innerWidth >= 1024 ? 64 : 56
            setNavHeight(height); // lg = 1024px
            document.body.style.setProperty("--navBarHeight", `${height}px`);
        };

        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);
    const footerHeight = 150;
    usePageTheme();


    return (
        <>
           <Header navHeight={navHeight} />

            <main style={{
                minHeight: `calc(100vh - ${navHeight + (hiddenFooter ? 0 : footerHeight)}px)`
            }}>
                <Outlet />
            </main>
            {
                !hiddenFooter && <div style={{
                    minHeight: `${footerHeight}px`
                }} className="footer  bg-white" />
            }
        </>
    )
}

export default MainLayout;