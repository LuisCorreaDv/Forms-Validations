import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll("input");

//Recorre cada input para checar el tipo de dato de cada input 
inputs.forEach(input => {
    input.addEventListener("blur", (input) =>{
        valida(input.target);
    })
})