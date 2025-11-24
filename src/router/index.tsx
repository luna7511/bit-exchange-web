import { lazy } from "react";
import { createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom";

// layouts
const MainLayout = lazy(() =>
    import(/* @vite-chunk: "main-layout" */ "@/layouts/MainLayout")
);

const TradeLayout = lazy(() =>
    import(/* @vite-chunk: "trade-layout" */ "@/layouts/TradeLayout")
);

// auth pages
const LoginPage = lazy(() =>
    import(/* @vite-chunk: "common-login" */ "@/pages/commonPage/Login")
);

const RegisterPage = lazy(() =>
    import(/* @vite-chunk: "common-register" */ "@/pages/commonPage/Register")
);

// main pages
const TradePage = lazy(() =>
    import(/* @vite-chunk: "trade-page" */ "@/pages/tradePage/Trade")
);

const HomePage = lazy(() =>
    import(/* @vite-chunk: "home-page" */ "@/pages/homePage/Home")
);

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            {/* 主站 */}
            <Route element={<MainLayout />}>
                <Route index element={<HomePage />} />
            </Route>

            {/* 交易页 */}
            <Route path="trade" element={<TradeLayout />}>
                <Route index element={<TradePage />} />
            </Route>
        </>
    )
);