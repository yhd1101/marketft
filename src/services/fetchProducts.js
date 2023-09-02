import productApi from "./productApi";

const fetchProducts = async () => {
    const {data} = await productApi.get("/")
    return data
}

// const useFetchProducts = () =>
