export function showEndGame(gameState){

    const screen =
        document.getElementById(
            "endGameScreen"
        );

    const title =
        document.getElementById(
            "endGameTitle"
        );

    const text =
        document.getElementById(
            "endGameText"
        );

    const finalScores =
        document.getElementById(
            "finalScores"
        );

    const winner =
        gameState.winner;

    if(winner.id === "p1"){

        title.textContent =
            "🎉 You Win!";

        text.textContent =
            "Your party was the strongest.";

    }else{

        title.textContent =
            "💀 You Lose";

        text.textContent =
            `${winner.name} won the game.`;

    }

    const sortedPlayers =
        [...gameState.players]
        .sort((a,b)=>{

            const aPower =
                a.party.reduce(
                    (sum,c)=>sum+c.power,
                    0
                );

            const bPower =
                b.party.reduce(
                    (sum,c)=>sum+c.power,
                    0
                );

            if(
                b.party.length !==
                a.party.length
            ){

                return (
                    b.party.length -
                    a.party.length
                );

            }

            return bPower - aPower;

        });
        
    finalScores.innerHTML =
        `
        <div class="final-score-header">

            <span>Player</span>

            <span>Party</span>

            <span>Power</span>

        </div>
        `
        +
        sortedPlayers
            .map(player => {

                const power =
                    player.party.reduce(
                        (sum, card) =>
                            sum + card.power,
                        0
                    );

                return `
                    <div class="final-score-row">

                        <span class="player-name">
                            ${player.name}
                        </span>

                        <span class="party-count">
                            ${player.party.length}
                        </span>

                        <span class="power-score">
                            ${power}
                        </span>

                    </div>
                `;

            })
            .join("");

    screen.classList.remove(
        "hidden"
    );
}

export function hideEndGame(){

    document
        .getElementById("endGameScreen")
        .classList.add("hidden");

}