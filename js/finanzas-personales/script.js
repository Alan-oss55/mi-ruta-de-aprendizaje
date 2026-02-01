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

    const montoReal = Number(
        monto.value
        .replace(/\./g, '') // quitar separadores de miles
        .replace(',', '.')  // convertir decimal
    );

    const transaccion = {
        id: Date.now(),
        tipo: tipo.value,
        descripcion: descripcion.value,
        categoria: categoria.value,
        fecha: fecha.value,
        monto: montoReal
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
        tdMonto.textContent = Number(transaccion.monto).toFixed(2)

        tdAcciones.append(btnEliminar, btnEditar);

        trList.append(tdFecha, tdDescripcion, tdCategoria, tdMonto, tdAcciones)

        transaccionList.appendChild(trList);
        
        btnEditar.addEventListener('click', () => edtiarTransaccion(transaccion.id))
        
        btnEliminar.addEventListener('click', () => eliminarTransaccion(transaccion.id))
        
    });

    if( transacciones.length > 0 ){
        mostrarResumen() ;
    }else{
        ocultarResumen();
    }
    
}




tipo.addEventListener('change', mostrarCategorias)


function mostrarCategorias(){

    categoria.innerHTML = '' ;

    const categoriasPorTipo = {
        ingreso: ['Salario', 'Venta', 'Regalo', 'Otro'],
        egreso: ['Comida', 'Transporte', 'Alquiler', 'Ocio']
    };

    const categorias = categoriasPorTipo[tipo.value]

    categorias.forEach( cat =>{

        const option = document.createElement('option')

        option.value = cat.toLowerCase();
        option.textContent = cat

        categoria.appendChild(option)
    })

    
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
    monto.value = Number(transaccionEdit.monto).toFixed(2);
    fecha.value = transaccionEdit.fecha;
    mostrarCategorias(); // ← CLAVE
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



monto.addEventListener('input', () => {
  let valor = monto.value;

  // 1. Permitir solo números y coma
  valor = valor.replace(/[^0-9,]/g, '');

  // 2. Separar por coma
  let partes = valor.split(',');

  // 3. Si hay más de una coma, quedarse con la primera
  if (partes.length > 2) {
    partes = [partes[0], partes[1]];
  }

  let entero = partes[0];
  let decimal = partes[1] || '';

  // 4. Formatear miles
  entero = entero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // 5. Limitar decimales a 2
  decimal = decimal.slice(0, 2);

  // 6. Reconstruir valor
  monto.value = decimal !== ''
    ? `${entero},${decimal}`
    : entero;
});



function mostrarResumen(){

    const resumen = document.getElementById('resumen');
    const totalIngreso = document.getElementById('totalIngreso')
    const totalEgreso = document.getElementById('totalEgreso')
    const balanceFinal = document.getElementById('balanceFinal')

    resumen.hidden = false ;

    let sumIngresos = 0 ;
    let sumEgresos = 0 ;
    
    

    transacciones.forEach( tr => {

        const montotr = Number( tr.monto );

        if ( tr.tipo.toLowerCase() == 'ingreso'){

            sumIngresos += montotr ;
        }
        if ( tr.tipo.toLowerCase() == 'egreso'){

            sumEgresos += montotr ;
        }


    })

    const balance =  sumIngresos - sumEgresos;


    totalIngreso.textContent = sumIngresos.toLocaleString('es-ES', {
        minimumFractionDigits: 2
    });

    totalEgreso.textContent = sumEgresos.toLocaleString('es-ES', {
        minimumFractionDigits: 2
    });

    balanceFinal.textContent = balance.toLocaleString('es-ES', {
        minimumFractionDigits: 2
    });

    
}


function ocultarResumen(){

    const resumen = document.getElementById('resumen');

    resumen.hidden = true ;
}







