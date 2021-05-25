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
                message: action.payload.message,
                lastDispatch: action.type
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
    message: "",
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
}*/

const login = (dispatch) => (username, password) => {
    
    var credentials = { 
        "correo": username, 
        "clave": password 
    }

    var myInit = {
        'method': 'POST',
        headers: {'Content-Type': "application/json"},
        'body': JSON.stringify(credentials)
    }
    
    fetch(BASE_URL + "users/auth", myInit)
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem("tokenSplash",data.token);
            dispatch({ type: 'SET_TOKEN', payload: data.token })
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
            dispatch({ type: 'GET_USER_INFO', payload: data })
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

const addAdminUser = (dispatch) => (usuario) => {
    var newUser = { 
        "correo": usuario.correo, 
        "clave": usuario.clave,
        "nombre": usuario.nombre,
        "apellido": usuario.apellido,
        "usuario": usuario.usuario
    }
    
    var myInit = {
        'method': 'POST',
        headers: {
            'Content-Type': "application/json",
            'Authorization': "Bearer " + getToken(),
        },
        'body': JSON.stringify(newUser)
    }
    fetch(BASE_URL + "users/admin/sign-up", myInit)
    .then(response => response.json())
    .then(data => {
        dispatch({ type: 'ADD_ADMIN_USER', payload: data })
    })
    
}

const getToken = () => {
    return localStorage.getItem("tokenSplash");
}

const isAuthenticated = () => {
    return localStorage.getItem("tokenSplash") !== null;
}


export const {Context, Provider} = crearContext(
    AdminReducer,
    { login, getInfo, logout, getAdminUsers, isAuthenticated, addAdminUser },
    initialState
);

