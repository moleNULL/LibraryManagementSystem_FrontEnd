import axios from "axios";

export default axios.create({
    baseURL: `https://localhost:7170/api/v1`,
})