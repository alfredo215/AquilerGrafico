import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function VerUsuario() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Obtener datos de usuarios
    fetch('http://localhost:3000/usuarios', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className='container'>
      <div>
        <h4>Listado de usuarios</h4>
        {usuarios.length === 0 && (
          <h3 className='text-center alert alert-danger'>No hay datos para mostrar</h3>
        )}
        {usuarios.length > 0 && (
          <table className='table table-bordered table-dark'>
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
                      <button
                        onClick={() => navigate(`/actualizaruser/${usuario.usuarioId}`)}
                        className='btn btn-primary'
                      >
                        Editar
                      </button>
                      <button className='btn btn-danger'>Eliminar</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default VerUsuario;
