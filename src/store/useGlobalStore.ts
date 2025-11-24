import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GlobalState {
    theme: "light" | "dark" | "black";
    lang: "en" | "zh-CN";
    isMobile: boolean;
    isLoggedIn: boolean;
    setTheme: (v: GlobalState["theme"]) => void;
    setLang: (v: GlobalState["lang"]) => void;
    setIsMobile: (v: boolean) => void;
    setIsLoggedIn: (v: boolean) => void;
}

export const useGlobalStore = create<GlobalState>()(
    persist(
        (set) => ({
            theme: "light",
            lang: "zh-CN",
            isMobile: false,
            isLoggedIn: false,
            setTheme: (theme) => set({ theme }),
            setLang: (lang) => set({ lang }),
            setIsMobile: (isMobile) => set({ isMobile }),
            setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn })
        }),
        {
            name: "global-storage",
            partialize: (state) => ({
                theme: state.theme,
                lang: state.lang
            })
        }
    )
);