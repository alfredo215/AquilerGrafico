import React, { useState } from "react";
import TextField from "@mui/material/TextField";
function Login() {
  //Login Data
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [nombre, setNombre] = useState("");

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
      }).then(async (response) => await response.json());

      if (response.statusCode != 200) {
        alert("El usuario no se ha registrado");
      } else {
        alert("El usuario se ha registrado");
        //redireccionar a inicio
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Ocurrió un error:", error);
    }
  }

  async function FAutenticar(e) {
    e.preventDefault();
    const datos = { email: email, pass: pass };
    //POST localhost:3000/auth/login
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(async (response) => await response.json());
    if (response.statusCode != 200) {
      alert("Error en los datos de autenticacion");
    } else {
      localStorage.setItem("token", await response.token);
      alert("El usuario se ha autenticado");
      //redireccionar a inicio
      window.location.href = "/";
    }
  }

  return (
    <div className="container">
      <h2>Autenticacion</h2>
      <form id="LoginForm" onSubmit={FAutenticar}>
        <div class="mb-3">
          

          <TextField
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />

        </div>
        <div class="mb-3">
       
          <TextField
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            type="password"
            
            id="outlined-basic"
            label="Clave"
            variant="outlined"

          />
         
        </div>

        <button type="submit" class="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;