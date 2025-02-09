import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const createPayment = (data) => API.post("/payment/create-payment", data);
