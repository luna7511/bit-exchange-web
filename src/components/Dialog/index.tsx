import MuiDialog from "@mui/material/Dialog";

import DialogActions from "@mui/material/DialogActions";

import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import MuiDialogTitle from "@mui/material/DialogTitle";

import {styled} from "@mui/material/styles";

const Dialog = styled(MuiDialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const DialogTitle = styled(MuiDialogTitle)(({ theme }) => ({
    padding: theme.spacing(2),
}));

export {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
}