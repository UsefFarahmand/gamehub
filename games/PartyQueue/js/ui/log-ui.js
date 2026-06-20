export function renderLog(gameState){

    const log =
        document.getElementById(
            "logEntries"
        );

    if(!log) return;

    log.innerHTML = "";

    gameState.logs.forEach(entry=>{

        const div =
            document.createElement("div");

        div.className =
            "log-entry";

        div.textContent =
            entry;

        log.appendChild(div);

    });
}