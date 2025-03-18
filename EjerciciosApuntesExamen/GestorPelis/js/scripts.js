// Seleccionar elementos del DOM
const inputBusqueda = document.getElementById('buscar-pelicula');
const botonBuscar = document.getElementById('buscar');
const listaResultados = document.getElementById('lista-resultados');
const listaFavoritos = document.getElementById('lista-favoritos');

// Clave de API de OMDB (reemplaza con tu clave)
const API_KEY = 'b1c63427'; // 👈 ¡Reemplaza esto!

// Clave para almacenar las películas favoritas en localStorage
const FAVORITOS_KEY = 'peliculas_favoritas';

// Función para buscar películas usando la API de OMDB
async function buscarPeliculas(termino) {
    try {
        // Hacer una solicitud a la API
        const respuesta = await fetch(`https://www.omdbapi.com/?s=${termino}&apikey=${API_KEY}`);
        
        // Verificar si la respuesta es exitosa
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        // Convertir la respuesta a JSON
        const datos = await respuesta.json();

        // Verificar si se encontraron resultados
        if (datos.Response === 'True') {
            mostrarResultados(datos.Search);
        } else {
            listaResultados.innerHTML = '<p>No se encontraron resultados.</p>';
        }
    } catch (error) {
        console.error('Error al buscar películas:', error);
        listaResultados.innerHTML = '<p>Error al cargar los resultados. Verifica tu conexión o la clave de API.</p>';
    }
}

// Función para mostrar los resultados de la búsqueda
function mostrarResultados(peliculas) {
    // Limpiar la lista de resultados
    listaResultados.innerHTML = '';

    // Crear un elemento para cada película
    peliculas.forEach(pelicula => {
        const div = document.createElement('div');
        div.classList.add('pelicula');

        // Añadir la imagen de la película
        const img = document.createElement('img');
        img.src = pelicula.Poster !== 'N/A' ? pelicula.Poster : 'https://via.placeholder.com/50';
        img.alt = pelicula.Title;

        // Añadir el título de la película
        const titulo = document.createElement('span');
        titulo.textContent = `${pelicula.Title} (${pelicula.Year})`;

        // Añadir un botón para agregar a favoritos
        const botonFavorito = document.createElement('button');
        botonFavorito.textContent = 'Agregar a Favoritos';
        botonFavorito.addEventListener('click', () => agregarAFavoritos(pelicula));

        // Añadir elementos al div
        div.appendChild(img);
        div.appendChild(titulo);
        div.appendChild(botonFavorito);

        // Añadir el div a la lista de resultados
        listaResultados.appendChild(div);
    });
}

// Función para agregar una película a favoritos
function agregarAFavoritos(pelicula) {
    // Obtener las películas favoritas del localStorage
    let favoritos = JSON.parse(localStorage.getItem(FAVORITOS_KEY)) || [];

    // Verificar si la película ya está en favoritos
    if (!favoritos.some(fav => fav.imdbID === pelicula.imdbID)) {
        // Agregar la película a favoritos
        favoritos.push(pelicula);
        localStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritos));
        mostrarFavoritos();
    } else {
        alert('Esta película ya está en tus favoritos.');
    }
}

// Función para mostrar las películas favoritas
function mostrarFavoritos() {
    // Obtener las películas favoritas del localStorage
    const favoritos = JSON.parse(localStorage.getItem(FAVORITOS_KEY)) || [];

    // Limpiar la lista de favoritos
    listaFavoritos.innerHTML = '';

    // Crear un elemento para cada película favorita
    favoritos.forEach(pelicula => {
        const div = document.createElement('div');
        div.classList.add('pelicula');

        // Añadir la imagen de la película
        const img = document.createElement('img');
        img.src = pelicula.Poster !== 'N/A' ? pelicula.Poster : 'https://via.placeholder.com/50';
        img.alt = pelicula.Title;

        // Añadir el título de la película
        const titulo = document.createElement('span');
        titulo.textContent = `${pelicula.Title} (${pelicula.Year})`;

        // Añadir elementos al div
        div.appendChild(img);
        div.appendChild(titulo);

        // Añadir el div a la lista de favoritos
        listaFavoritos.appendChild(div);
    });
}

// Evento para buscar películas
botonBuscar.addEventListener('click', () => {
    const termino = inputBusqueda.value.trim();
    if (termino) {
        buscarPeliculas(termino);
    } else {
        alert('Por favor, escribe un término de búsqueda.');
    }
});

// Cargar las películas favoritas al cargar la página
document.addEventListener('DOMContentLoaded', mostrarFavoritos);