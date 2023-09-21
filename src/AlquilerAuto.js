import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Title from './Title'; // Importa el componente Title

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

  // Define estados de error para la validación
  const [clienteError, setClienteError] = useState('');
  const [duiError, setDuiError] = useState('');
  const [fechaError, setFechaError] = useState('');
  const [carro_modeloError, setCarro_modeloError] = useState('');
  const [placaError, setPlacaError] = useState('');
  const [colorError, setColorError] = useState('');
  const [estadoError, setEstadoError] = useState('');
  const [usuarioId_FKError, setUsuarioId_FKError] = useState('');


  const validateDui = (value) => {
    if (value.length > 9) {
      setDuiError("El DUI no puede tener más de 9 caracteres");
    } else if (value.length < 9) {
      setDuiError("El DUI debe tener al menos 9 caracteres");
    } else {
      setDuiError("");
    }
  };

  useEffect(() => {
    // Fetch the list of users, similar to what you did in RegistroAuto.js
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

  useEffect(() => {
    // Fetch the rental data using the ID
    async function fetchRenta() {
      try {
        const response = await fetch(`http://localhost:3000/rentas/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem('token')
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

    // Validación de campos
    let valid = true;
    
    if (!cliente) {
      setClienteError("El cliente no puede quedar vacío");
      valid = false;
    } else {
      setClienteError("");
    }

    if (!dui) {
      setDuiError("El DUI no puede quedar vacío");
      valid = false;
    } else {
      setDuiError("");
    }

    if (!fecha) {
      setFechaError("La fecha no puede quedar vacía");
      valid = false;
    } else {
      setFechaError("");
    }

    if (!carro_modelo) {
      setCarro_modeloError("El modelo de carro no puede quedar vacío");
      valid = false;
    } else {
      setCarro_modeloError("");
    }

    if (!placa) {
      setPlacaError("La placa no puede quedar vacía");
      valid = false;
    } else {
      setPlacaError("");
    }

    if (!color) {
      setColorError("El color no puede quedar vacío");
      valid = false;
    } else {
      setColorError("");
    }

    if (!estado) {
      setEstadoError("El estado no puede quedar vacío");
      valid = false;
    } else {
      setEstadoError("");
    }

    if (!usuarioId_FK) {
      setUsuarioId_FKError("Debe seleccionar un Trabajador");
      valid = false;
    } else {
      setUsuarioId_FKError("");
    }

    if (!valid) {
      return;
    }

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
          Authorization: "Bearer " + localStorage.getItem('token')
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
      <Title text={`Rentar auto con id ${id}`} /> {/* Utiliza el componente Title */}
      <form onSubmit={alquilarAuto}>
        <div className="mb-3">
          <label htmlFor="cliente" className="form-label">
            Cliente
          </label>
          <input
            type="text"
            className={`form-control ${clienteError ? 'is-invalid' : ''}`}
            id="cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
          {clienteError && (
            <div className="alert alert-danger">{clienteError}</div>
          )}
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="dui" className="form-label">
              DUI
            </label>
            <input
              type="text"
              className={`form-control ${duiError ? 'is-invalid' : ''}`}
              id="dui"
              value={dui}
              onChange={(e) => {
                const inputValue = e.target.value;
                // Verifica si el valor ingresado es numérico
                if (/^\d+$/.test(inputValue) || inputValue === "") {
                  setDui(inputValue);
                  validateDui(inputValue);
                }
              }}
              maxLength={9}
            />
            {duiError && (
              <div className="alert alert-danger">{duiError}</div>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="fecha" className="form-label">
              Fecha
            </label>
            <br />
            <DatePicker
              selected={fecha} // Usa la fecha del estado como valor seleccionado
              onChange={(date) => setFecha(date)} // Actualiza el estado cuando cambia la fecha
              className={`form-control ${fechaError ? 'is-invalid' : ''}`} // Establece la clase de estilo del DatePicker
            />
            {fechaError && (
              <div className="alert alert-danger">{fechaError}</div>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="carro_modelo" className="form-label">
              Marca y Modelo
            </label>
            <input
              type="text"
              className={`form-control ${carro_modeloError ? 'is-invalid' : ''}`}
              id="carro_modelo"
              value={carro_modelo}
              onChange={(e) => setCarro_modelo(e.target.value)}
              readOnly
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
              className={`form-control ${placaError ? 'is-invalid' : ''}`}
              id="placa"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
              readOnly
            />
            {placaError && (
              <div className="alert alert-danger">{placaError}</div>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="color" className="form-label">
              Color
            </label>
            <input
              type="text"
              className={`form-control ${colorError ? 'is-invalid' : ''}`}
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              readOnly
            />
            {colorError && (
              <div className="alert alert-danger">{colorError}</div>
            )}
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
              <option value="Rentado">Rentado</option>
              <option value="Sin Rentar">Sin Rentar</option>
            </select>
            {estadoError && (
              <div className="alert alert-danger">{estadoError}</div>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="usuarioId_FK" className="form-label">
            Trabajador
          </label>
          <select
            className={`form-control ${usuarioId_FKError ? 'is-invalid' : ''}`}
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
          {usuarioId_FKError && (
            <div className="alert alert-danger">{usuarioId_FKError}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Rentar Vehiculo
        </button>
      </form>
    </div>
  );
}

export default AlquilerAuto;
