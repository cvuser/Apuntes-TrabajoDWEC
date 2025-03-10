/**
 * @author Carlos Velasco García
 * @version 1.0
 * @description Ejercicio 1: Uso de los objetos Number y String en JavaScript.
 */

// Caso 1
function casoNumber() {
    let numero1 = parseFloat(prompt("Introduce el primer número:"));
    if (isNaN(numero1)) {
        alert("Por favor, introduce un número válido.");
    } else {
        let numero2 = parseFloat(prompt("Introduce el segundo número:"));
        if (isNaN(numero2)) {
            alert("Por favor, introduce un número válido.");
        } else {
            let output = `<h2>Caso 1 - Objeto Number</h2>
                          <p>Número Original 1: ${numero1}</p>
                          <p>Decimales Fijos (2) del primer número: ${numero1.toFixed(2)}</p>
                          <p>Número Original 2: ${numero2}</p>
                          <p>Notación Exponencial del segundo número: ${numero2.toExponential()}</p>
                          <p>Precisión (4 dígitos) del segundo número: ${numero2.toPrecision(4)}</p>`;
            document.getElementById("output").innerHTML += output;
        }
    }
}

// Caso 2
function casoString() {
    let cadena = prompt("Introduce una cadena de texto:");
    if (cadena) {
        let posicion = 15; // Posición específica en la cadena
        let caracter = cadena.charAt(posicion); // Carácter en la posición 15
        let concatenacion = cadena + " " + prompt("Introduce otra cadena para concatenar:"); // Concatenación de cadenas
        let ultimacadena = prompt("Introduce otra cadena para concatenar:"); // Concatenación de cadenas
        let posicionC = ultimacadena.indexOf('c'); // Posición de la letra 'c'

        let output = `<h2>Caso 2 - Objeto String</h2>
                      <p>Cadena Original: ${cadena}</p>
                      <p>Posicion en la cadena: ${posicion}</p>
                      <p>La posición 15 en la cadena: ${caracter}</p>
                      <p>Cadena Original: ${cadena}</p>
                      <p>Concatenación de cadenas: ${concatenacion}</p>                      
                      <p>Cadena Original: ${ultimacadena}</p>
                      <p>Posición de la letra 'c': ${posicionC}</p>`;
        document.getElementById("output").innerHTML += output;
    } else {
        alert("Por favor, introduce una cadena de texto.");
    }
}

casoNumber();
casoString();