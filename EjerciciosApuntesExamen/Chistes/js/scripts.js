// Seleccionar elementos del DOM
const botonFetch = document.getElementById('obtener-chiste-fetch');
const botonXHR = document.getElementById('obtener-chiste-xhr');
const contenedorChiste = document.getElementById('chiste');

// URL de la API de chistes aleatorios
const API_URL = 'https://official-joke-api.appspot.com/random_joke';

// Función para obtener un chiste usando Fetch API
async function obtenerChisteFetch() {
    try {
        const respuesta = await fetch(API_URL);
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const chiste = await respuesta.json();
        mostrarChiste(chiste);
    } catch (error) {
        console.error('Error al obtener el chiste:', error);
        contenedorChiste.textContent = 'Error al cargar el chiste. Inténtalo de nuevo.';
    }
}

// Función para obtener un chiste usando XMLHttpRequest
function obtenerChisteXHR() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const chiste = JSON.parse(xhr.responseText);
            mostrarChiste(chiste);
        } else {
            console.error('Error al obtener el chiste:', xhr.statusText);
            contenedorChiste.textContent = 'Error al cargar el chiste. Inténtalo de nuevo.';
        }
    };

    xhr.onerror = function () {
        console.error('Error de red');
        contenedorChiste.textContent = 'Error de red. Inténtalo de nuevo.';
    };

    xhr.send();
}

// Función para mostrar el chiste en el DOM
function mostrarChiste(chiste) {
    contenedorChiste.innerHTML = `
        <p><strong>${chiste.setup}</strong></p>
        <p>${chiste.punchline}</p>
    `;
}

// Eventos
botonFetch.addEventListener('click', obtenerChisteFetch);
botonXHR.addEventListener('click', obtenerChisteXHR);