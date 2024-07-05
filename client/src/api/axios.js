import axios from "axios";

const instanceAxios = axios.create({
    baseURL: "https://alfa-project.onrender.com/api",
    withCredentials: true
});

export default instanceAxios;
