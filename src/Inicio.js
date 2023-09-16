import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Inicio() {
  const navigate = useNavigate();
  const [rentas, setRentas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Obtener datos de rentas
    fetch('http://localhost:3000/rentas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => setRentas(data))
      .catch((error) => console.log(error));

    // Obtener datos de usuarios
    fetch('http://localhost:3000/usuarios', { // Cambia la URL aquí
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

  // Función para obtener el nombre del empleado a partir de su ID
  const getNombreEmpleado = (usuarioId) => {
    const empleado = usuarios.find((usuario) => usuario.usuarioId === usuarioId);
    return empleado ? empleado.nombre : 'Desconocido';
  };

  return (
    <div className='container'>
      <div>
        <h4>Listado de rentas</h4>
        {rentas.length === 0 && (
          <h3 className='text-center alert alert-danger'>No hay datos para mostrar</h3>
        )}
        {rentas.length > 0 && (
          <table className='table table-bordered table-dark'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Dui</th>
                <th>Fecha</th>
                <th>Automóvil</th>
                <th>Placa</th>
                <th>Color</th>
                <th>Estado</th>
                <th>Empleado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rentas.length > 0 &&
                rentas.map((renta) => (
                  <tr key={renta.rentaId}>
                    <td>{renta.rentaId}</td>
                    <td>{renta.cliente}</td>
                    <td>{renta.dui}</td>
                    <td>{renta.fecha}</td>
                    <td>{renta.carro_modelo}</td>
                    <td>{renta.placa}</td>
                    <td>{renta.color}</td>
                    <td>{renta.estado}</td>
                    <td>{getNombreEmpleado(renta.usuarioId_FK)}</td>
                    <td>
                                <button onClick={() => navigate(`/alquilerauto/${renta.rentaId}`)} className='btn btn-primary'>Editar</button>
                                <button onClick={() => navigate(`/eliminar/${renta.rentaId}`)} className='btn btn-danger'>Eliminar</button>
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

export default Inicio;
