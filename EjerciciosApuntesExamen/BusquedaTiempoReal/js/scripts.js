// Seleccionar elementos del DOM
const inputBusqueda = document.getElementById('buscar-usuario');
const listaUsuarios = document.getElementById('lista-usuarios');

// Función para buscar usuarios
async function buscarUsuarios(termino) {
    try {
        // Hacer una solicitud a la API
        const respuesta = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const usuarios = await respuesta.json();

        // Filtrar usuarios según el término de búsqueda
        const resultados = usuarios.filter(usuario =>
            usuario.name.toLowerCase().includes(termino.toLowerCase())
        );

        // Mostrar los resultados
        mostrarUsuarios(resultados);
    } catch (error) {
        console.error('Error al buscar usuarios:', error);
    }
}

// Función para mostrar los usuarios
function mostrarUsuarios(usuarios) {
    // Limpiar la lista
    listaUsuarios.innerHTML = '';

    // Crear un elemento <li> para cada usuario
    usuarios.forEach(usuario => {
        const li = document.createElement('li');
        li.textContent = usuario.name;
        listaUsuarios.appendChild(li);
    });
}

// Añadir evento al input para buscar en tiempo real
inputBusqueda.addEventListener('input', (e) => {
    buscarUsuarios(e.target.value);
});