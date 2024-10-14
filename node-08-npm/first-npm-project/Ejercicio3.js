import { DateTime } from "luxon";


function mostrarTiempo() {
    const ahora = DateTime.now();
    const segundos = ahora.second;
    const fechaFormateada = ahora.toFormat('dd-MM-yyyy HH:mm:ss');

   
    if (segundos % 10 === 0) {
       
        console.log(`${ahora.toFormat('dd-MM-yyyy')} \x1b[32m${ahora.toFormat('HH:mm:ss')}\x1b[0m`);
    } else {
        
        console.log(fechaFormateada);
    }
}

mostrarTiempo();
setInterval(mostrarTiempo, 1000);
