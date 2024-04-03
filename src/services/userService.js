import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

async function login(values) {
  const body = { userName: values.userName, password: values.password };
  const result = await axios.post(apiUrl+'/users/login', body);
  //console.log('result::: ', result.data);
  return result.data;
}
export {
  login
}