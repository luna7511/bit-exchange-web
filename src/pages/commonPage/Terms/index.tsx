import {useGetTerms} from "@/hooks/api/useCommon.ts";
import RichText from "@/components/RichText";
import Typography from "@mui/material/Typography";
import {useMatches} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Terms = () => {
    const matches = useMatches();
    const { title, type } = matches[matches.length - 1].handle as { title: string; type: string };

    // todo
    const { data } = useGetTerms(type);

    const { t } = useTranslation();
    return (
        <div className="p-6 lg:p-12 max-root-width">
            {
                title && (
                    <Typography className="mb-4! lg:text-4xl! lg:mt-10!" variant="h5">
                        {t(title)}
                    </Typography>
                )
            }
            {
                data?.data && <RichText html={data.data} />
            }
        </div>
    )
}
export default Terms;