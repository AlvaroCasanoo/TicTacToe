
let contadorTablas = 0;
let win = false;/*    -> (win) cambiará de valor cuando se compruebe que un jugador ha ganado*/
//Declaro los array en los que empujaré las combinaciones de cada ususario
let combinacionX = [], combinacionO = [],
    turno = true/*     -> (turno) Cambiará entre true y false de manera constante para cambiar el turno de los usuarios */
    , div/*              -> (div) En ella albergaremos las casillas del tablero */
    , ganador = ""/*     -> (ganador) Cuando haya un ganador, esta variable tomará el valor de "X" o "O", se utilizará para actualizar el contador 
                       de victorias */
    , contadorX = 0,
    contadorO = 0,/*     ->(contador X/O) Se usarán para sumar uno al valor del contador de victorias de cada usuario */
    estaPintada = true/* ->(estaPintada) Cambiara de valor cuando una casilla del tablero no esté pintada(usada en 
                            función"casillasLlenas")*/;



/**
 * Todas las casillas tienen la clase .casilla
 * Almacenamos todas las casillas, es decir, todos los divs que tienen clase 'casilla'
 * En total tenemos 9 casillas que van desde la 0 hasta la 8
 */
const casillas = document.getElementsByClassName("casilla");

/**
 * Creamos un array con arrays que contienen todas las combinaciones ganadoras
 * 
 * [0] => [0, 1, 2]
 * [1] => [3, 4, 5]
 * ...
 */
let combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];



//FUNCION PARA AGREGAR FICHA
function agregarFicha(numero) {
    //Creo el div a partir de las casillas de mi html
    div = document.getElementsByClassName('casilla')[numero];
    console.log('Has hecho un click en la casilla ' + numero)
    //El booleano turno cambiara entre true y false continuamente
    if (turno) {
        //Evoco el id que guarda el contador de turnos entre "X" e "0" dentro del turno 
        document.getElementById("turnos");
        //Escribo sobre el el turno que corresponde
        turnos.innerHTML = "Turno de: O";
        turnos.style.padding = "20px";
        div.style.backgroundColor = 'grey';
        div.style.color = 'white';
        //Recogo el valor de la casilla que el usuario ha pulsado y le escribo una "X"
        casillas[numero].innerHTML = 'X';
        console.log(numero)
        //Al realizar un push lo que hago es introducir en el array, el numero de la posicion de la casilla
        combinacionX.push(numero);
        //Al cambiar a false, se ejecutara el else, que es el turno del rival
        turno = false;
        //Elimino el evento "onclick" de la casilla pulsada para que quede estática y no se pueda volver a clickar sobre ella
        casillas[numero].removeAttribute('onclick');
        /*Una vez tengo un array con las posiciones que contienen una 'X',
        me interesa poder comparar si en el contenido de 'combinacionX' esta incluido
        alguna de las combinaciones de 'combinacionesGanadoras'.*/

        if (combinacionX.length >= 3) {
            //Cuando se hayan marcado al menos tres casillas, la funcion que comprueba si ha ganado entrará en juego cada vez que pulse una 
            //casilla
            //COMPROBACIÓN GANAN LAS "X"
            hayGanadorX();
            
        } 
         casillasLlenas();
        
    } else {
        //El mismo procedimiento anterior pero con las "O"
        document.getElementById("turnos");
        turnos.innerHTML = "Turno de: X";
        turnos.style.padding = "20px";
        div.style.backgroundColor = 'orange';
        div.style.color = 'black';
        casillas[numero].innerHTML = 'O';
        combinacionO.push(numero);
        turno = true;
        casillas[numero].removeAttribute('onclick');
        if (combinacionO.length >= 3) {
            //COMPROBACIÓN GANAN LAS "O"
            hayGanadorO()
        }  
        casillasLlenas();
    }

}



//FUNCIÓN QUE COMPRUEBA LAS COMBINACIONES DE "X"
function hayGanadorX() {
   win=false;
   let i = 0;/*              -> (i) recoorerá de uno en uno los arrays de las combinacionesGanadoras */

        //Mensaje de aviso para asegurarnos que la función se está ejecutando
        console.log("Entro en funcion HayGanador");
    do {
        const combinacion = combinacionesGanadoras[i];/*   -> (combinaacion) la constante combinación toma el valor de cada numero que
                                                                  contiene cada iteración de los arrays de "combinacionesGanadoras"*/
        let contador = 0;/*                                -> (contador) hará un recuento de las veces que se encuentren valores 
                                                                  idénticos entre las combinaciones ganadoras y los arrays con combinaciones
                                                                  de usuarios*/

        //Recorremos con un bucle for las posiciones de cada array de "combinacionesGanadoras"
        for (let j = 0; j < combinacion.length; j++) {
            /*
            Validamos si el array de "combinacionX tiene el mismo valor que el primer numero del primer array de "combinacionesGanadoras",
            si es así, el contador sumará en uno su valor, la j valdrá 1 y procederemos a comprobar el segundo valor de "combinacionX con
            el segundo numero del primer array de "combinacionesGanadoras", si no encuentra tres valores identicos entre "combinaciónX y
            el primer array de "combinacionesGanadoras", la i sumará en uno su valor y el programa procederá a hacer las mismas 
            comprobaciones anteriores pero en este caso entre el array "combinacionX" Y el segundo array de "combinacionesGanadoras"
             */
            if (combinacionX.includes(combinacion[j])) {
                contador++;
            }
        }
        /*
        Si el contador vale 3, significa qeu el programa ha encontrado tres valores idénticos entre "combinacionX y algún array de 
        "combianconesGanadoras", en ese caso, ese usuario habría ganado la partida
        */
        if (contador >= 3) {
            //El booleano "win" pasará a ser true ya que el programa ha comprobado que "combinacionX", posee una combinacion ganadora
            win = true;
        }
        i++;
        /*
        El programa ejecutara lo anterior mientras que el booleano "win" no cambie su valor y no superemos la longuitud de 
        "combinacionesGanadoras", ya que no existirian
        */
    } while (!win && i < combinacionesGanadoras.length);
    // En el momento que win cambie su valor a true, la alerta del ganador saltará en pantalla
    if (win) {
        alert("¡¡Oooops, lo siento O, han ganado las X!!");
        ganador = "X";
        actualizarContador();

    }
    

}




