import Paquete from "../Models/Paquete.js";
import { requestsApi } from "../requestsApi.js";
import { imprimir, obtenerValorInput, validarSesion, eventoClickCerrarSesion } from "../utils/helpers.js";

validarSesion();
eventoClickCerrarSesion();




let todasNoches = [];
let todosHoteles = [];

const actualizarOpcionesNoches = (paquetes) => {
    const selectNoches = document.getElementById("input-filtro-noches");

    todasNoches = [...new Set([...todasNoches, ...paquetes.map(paquete => paquete.noches)])];

    selectNoches.innerHTML = '<option value="">Todos</option>';
    todasNoches.forEach(noches => {
        const option = document.createElement("option");
        option.value = noches;
        option.textContent = noches;
        selectNoches.appendChild(option);
    });
};

const actualizarOpcionesHoteles = (paquetes) => {
    const selectHoteles = document.getElementById("input-filtro-hotel");

    todosHoteles = [...new Set([...todosHoteles, ...paquetes.map(paquete => paquete.hotel)])];

    selectHoteles.innerHTML = '<option value="">Todos</option>';
    todosHoteles.forEach(hotel => {
        const option = document.createElement("option");
        option.value = hotel;
        option.textContent = hotel;
        selectHoteles.appendChild(option);
    });
};
const mostrarListaPaquetes = (data) => {
    const listadoDiv = document.getElementById("listado");
    const errorDiv = document.getElementById("lista-error");

    imprimir("lista-error", "");

    if (data.length === 0) {
        listadoDiv.innerHTML = ""; 
        imprimir("lista-error", "No hay resultados para su búsqueda.");
        return;
    }

    const headerListado = "<tr><th>ID</th><th>Destino</th><th>Hotel</th><th>Noches</th><th>Días</th><th>Precio-USD</th></tr>";
    const listadoPaquetes = data.map(paquete => {
        return `
            <tr class="item-lista-paquete" id="${paquete.id}">
                <td>${paquete.id}</td>
                <td>${paquete.destino}</td>
                <td>${paquete.hotel}</td>
                <td>${paquete.noches}</td>
                <td>${paquete.dias}</td>
                <td>${paquete.precio}</td>
            </tr>
        `;
    }).join("");

    listadoDiv.innerHTML = `<table>${headerListado}${listadoPaquetes}</table>`;
    actualizarOpcionesNoches(data);
    actualizarOpcionesHoteles(data);

    // Agregar listener a cada fila del listado
    document.querySelectorAll(".item-lista-paquete").forEach(itemListado => {
        itemListado.addEventListener("click", () => {
            // Redirigir a la página de detalle del paquete
            document.location.replace(`detalle-paquete.html?id=${itemListado.id}`);
        });
    });
};

const mostrarError = (error) => {
    imprimir("lista-error", error);
};

const obtenerYMostrarTodosPaquetes = () => {
    requestsApi.getPaquetes()
        .then(data => {
            todasNoches = data.map(paquete => paquete.noches);
            todosHoteles = data.map(paquete => paquete.hotel);
            mostrarListaPaquetes(data);
        })
        .catch(mostrarError);
};

obtenerYMostrarTodosPaquetes();

document.querySelector("#boton-filtro").addEventListener("click", () => {
    const filtroDestino = obtenerValorInput("input-filtro-destino");
    const filtroHotel = obtenerValorInput("input-filtro-hotel");
    const filtroNoches = obtenerValorInput("input-filtro-noches");

    requestsApi.getPaquetes({ filtroDestino, filtroHotel, filtroNoches })
        .then(data => {
            if (data.length === 0) {
                mostrarListaPaquetes([]);
            } else {
                mostrarListaPaquetes(data);
            }
        })
        .catch(mostrarError);
});





