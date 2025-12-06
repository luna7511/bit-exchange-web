import { lazy } from "react";
import { createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom";

// layouts
const MainLayout = lazy(() =>
    import(/* @vite-chunk: "main-layout" */ "@/layouts/MainLayout")
);

const AuthLayout = lazy(() =>
    import(/* @vite-chunk: "trade-layout" */ "@/layouts/AuthLayout")
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

const SwapPage = lazy(() =>
    import(/* @vite-chunk: "swap-page" */ "@/pages/swapPage/swap/")
);


const TermsPage = lazy(() =>
    import(/* @vite-chunk: "home-terms" */ "@/pages/commonPage/Terms")
);

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="users" element={<AuthLayout />}>
                <Route path="signIn" element={<LoginPage />} handle={{ theme: "dark", pageBgColor: "#1B2333" }} />
                <Route path="signUp" element={<RegisterPage />} handle={{ theme: "dark", pageBgColor: "#1B2333" }} />
            </Route>

            {/* 主站 */}
            <Route element={<MainLayout />}>
                <Route index element={<HomePage />} />

                {/* 一键买卖 */}
                <Route path="swap" element={<SwapPage />} handle={{ theme: "dark", pageBgColor: "#ffffff" }} />

                {/*隐私协议*/}
                <Route path="privacyPolicy" element={<TermsPage />} handle={{ theme: "dark", title: "common:privacyPolicy", type: "3"  }} />
                {/*许可证*/}
                <Route path="license" element={<TermsPage />} handle={{ theme: "dark", title: "common:license", type: "4" }} />
            </Route>

            <Route path="trade" element={<MainLayout hiddenFooter />}>
                {/* 交易页 */}
                <Route index element={<TradePage />} handle={{ theme: "black"  }} />
            </Route>
        </>
    )
);