const menu =
document.getElementById("menu");


const game =
document.querySelector(".game");


const start =
document.getElementById("start");


const exitHub =
document.getElementById("exitHub");


const exitGame =
document.getElementById("exitGame");


const board =
document.getElementById("board");


const movesText =
document.getElementById("moves");


const scoreText =
document.getElementById("score");




start.onclick=()=>{


menu.classList.add("hidden");

game.classList.remove("hidden");


startGame();


};



exitHub.onclick=()=>{


window.location.href="../../index.html";


};



exitGame.onclick=()=>{


window.location.href="index.html";


};





let cards=[];

let first=null;

let second=null;

let lock=false;

let moves=0;

let score=0;



const icons=[

"🐼",
"🎋",
"🍃",
"🥟",
"🐨",
"⭐",
"🍀",
"🎁"

];



function startGame(){


board.innerHTML="";


cards=[...icons,...icons];


cards.sort(()=>Math.random()-0.5);



moves=0;

score=0;


movesText.innerText=moves;

scoreText.innerText=score;



cards.forEach(icon=>{


let card=
document.createElement("div");


card.className="card";


card.dataset.icon=icon;


card.innerHTML="❓";



card.onclick=()=>flip(card);



board.appendChild(card);



});


}





function flip(card){


if(lock) return;


if(card.classList.contains("open")) return;



card.innerHTML=
card.dataset.icon;


card.classList.add("open");



if(!first){

first=card;

return;

}



second=card;


moves++;

movesText.innerText=moves;



check();



}




function check(){


if(first.dataset.icon===second.dataset.icon){



score+=10;


scoreText.innerText=score;



first=null;

second=null;


}

else{


lock=true;


setTimeout(()=>{


first.innerHTML="❓";

second.innerHTML="❓";


first.classList.remove("open");

second.classList.remove("open");



first=null;

second=null;


lock=false;


},800);


}


}