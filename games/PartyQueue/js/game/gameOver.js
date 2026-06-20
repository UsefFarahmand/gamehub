export function isGameOver(gameState){

    return gameState.players.every(
        player =>
            player.hand.length === 0 &&
            player.deck.length === 0
    );

}

export function finishGame(gameState){

    let winner = null;

    let bestPartyCount = -1;

    let bestPower = -1;


    gameState.players.forEach(player => {

        const partyCount =
            player.party.length;

        const powerSum =
            player.party.reduce(
                (sum, card) =>
                    sum + card.power,
                0
            );


        if(
            partyCount > bestPartyCount
        ){

            winner = player;

            bestPartyCount =
                partyCount;

            bestPower =
                powerSum;

        }
        else if(
            partyCount === bestPartyCount &&
            powerSum > bestPower
        ){

            winner = player;

            bestPower =
                powerSum;

        }

    });


    gameState.gameOver = true;

    gameState.winner = winner;

    console.log(
        "GAME OVER"
    );

    console.log(
        "Winner:",
        winner.name
    );

}