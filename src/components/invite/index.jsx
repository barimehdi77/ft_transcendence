
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { socket } from "../../socket";
import { useState } from "react";
import useRouter from "next/router";
const Invite = ({ img, sender, name }) => {
  // state
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleOutClose = () =>{
    if (!invite)

    useRouter.back();

    setOpen(false);
  } 
  const handleClose = () =>{


    setOpen(false);
  } 
  const [invite, setInvite] = useState(false);

  return (
    <Dialog
      PaperProps={{
        style: {
          width: "40rem",
          height: "18rem",
        },
      }}
      open={open}
      onClose={handleOutClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className={"text-3xl"} id="alert-dialog-title">
        Game Invitation
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
          {sender} want to play with you!
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
          DECLINE
        </Button>
        <Button
          size={"large"}
          variant="outlined"
          color="success"
          onClick={() => {
            setInvite(true);
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
          PLAY
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Invite;
