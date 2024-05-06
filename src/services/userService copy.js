import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

async function login(values, setIsAuth) {
  const body = { email: values.email, password: values.password };
  const result = await axios.post(apiUrl + "api/v1/login", body);
  console.log('result::: ', result.data);
  return result.data;
}

async function createUserRequest(body) {
  try {
    const response = await axios.post(apiUrl + "/users", body);
    console.log("response::: ", response);
    if (response.status === 200) {
      return 'Usuario creado correctamente';
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
    const response = await axios.get(apiUrl + "/users");
    return response.data;
  } catch (error) {
    console.log("Ocurrió un error al obtener los usuarios");
    throw error;
  }
}

async function getUserByIDRequest(id) {
  try {
    const response = await axios.get(apiUrl + `/users/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Ocurrio un error al buscar el usuario con id ${id}`);
    throw error;
  }
}

async function updateUserRequest(id, data) {
  try {
    const response = await axios.patch(apiUrl + `/users/${id}`, data);
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
    const response = await axios.delete(apiUrl + `/users/${id}`);
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
  createUserRequest,
  getAllUsers,
  getUserByIDRequest,
  updateUserRequest,
  removeUserRequest,
};
