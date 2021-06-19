import React, { useEffect, useContext, useState } from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from '@material-ui/core/Snackbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import { LockUser } from "./Lock-User.component";
import ReportOutlinedIcon from '@material-ui/icons/ReportOutlined';

import {Context as UsuarioContext} from "../../contexts/UsuarioContext";
import { makeStyles } from '@material-ui/core/styles';

import { lockingUser } from '../../services/userService';


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    divButtons: {
      textAlign: "right"
    }
  }));

//Recibe user=(usuario) page=(pagina de la lista) size=(tamaño de la pagina)
export function UserReports(props) {
  
  const classes = useStyles();
  const {state:{denuncias, lastDispatch}, getReports } = useContext(UsuarioContext);


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    
    getReports(props.user.usuario)
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

  let denunciasGroup = [{tipo: 'Contenido Inapropiado', cantidad: 0}, {tipo: 'Cuenta Falsa', cantidad: 0}, {tipo: 'Spam', cantidad: 0}]
  
  denuncias?.content?.forEach(d => {
    switch (d.tipo) {
      case 'CONTENIDO_INAPROPIADO': 
        denunciasGroup[0].cantidad += 1;
      break;
      case 'CUENTA_FALSA': 
        denunciasGroup[1].cantidad += 1;
      break;
      case 'SPAM': 
        denunciasGroup[2].cantidad += 1;
      break;
      default: return;
    }
  });

  return (
    <div>
        <IconButton 
          aria-label="delete"
          onClick={handleClickOpen}
          color="secondary"
        >
          <ReportOutlinedIcon />
        </IconButton>

        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
          <DialogTitle>
            Denuncias del Usuario
          </DialogTitle>
            <DialogContent>
              
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                aria-label="enhanced table"
              >
                <TableBody>
                 
                {
                  denunciasGroup.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        aria-checked={false}
                        tabIndex={-1}
                        key={row.tipo}
                        className={classes.tableRow}
                      >
                        <TableCell align="left">{row.tipo}</TableCell>
                        <TableCell align="left">{row.cantidad}</TableCell>
                      </TableRow>
                    );
                  })}



                </TableBody>
              </Table>
            </TableContainer>
              
              <Snackbar
                message={errorMessage}
                open={openError}
                onClose={() => handleErrorClose()}
                autoHideDuration={3000}
              />
            </DialogContent>

            <DialogActions className="pb-4 mr-4">
              
                <Button onClick={handleClose} outline color="primary">
                    Cerrar
                </Button>
                <LockUser user={props.user} page={props.page} size={props.size} params={props.params} orders={props.orders}/>

            </DialogActions>
        </Dialog>
     </div>
  );
}
