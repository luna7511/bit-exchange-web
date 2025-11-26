import { styled } from '@mui/material/styles';
import MuiInputLabel, {type InputLabelProps} from "@mui/material/InputLabel";

const InputLabel = styled(
    (props: InputLabelProps) => {
        return (
            <MuiInputLabel
                shrink
                {...props}
            />
        );
    }
)(({ theme }) => ({
    fontSize: "1rem",
    position: 'relative',
    transform: "translate(0px, 0px)",
    textAlign: "left",
    marginTop: theme.spacing(1),
    ...theme.applyStyles('dark', {
    }),
}));

export {
    InputLabel
}