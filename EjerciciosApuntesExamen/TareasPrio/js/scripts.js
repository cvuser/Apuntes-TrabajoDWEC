// Seleccionar elementos del DOM
const inputTarea = document.getElementById('texto-tarea');
const selectPrioridad = document.getElementById('prioridad-tarea');
const botonAgregar = document.getElementById('agregar-tarea');
const selectFiltrar = document.getElementById('filtrar-prioridad');
const listaTareas = document.getElementById('tareas');

// Clave para almacenar las tareas en localStorage
const TAREAS_KEY = 'tareas';

// Cargar tareas al iniciar la página
let tareas = JSON.parse(localStorage.getItem(TAREAS_KEY)) || [];
mostrarTareas(tareas);

// Función para agregar una nueva tarea
function agregarTarea() {
    const texto = inputTarea.value.trim();
    const prioridad = selectPrioridad.value;

    if (texto === '') {
        alert('Por favor, escribe una tarea.');
        return;
    }

    const nuevaTarea = {
        id: Date.now(),
        texto,
        prioridad,
        completada: false,
    };

    tareas.push(nuevaTarea);
    guardarTareas();
    mostrarTareas(tareas);

    // Limpiar el input
    inputTarea.value = '';
}

// Función para guardar las tareas en localStorage
function guardarTareas() {
    localStorage.setItem(TAREAS_KEY, JSON.stringify(tareas));
}

// Función para mostrar las tareas
function mostrarTareas(tareasMostrar) {
    listaTareas.innerHTML = '';

    tareasMostrar.forEach(tarea => {
        const li = document.createElement('li');
        li.textContent = `${tarea.texto} (Prioridad: ${tarea.prioridad})`;
        li.dataset.id = tarea.id;

        if (tarea.completada) {
            li.classList.add('completada');
        }

        // Botón para eliminar la tarea
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => eliminarTarea(tarea.id));

        // Marcar como completada
        li.addEventListener('click', () => toggleCompletada(tarea.id));

        li.appendChild(botonEliminar);
        listaTareas.appendChild(li);
    });
}

// Función para eliminar una tarea
function eliminarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);
    guardarTareas();
    mostrarTareas(tareas);
}

// Función para marcar/desmarcar una tarea como completada
function toggleCompletada(id) {
    tareas = tareas.map(tarea =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    );
    guardarTareas();
    mostrarTareas(tareas);
}

// Función para filtrar las tareas por prioridad
function filtrarTareas() {
    const prioridad = selectFiltrar.value;
    const tareasFiltradas = prioridad === 'todas'
        ? tareas
        : tareas.filter(tarea => tarea.prioridad === prioridad);
    mostrarTareas(tareasFiltradas);
}

// Eventos
botonAgregar.addEventListener('click', agregarTarea);
selectFiltrar.addEventListener('change', filtrarTareas);

// Cargar tareas al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarTareas(tareas);
});