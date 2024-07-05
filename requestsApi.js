
const obtenerUrl= (ruta)=> `${requestsApi.urlBase}/${ruta}`
const headers= {
    Accept: "application/json",
    "Content-Type":"application/json"
}



const token = sessionStorage.getItem("session")

if(token){
    headers.authorization = token;
}


const procesarRespuesta= (res)=>{
return res.json().then((data)=>{
    if (data.error){
        throw new Error (data?.error)
    }
    return data
})
}

const manejarError= (error = new Error ("Error desconocido"))=>{
    console.error("Ocurrio un error:", error.message)

throw error.message

}



export class requestsApi {
    static urlBase= "http://localhost:3000";

    static login(email, password){
        const body= JSON.stringify({email, password})
        return fetch(obtenerUrl("login"),{method:"POST", body, headers})
        .then(procesarRespuesta)
        .catch(manejarError)
    }
 

    static logout() {
        return fetch(obtenerUrl("logout"), { method: "POST", headers })
          .then(procesarRespuesta)
          .catch(manejarError);
      }
    



static register(body) {
  return fetch(obtenerUrl("registrar"), { method: "POST", body, headers })
    .then(procesarRespuesta)
    .catch(manejarError);
}
    



      static getPaquetes(opciones={}) {
        const queryParams = new URLSearchParams({});
    
        if (opciones.filtroDestino) {
            queryParams.set("destino", opciones.filtroDestino);
        }
    
        if (opciones.filtroHotel) {
            queryParams.set("hotel", opciones.filtroHotel);
        }
    
        if (opciones.filtroNoches) {
            queryParams.set("noches", opciones.filtroNoches);
        }
    
        return fetch(obtenerUrl("paquetes?" + queryParams), { headers })
            .then(procesarRespuesta)
            .catch(manejarError);
    }
    
    


static getPaquete(idPaquete) {
    return fetch(obtenerUrl(`paquete/${idPaquete}`), { headers })
      .then(procesarRespuesta)
      .catch(manejarError);
  }


  static postPaquete(body) {

    return fetch(obtenerUrl("paquete"), { method: "POST", headers, body })
      .then(procesarRespuesta)
      .catch(manejarError);
  }

  static putPaquete(idPaquete, destino, hotel, noches, dias, precio) {
    const body = JSON.stringify({ destino, hotel, noches, dias, precio });
    return fetch(obtenerUrl(`paquete/${idPaquete}`), {
      method: "PUT",
      headers,
      body,
    })
      .then(procesarRespuesta)
      .catch(manejarError);
  }
  static deletePaquete(idPaquete) {
    return fetch(obtenerUrl(`paquete/${idPaquete}`), {
      method: "DELETE",
      headers,
    })
      .then(procesarRespuesta)
      .catch(manejarError);
  }
}




