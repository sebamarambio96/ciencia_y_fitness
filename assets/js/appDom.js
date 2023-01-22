let solicitantes = JSON.parse(localStorage.getItem('results'))
solicitantes = solicitantes ?? []

//Si hay datos en localStorage, pinta el ultimo en el array
//De lo contrario no pintara nada y esperara el evento enviar

if (solicitantes != null || solicitantes == []) {
    pintarResultado(solicitantes.length - 1)
}

//Clase que se usará para registrar datos de los usuarios
class Solicitante {
    constructor(peso, altura, edad, ejercicio, id, sexo, tmb, get, fecha) {
        this.peso = peso
        this.altura = altura
        this.edad = edad
        this.ejercicio = ejercicio
        this.id = id
        this.sexo = sexo
        this.tmb = tmb
        this.get = get
        this.fecha = fecha
    }

    mostrarInfo() {
        const hoy = new Date()
        return `Datos solicitante N°${this.id} :\n- Sexo: ${this.sexo}\n- Peso: ${this.peso}\n- Altura: ${this.altura}\n- Edad: ${this.edad}\n - Ejercicio: Nivel ${this.ejercicio}\n- Última evaluación: ${hoy.toDateString()}`
    }

}

//Al activar datos solicitantes, extrae los datos, los pinta y ejecuta las funciones para detectar botones
//Y cada boton vuelve a activar la funcion de pintar y la de pintar la de detectar botones, creando asi un ciclo de pintar y escuchar
datosSolicitante()
//Funcion que detecta el boton presionado y el data-id que se les asigno
//Elige una consulta y la muestra en pantalla
function detectarBotonesVer() {
    let botones = document.querySelectorAll('#btnVer')
    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            solicitantes = JSON.parse(localStorage.getItem('results'))
            //filtramos los NULLS y creamos un nuevo array.
            let consultas = solicitantes.filter(consulta => consulta != null)
            //Ahora buscamos la posicion del elemento con el id seleccionado
            consulta = consultas.find(item => item.id == btn.dataset.id)
            let x = solicitantes.indexOf(consulta)
            //Se pinta el nuevo conjunto de datos
            pintarResultado(x)
        })
    })
}


//Elige una consulta y la borra de la base de datos
function detectarBotonesBorrar() {
    let botones = document.querySelectorAll('#btnBorrar')
    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log(btn.dataset.id);
            //Para eliminar filtramos un array con todos los elementos menos el que seleccionamos
            solicitantes = solicitantes.filter(consulta => consulta.id != parseInt(btn.dataset.id))
            localStorage.setItem('results', JSON.stringify(solicitantes))
            //Se pinta el nuevo conjunto de datos
            pintarResultado(solicitantes.length - 1)
        })
    })
}


//Funciones para calcular tasa metabolica basal
const tmbHombre = (a, b, c) => { return (10 * a) + (6.25 * b) - (5 * c) + 5 };
const tmbMujer = (a, b, c) => { return (10 * a) + (6.25 * b) - (5 * c) - 161 };


function datosSolicitante() {

    const btnSend = document.getElementById('btnSend')
    btnSend.addEventListener('click', (e) => {
        e.preventDefault()

        //Extrae los valores ingresados por el cliente en los inputs
        let sexo = document.querySelector('input[name="sexos"]:checked').value
        let ejercicio = document.querySelector('input[name="ejercicio"]:checked').value
        let peso = document.getElementById('peso').value;
        let altura = document.getElementById('altura').value;
        let edad = document.getElementById('edad').value;
        let tmb;
        let get;

        //Solo hay 2 opciones de sexo asique si es distinto de mujer dara TRUE por lo tanto es hombre, si es FALSE será mujer
        tmb = sexo != 'Mujer' ? tmbHombre(peso, altura, edad) : tmb = tmbMujer(peso, altura, edad)

        //Se calcula el Gasto calorico diario
        ejercicio == 1 && (get = tmb * 1.2)
        ejercicio == 2 && (get = tmb * 1.375)
        ejercicio == 3 && (get = tmb * 1.55)
        ejercicio == 4 && (get = tmb * 1.725)
        ejercicio == 5 && (get = tmb * 1.9)

        let contadorID = 0
        contadorID = JSON.parse(localStorage.getItem('contador'))
        contadorID ?? (contadorID = 0)

        //Se crea una nueva instancia de la clase solicitante
        const fecha = new Date();
        const fechaFormato = `${fecha.getDay()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`
        solicitantes[contadorID] = new Solicitante(peso, altura, edad, ejercicio, contadorID, sexo, Math.round(tmb), Math.round(get), fechaFormato)
        localStorage.setItem('results', JSON.stringify(solicitantes))
        pintarResultado(contadorID)
        contadorID++
        localStorage.setItem('contador', JSON.stringify(contadorID))
    })
}

