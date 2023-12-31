import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import Title from './Title'; // Importa el componente Title

function RegistroAuto() {
  const navigate = useNavigate();

  if (!localStorage.getItem('token')) {
    navigate('/login');
  }

  const [cliente, setCliente] = useState("");
  const [dui, setDui] = useState("");
  const [fecha, setFecha] = useState(null);
  const [carro_modelo, setCarro_modelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [color, setColor] = useState("");
  const [estado, setEstado] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

  const [fechaError, setFechaError] = useState("");
  const [carro_modeloError, setCarro_modeloError] = useState("");
  const [placaError, setPlacaError] = useState("");
  const [colorError, setColorError] = useState("");
  const [estadoError, setEstadoError] = useState("");
  const [usuarioId_FKError, setUsuarioId_FKError] = useState("");


  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const response = await fetch("http://localhost:3000/usuarios", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem('token')
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

  async function SaveAuto(e) {
    e.preventDefault();

    if (!fecha) {
      setFechaError("La fecha no puede quedar vacía");
    } else {
      setFechaError("");
    }

    if (!carro_modelo) {
      setCarro_modeloError("El modelo de carro no puede quedar vacío");
    } else {
      setCarro_modeloError("");
    }

    if (!placa) {
      setPlacaError("La placa no puede quedar vacía");
    } else {
      setPlacaError("");
    }

    if (!color) {
      setColorError("El color no puede quedar vacío");
    } else {
      setColorError("");
    }

    if (!estado) {
      setEstadoError("El estado no puede quedar vacío");
    } else {
      setEstadoError("");
    }

    if (!usuarioSeleccionado) {
      setUsuarioId_FKError("Debe seleccionar un Trabajador");
      return;
    } else {
      setUsuarioId_FKError("");
    }

    const usuarioIdNumero = parseInt(usuarioSeleccionado, 10)
    
    // Si la placa no existe, guardar el registro
    const nuevoAuto = {
      cliente: cliente || "Sin cliente",
      dui: dui || "000000000",
      fecha: fecha ? fecha.toISOString().slice(0, 10) : null,
      carro_modelo,
      placa,
      color,
      estado,
      usuarioId_FK: usuarioIdNumero,
    };

    try {
      const response = await fetch("http://localhost:3000/rentas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify(nuevoAuto),
      });

      if (response.ok) {
        alert("Auto registrado con éxito");
        setCliente("");
        setDui("");
        setFecha(null);
        setCarro_modelo("");
        setPlaca("");
        setColor("");
        setEstado("");
        setUsuarioSeleccionado("");
  
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
      <Title text="Registrar Auto" />
      <form onSubmit={SaveAuto}>
        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">
            Fecha
          </label><br />
          <DatePicker
            selected={fecha}
            onChange={(date) => setFecha(date)}
            dateFormat="yyyy-MM-dd"
            className="form-control"
          />
          {fechaError && <div className="alert alert-danger">{fechaError}</div>}
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="carro_modelo" className="form-label">
              Modelo
            </label>
            <input
              type="text"
              className="form-control"
              id="carro_modelo"
              value={carro_modelo}
              onChange={(e) => setCarro_modelo(e.target.value)}
            />
            {carro_modeloError && (
              <div className="alert alert-danger">{carro_modeloError}</div>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="placa" className="form-label">
              Placa
            </label>
            <input
              type="text"
              className="form-control"
              id="placa"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
            />
            {placaError && <div className="alert alert-danger">{placaError}</div>}
          
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="color" className="form-label">
              Color
            </label>
            <input
              type="text"
              className="form-control"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            {colorError && <div className="alert alert-danger">{colorError}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="estado" className="form-label">
              Estado
            </label>
            <select
              className={`form-select ${estadoError ? 'is-invalid' : ''}`}
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="">Selecciona un estado</option>
              <option value="Rentado">Rentado</option>
              <option value="Sin Rentar">Sin Rentar</option>
            </select>
            {estadoError && <div className="alert alert-danger">{estadoError}</div>}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="usuarioId_FK" className="form-label">
            Trabajador
          </label>
          <select
            className="form-control"
            id="usuarioId_FK"
            value={usuarioSeleccionado}
            onChange={(e) => setUsuarioSeleccionado(e.target.value)}
          >
            <option value="">Selecciona un trabajador</option>
            {usuarios.map((usuario) => (
              <option key={usuario.usuarioId} value={usuario.usuarioId}>
                {usuario.nombre}
              </option>
            ))}
          </select>
          {usuarioId_FKError && <div className="alert alert-danger">{usuarioId_FKError}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar Auto
        </button>
      </form>
    </div>
  );
}

export default RegistroAuto;
