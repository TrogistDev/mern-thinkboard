import axios from "axios"
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/notes"
const api = axios.create(
    {baseURL: "/api",}
)

export default api