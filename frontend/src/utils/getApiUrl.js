// src/utils/getApiUrl.js

const API_BASE_URL =
  window.location.hostname.includes("onrender.com")
    ? "https://laundry-mern-app-backend.onrender.com"
    : "http://localhost:8080";

export const getServicePhotoUrl = (id) =>
  `${API_BASE_URL}/api/v1/service/service-photo/${id}`;
