import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

async function getRoles() {
  // const token = localStorage.getItem("token");
  // if (token) {
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // } else {
  //   console.error('No se encontro un token en el almacenamiento local');
  // }
  try {
    const response = await axios.get(`${apiUrl}/api/v1/roles`);
    return response.data;
  } catch (error) {
    throw new Error(`Error mientras se obtienen los roles: ${error.message}`);
  }
}

export {
  getRoles
}