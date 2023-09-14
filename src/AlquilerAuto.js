import React from "react";
 
function AlquilerAuto() {
    return (
        <div className="container">
              <h4>Alquiler de Auto</h4>
            <form>
  <div class="mb-3">
    <label for="cliente" class="form-label">Cliente</label>
    <input type="text" class="form-control" id="cliente" />

  </div>
  <div class="mb-3">
    <label for="dui" class="form-label">DUI</label>
    <input type="text" class="form-control" id="dui"/>

  </div>
  <div class="form-group">
    <label for="fecha">Fecha</label>
    <input type="text" id="fecha" class="form-control"/>
   </div>
              
  <div class="mb-3">
    <label for="estado" class="form-label">Estado</label>
    <input type="text" class="form-control" id="estado"/>

  </div>
  <div class="mb-3">
    <label for="trabajador" class="form-label">Trabajador</label>
    <input type="text" class="form-control" id="trabajador"/>

  </div>
       
                 
  <button type="submit" class="btn btn-primary">Actualizar</button>
</form>

        </div>
    );

    
}
export default AlquilerAuto;