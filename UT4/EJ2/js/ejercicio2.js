/**
 * @author Carlos Velasco García
 * @version 1.0
 * @description Ejercicio 2: Generador de Sudoku.
 */

let sudokuCompleto;

function generarSudokuCompleto() {
    let sudoku = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));

    function esValido(fila, columna, numero) {
        // Verificar fila y columna
        for (let i = 0; i < 9; i++) {
            if (sudoku[fila][i] === numero || sudoku[i][columna] === numero) {
                return false;
            }
        }

        let inicioFila = Math.floor(fila / 3) * 3;
        let inicioColumna = Math.floor(columna / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (sudoku[inicioFila + i][inicioColumna + j] === numero) {
                    return false;
                }
            }
        }

        return true;
    }

    function resolverSudoku() {
        for (let fila = 0; fila < 9; fila++) {
            for (let columna = 0; columna < 9; columna++) {
                if (sudoku[fila][columna] === 0) {
                    for (let numero = 1; numero <= 9; numero++) {
                        if (esValido(fila, columna, numero)) {
                            sudoku[fila][columna] = numero;
                            if (resolverSudoku()) {
                                return true;
                            }
                            sudoku[fila][columna] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    resolverSudoku();
    return sudoku;
}

function ocultarCasillas(sudoku, dificultad) {
    let casillasOcultas;
    switch (dificultad) {
        case "facil":
            casillasOcultas = 43;
            break;
        case "medio":
            casillasOcultas = 51;
            break;
        case "dificil":
            casillasOcultas = 56;
            break;
        default:
            casillasOcultas = 43;
    }

    let contador = 0;
    while (contador < casillasOcultas) {
        let fila = Math.floor(Math.random() * 9);
        let columna = Math.floor(Math.random() * 9);
        if (sudoku[fila][columna] !== 0) {
            sudoku[fila][columna] = 0;
            contador++;
        }
    }

    return sudoku;
}

function mostrarSudoku(sudoku) {
    const sudokuContainer = document.getElementById("sudokuContainer");
    sudokuContainer.innerHTML = "";

    const tabla = document.createElement("table");
    for (let fila = 0; fila < 9; fila++) {
        const tr = document.createElement("tr");
        for (let columna = 0; columna < 9; columna++) {
            const td = document.createElement("td");
            if (sudoku[fila][columna] !== 0) {
                td.textContent = sudoku[fila][columna];
            } else {
                td.classList.add("oculto");
            }
            tr.appendChild(td);
        }
        tabla.appendChild(tr);
    }
    sudokuContainer.appendChild(tabla);
}

function mostrarSudokuCompleto() {
    sudokuCompleto = generarSudokuCompleto();
    mostrarSudoku(sudokuCompleto);
}

function ocultarCasillasSegunDificultad() {
    const dificultad = document.getElementById("dificultad").value;
    const sudokuOculto = ocultarCasillas([...sudokuCompleto.map(fila => [...fila])], dificultad);
    mostrarSudoku(sudokuOculto);
}