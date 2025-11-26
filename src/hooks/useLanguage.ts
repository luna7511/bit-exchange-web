import { useGlobalStore } from "@/store/useGlobalStore.ts";
import { useMemo } from "react";

const languageList = [
    { name: "English", value: "en" },
    { name: "简体中文", value: "zh-CN" },
    { name: "繁体中文", value: "zh-TW" },
];

const useLanguage = () => {
    const lang = useGlobalStore(state => state.lang);
    const setLang = useGlobalStore(state => state.setLang);

    const langItem = useMemo(
        () => languageList.find(d => d.value === lang),
        [lang]
    );

    return {
        languageList,
        lang,
        setLang,
        langItem,
    };
}

export default useLanguage;