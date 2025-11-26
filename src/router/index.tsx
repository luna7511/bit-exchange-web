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

                {/* 交易页 */}
                <Route path="trade" element={<TradePage />} />

                <Route path="userTerms" element={<TermsPage type={"TERMS_CLAUSE"}  />} handle={{ theme: "dark" }} />
            </Route>

            {/* 交易页 */}
            {/*<Route path="trade" element={<AuthLayout />}>*/}
            {/*    <Route index element={<TradePage />} />*/}
            {/*</Route>*/}
        </>
    )
);