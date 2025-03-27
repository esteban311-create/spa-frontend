import React from "react";

function Register() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-4xl font-bold text-gold-500 mb-6">Crear Cuenta</h2>
            <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                    <input type="text" placeholder="Nombre completo" className="w-full border border-gray-300 p-2 rounded-lg" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Correo</label>
                    <input type="email" placeholder="Correo electrónico" className="w-full border border-gray-300 p-2 rounded-lg" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
                    <input type="password" placeholder="Contraseña" className="w-full border border-gray-300 p-2 rounded-lg" />
                </div>
                <button className="w-full bg-gold-500 text-white py-2 rounded-lg font-bold hover:bg-gold-600 transition">Registrar</button>
            </form>
        </div>
    );
}

export default Register;
