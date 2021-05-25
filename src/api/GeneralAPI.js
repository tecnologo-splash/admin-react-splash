import { BASE_URL } from '../config/settings';
import { getToken } from '../services/auth';

export function request(url, method, data) {
      fetch(`${BASE_URL}${url}`, {
        "method": method,
        headers: {
          Authorization: 'Bearer '+ getToken(),
          Accept: "application/JSON",
          "Content-Type": "application/JSON",
        },
        body: data ? JSON.stringify(data) : undefined,
      })
      .then((response) => response.json) 
      
    }