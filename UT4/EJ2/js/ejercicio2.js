
function generarSudokuCompleto() {
    const sudoku = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            sudoku[i][j] = (i + j) % 9 + 1;
        }
    }
    return sudoku;
}

function ocultarCasillas(sudoku, dificultad) {
    let casillasVisibles;
    switch (dificultad) {
        case 'facil':
            casillasVisibles = 38;
            break;
        case 'medio':
            casillasVisibles = 30;
            break;
        case 'dificil':
            casillasVisibles = 25;
            break;
        default:
            casillasVisibles = 38;
    }

    const sudokuOculto = sudoku.map(fila => fila.map(valor => valor));
    let casillasOcultas = 81 - casillasVisibles;

    while (casillasOcultas > 0) {
        const fila = Math.floor(Math.random() * 9);
        const columna = Math.floor(Math.random() * 9);
        if (sudokuOculto[fila][columna] !== 0) {
            sudokuOculto[fila][columna] = 0;
            casillasOcultas--;
        }
    }

    return sudokuOculto;
}

function mostrarSudoku(sudoku) {
    const tabla = document.createElement('table');
    for (let i = 0; i < 9; i++) {
        const fila = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            const celda = document.createElement('td');
            celda.textContent = sudoku[i][j] === 0 ? '' : sudoku[i][j];
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    return tabla;
}

function generarSudoku() {
    const dificultad = document.getElementById('dificultad').value;
    const sudokuCompleto = generarSudokuCompleto();
    const sudokuOculto = ocultarCasillas(sudokuCompleto, dificultad);
    const sudokuDiv = document.getElementById('sudoku');
    sudokuDiv.innerHTML = '';
    sudokuDiv.appendChild(mostrarSudoku(sudokuOculto));
}