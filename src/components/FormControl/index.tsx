import MuiFormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';

const FormControl = styled(MuiFormControl)(({ theme }) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2.5),
    position: 'relative',
    ".MuiFormControl-root +  &": {
        marginTop: 0,
    },
    "& .MuiFormHelperText-root": {
        position: "absolute",
        bottom: "-1.3rem",
        marginLeft: "5px",
    }
}));

export {
    FormControl
}
