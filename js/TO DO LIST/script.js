const input = document.getElementById('nuevaTarea');
const btnNuevaTarea = document.getElementById('agregarTarea');
const listaTareas = document.getElementById('listaTareas');

let tareas = [] ;

const tareasGuardadas = localStorage.getItem('tareas')

if ( tareasGuardadas ){
    tareas = JSON.parse(tareasGuardadas)
}

renderizarTareas()

btnNuevaTarea.addEventListener('click', function(){

    if( input.value === '' ){ return ; }

    tareas.push({
        texto: input.value,
        completada: false
    }) ;

    guardarTareas()

    input.value = '' ;

    renderizarTareas();
})


function renderizarTareas(){

    listaTareas.innerHTML = '' ;

    tareas.forEach( ( tarea, index) => {

        const li = document.createElement('li');
        

        if ( tarea.completada){
            li.classList.add('completada')
        }

        const btnEliminar = document.createElement('button')
        btnEliminar.textContent = 'X';

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = tarea.completada

        const texto = document.createElement('span')
        texto.textContent = tarea.texto


        btnEliminar.addEventListener('click', function(){
            tareas.splice(index, 1)
            guardarTareas();
            renderizarTareas()
        })

        checkbox.addEventListener('change', function(){
            tarea.completada = checkbox.checked
            guardarTareas();
            renderizarTareas()
        })

        li.appendChild(checkbox)
        li.appendChild(texto)
        li.appendChild(btnEliminar)

        listaTareas.appendChild(li)

    })

}

function guardarTareas( ){
    localStorage.setItem('tareas', JSON.stringify(tareas));
}