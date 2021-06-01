import { Message } from "@material-ui/icons";
import React, { createContext, useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import { BASE_URL } from "../config/settings"
import crearContext from "./crearContext";
import {request} from "../api/GeneralAPI";
import {API_ROUTES} from "../api/apiRoutes";
import {METHOD} from "../api/apiMethod";


// conocimiento no equivale a sabiduria, sabiduria es hacer las cosas 

const AdminReducer = (state, action) => {
    switch (action.type) {
        case "SET_TOKEN": {
            return { 
                ...state, 
                token: action.payload,
                lastDispatch: action.type
            };
        }
        case "GET_USER_INFO": {
            return { 
                ...state, 
                currentUser: action.payload ,
                lastDispatch: action.type
            };
        }
        case "GET_ADMIN_USERS": {
            return { 
                ...state, 
                admins: action.payload,
                lastDispatch: action.type 
            };
        }
        case "ADD_ADMIN_USER": {
            return {
                ...state,
                status: action.payload.status,
                lastDispatch: action.type,
            }
        }
        case "ERROR": {
            return {
                ...state,
                dispatchError: action.payload,
                lastDispatch: action.type,
            }
        }
        default: 
            return state;
    }
}

const initialState = {
    lastDispatch: "",
    admins: [],
    token: null,
    currentUser: null,
    status: "",
    dispatchError: "",
};

/*
const login = (dispatch) => (username, password) => {
    var credentials = { 
        "correo": username, 
        "clave": password 
    }

    request(API_ROUTES.login,METHOD.POST,credentials).then(data => {
        console.log(data)
        if (data.token) {
            localStorage.setItem("tokenSplash",data.token);
            dispatch({ type: 'SET_TOKEN', payload: data.token })
        }
    });
}
*/

const login =  (dispatch) => async (username, password) => {
    /*
    var credentials = { 
        "correo": username, 
        "clave": password 
    }
    */

    let credentials={clave:password}
    if (userOrEmail(username)) {
      credentials["correo"] = username;
    } else {
      credentials["usuario"] = username;
    }

    var myInit = {
        'method': 'POST',
        headers: {'Content-Type': "application/json"},
        'body': JSON.stringify(credentials)
    }
    
    return await fetch(BASE_URL + "users/auth", myInit)
    //.then(response => response.json())
    .then( async response => {
        if (response.ok) {
            let data = await response.json()
            localStorage.setItem("tokenSplash",data.token);
            dispatch({ type: 'SET_TOKEN', payload: data.token })
            return {error: false, message: data.message}
        } else {
            let json = await response.json();
            return  {error: true, message: json.message}
        }

    });
}

const getInfo = (dispatch) => () => {
    var myInit = {
        'method': 'GET',
        headers: {
            'Content-Type': "application/json",
            'Authorization': "Bearer " + getToken()
        },
    }
    
    fetch(BASE_URL + "users/info", myInit)
    .then(response => response.json())
    .then(data => {
        if (data) {
            console.log(data)
            if (data.nombre_rol === "ADMINISTRADOR") {
                dispatch({ type: 'GET_USER_INFO', payload: data })
            } else {
                localStorage.removeItem("tokenSplash");
                window.location.reload();
            }
        }
    });
}

const logout = (dispatch) => () => {
    localStorage.removeItem("tokenSplash");
    dispatch({ type: 'SET_TOKEN', payload: null })
    window.location.reload();

}

const getAdminUsers = (dispatch) => (page, rowsPerPage) => {
    var myInit = {
        'method': 'GET',
        headers: {
            'Content-Type': "application/json",
            'Authorization': "Bearer " + getToken()
        },
    }
    
    fetch(BASE_URL + "users/admin?page=" + page + "&size=" + rowsPerPage, myInit)
    .then(response => response.json())
    .then(data => {
        if (data) {
            dispatch({ type: 'GET_ADMIN_USERS', payload: data })
        }
    });
}

const userOrEmail=(data)=>{
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(data);
}

const getToken = () => {
    return localStorage.getItem("tokenSplash");
}

const isAuthenticated = () => {
    return localStorage.getItem("tokenSplash") !== null;
}




export const {Context, Provider} = crearContext(
    AdminReducer,
    { login, getInfo, logout, getAdminUsers, isAuthenticated },
    initialState
);