function pintarResultado(contadorID) {
    solicitantes = JSON.parse(localStorage.getItem('results')) || []

    // En caso de que el array se quede vacio por eliminar elementos se pintara denuevo las siluetas de relleno
    if (solicitantes.length === 0) {
        const contenedorResults = document.getElementById('contenedorResults');
        let fragment = ''
        fragment += `
        <div class="container h-100 siluetas">
        </div>
    `

        contenedorResults.innerHTML = fragment
    } else {
        //Si el array contiene datos se pintara el id solicitado en la función pintara el nuevo conjunto de datos
        let consulta = solicitantes[contadorID]


        const templateResults = document.getElementById('templateResults').content
        const contenedorResults = document.getElementById('contenedorResults')
        const fragmentResults = document.createDocumentFragment()

        while (contenedorResults.firstChild) {
            contenedorResults.removeChild(contenedorResults.firstChild);
        }
        //Pintara la consulta solicitada
        let peso = templateResults.getElementById('peso')
        let altura = templateResults.getElementById('altura')
        let edad = templateResults.getElementById('edad')
        let sexo = templateResults.getElementById('sexo')
        let datosTMB = templateResults.getElementById('datosTMB')
        let datosGET = templateResults.getElementById('datosGET')
        let ejercicioNivel = templateResults.getElementById('ejercicioNivel')

        peso.textContent = consulta.peso
        altura.textContent = consulta.altura
        edad.textContent = consulta.edad
        sexo.textContent = consulta.sexo
        datosTMB.textContent = consulta.tmb
        datosGET.textContent = consulta.get
        ejercicioNivel.textContent = consulta.ejercicio
        const clone = templateResults.cloneNode(true)
        fragmentResults.appendChild(clone)
        contenedorResults.appendChild(fragmentResults)

        //Pintar la lista de consultas
        const templateLista = document.getElementById('templateLista').content
        const contenedorLista = document.getElementById('contenedorLista')
        const fragmentLista = document.createDocumentFragment()

        solicitantes.map(consulta => {
            //Al borrar datos quedaran espacios null en el array por lo tanto se incluye esta medida para evitar bugs
            if (consulta != null) {
                const idConsulta = templateLista.getElementById('idConsulta')
                const fechaConsulta = templateLista.getElementById('fechaConsulta')
                const btnVer = templateLista.getElementById('btnVer')
                const btnBorrar = templateLista.getElementById('btnBorrar')

                btnVer.dataset.id = consulta.id
                btnBorrar.dataset.id = consulta.id
                fechaConsulta.dataset.id = consulta.fecha
                idConsulta.textContent = consulta.id
                fechaConsulta.textContent = consulta.fecha

                const clone = templateLista.cloneNode(true)
                fragmentLista.appendChild(clone)
            }
        })
        contenedorLista.appendChild(fragmentLista)

    }
    //Se vuelve a ejecutar funciones para detectar botones
    detectarBotonesVer()
    detectarBotonesBorrar()
    vaciarConsultas()
}

//Boton para eliminar local storage
function vaciarConsultas() {
    const botonVaciar = document.getElementById('botonVaciar') 
    botonVaciar && (
    botonVaciar.addEventListener('click', () => {
        localStorage.clear()
        location.reload()
    }))
}
