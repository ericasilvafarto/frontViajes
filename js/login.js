import { requestsApi} from "../requestsApi.js";
import { obtenerValorInput, imprimir, validarSesion } from "../utils/helpers.js";

validarSesion();

const botonLogin = document.querySelector("#form-login-submit");

botonLogin.addEventListener("click",()=>{
    // obtener el user los datos del formulario
    const email = obtenerValorInput("form-login-email")
    const password = obtenerValorInput("form-login-password")

    // hacer el fetch, usando el metodo login de request api
    requestsApi.login(email, password)
    .then((data=>{
    //    si el login es exitoso, lo guardamos en el session storage
    sessionStorage.setItem("session", data.session)
   sessionStorage.setItem("user", JSON.stringify(data.user));



    // redirigimos al usaurio al index
    document.location.replace("index.html")
    }))
    .catch((error)=>{
        console.error(error)
        imprimir("form-login-error", "Email o contraseña incorrectos")
    })

})