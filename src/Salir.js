import React, { useEffect, useState } from "react";

function Salir() {
  //Login Data
  useEffect(() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  })
}
export default Salir;
