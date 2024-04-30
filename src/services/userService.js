import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

async function login(values) {
  try {
    const body = { email: values.email, password: values.password };
    console.log("body::: ", body);
    const result = await axios.post(`${apiUrl}/api/v1/login`, body);
    // console.log("result::: ", result);

    if (result && result.data && result.data.token) {
      return result.data.token;
    } else {
      throw new Error("Nose recibio token en la respuesta");
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Error en la solicitud de inicio de sesion");
    }
  }
}

async function logoutRequest(userId) {
  try {
    const body = {userId}
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    // eslint-disable-next-line no-unused-vars
    const response = await axios.post(`${apiUrl}/api/v1/logout`,body);
    // console.log('response::: ', response);
    
  } catch (error) {
    console.error("No se encontro un token en el almacenamiento local");
    throw error;
  }
}

async function createUserRequest(body) {
  // console.log("body::: ", body);
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("No se encontro un token en el almacenamiento local");
    }
    const response = await axios.post(`${apiUrl}/api/v1/register`, body);
    console.log("response::: ", response);
    if (response.status === 201) {
      return "Usuario creado correctamente";
      // return response.data;
    } else {
      throw new Error("Error al crear el usuario");
    }
  } catch (error) {
    console.log("ERROR EN LA CREACION DE USUARIO");
    console.dir(error.message);
    throw error;
  }
}

async function getAllUsers() {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("no se encontro un token en el localStorage");
    }
    const response = await axios.get(`${apiUrl}/api/v1/users`);
    return response.data;
  } catch (error) {
    console.log("Ocurrió un error al obtener los usuarios");
    throw error;
  }
}

async function getUserByIdRequest(id) {
  // console.log('id::: ', id);
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("No se encontro un token en el almacenamiento local");
    }
    const response = await axios.get(`${apiUrl}/api/v1/user/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Ocurrio un error al buscar el usuario con id ${id}`);
    throw error;
  }
}

async function updateUserRequest(id, data) {
  try {
    const response = await axios.patch(apiUrl + `/user/${id}`, data);
    if (response.status == 200) {
      // return "Se actualizó el usuario exitosamente";
      return response;
    } else {
      throw new Error("No se pudo actualizar el usuario");
    }
  } catch (err) {
    console.log("Error en la actualización del usuario");
    throw err;
  }
}

async function removeUserRequest(id) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("No se encontro un token en el almacenamiento local");
    }
    const response = await axios.delete(`${apiUrl}/api/v1/user/${id}`);
    if (response.status === 200) {
      return "Usuario eliminado correctamente";
    } else {
      throw new Error("No se pudo eliminar el usuario");
    }
  } catch (error) {
    console.log(`Error al intentar borrar el usuario con id ${id}`);
    throw error;
  }
}

export {
  login,
  logoutRequest,
  createUserRequest,
  getAllUsers,
  getUserByIdRequest,
  updateUserRequest,
  removeUserRequest,
};
