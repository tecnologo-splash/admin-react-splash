import React, {useEffect,useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar'
import Button from "@material-ui/core/Button";
import Chip from '@material-ui/core/Chip';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FilterListIcon from '@material-ui/icons/FilterList';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import SearchIcon from '@material-ui/icons/Search';
import Switch from '@material-ui/core/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TextField from "@material-ui/core/TextField";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import {Context as UsuarioContext } from "../../contexts/UsuarioContext";

const headCells = [
  { id: 'nombre', align: 'center', disablePadding: true, label: 'Nombre' },
  { id: 'apellido', align: 'center', disablePadding: false, label: 'Apellido' },
  { id: 'correo', align: 'center', disablePadding: true, label: 'Correo' },
  { id: 'usuario', align: 'center', disablePadding: true, label: 'Usuario' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.tableHeaderCell} align="center">Foto</TableCell>
        {headCells.map((headCell) => (
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
        <TableCell className={classes.tableHeaderCell} align="center">Activo</TableCell>
        <TableCell className={classes.tableHeaderCell} align="center">Bloqueado</TableCell>
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

const params = [];

export default function ListUsers() {
  const classes = useStyles();
  const toolbarClasses = useToolbarStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');

  const [dense, setDense] = React.useState(false);
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  
  const [params, setParams] = React.useState({
    nombre: null,
    apellido: null,
    correo: null,
    usuario: null,
    activo: null,
    bloqueado: null
  });

  let filters = params;
  
  //! cambiar hardcode
  let orders = 'usuario:asc';
  
  const {state:{usuarios, lastDispatch}, getUsers } = useContext(UsuarioContext);

  useEffect(()=>(
    getUsers(page, rowsPerPage, params, orders)
  ),[page,rowsPerPage, params, orders, lastDispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const handleChange = (event) => {
    setParams({ ...params, [event.target.name]: event.target.value == "true"});
    setPage(0);
  };

  const chipClasses = useChipStyles();

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

      <Dialog open={open2} onClose={handleClose2}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Filtros
        </DialogTitle>
        
        <DialogContent>
          <span className="col">
            <FormControl component="fieldset">
            <FormLabel component="legend">Activo</FormLabel>
            <RadioGroup aria-label="activo" name="activo" value={params.activo} onChange={handleChange}>
              <FormControlLabel value={true} control={<Radio />} label="Sí" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          </span>
          <span className="col">
            <FormControl component="fieldset">
            <FormLabel component="legend">Bloqueado</FormLabel>
            <RadioGroup aria-label="bloqueado" name="bloqueado" value={params.bloqueado} onChange={handleChange}>
              <FormControlLabel value={true} control={<Radio />} label="Sí" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          </span>
        </DialogContent>

        <DialogActions className="pb-4 mr-4">
          <Button onClick={handleClose2} color="primary" variant="contained">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>



      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Toolbar>
            <Typography className={toolbarClasses.title} variant="h6" id="tableTitle" component="div">
              Usuarios registrados
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

            <Tooltip title="Buscar Usuarios">
              <IconButton aria-label="Filtrar Usuarios" onClick={handleClickOpen}>
                <SearchIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Filtrar Usuarios">
              <IconButton aria-label="Filtrar Usuarios" onClick={handleClickOpen2}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>

          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={usuarios?.content?.length}
              />
              <TableBody>
                {
                  usuarios?.content?.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        aria-checked={false}
                        tabIndex={-1}
                        key={row.nombre}
                        className={classes.tableRow}
                      >
                        <TableCell  component="th" align="right" scope="row" id={labelId}>
                          {
                            row.url_perfil ?
                            <Avatar className={dense ? classes.avatarSmall : classes.avatarBig} src={row.url_perfil}/>
                            :
                            <Avatar>{row.nombre.slice(0,1).toUpperCase()}</Avatar>
                          }
                        </TableCell>
                        <TableCell>{row.nombre}</TableCell>
                        <TableCell align="left">{row.apellido}</TableCell>
                        <TableCell align="left">{row.correo}</TableCell>
                        <TableCell align="left">{row.usuario}</TableCell>
                        <TableCell align="center">{(row.activo ? 'Si' : 'No')}</TableCell>
                        <TableCell align="center">{(row.bloqueado ? 'Si' : 'No')}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={usuarios ? usuarios.total_elements : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Modo compacto"
        />
      </div>
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