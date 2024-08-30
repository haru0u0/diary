import axiosClient from "./axiosClient";

const authApi = {
    isAuthenticated: () => axiosClient.get("/auth/isAuthed"),
}

export default authApi;