/**
 * @author Carlos Velasco García
 * @version 1.0
 * @description Ejercicio 3: Juego FASTCLICK.
 */

let puntuacion = 0;
let tiempoRestante = 10;
let intervalo;

function moverBoton() {
    const boton = $('#botonPulsame');
    const juego = $('#juego');
    const alturaJuego = juego.height();
    const alturaBoton = boton.height();

    boton.animate({ top: `${Math.random() * (alturaJuego - alturaBoton)}px` }, 1500);
}

function iniciarJuego() {
    puntuacion = 0;
    tiempoRestante = 10;
    $('#tiempoRestante').text(tiempoRestante);
    $('#botonPulsame').css('top', '50%').show();

    intervalo = setInterval(() => {
        tiempoRestante--;
        $('#tiempoRestante').text(tiempoRestante);

        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            alert(`Puntuación final: ${puntuacion}`);
            iniciarJuego();
        }
    }, 1000);

    moverBoton();
}

$(document).ready(function() {
    $('#botonPulsame').click(function() {
        puntuacion++;
        moverBoton();
    });

    $('#comoSeJuega').click(function() {
        alert('Haz clic en el botón "PÚLSAME" tantas veces como puedas en 10 segundos. El botón se moverá para dificultar el juego.');
    });

    iniciarJuego();
});