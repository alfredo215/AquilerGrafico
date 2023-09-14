import React from "react";
 
function Login() {
    return (
        <div className="container">

        <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Correo</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="user@example.com"/>

  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Contraseña</label>
    <input type="password" class="form-control" id="exampleInputPassword1"/>
  </div>
 
  <button type="submit" class="btn btn-primary">Login</button>
</form>

</div>
    );

    
}
export default Login;