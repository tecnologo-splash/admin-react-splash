import React, {useEffect,useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FilterListIcon from '@material-ui/icons/FilterList';

import {Context as UsuarioContext } from "../contexts/UsuarioContext";

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
  highlight:
    theme.palette.type === 'light'
      ? {
          color: '#601683',
          backgroundColor: lighten('#601683', 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Usuarios registrados
        </Typography>

        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
    </Toolbar>
  );
};

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
  tableRow: {
    
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    borderRight: '1px'
  }
}));

const params = [];

export default function ListUsers() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [dense, setDense] = React.useState(false);
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const {state:{usuarios, lastDispatch}, getUsers } = useContext(UsuarioContext);

  useEffect(()=>(
    getUsers(page, rowsPerPage, params)
  ),[page,rowsPerPage, params, lastDispatch]);

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

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar/>
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
                          <Avatar className={dense ? classes.avatarSmall : classes.avatarBig} src={row.url_perfil}/>
                        </TableCell>
                        <TableCell>{row.nombre}</TableCell>
                        <TableCell align="left">{row.apellido}</TableCell>
                        <TableCell align="left">{row.correo}</TableCell>
                        <TableCell align="left">{row.usuario}</TableCell>
                        <TableCell align="center">{(row.activo ? 'Si' : 'No')}</TableCell>
                        <TableCell align="center">{(row.bloqueado ? 'Si' : 'No')}</TableCell>
                        <TableCell align="center"></TableCell>
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