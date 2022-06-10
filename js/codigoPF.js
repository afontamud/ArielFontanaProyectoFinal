let producto = [];
let total = 0;
alert ("Aprovecha nuestros descuentos de estudiantes")
let nombreUsuario = prompt("Ingresa tu nombre")
let inicio = confirm( nombreUsuario + " Usted acepta terminos y condiciones")

function add(producto, precio, ) {
    console.log (producto, precio);
    total = total + precio;
    document.getElementById("comprar").innerHTML = `Pagar $${total}`;
}

function pay(){
    windows.alert(producto.join(", \n"));
}