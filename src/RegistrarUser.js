import React from "react";
 
function RegistrarUser() {
    return (
        <div className="container">

            <h4>Registrar Usuario</h4>
            
        <form>
<div class="mb-3">
<label for="nombre" class="form-label">Nombre Completo</label>
<input type="text" class="form-control" id="nombre" />

</div>
<div class="mb-3">
<label for="email" class="form-label">Correo</label>
<input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="user@example.com"/>

</div>
<div class="form-group">
<label for="pass">Contraseña</label>
<input type="password" id="pass" class="form-control"/>
</div>
          
             
<button type="submit" class="btn btn-primary">Guardar</button>
</form>

    </div>
    );

    
}
export default RegistrarUser;