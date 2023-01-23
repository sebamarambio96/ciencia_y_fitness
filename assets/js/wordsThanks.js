//DOM 
const contianerWT = document.getElementById('contianerWT')
const fragmentWT = document.createDocumentFragment()
const templateCardWT = document.getElementById('templateCardWT').content
const templateError = document.getElementById('templateError').content

//PINTAR mensajes de agradecemiento (Boton esquina superior izquierda)
//Para esto use fetch para traer personas falsas de la API Randomuser y mezcle sus datos con un base de datos que yo cree con json
//a la cual accedere con una function async la cual ejecutara un 2 fetch que con await se esperara una respuesta para poder proseguir 
//que nos dara los datos para dibujar. 
//En caso de que se caida del servidor u otro error catch pintara un mensaje avisando al usuario
//En el extraño caso de que demore en cargar en el html tambien hay un icono de carga mientras se resuelve la función async

async function getData() {
    try {
        let randomUser = await fetch('https://randomuser.me/api/?results=15')
            .then((resp) => resp.json())
            .then(data => data.results)

        let wordsThanks = await fetch('./json/wordsThanks.json')
            .then((resp) => resp.json())
            .then(words => words)

        while (contianerWT.firstChild) {
            contianerWT.removeChild(contianerWT.firstChild);
        }

        let i = 0
        randomUser.map(user => {
            let imgWT = templateCardWT.getElementById('imgWT')
            let userWT = templateCardWT.getElementById('userWT')
            let textWT = templateCardWT.getElementById('textWT')
            imgWT.src = user.picture.large
            imgWT.alt = user.name.first
            //Si el index es mayor a 9 empezará a asignara un indice al azar y empezara denuevo a sumar
            i > 9 && (i = Math.round(Math.random() * 9))
            textWT.textContent = `"${wordsThanks[i].message}"`
            i++
            userWT.textContent = `${user.name.first} ${user.name.last}`

            const clone = templateCardWT.cloneNode(true)
            fragmentWT.appendChild(clone)
        })
        contianerWT.appendChild(fragmentWT)

    } catch {
        while (contianerWT.firstChild) {
            contianerWT.removeChild(contianerWT.firstChild);
        }
        const clone = templateError.cloneNode(true)
        fragmentWT.appendChild(clone)
        contianerWT.appendChild(fragmentWT)
    }
}

getData()

//Solo para practicar todas las herramientas utilice una PROMESA para que pasado un tiempo salga un anuncio que te invite a seguir mi GitHub o
//Dejarme un comentario en un form hecho para la ocasión

const anuncio = new Promise((resolve) => {
    setTimeout(() => resolve('Hola'), 30000);
});

anuncio.then(value => {
    Swal.fire({
        title: '¿Te está gustando nuestra Web?',
        icon: 'question',
        html:
            'Me encantaría que dejaras un comentario y si te interesa puedes contactarme en mi cuenta de ' +
            '<a href="https://github.com/sebamarambio96">GitHub</a>',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonColor: '#00b09b',
        confirmButtonText:
            '<a class="link" href="https://docs.google.com/forms/d/1EfuOLjalZ8DJEbDwqcixyhDMtRE6yMBVxIY60Ye6QfQ/viewform?edit_requested=true" target="_blank">Por supuesto, ¡Me encantaría!</a>',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
            'Quizás más tarde',
        cancelButtonAriaLabel: 'Thumbs down'
    })
});
