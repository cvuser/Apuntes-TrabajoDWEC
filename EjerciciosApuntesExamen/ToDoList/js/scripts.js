// Seleccionar elementos del DOM
const inputTarea = document.getElementById('nueva-tarea');
const botonAgregar = document.getElementById('agregar-tarea');
const listaTareas = document.getElementById('lista-tareas');

// Función para agregar una nueva tarea
function agregarTarea() {
    // Obtener el valor del input
    const texto = inputTarea.value.trim();

    // Verificar que el input no esté vacío
    if (texto === '') {
        alert('Por favor, escribe una tarea.');
        return;
    }

    // Crear un nuevo elemento <li>
    const nuevaTarea = document.createElement('li');
    nuevaTarea.textContent = texto;

    // Crear un botón para eliminar la tarea
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';

    // Añadir evento al botón de eliminar
    botonEliminar.addEventListener('click', () => {
        listaTareas.removeChild(nuevaTarea);
    });

    // Añadir el botón de eliminar al <li>
    nuevaTarea.appendChild(botonEliminar);

    // Añadir la nueva tarea a la lista
    listaTareas.appendChild(nuevaTarea);

    // Limpiar el input
    inputTarea.value = '';
}

// Añadir evento al botón de agregar
botonAgregar.addEventListener('click', agregarTarea);

// Añadir evento al input para agregar con la tecla Enter
inputTarea.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        agregarTarea();
    }
});