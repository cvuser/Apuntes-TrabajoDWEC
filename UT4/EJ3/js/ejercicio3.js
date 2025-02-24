/**
 * @author Carlos Velasco García
 * @version 1.0
 * @description Ejercicio 3: Gestión de un hangar de aeronaves.
 */

// Definición de la clase Rueda
function Rueda(presionMaxima, presion) {
    if (presionMaxima <= 0 || presionMaxima >= 20700) {
        throw new Error("La presión máxima debe ser superior a 0 e inferior a 20700 milibares.");
    }
    if (presion <= 0 || presion > presionMaxima) {
        throw new Error("La presión actual debe ser superior a 0 e inferior a la presión máxima.");
    }

    this.presionMaxima = presionMaxima;
    this.presion = presion;
}

Rueda.prototype.getPresionActual = function () {
    return this.presion;
};

Rueda.prototype.presionOptima = function () {
    return (this.presion / this.presionMaxima) > 0.85;
};

// Definición de la clase Puntal
function Puntal() {
    this.ruedaIzquierda = new Rueda(20699, 18000); // Cambiado a 20699
    this.ruedaDerecha = new Rueda(20699, 18000);   // Cambiado a 20699
}

Puntal.prototype.desplegar = function () {
    console.log("Puntal desplegado.");
};

Puntal.prototype.replegar = function () {
    console.log("Puntal replegado.");
};

// Definición de la clase TrenAterrizaje
function TrenAterrizaje() {
    this.frontal = new Puntal();
    this.izquierdo = new Puntal();
    this.derecho = new Puntal();
}

TrenAterrizaje.prototype.subir = function () {
    console.log("Tren de aterrizaje subido.");
};

TrenAterrizaje.prototype.bajar = function () {
    console.log("Tren de aterrizaje bajado.");
};

// Definición de la clase Aeronave
function Aeronave(id, combustible) {
    this.id = id;
    this.combustible = combustible;
    this.trenAterrizaje = new TrenAterrizaje();
}

Aeronave.prototype.despegar = function () {
    const presionOptima =
        this.trenAterrizaje.frontal.ruedaIzquierda.presionOptima() &&
        this.trenAterrizaje.frontal.ruedaDerecha.presionOptima() &&
        this.trenAterrizaje.izquierdo.ruedaIzquierda.presionOptima() &&
        this.trenAterrizaje.izquierdo.ruedaDerecha.presionOptima() &&
        this.trenAterrizaje.derecho.ruedaIzquierda.presionOptima() &&
        this.trenAterrizaje.derecho.ruedaDerecha.presionOptima();

    if (this.combustible > 0 && presionOptima) {
        console.log(`Aeronave ${this.id} ha despegado.`);
    } else {
        console.log(`Aeronave ${this.id} no puede despegar. Verifique el combustible y la presión de las ruedas.`);
    }
};

Aeronave.prototype.aterrizar = function () {
    console.log(`Aeronave ${this.id} ha aterrizado.`);
};

// Definición de la clase Hangar
function Hangar() {
    this.aeronaves = [];
}

Hangar.prototype.agregarAeronave = function (aeronave) {
    this.aeronaves.push(aeronave);
};

Hangar.prototype.listarAeronaves = function () {
    const output = document.getElementById("output");
    output.innerHTML = "<h2>Aeronaves en el hangar:</h2><ul>";
    this.aeronaves.forEach(aeronave => {
        output.innerHTML += `<li>Aeronave ID: ${aeronave.id}, Combustible: ${aeronave.combustible}</li>`;
    });
    output.innerHTML += "</ul>";
};

// Crear dos aeronaves y agregarlas al hangar
const hangar = new Hangar();

const aeronave1 = new Aeronave("A001", 1000);
const aeronave2 = new Aeronave("A002", 2000);

hangar.agregarAeronave(aeronave1);
hangar.agregarAeronave(aeronave2);

// Listar las aeronaves en el hangar
hangar.listarAeronaves();

// Probar el despegue y aterrizaje de las aeronaves
aeronave1.despegar();
aeronave1.aterrizar();

aeronave2.despegar();
aeronave2.aterrizar();