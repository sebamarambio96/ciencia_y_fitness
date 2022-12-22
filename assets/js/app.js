/* Existen muchas fórmulas para calcular la TMB, pero una de las más utilizadas en todo el mundo es la fórmula de Harris Benedict descrita en 1919, revisada por Mifflin y St Jeor en 1990.

El cálculo es el siguiente:

Hombres TMB = (10 x peso de Kg) + (6,25 x altura en cm) – (5 x edad en años) + 5
Mujeres TMB = (10 x peso en kg) + (6,25 x altura en cm) – (5 x edad en años) – 161
Dependiendo del tipo de actividad que realices, la cantidad mínima de energía o el número de calorías que necesites variará según estos parámetros:

Poco o ningún ejercicio = TMB x 1,2.
Ejercicio ligero (1 - 3 días por semana) = TMB x 1,375.
Ejercicio moderado (3 - 5 días por semana) = TMB x 1,55.
Ejercicio fuerte (6 - 7 días por semana) = TMB x 1,725.
Ejercicio muy fuerte (dos veces al día, entrenamientos muy duros) = TMB x 1,9. */

let sexo;
let peso;
let altura;
let edad;
let tmb;
let tmbFinal;
let ejercicio;
let solicitantes = [{id:0}]

class Solicitante {
    constructor(peso, altura, edad, ejercicio, id, sexo) {
        this.peso = peso
        this.altura = altura
        this.edad = edad
        this.ejercicio = ejercicio
        this.id = id
        this.sexo = sexo
    }

    mostrarInfo(){
        const hoy = new Date()
        return `Datos solicitante N°${this.id} :\n- Sexo: ${this.sexo}\n- Peso: ${this.peso}\n- Altura: ${this.edad}\n- Edad: ${this.edad}\n - Ejercicio: Nivel ${this.ejercicio}\n- Última evaluación: ${hoy.toDateString()}`
    }

}



function datos() {
    peso = prompt('Ingrese su peso en kilogramos:')
    altura = prompt('Ingrese su altura en centimetros:')
    edad = prompt('Ingrese su edad:')
    return peso, altura, edad
}

const tmbHombre = (a, b, c) => {return (10 * a) + (6.25 * b) - (5 * c) + 5 };
const tmbMujer = (a, b, c) => {return (10 * a) + (6.25 * b) - (5 * c) - 161 };

let participantes =prompt('Bienvenido a Ciencia y Fitness!\nTe ayudaremos a calcular tu TMB (tasa metabólica basal). \n ¿Cuántas consultas desea hacer?');
console.log(participantes)

for (let x = 1; x <= participantes; x += 1) {
    datos();
    let i = 0;
    while (i === 0) {
        let sexo0 = prompt('Indícanos tu sexo: Hombre / Mujer.');
        sexo = sexo0.toLowerCase()
        if (sexo === 'hombre') {
            tmb = tmbHombre(peso, altura, edad);
            i += 1;

        }
        else if (sexo === 'mujer') {
            tmb = tmbMujer(peso, altura, edad);
            i += 1;

        }
        else {
            window.alert('Ingrese una opción válida')
        }
    }
    console.log(tmb)

    let e = 0;
    while (e === 0) {
        ejercicio = parseInt(prompt('¿Cuánto ejercicio hace por semana? \nElija una opción escribiendo el número correspondiente:\n 1. Poco o ningún ejercicio.\n 2. Ejercicio ligero (1 - 3 días por semana).\n 3. Ejercicio moderado (3 - 5 días por semana).\n 4. Ejercicio fuerte (6 - 7 días por semana).\n 5. Ejercicio muy fuerte (dos veces al día, entrenamientos muy duros). '));
        if (ejercicio == 1) {
            tmbFinal = tmb * 1.2;
            e += 1;
        }
        else if (ejercicio == 2) {
            tmbFinal = tmb * 1.375;
            e += 1;
        }
        else if (ejercicio == 3) {
            tmbFinal = tmb * 1.55;
            e += 1;
        }
        else if (ejercicio == 4) {
            tmbFinal = tmb * 1.725;
            e += 1;
        }
        else if (ejercicio == 5) {
            tmbFinal = tmb * 1.9;
            e += 1;
        }
        else {
            window.alert('Ingrese una opción válida')
        }
    }
    console.log(tmbFinal)

    window.alert(`La TMB del solicitante ${x} es: ${Math.round(tmb)} \nPara su nivel de ejercicio su gasto diario es de: ${Math.round(tmbFinal)} calorías`)
    console.log(x)

    solicitantes[x] = new Solicitante(peso, altura, edad, ejercicio, x, sexo)
}
console.log(solicitantes[1].mostrarInfo());

console.log(solicitantes);

let condicion = true
while (condicion === true) {
    let solicitud = parseInt(prompt('1. Obtener más detalles de un solicitante.\n2. Eliminar datos de un solicitante.\n3. Terminar consulta.'))
    let listaSoli = ''
    for (x in solicitantes) {
        if (solicitantes[x].id === 0){
            continue
        }
        let soli = `- ${solicitantes[x].id}\n`
        listaSoli += soli
    }
    console.log(solicitantes);
    if(solicitud === 1){
        let ident = prompt(`Ingrese el número del solicitante para obtener más detalles:\n${listaSoli}`)      
        let solicitante = solicitantes.find(solicitante => solicitante.id == ident)
        console.log(solicitante);
        window.alert(solicitante.mostrarInfo())
    } else if (solicitud === 2) {
        let ident = prompt(`Ingrese el número del solicitante que desea eliminar:\n${listaSoli}`)
        solicitantes = solicitantes.filter(solicitante => solicitante.id != ident)
    } else if (solicitud === 3) {
        condicion = false
    } else{
        window.alert('Ingrese una opción válida')
    }
}
