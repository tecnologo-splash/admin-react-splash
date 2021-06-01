import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import {Context as AdminContext} from "../../contexts/AdminContext";
import { makeStyles } from '@material-ui/core/styles';

import { delAdminUser } from '../../services/adminService';


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    divButtons: {
      textAlign: "right"
    }
  }));

//Recibe admin=(administrador) page=(pagina de la lista) size=(tamaño de la pagina)
export function DelAdmin(props) {
  
  const classes = useStyles();
  
  const { getAdminUsers } = useContext(AdminContext)
  const [open, setOpen] = useState(false);
  
  const handleSubmit = (userId) => {
    
    delAdminUser(userId).then(
      response => {
        if(!response.error) {
          getAdminUsers(props.page,props.size)
          handleClose()
        } else {
          setErrorMessage(response.message)
          handleErrorOpen()
        }
      }
    );    
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const [errorMessage, setErrorMessage ] = useState("");
  const [openError, setOpenError] = React.useState(false);
  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };
  const handleErrorOpen = () => {
    setOpenError(true);
  };


  return (
    <div>
        <IconButton 
          aria-label="delete"
          onClick={handleClickOpen}
          color="secondary"
        >
          <DeleteIcon />
        </IconButton>

        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
          <DialogTitle>
            Eliminar Administrador
          </DialogTitle>
            <DialogContent>
              
              <b>¿Seguro que desea eliminar el usuario {props.admin.usuario}?</b>
              
              <Snackbar
                message={errorMessage}
                open={openError}
                onClose={() => handleErrorClose()}
                autoHideDuration={3000}
              />

            </DialogContent>

            <DialogActions className="pb-4 mr-4">
              
                <Button onClick={handleClose} outline color="primary">
                    Calcelar
                </Button>
                <Button onClick={() => handleSubmit(props.admin.id)} color="secondary" variant="contained">
                    Eliminar
                </Button>
                
            </DialogActions>
        </Dialog>
     </div>
  );
}
