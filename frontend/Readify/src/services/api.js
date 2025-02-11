import axios from "axios";

const API = axios.create({ baseURL: "https://readify.railway.internal/api" });

export const createPayment = (data) => API.post("/payment/create-payment", data);

export const sendOtp = (data) => API.post("/otp/send-otp", data);
export const verifyOtp = (data) => API.post("/otp/verify-otp", data);
