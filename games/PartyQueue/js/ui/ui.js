import { 
    renderGame 
}
from "./game-ui.js";

import {
    renderLeaderboard
}
from "./leaderboard-ui.js";

import {
    renderLog
}
from "./log-ui.js";

import {
    syncMobilePanels
}
from "./mobile-ui.js";


export function updateUI(gameState){

    renderGame(gameState);

    renderLeaderboard(gameState);

    renderLog(gameState);

    syncMobilePanels();
}