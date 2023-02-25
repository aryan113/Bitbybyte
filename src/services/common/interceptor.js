import axios from "axios";

// request interceptor
axios.interceptors.request.use(
    (config) => {
        if (config.headers && !config.headers["Content-Type"]) {
            config.headers = {
                ...config.headers,
                "Content-Type": "application/json",
                headers: {"Authorization" : `Bearer key8Fd9wPmEeVMGCJ`}
            };
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

// response interceptor
axios.interceptors.response.use(
    (response) => {
        // here we can check the failure and take some common actions
        return response;
    },
    function (error) {
        if (
            error.response.status === 401 &&
            !window.location.pathname.startsWith("/")
        ) {
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);
