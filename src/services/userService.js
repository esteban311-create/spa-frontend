import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;


// Función para registrar un usuario
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/usuarios`, userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.errores?.map(err => err.msg).join(", ") || "Error al registrar usuario");
    }
};

// Función para iniciar sesión
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials); // Cambiamos la ruta aquí
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al iniciar sesión");
    }
};
