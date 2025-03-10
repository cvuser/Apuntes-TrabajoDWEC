/**
 * @author Carlos Velasco García
 * @version 1.0
 * @description Ejercicio 2: Panel de Dibujo.
 */

let colorSeleccionado = null;

const tablero = document.getElementById("tablero");
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        const cuadricula = document.createElement("div");
        cuadricula.className = "cuadricula";
        cuadricula.addEventListener("click", () => {
            if (colorSeleccionado) {
                cuadricula.style.backgroundColor = colorSeleccionado;
            }
        });
        tablero.appendChild(cuadricula);
    }
}


const colores = document.querySelectorAll(".color");
const mensajePincel = document.getElementById("mensajePincel");

colores.forEach(color => {
    color.addEventListener("click", () => {
        colorSeleccionado = color.getAttribute("data-color");
        mensajePincel.textContent = `Pincel Activado - Color: ${colorSeleccionado}`;
    });
});

// limpiar 
const botonLimpiar = document.getElementById("limpiarTablero");
botonLimpiar.addEventListener("click", () => {
    const cuadriculas = document.querySelectorAll(".cuadricula");
    cuadriculas.forEach(cuadricula => {
        cuadricula.style.backgroundColor = "white";
    });
    mensajePincel.textContent = "Pincel Desactivado";
    colorSeleccionado = null;
});