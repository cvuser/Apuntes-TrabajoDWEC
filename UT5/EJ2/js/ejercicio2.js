
let colorSeleccionado = null;

document.querySelectorAll('.color').forEach(color => {
    color.addEventListener('click', () => {
        colorSeleccionado = color.style.backgroundColor;
        document.getElementById('mensajePincel').textContent = `Pincel Activado - Color: ${colorSeleccionado}`;
    });
});

const tablero = document.getElementById('tablero');
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        const cuadricula = document.createElement('div');
        cuadricula.className = 'cuadricula';
        cuadricula.addEventListener('click', () => {
            if (colorSeleccionado) {
                cuadricula.style.backgroundColor = colorSeleccionado;
            }
        });
        tablero.appendChild(cuadricula);
    }
}

function limpiarTablero() {
    document.querySelectorAll('.cuadricula').forEach(cuadricula => {
        cuadricula.style.backgroundColor = '';
    });
}

// Añadir un botón para limpiar el tablero
const botonLimpiar = document.createElement('button');
botonLimpiar.textContent = 'Limpiar Tablero';
botonLimpiar.addEventListener('click', limpiarTablero);
document.body.appendChild(botonLimpiar);