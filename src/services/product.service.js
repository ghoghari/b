import axios from "axios";
import config from '../config'
import authHeader from "./auth-header";

var API_URL = config.BASE_URL + 'api/';

// Get All Customes list
const getAllProducts = () => {
    return axios
        .get(API_URL + "products", { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};
// Get customers by Id
const getCustomers = (id) => {
    return axios
        .get(API_URL + "customers/" + id, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};
// Add Customers
const addProduct = (product) => {
    return axios
        .post(API_URL + "products", product, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};
// Update customers
const updateCustomer = (user,id) => {
    return axios
        .put(API_URL + "customers/" + id, user, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};
// Delete Customers
const deleteCustomer = (id) => {
    return axios
        .delete(API_URL + "customers/" + id, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};
// Import customer
const  importCustomers = (user) => {
    return axios
        .post(API_URL + "importCustomers", user, { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};
// Get All Staff 
const getAllStaff = () => {
    return axios
        .get(API_URL + "staffs", { headers: authHeader() })
        .then((response) => {
            return response.data;
        });
};

export default {
    getAllProducts, 
    getCustomers,
    addProduct, 
    updateCustomer, 
    deleteCustomer, 
    importCustomers,
    getAllStaff, 
};
