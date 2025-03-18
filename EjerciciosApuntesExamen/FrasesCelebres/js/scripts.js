// Seleccionar elementos del DOM
const botonFetch = document.getElementById('obtener-frase-fetch');
const botonXHR = document.getElementById('obtener-frase-xhr');
const contenedorFrase = document.getElementById('frase');

// URL de la API de frases célebres aleatorias con proxy CORS
const API_URL = 'https://cors-anywhere.herokuapp.com/https://quote-garden.onrender.com/api/v3/quotes/random';

// Función para obtener una frase usando Fetch API
async function obtenerFraseFetch() {
    try {
        const respuesta = await fetch(API_URL);
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const data = await respuesta.json();
        const frase = data.data[0]; // Extraer la frase del JSON
        mostrarFrase(frase);
    } catch (error) {
        console.error('Error al obtener la frase:', error);
        contenedorFrase.textContent = 'Error al cargar la frase. Inténtalo de nuevo.';
    }
}

// Función para obtener una frase usando XMLHttpRequest
function obtenerFraseXHR() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const frase = data.data[0]; // Extraer la frase del JSON
            mostrarFrase(frase);
        } else {
            console.error('Error al obtener la frase:', xhr.statusText);
            contenedorFrase.textContent = 'Error al cargar la frase. Inténtalo de nuevo.';
        }
    };

    xhr.onerror = function () {
        console.error('Error de red');
        contenedorFrase.textContent = 'Error de red. Inténtalo de nuevo.';
    };

    xhr.send();
}

// Función para mostrar la frase en el DOM
function mostrarFrase(frase) {
    contenedorFrase.innerHTML = `
        <p>"${frase.quoteText}"</p>
        <p><strong>- ${frase.quoteAuthor || 'Anónimo'}</strong></p>
    `;
}

// Eventos
botonFetch.addEventListener('click', obtenerFraseFetch);
botonXHR.addEventListener('click', obtenerFraseXHR);