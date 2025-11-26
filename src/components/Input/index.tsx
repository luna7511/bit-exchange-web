import TextField, { type TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import {useTranslation} from "react-i18next";

const Input = styled((props: TextFieldProps) => {
    const { t } = useTranslation("common");
    return <TextField placeholder={t("placeholder.input")} {...props} />;
})(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(1),
    },
    '& .MuiInputBase-input': {

        position: 'relative',
        backgroundColor: 'transparent',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:focus': {
        },
        "&:-webkit-autofill": {
            "-webkit-box-shadow": "0 0 0 100px transparent inset"
        },
        ...theme.applyStyles('dark', {
        }),
        padding: "12px"
    },
    '& .MuiInputBase-inputSizeSmall': {
        padding: "8px 12px"
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: 'rgba(255,255,255,0.3)',
    }
}));

export {
    Input
}
