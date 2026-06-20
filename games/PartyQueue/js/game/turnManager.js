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

import {
    resolveRemainingQueue
}
from "./queueManager.js";

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

    setTimeout(async ()=>{

        const index =
            getRandomCardIndex(player);

        await playCard(
            player,
            index,
            gameState
        );

    },1000);

}


function wait(ms){

    return new Promise(
        resolve => setTimeout(resolve, ms)
    );

}

export async function playCard(
    player,
    index,
    gameState
){

    const card =
        player.hand.splice(index, 1)[0];



    // ورود به صف
    addToQueue(
        card,
        gameState
    );

    updateUI(gameState);

    await wait(800);



    // اجرای قدرت
    logQueue(
        gameState,
        "BEFORE:"
    );

    resolveAbility(
        card,
        gameState
    );

    logQueue(
        gameState,
        "AFTER:"
    );

    updateUI(gameState);

    await wait(1000);



    // فقط اگر هنوز 5 کارت یا بیشتر در صف بود
    if(gameState.queue.length >= 5){

        resolveQueue(gameState);

        updateUI(gameState);

        await wait(1200);

    }



    // کشیدن کارت جدید
    drawCard(player);

    updateUI(gameState);

    await wait(300);



    // پایان بازی؟
    if(isGameOver(gameState)){

        resolveRemainingQueue(
            gameState
        );

        updateUI(gameState);

        finishGame(
            gameState
        );

        return;

    }



    // نوبت بعد
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

