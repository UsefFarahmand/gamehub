import { resolveAbility }
from "../abilities/abilities.js";

import {
    addToQueue,
    resolveQueue,
    logQueue
}
from "./queueManager.js";

import { drawCard }
from "./deck.js";

import { updateUI }
from "../ui/ui.js";

import { getRandomCardIndex }
from "../ai/ai.js";

import {
    isGameOver,
    finishGame
}
from "./gameOver.js";

import { addLog }
from "./logger.js";

export function startTurn(gameState){

    const player =
        gameState.players[
            gameState.currentPlayer
        ];

    console.log(
        "START TURN:",
        player.name
    );
    if(player.id === "p1"){

        updateUI(gameState);

        return;
    }

    setTimeout(()=>{

        const index =
            getRandomCardIndex(player);

        playCard(
            player,
            index,
            gameState
        );

    },1000);

}

export function playCard(
    player,
    index,
    gameState
){

    const card =
        player.hand.splice(index,1)[0];



    addToQueue(
        card,
        gameState
    );



    logQueue(
        gameState,
        "BEFORE:"
    );

    setTimeout(()=>{

        resolveAbility(
            card,
            gameState
        );

        logQueue(
            gameState,
            "AFTER:"
        );

    },1000);

    

    addLog(
        gameState,
        `${player.name} played ${card.name}`
    );


    resolveQueue(gameState);

    if(gameState.queue.length === 2){

        addLog(
            gameState,
            "Queue resolved"
        );
    }

    drawCard(player);



    updateUI(gameState);



    nextTurn(gameState);

}



function nextTurn(gameState){

    if(
        isGameOver(gameState)
    ){

        finishGame(gameState);

        return;

    }

    gameState.currentPlayer++;

    if(
        gameState.currentPlayer >=
        gameState.players.length
    ){

        gameState.currentPlayer = 0;

        gameState.round++;

    }

    startTurn(gameState);

}

