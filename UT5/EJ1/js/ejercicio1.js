
function generarBotonera() {
    const dimension = parseInt(document.getElementById('dimension').value);
    const botonera = document.getElementById('botonera');
    const mensajeError = document.getElementById('mensajeError');

    // Limpiar botonera y mensaje de error
    botonera.innerHTML = '';
    mensajeError.textContent = '';

    if (isNaN(dimension) || dimension <= 0) {
        mensajeError.textContent = 'La botonera debe tener una dimensión mayor que 0.';
        return;
    }

    botonera.style.gridTemplateColumns = `repeat(${dimension}, 50px)`;
    botonera.style.gridTemplateRows = `repeat(${dimension}, 50px)`;

    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            const boton = document.createElement('button');
            boton.className = 'boton';
            boton.textContent = `${i + 1},${j + 1}`;
            boton.addEventListener('click', () => {
                alert(`Has pulsado el botón situado en la fila ${i + 1} y en la columna ${j + 1}`);
            });
            botonera.appendChild(boton);
        }
    }
}