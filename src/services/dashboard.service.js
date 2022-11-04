import axios from "axios";
import config from '../config'
import authHeader from "./auth-header";

var API_URL = config.BASE_URL + 'api/';

const getDashboard = () => {
    return axios
        .get(API_URL + "dashboard", { headers: authHeader() })
        .then((response) => {

            return response.data;
        });
};
export default {
    getDashboard
};
