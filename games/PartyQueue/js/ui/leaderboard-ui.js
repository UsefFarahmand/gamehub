export function renderLeaderboard(gameState){

    const container =
        document.getElementById("leaderboardRows");

    container.innerHTML = "";

    for(let i=0;i<gameState.players.length;i++){

        const p = gameState.players[i];

        const score =
            p.party.reduce((sum,c)=>sum + c.power, 0);

        const row = document.createElement("div");
        row.className = "leaderboard-row";
        row.dataset.player = p.id;

        row.innerHTML = `
            <div>${p.name}</div>
            <div>${score}</div>
        `;

        container.appendChild(row);
    }
}