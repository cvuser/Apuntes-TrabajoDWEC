const cartasDisponibles = ['A', '2', '3', '4', '5', '6', '7', 'S', 'C', 'R'];
let puntos = 0;

function pideNombre() {
    let jugador1 = prompt("Introduce el nombre del Jugador 1:");
    let jugador2 = prompt("Introduce el nombre del Jugador 2:");
    return [jugador1, jugador2];
}

function eligeCarta(jugador) {
    let carta;
    while (true) {
        carta = prompt(`${jugador}, elige una carta (${cartasDisponibles.join(', ')}):`);
        if (cartasDisponibles.includes(carta)) {
            cartasDisponibles.splice(cartasDisponibles.indexOf(carta), 1);  // Elimina la carta elegida
            return carta;
        } else {
            alert("Carta no válida o ya seleccionada. Inténtalo de nuevo.");
        }
    }
}

function jugadaEnCurso(carta1, carta2) {
    if (carta1 === carta2) {
        puntos++;
        return "PAREJA!";
    } else {
        return "NO es pareja.";
    }
}

function jugar() {
    const [jugador1, jugador2] = pideNombre();
    let resultado = "";

    for (let i = 0; i < 5; i++) {
        const carta1 = eligeCarta(jugador1);
        const carta2 = eligeCarta(jugador2);
        resultado += `Turno ${i + 1}: ${jugadaEnCurso(carta1, carta2)}\n`;
    }

    let mensajeFinal = "";
    if (puntos <= 3) {
        mensajeFinal = `El resultado final es de ${puntos} sobre 10, necesitáis mejorar…`;
    } else if (puntos <= 6) {
        mensajeFinal = `El resultado final es de ${puntos} sobre 10, vais por buen camino…`;
    } else if (puntos <= 9) {
        mensajeFinal = `El resultado final es de ${puntos} sobre 10, estáis en la misma sintonía…`;
    } else {
        mensajeFinal = `El resultado final es de ${puntos} sobre 10, lo bordáis…`;
    }

    document.getElementById('resultadoJuego').innerText = resultado + "\n" + mensajeFinal;
}

window.onload = jugar;
