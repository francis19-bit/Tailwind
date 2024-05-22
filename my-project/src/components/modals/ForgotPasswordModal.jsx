import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 4,
  height: "50vh",
  borderTopLeftRadius: "10px",
  borderBottomLeftRadius: "10px",
  borderTopRightRadius: "10px",
  borderBottomRightRadius: "10px",
};

export default function ForgotPasswordModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} sx={{ fontSize: 12 }}>
        Forgot Password?{" "}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h5"
              sx={{ fontSize: 19, fontWeight: "600" }}
            >
              Forgot Password?
            </Typography>
            <div>
              <h4 style={{ marginBottom: "3vh", fontWeight: "400" }}>
                {" "}
                Email address (required){" "}
              </h4>{" "}
              <TextField
                id="email-address"
                label="Email Address"
                variant="outlined"
                required
                style={{ width: "30.7vw", marginBottom: "2vh" }}
              />{" "}
              <br />
              <span>
                {" "}
                We'll send you an email with further instructions to reset your
                password. <br />
              </span>
              <Button
                variant="contained"
                sx={{ height: 30, width: 60, marginTop: "3vh", float: "right" }}
              >
                Submit
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
