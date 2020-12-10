import { Human } from './human.js';


//EX 1  Avem un array de forma ["Love", "I", "Javascript"]...
let firstArray=["Love", "I", "Javascript"];
let firstElem=firstArray.shift();
let secondElem=firstArray.shift();
firstArray.unshift(secondElem,firstElem);
console.log(firstArray);

//EX 2 Avem un array de forma ["Paul", 1, false, { name: "Jon Snow"}, [1, 2, 3], null, undefined, function() { console.log('Test')} ]

let secondArray=["Paul", 1, false, { name: "Jon Snow"}, [1, 2, 3], null, undefined, function() { console.log('Test')} ];
for(let i=0;i<secondArray.length;i++){
    console.log("Pozitia este " +i+",valoarea este "+ secondArray[i]+",iar tipul este "+typeof(secondArray[i]));
}


//EX 3. Mișcarea player-ului Mario cu tastele W, A, S, D. 
//+
//EX 4. Adăugați condiții la mișcarea player-ului astfel incat acesta sa nu poată ieși din chenar.

const canvas =  document.getElementById("canvasId");
/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext('2d');


const geoerge = new Image();
geoerge.src = 'assets/george.png'
const GEORGE_WIDTH = 40;
const GEORGE_HEIGHT = 45;
let georgeX = 100;
let georgeY = 100;
geoerge.onload = () => {
    context.drawImage(geoerge, 0 * GEORGE_WIDTH, 0 * GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT, 100, 100, GEORGE_WIDTH, GEORGE_HEIGHT)
}

const mario = new Image();
mario.src = 'assets/mario.png'
const MARIO_WIDTH = 32;
const MARIO_HEIGHT = 39;
let marioX=0;
let marioY=0;
mario.onload = () => {
    context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, 0, 0, MARIO_WIDTH, MARIO_HEIGHT)
}

// const button = document.getElementById("myButton");
// button.addEventListener("click", function() {
//     console.log(this);
//     context.fillStyle = "green";
//     context.fillRect(480, 20, 40, 20);
// });

document.addEventListener("keydown", function(event) {
    context.clearRect(0, 0, 600, 400);
    switch(event.key) {
        case 'ArrowUp': {
            if(georgeY + 10 > 0) georgeY -= 10;
            break;
        }
        case 'ArrowDown': {
            if(georgeY < 400-GEORGE_HEIGHT) georgeY += 10;
            break;
        }
        case 'ArrowLeft': {
            if(georgeX + 10 > 0) georgeX -= 10;
            break;
        }
        case 'ArrowRight': {
            if(georgeX < 600-GEORGE_WIDTH) georgeX += 10;
            break;
        }
        case 'a' || 'A': {
            if(marioX> 0) marioX -= 10;
            break;
        }
        case 'w' || 'W': {
            if(marioY > 0) marioY -= 10;
            break;
        }
        case 'd' || 'D': {
            if(marioX < 600-MARIO_WIDTH) marioX += 10;
            break;
        }
        case 's' || 's': {
            if(marioY < 400-MARIO_HEIGHT) marioY += 10;
            break;
        }
    }
    
    context.drawImage(mario, 0 * MARIO_WIDTH, 0 * MARIO_HEIGHT, MARIO_WIDTH, MARIO_HEIGHT, marioX, marioY, MARIO_WIDTH, MARIO_HEIGHT);
    context.drawImage(geoerge, 0 * GEORGE_WIDTH, 0 * GEORGE_HEIGHT, GEORGE_WIDTH, GEORGE_HEIGHT, georgeX, georgeY, GEORGE_WIDTH, GEORGE_HEIGHT)
});

//EX 5 adăugați un element canvas și un buton, la apăsarea butonului, trebuie să apară un pătrat colorat la coordonate random de pe canvas

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

const button = document.getElementById("myButton");
button.addEventListener("click", function() {
    //console.log(this);
    context.fillStyle = "green";
    context.fillRect(getRandomArbitrary(0,600-40), getRandomArbitrary(0,400-40), 40, 40);
});

// EX 6 Implementați o clasă cu cel puțin cinci atribute și trei metode. Creați 3 instanțe diferite și apelați metodele respective.

let p1 = new Human("Joe",45,100);
let p2 = new Human("Elsa",22,140);
let p3 = new Human("Heman",70,160);

p1.IQ=40;
p2.IQ=70;
p1.canSing();
p2.canWritePoemsSing(true);  // aici tine seama si de IQ;a se vedea implementarea acestei metode in clasa
p3.canWritePoemsSing(true);

