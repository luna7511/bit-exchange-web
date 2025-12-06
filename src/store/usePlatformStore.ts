import { create } from "zustand";
import type {PlatformConfig} from "@/api/type/common.ts";

interface GlobalState {
    platformConfig: Partial<PlatformConfig>;
    setPlatformConfig: (config: Partial<PlatformConfig>) => void;
}

export const usePlatformStore = create<GlobalState>()(
    (set) => ({
        platformConfig: {},
        setPlatformConfig: (config: Partial<PlatformConfig>) => {
            set({platformConfig: config});
        }
    })
);