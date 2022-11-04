import axios from "axios";
import config from '../config'

var API_URL = config.BASE_URL + 'api/';

const login = (loginDetail) => {
    return axios
        .post(API_URL + "login", loginDetail)
        .then((response) => {
            if (response.data.response == true) {
                localStorage.setItem("user", JSON.stringify(response.data.data));
            }
            return response.data;
        });
};
const forgotPassword = (forgotPasswordDetail) => {
    return axios
        .post(API_URL + "forgot-password", forgotPasswordDetail)
        .then((response) => {
            return response.data;
        });
};

const recoverPassword = (recoverPasswordDetail) => {
    return axios
        .post(API_URL + "recoverPassword", recoverPasswordDetail)
        .then((response) => {
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    login,
    forgotPassword,
    recoverPassword,
    logout
};