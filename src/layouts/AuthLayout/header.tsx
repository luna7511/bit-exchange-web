import type {FC} from "react";
import LogoIcon from "@/assets/vite.svg";
import {DrawMenu, DrawMenuItem} from "@/components/DrawMenu";
import useLanguage from "@/hooks/useLanguage.ts";
import {useNavigate} from "react-router-dom";

const AuthHeader: FC = () => {
    const { languageList, setLang, langItem } = useLanguage();
    const navigation = useNavigate();
    return (
        <div className="flex-1 h-[64px] px-6 flex flex-row justify-between items-center">
            <LogoIcon onClick={() => navigation("/")} />
            <div>
                <DrawMenu
                    triggerLabel={
                        <span className="text-base">{langItem?.name}</span>
                    }
                >
                    {languageList.map((child) => (
                        <DrawMenuItem
                            key={child.value}
                            label={child.name}
                            className="min-w-[100px]! justify-center!"
                            onClick={() => setLang(child.value as any)}
                        />
                    ))}
                </DrawMenu>
            </div>
        </div>
    )
}

export default AuthHeader;