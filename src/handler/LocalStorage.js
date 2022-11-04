import CryptoJS from 'crypto-js'
import config from '../config';

class ManageLocalStorage {
    setItem(key, value) {
        var data = CryptoJS.AES.encrypt(JSON.stringify(value), config.ENCRYPTED_KEY);
        localStorage.setItem(key, data);
        return true;
    }

    // getItem (key) {}

    removeItem(key) {
        localStorage.removeItem(key)
    }
}

export default new ManageLocalStorage();