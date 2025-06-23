import axios from "axios";

const isProduction = window.location.hostname.includes("onrender.com");
axios.defaults.baseURL = isProduction
  ? "https://laundry-mern-app-backend.onrender.com"
  : "http://localhost:8080";

export default axios;
