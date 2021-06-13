import { BASE_URL } from "../config/settings";
import { getToken, checkSession } from "./auth";


export const lockingUser = async (userId, bloqueado) => {

    let formData = new FormData();
    formData.append('bloqueado', bloqueado);

    var myInit = {
        'method': 'PUT',
        headers: {
            'Authorization': "Bearer " + getToken(),
        },
        body: formData
    }
    
    return await fetch(BASE_URL + "users/" + userId, myInit)
    .then(async (response) => {
        checkSession(response)
        if (response.ok) {
            let json = await response.json();
            return {error: false, message: json.message}
        } else {
            let json = await response.json();
            return {error: true, message: json.message}
        }
    })
}



export const delUser = async (userId) => {

    let formData = new FormData();
    formData.append('activo', false);

    var myInit = {
        'method': 'PUT',
        headers: {
            'Authorization': "Bearer " + getToken(),
        },
        body: formData
    }
    
    return await fetch(BASE_URL + "users/" + userId, myInit)
    .then(async (response) => {
        checkSession(response)
        if (response.ok) {
            let json = await response.json();
            return {error: false, message: json.message}
        } else {
            let json = await response.json();
            return {error: true, message: json.message}
        }
    })
}

