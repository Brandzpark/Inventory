import axios from "axios";
export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4015",
  timeout: 1000,
});
