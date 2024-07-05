import Paquete from "../Models/Paquete.js";
import { requestsApi} from "../requestsApi.js";
import {  imprimir,  validarSesion } from "../utils/helpers.js";


validarSesion();
const params = new URLSearchParams(window.location.search);
const idPaquete = params.get("id");




const mostrarError = (error) => {
    imprimir("detalle-error", error);
  };

  const mostrarDetalle = (data) => {
    const paquete = new Paquete(data.id, data.destino, data.hotel, data.noches, data.dias,data.precio);
    imprimir("detalle", paquete.mostrarDetalle());
  };



  document
  .querySelector("#boton-editar-paquete")
  .addEventListener("click", () => {
    document.location.replace(`editar-paquete.html?id=${idPaquete}`);
  });


  document.querySelector("#boton-eliminar-paquete")
  .addEventListener("click", () => {
    requestsApi.deletePaquete(idPaquete)
      .then(() => {
        document.location.replace("index.html");
      })
      .catch((error) => {
        mostrarError(error);
      });
  });

requestsApi.getPaquete(idPaquete)
  .then(mostrarDetalle)
  .catch((error) => {
    mostrarError(error);
  });
