import axios from 'axios';

const instance = axios.create({
    baseURL:'https://instaclone.pythonanywhere.com/api/',
});
export default instance