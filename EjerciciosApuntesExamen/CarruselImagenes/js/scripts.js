// Seleccionar elementos del DOM
const contenedorImagenes = document.getElementById('contenedor-imagenes');
const botonAnterior = document.getElementById('anterior');
const botonSiguiente = document.getElementById('siguiente');

let indiceActual = 0;

// Función para mostrar la imagen actual
function mostrarImagen() {
    const desplazamiento = -indiceActual * 100;
    contenedorImagenes.style.transform = `translateX(${desplazamiento}%)`;
}

// Evento para la imagen anterior
botonAnterior.addEventListener('click', () => {
    if (indiceActual > 0) {
        indiceActual--;
    } else {
        indiceActual = contenedorImagenes.children.length - 1;
    }
    mostrarImagen();
});

// Evento para la imagen siguiente
botonSiguiente.addEventListener('click', () => {
    if (indiceActual < contenedorImagenes.children.length - 1) {
        indiceActual++;
    } else {
        indiceActual = 0;
    }
    mostrarImagen();
});