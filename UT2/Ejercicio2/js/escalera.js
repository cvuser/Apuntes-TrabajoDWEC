
function dibujarEscalera() {
    const numEscalones = parseInt(prompt("Introduce el número de escalones:"));
    const anchoEscalon = parseInt(prompt("Introduce el ancho del escalón:"));
    const altoEscalon = parseInt(prompt("Introduce el alto del escalón:"));

    if (isNaN(numEscalones) || isNaN(anchoEscalon) || isNaN(altoEscalon)) { 
        alert("Por favor, introduce números válidos.");
        return;
    }

    if (anchoEscalon * numEscalones > 80) {
        document.getElementById('escalera').innerText = "NO ES POSIBLE DIBUJAR LA ESCALERA";
        return;
    }

    let escalera = "";

    for (let i = 1; i <= numEscalones; i++) {
        for (let j = 0; j < altoEscalon; j++) {
            escalera += " ".repeat((i - 1) * anchoEscalon) + "#".repeat(anchoEscalon) + "\n";
        }
    }

    document.getElementById('escalera').innerText = escalera;
}

window.onload = dibujarEscalera;
