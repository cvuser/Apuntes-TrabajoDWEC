/**
 * @author Carlos Velasco García
 * @version 1.0
 * @description Ejercicio 4: Manejo de cookies en JavaScript.
 */

function getCookie(nombre) {
    let cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [name, value] = cookie.split("=");
        if (name === nombre) return value;
    }
    return null;
}

function setCookie(nombre, valor, dias) {
    let fecha = new Date();
    fecha.setTime(fecha.getTime() + dias * 24 * 60 * 60 * 1000);
    document.cookie = `${nombre}=${valor};expires=${fecha.toUTCString()};path=/`;
}

function mostrarMensajeCookies() {
    let nombre = prompt("Introduce tu nombre:");
    let email = prompt("Introduce tu email:");

    if (nombre && email) {
        let aceptar = confirm("Nuestra web utiliza cookies. ¿Aceptas?");
        if (aceptar) {
            let contador = parseInt(getCookie("contador")) || 0;
            contador++;
            setCookie("nombre", nombre, 30);
            setCookie("contador", contador, 30);

            document.getElementById("output").innerHTML = `
                <p>Hola, ${nombre}. Has visitado esta página ${contador} veces.</p>
            `;
        } else {
            alert("Cookies no aceptadas.");
        }
    } else {
        alert("Debes introducir un nombre y un email válidos.");
    }
}

mostrarMensajeCookies();