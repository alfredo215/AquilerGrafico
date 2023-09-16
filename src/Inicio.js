import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';

function Inicio() {
  const navigate = useNavigate();
  const [rentas, setRentas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [elementoAEliminar, setElementoAEliminar] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  useEffect(() => {
    // Obtener datos de rentas
    axios
      .get('http://localhost:3000/rentas', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => setRentas(response.data))
      .catch((error) => console.log(error));

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

  // Función para obtener el nombre del empleado a partir de su ID
  const getNombreEmpleado = (usuarioId) => {
    const empleado = usuarios.find((usuario) => usuario.usuarioId === usuarioId);
    return empleado ? empleado.nombre : 'Desconocido';
  };

  // Función para eliminar un elemento
  const eliminarElemento = () => {
    axios
      .delete(`http://localhost:3000/rentas/${elementoAEliminar}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then(() => {
        setRentas(rentas.filter((renta) => renta.rentaId !== elementoAEliminar));
        setElementoAEliminar(null);
        setMostrarConfirmacion(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <div>
        <h4>Listado de rentas</h4>
        {rentas.length === 0 && (
          <h3 className="text-center alert alert-danger">No hay datos para mostrar</h3>
        )}
        {rentas.length > 0 && (
          <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
            <table className="table table-bordered table-dark">
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
                        <Button
                          onClick={() => navigate(`/alquilerauto/${renta.rentaId}`)}
                          variant="contained"
                          color="primary"
                        >
                          Editar
                        </Button>
                        <Button
                          onClick={() => {
                            setElementoAEliminar(renta.rentaId);
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
            <p>¿Estás seguro de que quieres eliminar este elemento?</p>
            <Button
              onClick={() => {
                eliminarElemento();
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

export default Inicio;
