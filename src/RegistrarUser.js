import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Title from './Title'; // Importa el componente Title
function RegistrarUser() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [pass, setPass] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  async function FEnviar(e) {
    e.preventDefault();

    if (!localStorage.getItem('token')) {
      navigate('/login');
  }
    // Validación individual para cada campo
    if (!nombre) {
      setNombreError("El nombre no puede quedar vacío");
    } else {
      setNombreError("");
    }

    if (!email) {
      setEmailError("El email no puede quedar vacío");
    } else {
      setEmailError("");
    }

    if (!pass) {
      setPassError("La contraseña no puede quedar vacía");
    } else {
      setPassError("");
    }

    if(pass.length < 8) {
      setPassError("La contraseña debe tener al menos 8 caracteres");
    }

    // Si alguno de los campos está vacío, no se envía la solicitud
    if (!nombre || !email || !pass) {
      return;
    }

    const usuario = { nombre: nombre, email: email, pass: pass };
    try {
      const response = await fetch("http://localhost:3000/auth/registrar", {
        method: "POST",
        body: JSON.stringify(usuario),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          
        },
      });

      if (response.status === 200) {
        const responseData = await response.json();
        localStorage.setItem("token", responseData.token);
        alert("El usuario se ha registrado");
        window.location.href = "/";
      } else {
        alert("El usuario no se ha registrado");
      }
    } catch (error) {
      console.error("Ocurrió un error:", error);
    }
  }

  return (
    <div className="container">
      <Title text="Registrar Usuario" /> {/* Utiliza el componente Title */}
      <form>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre Completo
          </label>
          <input
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
            type="text"
            className="form-control"
            id="nombre"
          />
          {nombreError && <div className="alert alert-danger">{nombreError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="user@example.com"
            required
          />
          {emailError && <div className="alert alert-danger">{emailError}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="pass">Contraseña</label>
          <input
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            type="password"
            id="pass"
            className="form-control"
            required
          />
          {passError && <div className="alert alert-danger">{passError}</div>}
        </div>
      </form>
      <button className="btn btn-primary" onClick={FEnviar}>
        Enviar
      </button>
    </div>
  );
}

export default RegistrarUser;
