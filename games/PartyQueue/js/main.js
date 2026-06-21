import {gameState} from "./game/gameState.js";

import {Player} from "./player.js";

import {createDeck,drawCard}
from "./game/deck.js";


import {
startTurn,
playCard
}
from "./game/turnManager.js";

import { 
    updateUI,
    initializeUI 
}
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

import { PLAYER_TYPES } from "./constants/playerTypes.js";

const players=[

    new Player("p1","You",PLAYER_TYPES.HUMAN),

    new Player("p2","Bot 1",PLAYER_TYPES.AI),

    new Player("p3","Bot 2",PLAYER_TYPES.AI),

    new Player("p4","Bot 3",PLAYER_TYPES.AI)

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

initializeUI();
initTutorial();

startTurn(gameState);