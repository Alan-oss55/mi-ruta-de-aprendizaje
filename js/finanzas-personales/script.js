let tipo = document.getElementById('tipo');
let descripcion = document.getElementById('descripcion');
let categoria = document.getElementById('categoria');
let fecha = document.getElementById('fecha');
let monto = document.getElementById('monto');
let formFinanza = document.getElementById('formFinanza');

let transacciones = [] ;





formFinanza.addEventListener('submit', handleSubmit );

function handleSubmit(e){
    e.preventDefault();

    const transaccion = {
        id: Date.now(),
        tipo: tipo.value,
        descripcion: descripcion.value,
        categoria: categoria.value,
        fecha: fecha.value,
        monto: monto.value
    }

    console.log(`transaccion actual ${transaccion}`);
}