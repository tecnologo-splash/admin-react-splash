import React, {useEffect,useContext,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import PropTypes from 'prop-types';

import {DelAdmin} from './Del-Admin.component'
import {Context as AdminContext } from "../../contexts/AdminContext";


const columns = [
  { id: 'id', label: '#', minWidth: 80 },
  { id: 'usuario', label: 'Usuario', minwidth:100},
  { id: 'apellido', label: 'Apellido', minWidth: 100 },
  { id: 'nombre', label: 'Nombre', minWidth: 100 },
  { id: 'correo', label: 'Correo', minWidth: 100 },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            className={classes.tableHeaderCell}
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell className={classes.tableHeaderCell}>Ingreso</TableCell>
        <TableCell></TableCell> {/* Una vacía para el botón de eliminar */}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 30%',
  },
}));

const useChipStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  avatarSmall: {
    height: '20px',
    width: '20px'
  },
  avatarBig: {
    height: '40px',
    width: '40px'
  },
  checkbox: {
    checked: {
      color: '#601683',
    }
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    borderRight: '1px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function ListAdmin() {
  const classes = useStyles();
  const chipClasses = useChipStyles();
  const toolbarClasses = useToolbarStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('usuario');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [params, setParams] = useState({
    nombre: null,
    apellido: null,
    correo: null,
    usuario: null,
  });

  let filters = params;
  let orders = `${orderBy}:${order}`;

  const {state:{admins, lastDispatch}, getAdminUsers } = useContext(AdminContext)

  useEffect(()=>(
    getAdminUsers(page, rowsPerPage, params, orders)
  ),[page,rowsPerPage, params, orders, lastDispatch])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleFilter = () => {
    setParams(filters);
    setOpen(false);
    setPage(0);
  }

  const onChangeInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    filters = { ...filters, [name]: value }
  }

  const handleDelete = (param) => () => {
    setParams({
      ...params,
      [param]: null
    })
  };


  return (
    <>
      <Dialog open={open} onClose={handleClose}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Búsqueda
        </DialogTitle>
        
        <DialogContent>
          <div>
            <span>
              <CampoTexto 
                onChangeInput={onChangeInput}
                name="nombre" 
                Label="Nombre"
              />
              <CampoTexto 
                onChangeInput={onChangeInput}
                name="apellido" 
                Label="Apellido"
              />
            </span>
          </div>
          <div>
            <span>
              <CampoTexto 
                onChangeInput={onChangeInput}
                name="correo" 
                Label="Correo"
                defaultValue={params.correo}
              />
              <CampoTexto 
                onChangeInput={onChangeInput}
                name="usuario" 
                Label="Usuario"
              />
            </span>
          </div>
        </DialogContent>

        <DialogActions className="pb-4 mr-4">
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleFilter} color="primary" variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>


      <Paper className={classes.root}>

        <Toolbar>
          <Typography className={toolbarClasses.title} variant="h6" id="tableTitle" component="div">
            Administradores
          </Typography>
          
          
          <span>
            {Object.entries(params).filter(p => ![null, ''].includes(p[1])).map(p => Object({ key: p.index, label: p[0], value: p[1] })).map((data) => {

              return (
                <span>
                  <Chip
                    label={`${data.label}: "${data.value}"`}
                    onDelete={handleDelete(data.label)}
                    className={chipClasses.chip}
                  />
                </span>
              );
            })}
          </span>

          <Tooltip title="Buscar Administradores">
            <IconButton aria-label="Filtrar Administradores" onClick={handleClickOpen}>
              <SearchIcon />
            </IconButton>
          </Tooltip>

        </Toolbar>

        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={admins?.content?.length}
              />
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
                      <TableCell>
                        {row.fecha_creado}
                      </TableCell>
                      <TableCell>
                        <DelAdmin admin={row} page={page} size={rowsPerPage} />
                      </TableCell>
                    </TableRow>
                  )
                })  
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={admins.content ? admins.total_elements : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export function CampoTexto({Label,Type="text",onChangeInput,name,error,helperText}){
  return (
    <span>
    <TextField
    fullWidth
      error = {error}
      helperText={error ? helperText : ""}
      name={name}
      variant="standard"
      label={Label}
      onChange={onChangeInput}
      color="primary"
      type={Type}
    />
  </span>
  )
}