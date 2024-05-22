import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";

export default function BasicBackdrop({ message, enable }) {
  return (
    <div>
      {/* <Button onClick={handleOpen}>Show backdrop</Button> */}
      <Backdrop
        sx={{
          color: "#5585FE",
          zIndex: 30000,
          display: "flex",
          flexDirection: "column",
          gap: "2vh",
        }}
        open={enable}
        // onClick={handleClose}
      >
        <CircularProgress size="4em" color="inherit" />
        <Typography variant="h2">{message}</Typography>
      </Backdrop>
    </div>
  );
}
