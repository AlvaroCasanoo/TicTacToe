let casillas= document.getElementsByClassName("casilla");

let combinacionesGanadoras=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,4,8],
[2,4,6],
[0,3,6],
[1,4,7],
[2,5,8]

];

for (let i = 0; index < casillas.length; i++) {
    console.log("La casilla numero " + i + " contiene: " + casillas[i].innerHTML)
    
}
