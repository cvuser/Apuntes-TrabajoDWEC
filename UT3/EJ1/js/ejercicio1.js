
// Caso 1: Objeto Number
let numero1 = 10.2345;
let numero2 = 10000000;
let numero3 = 123456;

let output = `<h2>Caso 1 - Objeto Number</h2>
              <p>Número Original: ${numero1}</p>
              <p>Decimales Fijos: ${numero1.toFixed(2)}</p>
              <p>Número Original: ${numero2}</p>
              <p>Exponencial: ${numero2.toExponential()}</p>
              <p>Número Original: ${numero3}</p>
              <p>Precisión: ${numero3.toPrecision(2)}</p>`;

// Caso 2: Objeto String
let cadena1 = "Esta es la primera cadena";
let cadena2 = "Esta es la segunda cadena";
let cadena3 = "Esta es la última cadena";

let posicion = 15;
let caracter = cadena1.charAt(posicion);
let concatenacion = cadena1 + cadena2;
let posicionC = cadena3.indexOf('c');

output += `<h2>Caso 2 - Objeto String</h2>
           <p>Cadena Original: ${cadena1}</p>
           <p>Posición en la cadena: ${posicion}</p>
           <p>La Posición ${posicion} de la cadena "${cadena1}" es "${caracter}"</p>
           <p>Cadena Original: ${cadena2}</p>
           <p>La concatenación de las cadenas es: ${concatenacion}</p>
           <p>Cadena Original: ${cadena3}</p>
           <p>El valor "c" se encuentra en la posición ${posicionC}</p>`;

document.getElementById("output").innerHTML = output;