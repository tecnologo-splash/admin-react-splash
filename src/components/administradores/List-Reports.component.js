import React, {useEffect,useContext,useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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

import { UpdateReport } from "./Update-Report.component";
import {Context as DenunciaContext } from "../../contexts/DenunciaContext";

const headCells1 = [
  { id: 'id', align: 'center', disablePadding: true, label: 'ID' },
];


const headCells2 = [
  { id: 'tipo', align: 'center', disablePadding: false, label: 'Tipo' },
  { id: 'fechaCreado', align: 'center', disablePadding: true, label: 'Fecha' },
  { id: 'revisada', align: 'center', disablePadding: true, label: 'Revisada' },

];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        
      <TableCell className={classes.tableHeaderCell} align="center"></TableCell>
        {headCells1.map((headCell) => (
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
        <TableCell className={classes.tableHeaderCell} align="center">Usuario</TableCell>
        <TableCell className={classes.tableHeaderCell} align="center">Correo</TableCell>
        {headCells2.map((headCell) => (
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
        <TableCell className={classes.tableHeaderCell} align="center"></TableCell>
        <TableCell className={classes.tableHeaderCell} align="center"></TableCell>
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

export default function ListReports() {
  const classes = useStyles();
  const toolbarClasses = useToolbarStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('revisada');

  const [dense, setDense] = useState(false);
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  
  const [params, setParams] = useState({
    nombre: null,
    apellido: null,
    correo: null,
    usuario: null,
    activo: null,
    bloqueado: null
  });

  let filters = params;
  
  let orders = `${orderBy}:${order}`;
  
  const {state:{denuncias, lastDispatch}, getReports } = useContext(DenunciaContext);


  useEffect(()=>(
    getReports(page, rowsPerPage, params, orders)
  ),[page, rowsPerPage, params, orders, lastDispatch]);

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
                name="usuario_denunciado" 
                Label="Usuario"
              />
              <CampoTexto 
                onChangeInput={onChangeInput}
                name="correo_denunciado" 
                Label="Correo"
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
          Filtrar
        </DialogTitle>
        
        <DialogContent>
          <span className="col">
            <FormControl component="fieldset">
            <FormLabel component="legend">Revisada</FormLabel>
            <RadioGroup aria-label="revisada" name="revisada" value={params.revisada} onChange={handleChange}>
              <span>
                <FormControlLabel value={true} onClick={handleClose2} control={<Radio />} label="Sí" />
                <FormControlLabel value={false} onClick={handleClose2} control={<Radio />} label="No" />
              </span>
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
              Denuncias realizadas
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

            <Tooltip title="Filtrar Denuncias">
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
                rowCount={denuncias?.content?.length}
              />
              <TableBody>
                {
                  denuncias?.content?.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        aria-checked={false}
                        tabIndex={-1}
                        key={row.id}
                        className={classes.tableRow}
                      >
                        <TableCell></TableCell>
                        <TableCell align="left">{row.id}</TableCell>
                        <TableCell>{row.usuario_denunciado.usuario}</TableCell>
                        <TableCell align="left">{row.usuario_denunciado.correo}</TableCell>
                        <TableCell align="left">{row.tipo}</TableCell>
                        <TableCell align="left">{row.fecha_creado}</TableCell>
                        <TableCell align="center">{(row.revisada ? 'Si' : 'No')}</TableCell>
                        <TableCell align="center"> <UpdateReport id={row.id} revisada={row.revisada}/> </TableCell>
                    </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            labelRowsPerPage={"Filas por página"}
            count={denuncias ? denuncias.total_elements : 0}
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