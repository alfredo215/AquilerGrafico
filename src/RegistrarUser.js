import React, { useState } from "react";


function RegistrarUser() {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [pass, setPass] = useState("");

  async function FEnviar(e) {
    e.preventDefault();
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
        const responseData = await response.json(); // Intenta analizar la respuesta JSON
        localStorage.setItem("token", responseData.token);
        alert("El usuario se ha registrado");
        // Redireccionar a inicio
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
      <h4>Registrar Usuario</h4>
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
        </div>
      </form>
      <button className="btn btn-primary" onClick={FEnviar}>
        Enviar
      </button>
    </div>
  );
}

export default RegistrarUser;
