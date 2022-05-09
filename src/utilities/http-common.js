import axios from "axios";
const token = JSON.parse(localStorage.getItem("user"));
export default axios.create({
  baseURL: "http://localhost:8000",
  //method: 'POST',
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
    Authorization: `Bearer ${token ? token.access_token : ""}`,
    responseType: "json",
  },
});
