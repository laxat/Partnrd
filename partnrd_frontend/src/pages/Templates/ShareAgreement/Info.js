import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import SLUGS from "../../../resources/slugs";
import { Input } from "reactstrap";

export default function AlertDialog({ info, title }){
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className="popup-button" variant="text"  onClick={handleClickOpen}>
        <h6>{title}</h6>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {info}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function DeleteDialog({config, api}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { push } = useHistory();

  const deleteAgreement = async () => {
    await axios
    .delete(api, config)
      .then((res) => {
        // console.log(res)
        setOpen(false);
        push(SLUGS.agreements);
      })
      .catch((err) => {
        // console.log(err);
        //push(SLUGS.agreements);
        setOpen(false); 
    })
  }

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Agreement?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this agreement?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
          <Button onClick={deleteAgreement} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



export function EditDialog({api, config, agreeName, getData})
{
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editAgreement = async () => {
    await axios
      .put(api, {name: agreeName}, config)
      .then((res) => {
        // console.log(res);
        setOpen(false);
        getData(); 
      })
      .catch((err) => {
        // console.log(err);
        //push(SLUGS.agreements);
        setOpen(false);
      });
  };

  const handleInput = (e) => {
    agreeName = e.target.value; 
  }

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <EditIcon/>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Agreement</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the text field below to edit this agreement
          </DialogContentText>
          <Input
            required
            autoFocus
            margin="dense"
            id="agree-name"
            label="Agreement Name"
            type="text"
            defaultValue={agreeName}
            onChange={(e) => handleInput(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editAgreement} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}