const cards = document.getElementById ("cards")
const items = document.getElementById ("items")
const footer = document.getElementById ("footer")
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById("template-footer").content
const templateCarrito = document.getElementById("template-carrito").content
const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    if (localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
        pintarCarrito()
    }
})
cards.addEventListener("click", e => {
    addCarrito(e)
})
items.addEventListener("click", e => {
    btnAccion(e)
})


const fetchData = async () => {
    try {
        const res = await fetch ('./productos.json')
        const data = await res.json ()
        //console.log (data)
        pintarCard(data)

    } catch (error) {
        console.log (error)
    }
}

const pintarCard= data =>{
    data.forEach(producto =>{
        templateCard.querySelector("h5").textContent = producto.title
        templateCard.querySelector("p").textContent = producto.precio
        templateCard.querySelector("img").setAttribute("src", producto.thumbnailUrl)
        templateCard.querySelector(".btn-dark").dataset.id = producto.id


        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

//compra
const addCarrito = e => {
    //console.log (e.target)
    //console.log(e.target.classList.contains("btn-dark"))
    if (e.target.classList.contains("btn-dark")){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    //console.log(objeto)
    const producto = {
        id: objeto.querySelector(".btn-dark").dataset.id,
        title: objeto.querySelector("h5").textContent,
        precio: objeto.querySelector("p").textContent,
        cantidad: 3
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito [producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto}

}

const pintarCarrito = () => {
    //console.log(carrito)
    items.innerHTML = ""
    Object.values(carrito).forEach(producto =>{
        templateCarrito.querySelector("th").textContent = producto.id
        templateCarrito.querySelectorAll("td") [0].textContent = producto.title
        templateCarrito.querySelectorAll("td") [1].textContent = producto.cantidad
        templateCarrito.querySelector(".btn-info").dataset.id = producto.id
        templateCarrito.querySelector(".btn-danger").dataset.id = producto.id
        templateCarrito.querySelector("span").textContent = producto.cantidad * producto.precio

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()
}
const pintarFooter = () => {
    footer.innerHTML=""
    if(Object.keys(carrito).length===0){
        footer.innerHTML= `<th scope="row" colspan="5">Carrito vacío con innerHTML</th>`
        return
    }
    const nCantidad = Object.values(carrito).reduce((acc, {cantidad})=> acc + cantidad,0)
    const nPrecio = Object.values(carrito). reduce((acc,{cantidad,precio}) => acc + cantidad * precio,0)
    console.log(nPrecio)

    templateFooter.querySelectorAll("td")[0].textContent= nCantidad
    templateFooter.querySelector("span").textContent=nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    //limpiar carrito
    const btnVaciar = document.getElementById("vaciar-carrito")
    btnVaciar.addEventListener("click", () =>{
        carrito={}
        pintarCarrito()
    })
}

const btnAccion = e =>{
    console.log(e.target)
    //aumentar en el carrito
    if(e.target.classList.contains("btn-info")){
        console.log(carrito [e.target.dataset.id])
        const producto = carrito [e.target.dataset.id]
        producto.cantidad = carrito [e.target.dataset.id].cantidad+1
        carrito [e.target.dataset.id] = {...producto}
        pintarCarrito()
    }
    //restar en el carrito
    if(e.target.classList.contains("btn-danger")){
        const producto = carrito [e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0){
            delete carrito [e.target.dataset.id]
            
        }
        pintarCarrito()
    }
    e.stopPropagation()
}
//viejo
/*const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []

Clickbutton.forEach(btn => {
  btn.addEventListener('click', addToCarritoItem)
})

//carrito
function addToCarritoItem(e){
  const button = e.target
  const item = button.closest('.card')
  const itemTitle = item.querySelector('.card-title').textContent;
  const itemPrice = item.querySelector('.precio').textContent;
  const itemImg = item.querySelector('.card-img-top').src;
  
  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
  }

  addItemCarrito(newItem)
}


function addItemCarrito(newItem){

  const alert = document.querySelector('.alert')

  setTimeout( function(){
    alert.classList.add('hide')
  }, 2000)
    alert.classList.remove('hide')

  const InputElemnto = tbody.getElementsByClassName('input__elemento')
  for(let i =0; i < carrito.length ; i++){
    if(carrito[i].title.trim() === newItem.title.trim()){
      carrito[i].cantidad ++;
      const inputValue = InputElemnto[i]
      inputValue.value++;
      CarritoTotal()
      return null;
    }
  }
  
  carrito.push(newItem)
  
  renderCarrito()
} 


function renderCarrito(){
  tbody.innerHTML = ''
  carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
  })
  CarritoTotal()
}

function CarritoTotal(){
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''))
    Total = Total + precio*item.cantidad
  })

  itemCartTotal.innerHTML = `Total $${Total}`
  addLocalStorage()
}

function removeItemCarrito(e){
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for(let i=0; i<carrito.length ; i++){

    if(carrito[i].title.trim() === title.trim()){
      carrito.splice(i, 1)
    }
  }

  const alert = document.querySelector('.remove')

  setTimeout( function(){
    alert.classList.add('remove')
  }, 2000)
    alert.classList.remove('remove')

  tr.remove()
  CarritoTotal()
}

function sumaCantidad(e){
  const sumaInput  = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if(item.title.trim() === title){
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal()
    }
  })
}

function addLocalStorage(){
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if(storage){
    carrito = storage;
    renderCarrito()
  }
}*/