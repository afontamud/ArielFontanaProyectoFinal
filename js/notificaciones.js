const config = {
    duration: 2000,
    newWindow: true,
    close: false,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    text: "mensaje",
    style:{
        background: "#3999",
            color:"#000",
    },
};

const exito = (mensaje) =>{
    if (!mensaje) return;
    Toastify({
        ...config,
        text: mensaje,
        style:{
            background: "#3999",
            color:"#000",
        },
    }).showToast();
};

const error=(mensaje) =>{
    if (!mensaje) return;
    Toastify({
        ...config,
        text: mensaje,
        style:{
            background: "#934",
            color:"#999",
        },
    }).showToast();
};