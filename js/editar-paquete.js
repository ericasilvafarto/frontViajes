import {validarSesion, obtenerValorInput, imprimir,} from "../utils/helpers.js";
  import { requestsApi } from "../requestsApi.js";

  validarSesion();

  
const params = new URLSearchParams(window.location.search);
const idPaquete = params.get("id");

const mostrarError = (error) => {
    imprimir("editar-paquete-error", error);
  };



  const popularCampos = (data) => {
    document.querySelector("#editar-destino").value = data.destino;
    document.querySelector("#editar-hotel").value = data.hotel;
    document.querySelector("#editar-noches").value = data.noches;
    document.querySelector("#editar-dias").value = data.dias;
    document.querySelector("#editar-precio").value = data.precio;

  };



requestsApi.getPaquete(idPaquete)
  .then(popularCampos)
  .catch((error) => {
    mostrarError(error);
  });








  
document
.querySelector("#boton-actualizar-paquete")
.addEventListener("click", () => {
  // obtenemos los valores de los inputs
  const destino = obtenerValorInput("editar-destino");
  const hotel = obtenerValorInput("editar-hotel");
   const noches = obtenerValorInput("editar-noches");
   const dias = obtenerValorInput("editar-dias");
   const precio = obtenerValorInput("editar-precio");


 
  if (!destino || !hotel || !noches || !dias || !precio) {
    imprimir("editar-paquete-error", "Por favor complete todos los campos");
    return;
  }

  // actualizamos el paquete
  requestsApi.putPaquete(idPaquete, destino, hotel, noches, dias, precio)
    .then(() => {
      document.location.replace(`detalle-paquete.html?id=${idPaquete}`);
    })
    .catch((error) => {
      // si ocurre un error al actualizar el paquete, mostramos el error
      imprimir("editar-paquete-error", error);
    });
});

