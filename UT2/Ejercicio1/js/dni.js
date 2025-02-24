const letrasDNI = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];

function calcularLetraDNI(dni) {
    return letrasDNI[dni % 23];
}

function solicitarDNI() {
    let dni = prompt("Introduce tu número de DNI (sin letra):");
    
    while (true) {
        if (dni === null) {
            alert("Operación cancelada.");
            return;
        }

        dni = dni.trim();

        if (dni === "" || isNaN(dni)) {
            alert("Entrada no válida. Por favor, introduce un número de DNI.");
            dni = prompt("Introduce tu número de DNI (sin letra):");
        } else if (dni.length !== 8) {
            alert("El DNI debe tener 8 dígitos.");
            dni = prompt("Introduce tu número de DNI (sin letra):");
        } else {
            break;
        }
    }

    const letra = calcularLetraDNI(Number(dni));
    document.getElementById('resultado').innerText = `El DNI completo es: ${dni}-${letra}`;
}

window.onload = solicitarDNI;
