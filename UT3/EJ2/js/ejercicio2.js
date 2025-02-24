/**
 * @author Carlos Velasco García
 * @version 1.0
 * @description Ejercicio 2: Gestión de cestas de Navidad.
 */

const productos = [
    1, 'Botella de cava', 5.10,
    2, 'Botella de vino tinto Rioja', 3.25,
    3, 'Turrón de chocolate', 2.50,
    4, 'Jamón ibérico', 45.00,
    5, 'Queso manchego', 8.75
];

// Función para obtener los productos ordenados por precio
function obtenerProductosOrdenados() {
    let productosOrdenados = [];
    for (let i = 0; i < productos.length; i += 3) {
        productosOrdenados.push({
            codigo: productos[i],
            descripcion: productos[i + 1],
            precio: productos[i + 2]
        });
    }
    return productosOrdenados.sort((a, b) => b.precio - a.precio);
}

// Función para mostrar el producto más barato y más caro
function mostrarProductosExtremos() {
    let productosOrdenados = obtenerProductosOrdenados();
    let masBarato = productosOrdenados[productosOrdenados.length - 1];
    let masCaro = productosOrdenados[0];

    let output = `<h2>Producto más barato:</h2>
                  <p>${masBarato.descripcion} - ${masBarato.precio}€</p>
                  <h2>Producto más caro:</h2>
                  <p>${masCaro.descripcion} - ${masCaro.precio}€</p>`;
    document.getElementById("output").innerHTML += output;
}

// Función para crear una cesta
function crearCesta() {
    let cesta = [];
    while (true) {
        let codigo = prompt("Introduce el código del producto (o cancela para finalizar):");
        if (codigo === null) break;
        let unidades = prompt("Introduce el número de unidades:");
        if (unidades === null) break;

        let producto = productos.find((p, index) => index % 3 === 0 && p === parseInt(codigo));
        if (producto) {
            cesta.push({ codigo, unidades: parseInt(unidades) });
        } else {
            alert("Código de producto no válido.");
        }
    }

    let total = 0;
    let output = "<h2>Contenido de la cesta:</h2><ul>";
    cesta.forEach(item => {
        let producto = productos.find((p, index) => index % 3 === 0 && p === item.codigo);
        let descripcion = productos[productos.indexOf(producto) + 1];
        let precio = productos[productos.indexOf(producto) + 2];
        total += precio * item.unidades;
        output += `<li>${descripcion} - ${item.unidades} ud(s) - ${precio * item.unidades}€</li>`;
    });
    output += `</ul><p>Total de la cesta: ${total.toFixed(2)}€</p>`;
    document.getElementById("output").innerHTML += output;
}

// Mostrar productos extremos y crear cesta
mostrarProductosExtremos();
crearCesta();