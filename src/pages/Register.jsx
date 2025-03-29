import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://spabackend-6769.onrender.com/api/usuarios", {
        nombre,
        correo,
        password,
      });
      alert("Usuario registrado correctamente");
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="register-container">
      <h2>Regístrate</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Nombre Completo</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre completo"
            required
          />
        </div>
        <div>
          <label>Correo Electrónico</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="ejemplo@correo.com"
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tu contraseña"
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
      <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a></p>
    </div>
  );
}

export default Register;
