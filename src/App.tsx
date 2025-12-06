import './App.css'
import "./i18n"
import {Suspense, useEffect} from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ThemeProvider } from '@mui/material/styles';
import {useGlobalStore} from "@/store/useGlobalStore.ts";
import darkTheme from "@/theme/dark";
import lightTheme from "@/theme/light";
import i18n from "i18next";
import { Toaster } from 'sonner';
import {useGetPlatformConfig} from "@/hooks/api/useCommon.ts";
import dayjs from "dayjs";

function App() {
    const theme = useGlobalStore(state => state.theme);
    const lang = useGlobalStore((state) => state.lang);

    useEffect(() => {
        if (lang && i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
        dayjs.locale(lang.toLocaleString());
    }, [lang]);

    useGetPlatformConfig();
  return (
    <>
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <Toaster richColors position="top-center" />
            <Suspense fallback={<div>Loading...</div>}>
                <RouterProvider router={router} />
            </Suspense>
        </ThemeProvider>
    </>
  )
}

export default App
