import { BASE_URL } from "../config/settings"
import crearContext from "./crearContext";

const DenunciaReducer = (state, action) => {
  switch (action.type) {
    case "GET_REPORTS": {
      return { 
        ...state, 
        denuncias: action.payload,
        lastDispatch: action.type 
      };
    }
    case "GET_REPORTS_USER": {
      return { 
        ...state, 
        denuncias: action.payload,
        lastDispatch: action.type 
      };
    }
    case "UPDATE_REVIEW": {
      return { 
        ...state, 
        response: action.payload,
        lastDispatch: action.type 
      };
    }
    default: 
      return state;
  }
}

const initialState = {
  lastDispatch: "",
  usuarios: [],
  status: "",
  message: "",
};

const getReports = (dispatch) => (page, rowsPerPage, params, orders) => {
  var myInit = {
    'method': 'GET',
    'headers': {
      'Content-Type': "application/json",
      'Authorization': "Bearer " + getToken(),
      'accept':'*/*',
    },
  }

  let query = '&' + Object.entries(params).map(e => [undefined, null, ''].includes(e[1]) ? null : `${e[0]}=${e[1]}`).filter(e => e).join('&');
  let order = orders ? orders : 'nombre:asc';

  fetch(BASE_URL + `denuncias?page=${page}&size=${rowsPerPage}&orders=${order}${query}`, myInit)
  .then(response => 
    response.json()
   )
  .then(data => {
    if (data) {
      dispatch({ type: 'GET_REPORTS_USER', payload: data })
    }
  });
}

const getReportsUser = (dispatch) => (username) => {
  var myInit = {
    'method': 'GET',
    'headers': {
      'Content-Type': "application/json",
      'Authorization': "Bearer " + getToken(),
      'accept':'*/*',
    },
  }

  fetch(BASE_URL + `denuncias?size=255&usuario_denunciado=${username}`, myInit)
  .then(response => 
    response.json()
   )
  .then(data => {
    if (data) {
      dispatch({ type: 'GET_REPORTS_USER', payload: data })
    }
  });
}

const updateReview = (dispatch) => (id, review) => {

  var body = {
    "revisada": review
  }

  var myInit = {
    'method': 'PATCH',
    'headers': {
      'Content-Type': "application/json",
      'Authorization': "Bearer " + getToken(),
      'accept':'*/*',
    },
    body: JSON.stringify(body)
  }
  
  fetch(BASE_URL + `denuncias/${id}`, myInit)
  .then(response => 
    response.json()
   )
  .then(data => {
    if (data) {
      dispatch({ type: 'UPDATE_REVIEW', payload: data })
    }
  });
}

const getToken = () => {
  return localStorage.getItem("tokenSplash");
}

export const {Context, Provider} = crearContext(
  DenunciaReducer,
  { getReportsUser, getReports, updateReview },
  initialState
);

