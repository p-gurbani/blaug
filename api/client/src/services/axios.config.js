import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://blaug.herokuapp.com/api",
});
