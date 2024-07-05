import { requestsApi } from "../requestsApi.js";
import { imprimir, obtenerValorInput, validarSesion } from "../utils/helpers.js";

validarSesion();

document.querySelector("#boton-nuevo-paquete").addEventListener("click", () => {
    const destino = obtenerValorInput("nuevo-destino");
    const hotel = obtenerValorInput("nuevo-hotel");
    const noches = obtenerValorInput("nueva-noches");
    const dias = obtenerValorInput("nueva-dias");
    const precio = obtenerValorInput("nuevo-precio"); 

    if (!destino || !hotel || !noches || !dias || !precio) {
        imprimir("nuevo-destino-error", "Por favor complete todos los campos");
        return;
    }

    const body = JSON.stringify({ destino, hotel, noches, dias, precio }); 

    requestsApi.postPaquete(body)
        .then(() => {
            document.location.replace("index.html");
        })
        .catch((error) => {
            imprimir("nuevo-destino-error", error);
        });
});
