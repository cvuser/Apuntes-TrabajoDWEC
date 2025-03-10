/**
 * @author Carlos Velasco García
 * @version 1.0
 * @description Ejercicio 1: Validación de Formulario.
 */

function añadirAficion() {
    const aficionesDisponibles = document.getElementById('aficionesDisponibles');
    const aficionesSeleccionadas = document.getElementById('aficionesSeleccionadas');
    const seleccionada = aficionesDisponibles.value;

    if (seleccionada) {
        const option = document.createElement('option');
        option.value = seleccionada;
        option.textContent = seleccionada;
        aficionesSeleccionadas.appendChild(option);
    }
}

function quitarAficion() {
    const aficionesDisponibles = document.getElementById('aficionesDisponibles');
    const aficionesSeleccionadas = document.getElementById('aficionesSeleccionadas');
    const seleccionada = aficionesSeleccionadas.value;

    if (seleccionada) {
        const option = document.createElement('option');
        option.value = seleccionada;
        option.textContent = seleccionada;
        aficionesDisponibles.appendChild(option);

        // Eliminar la afición seleccionada de la lista de seleccionadas
        const opcionSeleccionada = Array.from(aficionesSeleccionadas.options).find(opt => opt.value === seleccionada);
        if (opcionSeleccionada) {
            aficionesSeleccionadas.removeChild(opcionSeleccionada);
        }
    }
}

function validarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const email = document.getElementById('email').value;
    const sexo = document.querySelector('input[name="sexo"]:checked').value;
    const aficionesSeleccionadas = document.getElementById('aficionesSeleccionadas').options;

    // Validar campos obligatorios
    if (!nombre || !apellidos || !email) {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
    }

    // Obtener aficiones seleccionadas
    let aficiones = [];
    for (let i = 0; i < aficionesSeleccionadas.length; i++) {
        aficiones.push(aficionesSeleccionadas[i].value);
    }

    // Construir el mensaje
    let mensaje = sexo === 'Hombre' ? 'El usuario ' : 'La usuaria ';
    mensaje += `${nombre} ${apellidos} con correo electrónico ${email}. `;

    if (aficiones.length === 0) {
        mensaje += 'No tiene aficiones.';
    } else if (aficiones.length === 1) {
        mensaje += `Tiene como afición: ${aficiones[0]}.`;
    } else {
        mensaje += `Tiene como aficiones: ${aficiones.join(', ')}.`;
    }

    // Mostrar el resultado en un alert
    alert(mensaje);
}