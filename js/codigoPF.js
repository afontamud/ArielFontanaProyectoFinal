
let carrito=[];
if(localStorage.getItem("carrito")!=null){
    carrito=JSON.parse(localStorage.getItem("carrito"));
}
let lista=document.getElementById("milista");

//renderizar
renderizarProductos();

function renderizarProductos(){
    for (const producto of productos){
        lista.innerHTML+=`<li class="col-sm-3 list-group-item">
        <img src=${producto.foto} width="250" height="250">
        <p> Producto: ${producto.nombre}</p>
        <p><strong> $ ${producto.precio} </strong></p>
        <button class='btn btn-info' id='btn${producto.id}'>Comprar</button>
        </li>`;
    }

    productos.forEach(producto => {
        document.getElementById(`btn${producto.id}`).addEventListener("click", function(){
            agregarAlCarrito(producto);
        });
    });
} 

function agregarAlCarrito(productoNuevo){
    carrito.push(productoNuevo);
    console.log(carrito);
    Toastify({
        text: "Producto: "+productoNuevo.nombre+" "+"agregado al carro",
        className: "info",
        style: {
          background: "linear-gradient(to right,#24c78f)",
        }
      }).showToast();

    //alert("Producto: "+productoNuevo.nombre+" "+"agregado al carro");
    document.getElementById("tablabody").innerHTML+=`
        <tr>
            <td>${productoNuevo.id}</td>
            <td>${productoNuevo.nombre}</td>
            <td>${productoNuevo.precio}</td>
        </tr>
    `;
    localStorage.setItem("carrito",JSON.stringify (carrito));
}