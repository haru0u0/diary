import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost/api/v1"
});

export default axiosClient; 