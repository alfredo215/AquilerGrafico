import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AlquilerAuto() {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!localStorage.getItem('token')) {
    navigate('/login');
}
  const [cliente, setCliente] = useState('');
  const [dui, setDui] = useState('');
  const [fecha, setFecha] = useState(new Date()); // Inicializa con un objeto Date
  const [carro_modelo, setCarro_modelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [color, setColor] = useState('');
  const [estado, setEstado] = useState('');
  const [usuarioId_FK, setUsuarioId_FK] = useState(0);
  const [usuarios, setUsuarios] = useState([]); // Lista de usuarios

  useEffect(() => {
    // Fetch the list of users, similar to what you did in RegistroAuto.js
    async function fetchUsuarios() {
      try {
        const response = await fetch("http://localhost:3000/usuarios", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer "+ localStorage.getItem('token')
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsuarios(data);
        } else {
          console.error("Error al obtener la lista de usuarios");
        }
      } catch (error) {
        console.error("Error al obtener la lista de usuarios:", error);
      }
    }

    fetchUsuarios();
  }, []);

  useEffect(() => {
    // Fetch the rental data using the ID
    async function fetchRenta() {
      try {
        const response = await fetch(`http://localhost:3000/rentas/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer "+ localStorage.getItem('token')
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCliente(data.cliente);
          setDui(data.dui);

          // Verifica si la fecha es válida antes de asignarla al estado
          const date = new Date(data.fecha);
          if (!isNaN(date.getTime())) {
            setFecha(date);
          } else {
            console.error('Fecha inválida');
          }

          setCarro_modelo(data.carro_modelo);
          setPlaca(data.placa);
          setColor(data.color);
          setEstado(data.estado);
          setUsuarioId_FK(data.usuarioId_FK);
        } else {
          console.error('Error al obtener los datos de la renta');
        }
      } catch (error) {
        console.error('Error al obtener los datos de la renta:', error);
      }
    }

    fetchRenta();
  }, [id]);
  

  const alquilarAuto = async (e) => {
    e.preventDefault();
    const datos = {
      cliente: cliente,
      dui: dui,
      fecha: fecha.toISOString().split('T')[0], // Convierte la fecha al formato "aaaa-mm-dd"
      carro_modelo: carro_modelo,
      placa: placa,
      color: color,
      estado: estado,
      usuarioId_FK: usuarioId_FK,
    };

    try {
    const response = await fetch(`http://localhost:3000/rentas/${id}`, {
      method: "PATCH",
      body: JSON.stringify(datos),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer "+ localStorage.getItem('token')
      },
    })
      .catch((error) => {
        console.error("Error:", error);
      });
      if (response.ok) {
        alert("Auto registrado con éxito");
        // Redirigir al usuario a la página /verusuario después de la actualización
        navigate(`/`);

      } else {
        alert("Error al registrar el auto");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al registrar el auto");
    }

  }

  return (
    <div className="container">
      <h4>Rentar auto con id {id}</h4>
      <form onSubmit={alquilarAuto}>
        <div className="mb-3">
          <label htmlFor="cliente" className="form-label">
            Cliente
          </label>
          <input
            type="text"
            className="form-control"
            id="cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dui" className="form-label">
            DUI
          </label>
          <input
            type="text"
            className="form-control"
            id="dui"
            value={dui}
            onChange={(e) => setDui(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fecha" className="form-label ">
            Fecha
          </label>
          <br />
          <DatePicker
            selected={fecha} // Usa la fecha del estado como valor seleccionado
            onChange={(date) => setFecha(date)} // Actualiza el estado cuando cambia la fecha
          />
        </div>
        <div className="mb-3">
          <label htmlFor="carro_modelo" className="form-label">
            Marca y Modelo
          </label>
          <input
            type="text"
            className="form-control"
            id="carro_modelo"
            value={carro_modelo}
           onChange={(e) => setCarro_modelo(e.target.value)}
           readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="placa" className="form-label">
            Placa
          </label>
          <input
            type="text"
            className="form-control"
            id="placa"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="color" className="form-label">
            Color
          </label>
          <input
            type="text"
            className="form-control"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            readOnly
          />
        </div>
        <div className="mb-3">
  <label htmlFor="estado" className="form-label">
    Estado
  </label>
  <select
    className="form-select"
    id="estado"
    value={estado}
    onChange={(e) => setEstado(e.target.value)}
  >
    <option value="Rentado">Rentado</option>
    <option value="Sin Rentar">Sin Rentar</option>
  </select>
</div>

        <div className="mb-3">
          <label htmlFor="usuarioId_FK" className="form-label">
            Trabajador
          </label>
          <select
            className="form-control"
            id="usuarioId_FK"
            value={usuarioId_FK}
            onChange={(e) => setUsuarioId_FK(Number(e.target.value))}
          >
            <option value="">Selecciona un trabajador</option>
            {usuarios.map((usuario) => (
              <option key={usuario.usuarioId} value={usuario.usuarioId}>
                {usuario.nombre}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Rentar Vehiculo
        </button>
      </form>
    </div>
  );
}

export default AlquilerAuto;