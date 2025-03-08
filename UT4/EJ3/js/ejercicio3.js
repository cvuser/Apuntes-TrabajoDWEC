/**
 * @author Carlos Velasco García
 * @version 1.0
 * @description Ejercicio 3: Gestión de un hangar de aeronaves usando clases.
 */

// Clase Rueda
class Rueda {
    constructor(presionMaxima, presion) {
        if (presionMaxima <= 0 || presionMaxima >= 20700) {
            throw new Error("La presión máxima debe ser superior a 0 e inferior a 20700 milibares.");
        }
        if (presion <= 0 || presion > presionMaxima) {
            throw new Error("La presión actual debe ser superior a 0 e inferior a la presión máxima.");
        }

        this.presionMaxima = presionMaxima;
        this.presion = presion;
    }

    getPresionActual() {
        return this.presion;
    }

    presionOptima() {
        return (this.presion / this.presionMaxima) > 0.85;
    }
}

// Clase Puntal
class Puntal {
    constructor() {
        this.ruedaIzquierda = new Rueda(20699, 18000); // Presión máxima menor a 20700
        this.ruedaDerecha = new Rueda(20699, 18000);   // Presión máxima menor a 20700
    }

    desplegar() {
        console.log("Puntal desplegado.");
    }

    replegar() {
        console.log("Puntal replegado.");
    }
}

// Clase TrenAterrizaje
class TrenAterrizaje {
    constructor() {
        this.frontal = new Puntal();
        this.izquierdo = new Puntal();
        this.derecho = new Puntal();
    }

    subir() {
        console.log("Tren de aterrizaje subido.");
    }

    bajar() {
        console.log("Tren de aterrizaje bajado.");
    }
}

// Clase Aeronave
class Aeronave {
    constructor(id, combustible) {
        this.id = id;
        this.combustible = combustible;
        this.trenAterrizaje = new TrenAterrizaje();
    }

    despegar() {
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
    }

    aterrizar() {
        console.log(`Aeronave ${this.id} ha aterrizado.`);
    }
}

// Clase Hangar
class Hangar {
    constructor() {
        this.aeronaves = [];
    }

    agregarAeronave(aeronave) {
        this.aeronaves.push(aeronave);
    }

    listarAeronaves() {
        const output = document.getElementById("output");
        output.innerHTML = "<h2>Aeronaves en el hangar:</h2><ul>";
        this.aeronaves.forEach(aeronave => {
            output.innerHTML += `<li>Aeronave ID: ${aeronave.id}, Combustible: ${aeronave.combustible}</li>`;
        });
        output.innerHTML += "</ul>";
    }
}

// Crear dos aeronaves y agregarlas al hangar
const hangar = new Hangar();

const aeronave1 = new Aeronave("A001", 1000);
const aeronave2 = new Aeronave("A002", 2000);

hangar.agregarAeronave(aeronave1);
hangar.agregarAeronave(aeronave2);

// Listar las aeronaves en el hangar
hangar.listarAeronaves();

aeronave1.despegar();
aeronave1.aterrizar();

aeronave2.despegar();
aeronave2.aterrizar();