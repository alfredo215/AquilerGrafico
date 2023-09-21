import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setShowPassword(false);
  }, [email]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datos = { email: email, pass: password };

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then(async (response) => await response.json());

      if (response.statusCode !== 200) {
        alert("Error en los datos de autenticación");
      } else {
        localStorage.setItem("token", await response.token);
        alert("El usuario se ha autenticado");
        // Redireccionar a la página de inicio
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Ocurrió un error:", error);
    }
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "400px",
        backgroundColor: "#b8a3d1",
        padding: "20px",
        borderRadius: "10px",
        margin: "50px auto", // Centrar horizontalmente y agregar margen superior
      }}
    >
      <div className="container" style={{ maxWidth: "400px" }}>
        <Typography variant="h5" gutterBottom>
          Inicio de Sesión
        </Typography>
        <form id="LoginForm" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            onChange={handleEmailChange}
            value={email}
            type="email"
            label="Correo Electrónico"
            variant="outlined"
            margin="normal"
            required
            InputProps={{
              style: {
                "&:hover:not($focused)": {
                  borderColor: "#b780e5", // Cambia el color al pasar el cursor
                },
              },
            }}
          />
          <TextField
            fullWidth
            onChange={handlePasswordChange}
            value={password}
            type={showPassword ? "text" : "password"}
            label="Contraseña"
            variant="outlined"
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={toggleShowPassword} size="large">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                "&:hover:not($focused)": {
                  borderColor: "#b780e5", // Cambia el color al pasar el cursor
                },
                "&:focus": {
                  borderColor: "#b780e5", // Cambia el color al seleccionar el campo
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{
              marginTop: "20px",
              backgroundColor: "#8a4baf", // Cambia el color del botón
            }}
          >
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
