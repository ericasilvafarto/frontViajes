import { requestsApi } from "../requestsApi.js";

export const obtenerValorInput = (idInput) => document.getElementById(idInput).value;

export const imprimir =(elemento, contenido) =>{
    document.querySelector(`#${elemento}`).innerHTML = contenido;
}







export const validarSesion = () => {
    const usuarioLogueado = sessionStorage.getItem("session");
    const estaEnLogin = document.location.pathname.includes("login.html");
    const estaEnRegistrar = document.location.pathname.includes("register.html");
    const estaEnPaginaPublica = estaEnLogin || estaEnRegistrar;
  
    if (usuarioLogueado) {
      if (estaEnPaginaPublica) {
        document.location.replace("index.html");
      }
    } else {
      if (!estaEnPaginaPublica) {
        document.location.replace("login.html");
      }
    }
  }; 



  export const eventoClickCerrarSesion = () => {
    document.querySelector("#boton-logout").addEventListener("click", () => {
      sessionStorage.removeItem("session");
      requestsApi.logout().then(() => {
        document.location.replace("login.html");
      });
    });
  };