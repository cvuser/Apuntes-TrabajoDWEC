// Seleccionar elementos del DOM
const inputUsuario = document.getElementById('nombre-usuario');
const botonBuscar = document.getElementById('buscar');
const infoUsuario = document.getElementById('info-usuario');
const listaBusquedas = document.getElementById('lista-busquedas');

// Clave para almacenar búsquedas recientes en localStorage
const BUSQUEDAS_KEY = 'busquedas_recientes';

// Cargar búsquedas recientes al iniciar la página
let busquedas = JSON.parse(localStorage.getItem(BUSQUEDAS_KEY)) || [];
mostrarBusquedasRecientes(busquedas);

// Función para buscar un usuario usando Fetch API
async function buscarUsuarioFetch() {
    const nombreUsuario = inputUsuario.value.trim();

    if (nombreUsuario === '') {
        alert('Por favor, escribe un nombre de usuario.');
        return;
    }

    try {
        const respuesta = await fetch(`https://api.github.com/users/${nombreUsuario}`);
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const usuario = await respuesta.json();
        mostrarUsuario(usuario);
        guardarBusqueda(nombreUsuario);
    } catch (error) {
        console.error('Error al buscar usuario:', error);
        infoUsuario.innerHTML = '<p>Usuario no encontrado. Inténtalo de nuevo.</p>';
    }
}

// Función para buscar un usuario usando XMLHttpRequest
function buscarUsuarioXHR() {
    const nombreUsuario = inputUsuario.value.trim();

    if (nombreUsuario === '') {
        alert('Por favor, escribe un nombre de usuario.');
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.github.com/users/${nombreUsuario}`, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            const usuario = JSON.parse(xhr.responseText);
            mostrarUsuario(usuario);
            guardarBusqueda(nombreUsuario);
        } else {
            console.error('Error al buscar usuario:', xhr.statusText);
            infoUsuario.innerHTML = '<p>Usuario no encontrado. Inténtalo de nuevo.</p>';
        }
    };

    xhr.onerror = function () {
        console.error('Error de red');
        infoUsuario.innerHTML = '<p>Error de red. Inténtalo de nuevo.</p>';
    };

    xhr.send();
}

// Función para mostrar la información del usuario
function mostrarUsuario(usuario) {
    infoUsuario.innerHTML = `
        <img src="${usuario.avatar_url}" alt="${usuario.login}">
        <div>
            <h3>${usuario.name || usuario.login}</h3>
            <p>${usuario.bio || 'No hay biografía disponible.'}</p>
            <p>Seguidores: ${usuario.followers}</p>
            <p>Repositorios públicos: ${usuario.public_repos}</p>
        </div>
    `;
}

// Función para guardar la búsqueda en localStorage
function guardarBusqueda(nombreUsuario) {
    if (!busquedas.includes(nombreUsuario)) {
        busquedas.push(nombreUsuario);
        localStorage.setItem(BUSQUEDAS_KEY, JSON.stringify(busquedas));
        mostrarBusquedasRecientes(busquedas);
    }
}

// Función para mostrar las búsquedas recientes
function mostrarBusquedasRecientes(busquedas) {
    listaBusquedas.innerHTML = '';

    busquedas.forEach(busqueda => {
        const li = document.createElement('li');
        li.textContent = busqueda;
        listaBusquedas.appendChild(li);
    });
}

// Eventos
botonBuscar.addEventListener('click', buscarUsuarioFetch); // Usar Fetch API
// botonBuscar.addEventListener('click', buscarUsuarioXHR); // Usar XMLHttpRequest

// Cargar búsquedas recientes al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarBusquedasRecientes(busquedas);
});