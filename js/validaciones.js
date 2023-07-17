export function valida(input) {
    //dataset para obtener la coleccion de todos los datas
    //tipo - el tipo de data
    const tipoInput = input.dataset.tipo;
    //Checando si existe el tipo de input en los validadores
    if (validadores[tipoInput]) {
        validadores[tipoInput](input);
    }
    //Input validity, se usa parentElement para dar target al div padre en el que se encuentra el input

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
    }else{
        input.parentElement.classList.add("input-container--invalid")
    }
}

const mensajesError = {
    nombre: {
        valueMissing: 'Este campo no puede estar vacío'
    },
    email: {
        valueMissing: 'Este campo no puede estar vacío',
        typeMismatch: 'El correo no es válido',
    },
    password: {
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: 'Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.' 
    },
    nacimiento: {
        valueMissing: 'Este campo no puede estar vacío',
        customError: 'Debes tener al menos 18 años de edad'
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