import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';

function VerUsuario() {
  const navigate = useNavigate();

  if (!localStorage.getItem('token')) {
    navigate('/login');
}
  const [usuarios, setUsuarios] = useState([]);
  const [elementoAEliminar, setElementoAEliminar] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  useEffect(() => {
    // Obtener datos de usuarios
    axios
      .get('http://localhost:3000/usuarios', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => setUsuarios(response.data))
      .catch((error) => console.log(error));
  }, []);

  // Función para eliminar un usuario
  const eliminarUsuario = (id) => {
    axios
      .delete(`http://localhost:3000/usuarios/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then(() => {
        setUsuarios(usuarios.filter((usuario) => usuario.usuarioId !== id));
        setElementoAEliminar(null);
        setMostrarConfirmacion(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <div>
        <h4>Listado de usuarios</h4>
        {usuarios.length === 0 && (
          <h3 className="text-center alert alert-danger">No hay datos para mostrar</h3>
        )}
        {usuarios.length > 0 && (
          <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
            <table className="table table-bordered table-dark">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length > 0 &&
                  usuarios.map((usuario) => (
                    <tr key={usuario.usuarioId}>
                      <td>{usuario.usuarioId}</td>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.email}</td>
                      <td>
                        <Button
                          onClick={() => navigate(`/actualizaruser/${usuario.usuarioId}`)}
                          variant="contained"
                          color="primary"
                        >
                          Editar
                        </Button>
                        <Button
                          onClick={() => {
                            setElementoAEliminar(usuario.usuarioId);
                            setMostrarConfirmacion(true);
                          }}
                          variant="contained"
                          color="error"
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        {mostrarConfirmacion && (
          <div className="alert alert-danger">
            <p>¿Estás seguro de que quieres eliminar este usuario?</p>
            <Button
              onClick={() => {
                eliminarUsuario(elementoAEliminar);
                setMostrarConfirmacion(false);
              }}
              variant="contained"
              color="error"
            >
              Sí
            </Button>
            <Button
              onClick={() => setMostrarConfirmacion(false)}
              variant="contained"
              color="secondary"
            >
              Cancelar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerUsuario;
