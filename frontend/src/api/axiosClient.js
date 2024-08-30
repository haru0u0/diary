import axios from "axios";

const axiosClient = axios.create({
    baseURL: "/api/v1"
});

export default axiosClient; 