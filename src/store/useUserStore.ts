import { create } from "zustand";
import { persist } from "zustand/middleware";
import {useGlobalStore} from "@/store/useGlobalStore.ts";

interface UserState {
    token: string;
    setToken: (token: string) => void;
    userLogout: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            token: "",
            setToken: (token) => set({ token }),
            userLogout: () => {
                set({
                    token: "",
                });
                useGlobalStore.getState().setIsLoggedIn(false);
            }
        }),
        {
            name: "user-storage",
            partialize: (state) => ({
                token: state.token,
            })
        }
    )
);