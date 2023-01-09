function pintarCarro() {
    const templateCarritoContenido = document.getElementById('templateCarritoContenido').content
    const templateCarritoTotal = document.getElementById('templateCarritoTotal').content
    const contenedorCarro = document.getElementById('contenedorCarro')
    const fragmentCarro = document.createDocumentFragment()

    while (contenedorCarro.firstChild) {
        contenedorCarro.removeChild(contenedorCarro.firstChild);
    }


    carritoGuardado.forEach(producto => {
        /* console.log(producto) */
        let idProducto = templateCarritoContenido.getElementById('idProducto')
        let cantidadProducto = templateCarritoContenido.getElementById('cantidadProducto')
        let nombreProducto = templateCarritoContenido.getElementById('nombreProducto')
        let precioProducto = templateCarritoContenido.getElementById('precioProducto')
        let botonPlus = templateCarritoContenido.getElementById('botonPlus')
        let botonMinus = templateCarritoContenido.getElementById('botonMinus')
        botonPlus.dataset.id = producto.id
        botonMinus.dataset.id = producto.id
        cantidadProducto.dataset.id = producto.id
        idProducto.textContent = producto.id
        cantidadProducto.textContent = producto.cantidad
        nombreProducto.textContent = producto.nombre
        precioProducto.textContent = `$ ${producto.precio * producto.cantidad}`

        const clone = templateCarritoContenido.cloneNode(true)
        fragmentCarro.appendChild(clone)
    })

    contenedorCarro.appendChild(fragmentCarro)

}