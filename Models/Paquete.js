export default class Paquete {
    id;
    destino;
    hotel;
    noches;
    dias;
    precio;

    constructor(id = 0, destino = "", hotel = "", noches = 0, dias = 0, precio = 0) {
        this.id = id;
        this.destino = destino;
        this.hotel = hotel;
        this.noches = noches;
        this.dias = dias;
        this.precio = precio;
    }

    mostrarEnLista() {
        return `
            <tr class="item-lista-paquete" id="${this.id}">
                <td>${this.id}</td>
                <td>${this.destino}</td>
                <td>${this.hotel}</td>
                <td>${this.noches}</td>
                <td>${this.dias}</td>
                <td>${this.precio}</td>
            </tr>
        `;
    }

    mostrarDetalle() {
        return `
            <table>
                <tr><td><b>ID</b></td><td>${this.id}</td></tr>
                <tr><td><b>Destino</b></td><td>${this.destino}</td></tr>
                <tr><td><b>Hotel</b></td><td>${this.hotel}</td></tr>
                <tr><td><b>Noches</b></td><td>${this.noches}</td></tr>
                <tr><td><b>Días</b></td><td>${this.dias}</td></tr>
                <tr><td><b>Precio-USD</b></td><td>${this.precio}</td></tr>
            </table>
        `;
    }
}
