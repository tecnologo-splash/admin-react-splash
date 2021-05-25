import { BASE_URL } from '../config/settings'

export const listUsers = (params) => {

    const endpoint = 'users';
    const token = localStorage.getItem('tokenSplash');
    
    let query = params.length > 1 ? `?${params.join('&')}` : '';

    var myInit = {
        'headers': {
            'authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
            'accept':'*/*',
        },
        'method': 'GET'
    }

    fetch(`${BASE_URL}${endpoint}${query}`, myInit)
    .then(response => response.json())
    .then(data => console.log(data));
}