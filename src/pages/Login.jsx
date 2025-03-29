import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../services/userService";

function Login() {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [name, setName] = useState(""); // Campo adicional para el registro
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
    
        try {
            const response = await loginUser({ correo, password });
            console.log('Respuesta del servidor:', response);
    
            const usuario = response?.usuario;
            console.log('Usuario obtenido:', usuario); // Ahora debería mostrar el objeto completo
            console.log('Tipo de response:', typeof response);
console.log('Response keys:', Object.keys(response || {}));

            if (usuario?.nombre) {
                localStorage.setItem('nombreUsuario', usuario.nombre);
                navigate("/dashboard");
            } else {
                setError("No se pudo obtener el nombre del usuario.");
            }
            
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            setError(err.response?.data?.message || "Error al procesar la solicitud.");
        }
    };
    
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#f5f5f5] flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
                <img
                    src="/logo.png" // Asegúrate de que el logo esté en la carpeta public
                    alt="SPA Me lo Merezco"
                    className="mx-auto w-24 mb-6"
                />
                <h1 className="text-2xl font-bold text-center text-[#d4af37] mb-4">
                    {isRegistering ? "Regístrate" : "Iniciar Sesión"}
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    {isRegistering
                        ? "Crea tu cuenta para disfrutar de nuestros servicios."
                        : "Bienvenido de nuevo. Por favor, inicia sesión para acceder a tu cuenta."}
                </p>
                {error && (
                    <p className="text-red-500 text-center font-semibold mb-4">{error}</p>
                )}
                <form onSubmit={handleSubmit}>
                    {isRegistering && (
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                Nombre Completo
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                                placeholder="Tu nombre completo"
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-700"
                        >
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={correo}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                            placeholder="ejemplo@correo.com"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-700"
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                            placeholder="Tu contraseña"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#d4af37] text-white py-2 rounded-md font-semibold shadow-md hover:bg-[#b58e2b] transition-all duration-300"
                    >
                        {isRegistering ? "Registrarse" : "Iniciar Sesión"}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    {isRegistering
                        ? "¿Ya tienes una cuenta? "
                        : "¿No tienes una cuenta? "}
                    <button
                        onClick={() => setIsRegistering(!isRegistering)}
                        className="text-[#d4af37] font-semibold hover:underline"
                    >
                        {isRegistering ? "Inicia sesión aquí" : "Regístrate aquí"}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;
