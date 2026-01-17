const contador = document.getElementById('contador');

const restar = document.getElementById('restar')
const reset = document.getElementById('reset')
const aumentar = document.getElementById('aumentar')

let valorContador = 0 ;

contador.textContent = valorContador

restar.addEventListener('click', function(){

    valorContador-- 

    contador.textContent = valorContador;

})

reset.addEventListener( 'click', function(){
    
    valorContador = 0  

    contador.textContent = valorContador;
})

aumentar.addEventListener('click', function(){
     valorContador++ 

    contador.textContent = valorContador;

})