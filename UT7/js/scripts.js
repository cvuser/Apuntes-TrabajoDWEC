const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjYzIwMDN2ZWxhc0BnbWFpbC5jb20iLCJqdGkiOiI0OTIzYzg5MC1mNDc0LTQ3YmQtYjVlNi1kMGMzZDAyNzliZjUiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTc0MTYzNjM3OCwidXNlcklkIjoiNDkyM2M4OTAtZjQ3NC00N2JkLWI1ZTYtZDBjM2QwMjc5YmY1Iiwicm9sZSI6IiJ9.RS9PawBi7AzgJrQtu-iBVosQayIG6_L3Gh582pLi4gQ';
const CODIGO_MUNICIPIO = '33036'; // Gijón

async function obtenerPrediccion() {
    try {
        const API_URL = `https://api.allorigins.win/raw?url=${encodeURIComponent(
            `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${CODIGO_MUNICIPIO}?api_key=${API_KEY}`
        )}`;
        const respuestaEnlace = await fetch(API_URL);

        if (!respuestaEnlace.ok) {
            throw new Error(`Error HTTP: ${respuestaEnlace.status}`);
        }

        const datosEnlace = await respuestaEnlace.json();
        console.log("Datos del enlace:", datosEnlace);

        if (!datosEnlace.datos) {
            throw new Error('No se pudo obtener el enlace de la predicción.');
        }

        // Obtiene los datos de la predicción
        const respuestaPrediccion = await fetch(datosEnlace.datos);
        const datosPrediccion = await respuestaPrediccion.json();
        console.log("Datos de la predicción:", datosPrediccion);

        mostrarPrediccion(datosPrediccion);

        // Información adicional
        document.getElementById('mostrar-mas').addEventListener('click', () => {
            mostrarInformacionAdicional(datosPrediccion[0].prediccion.dia[0]);
            document.getElementById('informacion-adicional').style.display = 'block';
        });
    } catch (error) {
        console.error('Error al obtener la predicción:', error);
        document.getElementById('contenedor-prediccion').innerHTML =
            '<p>Error al cargar la predicción. Inténtalo de nuevo más tarde.</p>';
    }
}

function mostrarPrediccion(datos) {
    const contenedor = document.getElementById('contenedor-prediccion');
    contenedor.innerHTML = '';

    datos[0].prediccion.dia.slice(0, 4).forEach((dia) => {
        const fecha = new Date(dia.fecha).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        // Verifica si dia.probPrecipitacion es un array y toma el primer valor
        const probPrecipitacion = Array.isArray(dia.probPrecipitacion) && dia.probPrecipitacion.length > 0
            ? dia.probPrecipitacion[0].value // Ajusta según la estructura real
            : 'No disponible';

        const html = `
            <div class="dia">
                <h3>${fecha}</h3>
                <p>Temperatura máxima: ${dia.temperatura.maxima}°C</p>
                <p>Temperatura mínima: ${dia.temperatura.minima}°C</p>
                <p>Probabilidad de precipitación: ${probPrecipitacion}%</p>
            </div>
        `;
        contenedor.innerHTML += html;
    });
}

function mostrarInformacionAdicional(dia) {
    const contenedor = document.getElementById('contenedor-informacion-adicional');
    contenedor.innerHTML = '';

    const fecha = new Date(dia.fecha).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Verifica si las propiedades existen antes de acceder a ellas
    const viento = dia.viento && dia.viento[0]
        ? `${dia.viento[0].direccion} a ${dia.viento[0].velocidad} km/h`
        : 'No disponible';

    const humedad = dia.humedadRelativa && dia.humedadRelativa.maxima
        ? `${dia.humedadRelativa.maxima}%`
        : 'No disponible';

    const presion = dia.presion
        ? `${dia.presion} hPa`
        : 'No disponible';

    const html = `
        <div class="informacion-adicional">
            <h3>${fecha}</h3>
            <p>Viento: ${viento}</p>
            <p>Humedad: ${humedad}</p>
            <p>Presión atmosférica: ${presion}</p>
        </div>
    `;
    contenedor.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', obtenerPrediccion);