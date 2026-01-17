
const num1 = document.getElementById('numero1')
const num2 = document.getElementById('numero2')

const btnSum = document.getElementById('suma')
const btnLess = document.getElementById('resta')
const btnMult = document.getElementById('multiplicacion')
const btndiv = document.getElementById('division')

let resultado = document.getElementById('resultado')

let numeros  ;

function obtenerNumeros (){

    if ( num1.value === '' || num2.value === ''){

        resultado.value = "ingrese ambos numeros"
        return null
    }

    return {
        valor1: Number(num1.value),
        valor2 : Number( num2.value)
    }
}


btnSum.addEventListener( 'click', function(){

    numeros = obtenerNumeros();

    if ( !numeros){
        return null ;
    }

    resultado.value = numeros.valor1 + numeros.valor2
})

btnLess.addEventListener( 'click', function(){

    numeros = obtenerNumeros();

    if ( !numeros){
        return null ;
    }

    resultado.value = numeros.valor1 - numeros.valor2
})

btnMult.addEventListener( 'click', function(){
    numeros = obtenerNumeros();

    if ( !numeros){
        return null ;
    }

    resultado.value = numeros.valor1 * numeros.valor2
})

btndiv.addEventListener( 'click',function(){

    numeros = obtenerNumeros();

    if ( !numeros){
        return null ;
    }

    if ( numeros.valor2 <= 0 ){
        resultado.value = 'El dividendo no puede ser 0'
        return
    }


    resultado.value = numeros.valor1 / numeros.valor2
})