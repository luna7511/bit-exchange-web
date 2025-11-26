import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import usePageTheme from "@/hooks/usePageTheme.ts";

const MainLayout = () => {
    usePageTheme();

    return (
        <>
           <Header />

            <main className="h-[1500px]">
                <Outlet />
            </main>
            <div className="footer h-[50px]"></div>
        </>
    )
}

export default MainLayout;