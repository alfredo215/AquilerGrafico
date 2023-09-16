import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function AlquilerAuto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState("");
  const [dui, setDui] = useState("");
  const [fecha, setFecha] = useState("");
  const [carro_modelo, setCarro_modelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [color, setColor] = useState("");
  const [estado, setEstado] = useState("");
  const [usuarioId_FK, setUsuarioId_FK] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3000/rentas/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        setCliente(data.cliente);
        setDui(data.dui);
        setFecha(data.fecha);
        setCarro_modelo(data.carro_modelo);
        setPlaca(data.placa);
        setColor(data.color);
        setEstado(data.estado);
        setUsuarioId_FK(data.usuarioId_FK);
      })
      .catch(error => console.error(error));
  }, [id]);

  const alquilarAuto = async (e) => {
    e.preventDefault();
    const datos = {
      "cliente": cliente,
      "dui": dui,
      "fecha": fecha,
      "carro_modelo": carro_modelo,
      "placa": placa,
      "color": color,
      "estado": estado,
      "usuarioId_FK": usuarioId_FK
    };

    console.log(datos);

    try {
    const response = await fetch(`http://localhost:3000/rentas/${id}`, {
      method: "PATCH",
      body: JSON.stringify(datos),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
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
          <label htmlFor="fecha" className="form-label">
            Fecha
          </label>
          <input
            type="text"
            className="form-control"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
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
          />
        </div>
        <div className="mb-3">
          <label htmlFor="estado" className="form-label">
            Estado
          </label>
          <input
            type="text"
            className="form-control"
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="usuarioId_FK" className="form-label">
            Trabajador
          </label>
          <input
            type="number"
            className="form-control"
            id="usuarioId_FK"
            value={usuarioId_FK}
            onChange={(e) => setUsuarioId_FK(Number(e.target.value))}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Rentar Vehiculo
        </button>
      </form>
    </div>
  );
}

export default AlquilerAuto;
