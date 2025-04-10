import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

type ErrorDialogProps = {
  open: boolean;
  message: string;
  onClose: () => void;
};

const ErrorDialog = ({ open, message, onClose }: ErrorDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>エラー</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;