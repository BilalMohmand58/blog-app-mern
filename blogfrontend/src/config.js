import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://bprogrammer.herokuapp.com/api/",
});
