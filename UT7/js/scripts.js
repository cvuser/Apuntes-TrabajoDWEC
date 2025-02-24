
const API_KEY = 'tu_api_key'; 
const MUNICIPIO = '33036'; 

async function obtenerPrediccion() {
    try {
        // Obtener el código de predicción para Gijón
        const response = await fetch(`https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${MUNICIPIO}?api_key=${API_KEY}`);
        const data = await response.json();
        const urlPrediccion = data.datos;

        // Obtener los datos de la predicción
        const responsePrediccion = await fetch(urlPrediccion);
        const datosPrediccion = await responsePrediccion.json();
        mostrarPrediccion(datosPrediccion);
    } catch (error) {
        console.error('Error al obtener la predicción:', error);
    }
}

function mostrarPrediccion(datos) {
    const prediccionDiv = document.getElementById('prediccion');
    prediccionDiv.innerHTML = '';

    const dias = datos[0].prediccion.dia;
    dias.forEach(dia => {
        const fecha = dia.fecha;
        const tempMax = dia.temperatura.maxima;
        const tempMin = dia.temperatura.minima;
        const probPrecipitacion = dia.probPrecipitacion[0]?.value || 0;

        const diaDiv = document.createElement('div');
        diaDiv.className = 'dia';
        diaDiv.innerHTML = `
            <h3>${fecha}</h3>
            <p>Máxima: ${tempMax}°C</p>
            <p>Mínima: ${tempMin}°C</p>
            <p>Prob. Precipitación: ${probPrecipitacion}%</p>
        `;
        prediccionDiv.appendChild(diaDiv);
    });
}

function mostrarInfoAdicional(datos) {
    const detallesDiv = document.getElementById('detalles-adicionales');
    detallesDiv.innerHTML = '';

    const diaActual = datos[0].prediccion.dia[0];
    const viento = diaActual.viento[0].velocidad;
    const humedad = diaActual.humedadRelativa.maxima;

    detallesDiv.innerHTML = `
        <h3>Información Adicional para el Día Actual</h3>
        <p>Viento: ${viento} km/h</p>
        <p>Humedad: ${humedad}%</p>
    `;
}

document.getElementById('mostrarInfoAdicional').addEventListener('click', async () => {
    try {
        const response = await fetch(`https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${MUNICIPIO}?api_key=${API_KEY}`);
        const data = await response.json();
        const urlPrediccion = data.datos;

        const responsePrediccion = await fetch(urlPrediccion);
        const datosPrediccion = await responsePrediccion.json();
        mostrarInfoAdicional(datosPrediccion);
    } catch (error) {
        console.error('Error al obtener la información adicional:', error);
    }
});

// Cargar la predicción al cargar la página
document.addEventListener('DOMContentLoaded', obtenerPrediccion);