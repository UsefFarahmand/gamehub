import {gameState} from "./game/gameState.js";

import {Player} from "./player.js";

import {createDeck,drawCard}
from "./game/deck.js";


import {
startTurn,
playCard
}
from "./game/turnManager.js";

import { updateUI }
from "./ui/ui.js";

import {
    initTutorial
}
from "./game/tutorial.js";

import {
    initMobileUI,
    initMobileTabs
}
from "./ui/mobile-ui.js";

const players=[

    new Player("p1","You"),

    new Player("p2","Bot 1"),

    new Player("p3","Bot 2"),

    new Player("p4","Bot 3")

];



gameState.players = players;



players.forEach(p=>{


    p.deck =
    createDeck(p);



    for(let i=0;i<4;i++)
        drawCard(p);


});



initMobileUI();

initMobileTabs();

updateUI(gameState);

initTutorial();

startTurn(gameState);