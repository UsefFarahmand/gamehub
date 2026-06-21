export function renderLog(gameState){

    const log =
        document.getElementById(
            "logEntries"
        );

    if(!log) return;

    log.innerHTML = "";

    gameState.logs.forEach(entry => {

        const row =
            document.createElement("div");

        row.className =
            `log-entry ${entry.playerId}`;

        row.innerHTML = `
            <span class="player-name">
                ${entry.playerName}
            </span>
            ${entry.text}
        `;

        log.appendChild(row);

    });
}