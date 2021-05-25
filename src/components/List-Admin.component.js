import React, {useEffect,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { formatDateTime} from "../services/date.service";
import {Context as AdminContext } from "../contexts/AdminContext";


const columns = [
  { id: 'id', label: '#', minWidth: 170 },
  { id: 'apellido', label: 'Apellido', minWidth: 100 },
  { id: 'nombre', label: 'Nombre', minWidth: 100 },
  { id: 'correo', label: 'Correo', minWidth: 100 },
  { id: 'fecha_creado', label: 'Ingreso', minWidth: 100 },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function ListAdmin() {
  const classes = useStyles();
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const {state:{admins, lastDispatch}, getAdminUsers } = useContext(AdminContext)

  useEffect(()=>(
    getAdminUsers(page, rowsPerPage)
  ),[page,rowsPerPage,lastDispatch])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            { 
              admins.content &&
              admins.content.map((row,index)=> {
                return(
                  <TableRow hover tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return(
                        <TableCell key={column.id}>
                          { value }
                        </TableCell>
                      )
                    })}

                  </TableRow>
                )
              })  
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={admins.content ? admins.content.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

