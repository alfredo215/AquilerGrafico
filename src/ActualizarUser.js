import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function ActualizarUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/usuarios/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
       // Authorization: "Bearer " + localStorage.getItem('token')
      }
    })
      .then(response => response.json())
      .then(data => {
        setEmail(data.email);
        setNombre(data.nombre);
      })
      .catch(error => {
        console.error(error);
        // Agregar aquí la lógica de manejo de errores, por ejemplo, redirigir a la página de error.
      });
  }, [id]);

  const actualizarUsuario = async (e) => {
    e.preventDefault();
    const datos = { "email": email, "nombre": nombre };
    console.log(datos);

    try {
        //error
      const response = await fetch(`http://localhost:3000/auth/${id}`, {
        method: "PATCH",
        body: JSON.stringify(datos),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          //Authorization: "Bearer " + localStorage.getItem('token')
        },
      });

      if (response.ok) {
        alert("Usuario actualizado con éxito");
        // Agregar aquí la lógica adicional después de una actualización exitosa.
      } else {
        alert("Error al actualizar el usuario");
        // Agregar aquí la lógica de manejo de errores, por ejemplo, mostrar un mensaje de error.
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar el usuario");
      // Agregar aquí la lógica de manejo de errores, por ejemplo, mostrar un mensaje de error.
    }
  }

  return (
    <div className="container">
      <h1>Actualizar registro con id {id}</h1>
      <form onSubmit={actualizarUsuario}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Actualizar
        </button>
      </form>
    </div>
  );
}

export default ActualizarUser;
