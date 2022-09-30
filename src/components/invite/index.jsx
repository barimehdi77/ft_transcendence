import Head from "next/head";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { socket } from "../../socket";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import useRouter from "next/router";
const Invite = ({ img, sender, name }) => {
  // state
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [invite, setInvite] = useState(false);

  return (
    <Dialog
      PaperProps={{
        style: {
          // backgroundColor: "transparent",
          // boxShadow: "none",
          width: "40rem",
          height: "18rem",
          // fontSize: "2rem",
        },
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className={"text-3xl"} id="alert-dialog-title">
        "Freind Invitation"
      </DialogTitle>

      <DialogContent
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "5rem", height: "5rem", borderRadius: "50%" }}
          src={img}
          alt="image"
        />
        <DialogContentText className={"text-2xl"} id="alert-dialog-description">
          {name} want to be freind with you!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          size={"large"}
          variant="outlined"
          color="error"
          onClick={() => {
              useRouter.back();
            handleClose();
            return "rejected";
          }}
        >
          Disagree
        </Button>
        <Button
          size={"large"}
          variant="outlined"
          color="success"
          onClick={() => {
            socket.emit("friendAccepted", {
              data: { user: name, sender: sender },
            });
            useRouter.push({
              pathname: "/game",
              query: { name: "friends" },
            });
            handleClose();
            socket.emit("friendAccepted", {
              data: { user: name, sender: sender },
            });
            return "accepted";
          }}
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Invite;
