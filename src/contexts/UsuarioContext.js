import { BASE_URL } from "../config/settings"
import crearContext from "./crearContext";

const UsuarioReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS": {
      return { 
        ...state, 
        usuarios: action.payload,
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

const getUsers = (dispatch) => (page, rowsPerPage, params) => {
  var myInit = {
    'method': 'GET',
    'headers': {
      'Content-Type': "application/json",
      'Authorization': "Bearer " + getToken(),
      'accept':'*/*',
    },
  }

  let query = params?.length > 0 ? `&${params.join('&')}` : '';

  fetch(BASE_URL + `users?page=${page}&size=${rowsPerPage}${query}`, myInit)
  .then(response => response.json())
  .then(data => {
    if (data) {
      console.log(data);
      dispatch({ type: 'GET_USERS', payload: data })
    }
  });
}

const getToken = () => {
  return localStorage.getItem("tokenSplash");
}

const block = () => {
  //
}

const unblock = () => {
  //
}

export const {Context, Provider} = crearContext(
  UsuarioReducer,
  { getUsers, block, unblock },
  initialState
);

