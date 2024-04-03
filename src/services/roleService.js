import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

async function getRoles() {
  try {
    const response = await axios.get(`${apiUrl}/roles`);
    return response.data;
  } catch (error) {
    throw new Error(`Error mientras se obtienen los roles: ${error.message}`);
  }
}

export {
  getRoles
}