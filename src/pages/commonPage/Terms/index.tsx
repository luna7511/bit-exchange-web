import type {FC} from "react";
import {useGetTerms} from "@/hooks/api/useCommon.ts";

const Terms: FC<{
    type: string;
}> = ({type}) => {
    const {data} = useGetTerms(type || "TERMS_CLAUSE");
    return (
        <div>

        </div>
    )
}
export default Terms;