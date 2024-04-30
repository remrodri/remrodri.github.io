import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

async function getAllLogs() {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      console.error('no se encontro un token en el localstorage');
    }
    const response = await axios.get(`${apiUrl}/api/v1/logs`);
    return response.data;
  } catch (error) {
    console.log('ocurrio un erro al obtener los logs');
    throw error;
  }
}

export {
  getAllLogs,
};