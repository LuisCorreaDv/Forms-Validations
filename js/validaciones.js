export function valida(input) {
    //dataset para obtener la coleccion de todos los datas
    //tipo - el tipo de data
    const tipoDeInput = input.dataset.tipo;
    //Checando si existe el tipo de input en los validadores
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    //Input validity, se usa parentElement para dar target al div padre en el que se encuentra el input

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = '';
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = monstrarMensajeDeError(tipoDeInput, input);
    }
}

//Arreglo de tipo de errores
const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesError = {
    nombre: {
        valueMissing: 'El campo nombre no puede estar vacío'
    },
    email: {
        valueMissing: 'El campo correo no puede estar vacío',
        typeMismatch: 'El correo no es válido',
    },
    password: {
        valueMissing: 'El campo contraseña no puede estar vacío',
        patternMismatch: 'Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.'
    },
    nacimiento: {
        valueMissing: 'Este campo no puede estar vacío',
        customError: 'Debes tener al menos 18 años de edad'
    },
    numero: {
        valueMissing: 'El campo numero no puede estar vacío',
        patternMismatch: 'El formato requerido es xxxxxxxxxx 10 numeros'
    },
    direccion: {
        valueMissing: 'El campo direccion no puede estar vacío',
        patternMismatch: 'La dirección debe contener entre 10 a 40 caracteres.',
    },
    ciudad: {
        valueMissing: 'El campo ciudad no puede estar vacío',
        patternMismatch: 'La ciudad debe contener entre 10 a 40 caracteres.',
    },
    estado: {
        valueMissing: 'El campo estado no puede estar vacío',
        patternMismatch: 'El estado debe contener entre 10 a 40 caracteres.',
    },
}

//Asignando un objeto a los data tipes para seleccionar el tipo de input que recibe
const validadores = {
    nacimiento: input => validarNacimiento(input),
}

function monstrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if (input.validity[error]) {
            //Muestra el tipo de error
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesError[tipoDeInput][error]);
            mensaje = mensajesError[tipoDeInput][error]
        }
    });
    return mensaje;
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