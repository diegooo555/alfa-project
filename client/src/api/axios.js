import axios from "axios";
import { API_URL } from "../config";

const instanceAxios = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export default instanceAxios;
