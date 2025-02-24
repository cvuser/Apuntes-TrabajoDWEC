
class Rueda {
    constructor(presionMaxima, presion) {
        this.presionMaxima = presionMaxima;
        this.presion = presion;
    }

    obtenerPresion() {
        return this.presion;
    }

    presionOptima() {
        return (this.presion / this.presionMaxima) > 0.85;
    }
}

class Puntal {
    constructor() {
        this.ruedaIzquierda = new Rueda(20700, 18000);
        this.ruedaDerecha = new Rueda(20700, 18000);
    }

    desplegar() {
        console.log("Puntal desplegado.");
    }

    replegar() {
        console.log("Puntal replegado.");
    }
}

class TrenAterrizaje {
    constructor() {
        this.frontal = new Puntal();
        this.izquierdo = new Puntal();
        this.derecho = new Puntal();
        this.palanca = "bajada";
    }

    subirPalanca() {
        this.palanca = "subida";
        console.log("Palanca subida.");
    }

    bajarPalanca() {
        this.palanca = "bajada";
        console.log("Palanca bajada.");
    }
}

class Aeronave {
    constructor(id, combustible) {
        this.id = id;
        this.combustible = combustible;
        this.trenAterrizaje = new TrenAterrizaje();
    }

    despegar() {
        if (this.combustible > 0 && this.trenAterrizaje.palanca === "subida") {
            console.log(`Aeronave ${this.id} despegando.`);
        } else {
            console.log(`Aeronave ${this.id} no puede despegar.`);
        }
    }

    aterrizar() {
        console.log(`Aeronave ${this.id} aterrizando.`);
    }
}

class Hangar {
    constructor() {
        this.aeronaves = [];
    }

    agregarAeronave(aeronave) {
        this.aeronaves.push(aeronave);
    }

    listarAeronaves() {
        const aeronavesDiv = document.getElementById('aeronaves');
        aeronavesDiv.innerHTML = '';
        this.aeronaves.forEach(aeronave => {
            const info = document.createElement('p');
            info.textContent = `Aeronave ID: ${aeronave.id}, Combustible: ${aeronave.combustible}`;
            aeronavesDiv.appendChild(info);
        });
    }
}

const hangar = new Hangar();
const aeronave1 = new Aeronave(1, 100);
const aeronave2 = new Aeronave(2, 50);

hangar.agregarAeronave(aeronave1);
hangar.agregarAeronave(aeronave2);

function listarAeronaves() {
    hangar.listarAeronaves();
}