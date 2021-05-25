import { BASE_URL } from '../config/settings'

export const listUsers = (params) => {

    const endpoint = 'users';
    const token = localStorage.getItem('tokenSplash');
    
    let query = '';

    params = ['nombre=agustin', 'activo=true', 'bloqueado=false'];

    query = params.join('&');

    var myInit = {
        'mode':'no-cors',
        'headers': {
            'authorization': token,
            'Content-Type': "application/json",
            'accept':'*/*',
        },
        'method': 'GET'
    }
     
    //* `${BASE_URL}${endpoint}?${paramString}`

    fetch(BASE_URL + "users", myInit)
    .then(data => console.log(data));
}