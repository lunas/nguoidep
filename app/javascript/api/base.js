import axios from 'axios'

const BASE_URL = window.location.origin;

let token = document.getElementsByName('csrf-token')[0].getAttribute('content');
axios.defaults.headers.common['X-CSRF-Token'] = token;
axios.defaults.headers.common['Accept'] = 'application/json';

let api = axios.create({
    baseURL: BASE_URL + '/api/',
    headers: {}
});


window.api = api;

export default api;
