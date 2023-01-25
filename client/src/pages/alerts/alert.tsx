import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { forwardRef, useState } from "react";

interface error {
  message: string;
  field?: string;
}
[];

const Alert = ({ severity, message }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Snackbar open={open} autoHideDuration={9000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {message.data.errors.map((msg: error) => {
          return (
            <span>
              {msg.message} --- {msg.field}
            </span>
          );
        })}
      </Alert>
    </Snackbar>
  );
};

export default Alert;
