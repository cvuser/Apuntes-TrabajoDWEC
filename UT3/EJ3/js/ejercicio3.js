/**
 * @author Carlos Velasco García
 * @version 1.0
 * @description Ejercicio 3: Validador de datos usando expresiones regulares.
 */

function validaCampo(campo, dato) {
    switch (campo) {
        case "nombre":
            return /^[A-Z][a-z]{2,39}( [A-Z][a-z]{2,39})*$/.test(dato);
        case "apellidos":
            return /^[A-Z][a-z]{3,79}( [A-Z][a-z]{3,79})?$/.test(dato);
        case "email":
            return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(dato);
        case "movil":
            return /^\d{3}-\d{3}-\d{3}$/.test(dato);
        case "localidad":
            return /^[A-Z]{3,40}$/.test(dato);
        case "curso":
            return /^[1-4]$/.test(dato);
        case "examenes":
            return ["MADRID", "OVIEDO", "BILBAO", "SEVILLA"].includes(dato);
        case "observaciones":
            return dato.length <= 200;
        default:
            return false;
    }
}

function validarDatos() {
    let campos = ["nombre", "apellidos", "email", "movil", "localidad", "curso", "examenes", "observaciones"];
    let output = "<h2>Resultados de la validación:</h2>";

    campos.forEach(campo => {
        let dato = prompt(`Introduce tu ${campo}:`);
        if (dato === null) return;

        let valido = validaCampo(campo, dato);
        output += `<p>${campo}: ${dato} - ${valido ? "Correcto" : "Incorrecto"}</p>`;
    });

    document.getElementById("output").innerHTML = output;
}

validarDatos();