import axios from "axios";

const productApi = axios.create({
    baseURL: "http://localhost:8000/api/product"
})
export default productApi