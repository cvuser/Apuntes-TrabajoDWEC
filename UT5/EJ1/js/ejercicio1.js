/**
 * @author Carlos Velasco García
 * @version 1.0
 * @description Ejercicio 1: Botonera Flexible.
 */

function generarBotonera() {
    const dimensionInput = document.getElementById("dimension");
    const botonera = document.getElementById("botonera");
    const mensajeError = document.getElementById("mensajeError");

    botonera.innerHTML = "";
    mensajeError.textContent = "";

    // Obtener la dimensión
    const dimension = parseInt(dimensionInput.value);

    if (isNaN(dimension) || dimension <= 0) {
        mensajeError.textContent = "La botonera debe tener una dimensión mayor que 0.";
        return;
    }

    botonera.style.gridTemplateColumns = `repeat(${dimension}, 50px)`;
    let contador = 1;
    for (let fila = 1; fila <= dimension; fila++) {
        for (let columna = 1; columna <= dimension; columna++) {
            const boton = document.createElement("button");
            boton.className = "boton";
            boton.textContent = contador;
            boton.addEventListener("click", () => {
                alert(`Has pulsado el botón situado en la fila ${fila} y en la columna ${columna}`);
            });
            botonera.appendChild(boton);
            contador++;
        }
    }
}