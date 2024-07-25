import axiosClient from "./axiosClient";

const checkApi = {
    test: (params) => axiosClient.get("/test", params),
}

export default checkApi;