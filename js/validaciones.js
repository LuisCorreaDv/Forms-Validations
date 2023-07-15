export function valida(input) {
    //dataset para obtener la coleccion de todos los datas
    //tipo - el tipo de data
    const tipoInput = input.dataset.tipo;
    //Checando si existe el tipo de input en los validadores
    if (validadores[tipoInput]) {
        validadores[tipoInput](input);
    }
}

//Asignando un objeto a los data tipes para seleccionar el tipo de input que recibe
const validadores = {
    nacimiento: input => validarNacimiento(input),
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if (!mayorEdad(fechaCliente)) {
        mensaje = 'Debes tener al menos 18 años de edad';
    }
    input.setCustomValidity(mensaje);
}


function mayorEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate());
    return diferenciaFechas <= fechaActual;
}