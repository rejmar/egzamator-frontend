import axios from "axios";

const instance = axios.create({
  //   baseURL: "https://react-sandwich-app.firebaseio.com/"
  baseURL: "http://localhost:8080/egzamator-api/"
});

export default instance;
