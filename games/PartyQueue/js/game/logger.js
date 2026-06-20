export function addLog(gameState, text){

    gameState.logs.unshift(text);

    if(gameState.logs.length > 50){

        gameState.logs.pop();
    }
}