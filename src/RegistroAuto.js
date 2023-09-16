import React, { useState } from "react";

function RegistroAuto() {
  const [cliente, setCliente] = useState("");
  const [dui, setDui] = useState("");
  const [fecha, setFecha] = useState("");
  const [carro_modelo, setCarro_modelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [color, setColor] = useState("");
  const [estado, setEstado] = useState("");
  const [usuarioId_FK, setUsuarioId_FK] = useState(0); // Inicializado como número

  const SaveAuto = async (e) => {
    e.preventDefault();

    // Crea un objeto con los datos del auto
    const nuevoAuto = {
      cliente: cliente || "Sin cliente",
      dui: dui || "000000000",
      fecha,
      carro_modelo,
      placa,
      color,
      estado,
      usuarioId_FK,
    };

    try {
      // Realiza una solicitud POST al servicio backend
      const response = await fetch("http://localhost:3000/rentas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoAuto),
      });

      if (response.ok) {
        alert("Auto registrado con éxito");
        // Limpia los campos del formulario después de un registro exitoso
        setCliente("");
        setDui("");
        setFecha("");
        setCarro_modelo("");
        setPlaca("");
        setColor("");
        setEstado("");
        setUsuarioId_FK(0); // Reinicializa como número
      } else {
        alert("Error al registrar el auto");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al registrar el auto");
    }
  };

  return (
    <div className="container">
      <h4>Registrar Auto</h4>
      <form onSubmit={SaveAuto}>
        <div className="mb-3">
          <label htmlFor="cliente" className="form-label" style={{ display: "none" }}>
            Cliente
          </label>
          <input
            type="text"
            className="form-control"
            id="cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            style={{ display: "none" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dui" className="form-label" style={{ display: "none" }}>
            DUI
          </label>
          <input
            type="text"
            className="form-control"
            id="dui"
            value={dui}
            onChange={(e) => setDui(e.target.value)}
            style={{ display: "none" }}
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
            type="number" // Cambiado a type="number"
            className="form-control"
            id="usuarioId_FK"
            value={usuarioId_FK}
            onChange={(e) => setUsuarioId_FK(Number(e.target.value))} // Conversión a número
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar Autos
        </button>
      </form>
    </div>
  );
}

export default RegistroAuto;
