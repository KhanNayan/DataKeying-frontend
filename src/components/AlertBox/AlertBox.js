import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
export default function AlertBox({ open, onClose, header, ...props }) {
    const { inputFields, onChange, title } = props;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{header}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {title}
                </DialogContentText>
                {inputFields && (
                    <div id="alert-dialog-description">
                        <form>
                            <div className="d-flex justify-content-center flex-wrap p-3 checkbox">
                                {inputFields.map((inp, i) => (
                                    <div key={i} className="mx-2l">
                                        <input
                                            className="m-1 check-dialog"
                                            checked={inp.active}
                                            onChange={onChange}
                                            id={inp.fieldName}
                                            name={inp.fieldName}
                                            value={inp.fieldIndex}
                                            type="checkbox"
                                        ></input>
                                        <label
                                            htmlFor={inp.fieldName}
                                            className=" check-dialog"
                                        >
                                            {inp.labelName}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </form>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    color="success"
                    variant="outlined"
                    onClick={onClose}
                    autoFocus
                >
                    OK
                </Button>

                <Button
                    color="error"
                    variant="outlined"
                    onClick={onClose}
                    autoFocus
                >
                    cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
