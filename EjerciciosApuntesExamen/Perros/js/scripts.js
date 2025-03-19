// Seleccionar elementos del DOM
const botonFetch = document.getElementById('obtener-imagen-fetch');
const botonXHR = document.getElementById('obtener-imagen-xhr');
const contenedorImagen = document.getElementById('imagen');

// URL de la API de imágenes de perros aleatorios
const API_URL = 'https://dog.ceo/api/breeds/image/random';

// Función para obtener una imagen usando Fetch API
async function obtenerImagenFetch() {
    try {
        const respuesta = await fetch(API_URL);
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const data = await respuesta.json();
        mostrarImagen(data.message);
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        contenedorImagen.innerHTML = '<p>Error al cargar la imagen. Inténtalo de nuevo.</p>';
    }
}

// Función para obtener una imagen usando XMLHttpRequest
function obtenerImagenXHR() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            mostrarImagen(data.message);
        } else {
            console.error('Error al obtener la imagen:', xhr.statusText);
            contenedorImagen.innerHTML = '<p>Error al cargar la imagen. Inténtalo de nuevo.</p>';
        }
    };

    xhr.onerror = function () {
        console.error('Error de red');
        contenedorImagen.innerHTML = '<p>Error de red. Inténtalo de nuevo.</p>';
    };

    xhr.send();
}

// Función para mostrar la imagen en el DOM
function mostrarImagen(urlImagen) {
    contenedorImagen.innerHTML = `
        <img src="${urlImagen}" alt="Imagen de perro aleatoria">
    `;
}

// Eventos
botonFetch.addEventListener('click', obtenerImagenFetch);
botonXHR.addEventListener('click', obtenerImagenXHR);