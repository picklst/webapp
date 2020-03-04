import fetch from 'isomorphic-fetch';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const API_URL = 'http://127.0.0.1:7000/';
const TOKEN_PREFIX = 'JWT';

export default ({ query, variables }) => {
    const token = cookies.get('token');
    const apiConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `${TOKEN_PREFIX} ${token}` : null,
        },
        body: JSON.stringify({ query, variables }),
    };

    return fetch(API_URL, apiConfig).then(function(response) {
        const contentType = response.headers.get('content-type');
        if (response.ok) {
            if (contentType && contentType.indexOf('application/json') !== -1) {
                return response.json().then(json => json);
            }
            if (contentType && contentType.indexOf('text') !== -1) {
                return response.text().then(text => text);
            }
            return response;
        }
        console.error(`Response status ${response.status} during dataFetch for url ${response.url}.`);
        throw response;
    });
};