function hayGanadorO() {
    win=false;
    let i = 0;/*              -> (i) recorrerá de uno en uno los arrays de las combinacionesGanadoras */

        console.log("Entro en funcion HayGanador");
    do {
        const combinacion = combinacionesGanadoras[i];/*   -> (combinaacion) la constante combinación toma el valor de cada numero que
                                                               contiene cada iteración de los arrays de "combinacionesGanadoras"*/
        let contador = 0;/*                                -> (contador) hará un recuento de las veces que se encuentren valores 
                                                               idénticos entre las combinaciones ganadoras y los arrays con combinaciones
                                                               de usuarios*/
        for (let j = 0; j < combinacion.length; j++) {
            if (combinacionO.includes(combinacion[j])) {
                contador++;
            }
        }
        if (contador >= 3) {
            win = true;
        }
        i++;
    } while (!win && i < combinacionesGanadoras.length);

    if (win) {
        alert("¡Oooops, lo siento X, han ganado las O!");
        ganador = "O";
        actualizarContador();
    }
   
    console.log(win);
    console.log("i = " + i);
    console.log(combinacionesGanadoras);

}

//FUNCION QUE REINICIA EL TABLERO
function reiniciarTablero() {
    //Recorro con un for todas las casillas del tablero
    for (let i = 0; i < casillas.length; i++) {
        //Iserto en cada casilla texto vacio, es decir, quito las "X" y las "O"
        casillas[i].innerHTML = "";
        //Quito a cada casilla el atributo de estilo que se las inserta con cada click
        casillas[i].removeAttribute("style");
        //Quito a cada casilla el atributo del evento "onclick"
        casillas[i].removeAttribute("onclick")
        //Vuelvo agregar a cada casilla el atributo "onclick" para que se vuelva a poder clickar sobre ellas 
        casillas[i].setAttribute("onclick", "agregarFicha(" + i + ")");
    }
    //Vacio tanto el array de "combinacionX" como el de "combinacionO" para qeu en la siguiente partida se vuelvan a insertar desde 0 todos 
    //los valores
    combinacionO = [];
    combinacionX = [];
}




//FUNCION QUE ACTUALIZA LOS CONTADORES DE VICTORIAS
function actualizarContador() {
    /*La variable ganador ha tomado forma en funcion del ususario ganador, ahora voy a comprobar quien ha sido y en funcion de eso actualizaré
    un marcador u otro*/
    if (ganador === "X") {
        //Si el ganador es "X", su contador pasará a valer uno
        contadorX++;
        /*Evoco al id que cobija el contador de "X" y le escribo "Ganadas X : + el valor 1" que habiamos aumentado antes, de esta forma,
        cada vez que las "X" ganen, su contador aumentara en uno sucesivamente*/
        document.getElementById("actualizarContadorX").textContent = "Ganadas X: " + contadorX;
        //Le aplico padding al div para que no se quede pequeño
        actualizarContadorX.style.padding = "20px";
        actualizarContadorX.style.paddingRight = "10px";
        actualizarContadorX.style.paddingLeft = "10px";
    } else {
        //Mismo procedimiento pero con las "O"
        contadorO++;
        document.getElementById("actualizarContadorO").textContent = "Ganadas O: " + contadorO;
        actualizarContadorO.style.padding = "20px";
        actualizarContadorO.style.paddingRight = "10px";
        actualizarContadorO.style.paddingLeft = "10px";
    }
}

//FUNCION QUE COMPRUEBA QUE TODAS LAS CASILLAS ESTAN LLENAS Y SI NO HAY NINGGUN GANADOR
//DECLARA LA PARTIDA COMO EMPATE
function casillasLlenas() {
    //Dejo los console.log de pruebas para que veas mi lógica de comprobación
    // console.log("Entro en casillasPintadas");
    //Realizo un for que recorra las casillas para comprobar si estan pintadas o no
    for (let k = 0; k < casillas.length; k++) {
        // console.log("entro en el for de casillasPintadas");
        // console.log("mi inner es :" + casillas[i].innerHTML);
        //Si la casilla de [i] no tiene contenido, el booleano "estaPintada" se convierte a false
        if (casillas[k].innerHTML == "") {
            // console.log("entro en el if de casillasPintadas");
            estaPintada = false;
            // console.log(estaPintada)
        }else{
            estaPintada=true; 
        }
       
        //Cuando el booleano "estaPintada" no se convierta a false, significaría que todas las casillas están pintadas
    }
    //Si todas las casillas están pintadas y el booleano "win" es false , la partida estaría empatada.
    //Pinto un alert de empate y actualizo el marcador de tablas
    if (estaPintada && !win) {
        alert("Empate!");
        actualizarTablas();
        
    }
}

function actualizarTablas() {
    // Actualiza el valor del contador de tablas
    contadorTablas++;
    // Actualiza el contador de tablas en el navegador
    document.getElementById("actualizarTablas").innerHTML = ("Tablas: " + contadorTablas);    
}






