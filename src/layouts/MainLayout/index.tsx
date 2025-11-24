import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";

const MainLayout = () => {
    return (
        <>
           <Header />

            <main>
                <Outlet />
            </main>
            <div className="footer h-[50px]"></div>
        </>
    )
}

export default MainLayout;