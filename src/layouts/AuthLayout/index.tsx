import type {CSSProperties} from "react";
import Header from "./header.tsx";
import {Outlet} from "react-router-dom";
import usePageTheme from "@/hooks/usePageTheme.ts";
import {cn} from "@/lib/utils.ts";

const TradeLayout = () => {
    usePageTheme();

    return (
        <div style={{
            "--navbarBg": "#1B2333",
        } as CSSProperties} className="bg-[#1B2333] text-white">

            <Header />

            <main className={cn(
                "bg-[rgba(0,0,0,0.4)] my-6 mx-6 text-center px-6 py-8 rounded-xl",
                "md:max-w-[75%] md:ml-[12.5%] md:px-16",
                "lg:max-w-[50%] lg:ml-[25%]"

            )}>
                <Outlet />
            </main>
        </div>
    )
}

export default TradeLayout;