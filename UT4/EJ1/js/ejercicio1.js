
function esPerfecto(numero) {
    let sumaDivisores = 0;
    for (let i = 1; i < numero; i++) {
        if (numero % i === 0) {
            sumaDivisores += i;
        }
    }
    return sumaDivisores === numero;
}

function esCapicua(numero) {
    const strNumero = numero.toString();
    return strNumero === strNumero.split('').reverse().join('');
}

function verificarNumero() {
    const numero = parseInt(document.getElementById('numero').value);
    if (isNaN(numero) || numero < 1) {
        alert("Por favor, introduce un número entero positivo.");
        return;
    }

    const perfecto = esPerfecto(numero) ? "es perfecto" : "no es perfecto";
    const capicua = esCapicua(numero) ? "es capicúa" : "no es capicúa";

    document.getElementById('resultado').innerText = `El número ${numero} ${perfecto} y ${capicua}.`;
}