const tipo = document.getElementById('tipo');
const descripcion = document.getElementById('descripcion');
const categoria = document.getElementById('categoria');
const fecha = document.getElementById('fecha');
const monto = document.getElementById('monto');
const formFinanza = document.getElementById('formFinanza');
const transaccionList = document.getElementById('transaccionList');
const btnAgregarTransaccion = document.getElementById('btnAgregarTransaccion');
const cancelarTransaccion = document.getElementById('cancelarTransaccion');
const datosFinanzas = document.getElementById('datosFinanzas');

let editMode = false;
let editId = null;

let transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];

renderizarDatos();

cancelarTransaccion.hidden = true;

btnAgregarTransaccion.addEventListener('click', mostrarForm);

cancelarTransaccion.addEventListener('click', function () {
    cancelarTransaccion.hidden = true;
    formFinanza.hidden = true;
    datosFinanzas.hidden = false;
    btnAgregarTransaccion.hidden = false;

})

formFinanza.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();

    const transaccion = {
        id: Date.now(),
        tipo: tipo.value,
        descripcion: descripcion.value,
        categoria: categoria.value,
        fecha: fecha.value,
        monto: Number(monto.value)
    }

    if (editMode) {
        transacciones = transacciones.map(t => t.id === editId ? { ...transaccion, id: editId } : t)

        editMode = false;

        editId = null;
    } else {

        transacciones.push(transaccion)
    }

    localStorage.setItem('transacciones', JSON.stringify(transacciones))

    formFinanza.reset();

    ocultarForm();

    renderizarDatos();
}


function renderizarDatos() {

    transaccionList.innerHTML = '';

    transacciones.forEach(transaccion => {

        const trList = document.createElement('tr');

        const tdFecha = document.createElement('td');
        const tdDescripcion = document.createElement('td');
        const tdCategoria = document.createElement('td');
        const tdMonto = document.createElement('td');
        const tdAcciones = document.createElement('td');
        const btnEliminar = document.createElement('button');
        const btnEditar = document.createElement('button');

        tdMonto.classList.add('text-center');
        tdDescripcion.classList.add('text-left')
        btnEliminar.classList.add('btn', 'btn-eliminar');
        btnEditar.classList.add('btn', 'btn-editar');

        btnEditar.textContent = 'Editar'
        btnEliminar.textContent = 'Eliminar'

        tdFecha.textContent = transaccion.fecha;
        tdDescripcion.textContent = transaccion.descripcion
        tdCategoria.textContent = transaccion.categoria
        tdMonto.textContent = transaccion.monto

        tdAcciones.append(btnEliminar, btnEditar);

        trList.append(tdFecha, tdDescripcion, tdCategoria, tdMonto, tdAcciones)

        transaccionList.appendChild(trList);

        btnEditar.addEventListener('click', () => edtiarTransaccion(transaccion.id))

        btnEliminar.addEventListener('click', () => eliminarTransaccion(transaccion.id))

    });

}


function edtiarTransaccion(id) {

    cargarFormularioEdicion(id);
}

function eliminarTransaccion(id) {

    transacciones = transacciones.filter(t => t.id !== id)

    localStorage.setItem('transacciones', JSON.stringify(transacciones))

    renderizarDatos();
}


function cargarFormularioEdicion(id) {

    const transaccionEdit = transacciones.find(t => t.id === id)

    if (!transaccionEdit) return;

    tipo.value = transaccionEdit.tipo;
    descripcion.value = transaccionEdit.descripcion;
    monto.value = transaccionEdit.monto;
    fecha.value = transaccionEdit.fecha;
    categoria.value = transaccionEdit.categoria

    editMode = true;
    editId = id;

    mostrarForm();
}

function mostrarForm() {
    cancelarTransaccion.hidden = false;
    formFinanza.hidden = false;
    datosFinanzas.hidden = true;
    btnAgregarTransaccion.hidden = true;
}

function ocultarForm() {
    cancelarTransaccion.hidden = true;
    formFinanza.hidden = true;
    datosFinanzas.hidden = false;
    btnAgregarTransaccion.hidden = false;
}



