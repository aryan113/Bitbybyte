import axios from "axios";
const API_KEY = 'patwXzkI0ezdZsVSg.52b54dda6e51b05c2c25129f348b03f8397728ac6fa9a6c8d8757fd857126a5c'

// request interceptor
axios.interceptors.request.use(
    (config) => {
        if (config.headers && !config.headers["Content-Type"]) {
            config.headers = {
                ...config.headers,
                "Content-Type": "application/json",
                headers: { "Authorization": `Bearer ${API_KEY}` }
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
