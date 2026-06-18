async function loadGames()
{
    try
    {
        const response = await fetch("data/games.json");

        const games = await response.json();

        const grid = document.getElementById("games-grid");

        games.forEach(game =>
        {
            const card = document.createElement("div");

            card.className = "game-card";

            card.innerHTML = `
                <img
                    src="${game.logo}"
                    alt="${game.title}"
                    class="game-logo">

                <div class="game-content">

                    <h2 class="game-title">
                        ${game.title}
                    </h2>

                    <div class="game-genre">
                        ${game.genre}
                    </div>

                    <a
                        href="${game.url}"
                        class="launch-btn">
                        LAUNCH GAME
                    </a>

                </div>
            `;

            grid.appendChild(card);
        });
    }
    catch(error)
    {
        console.error(error);

        document.getElementById("games-grid").innerHTML =
        `
            <div style="
                color:#ff6b6b;
                font-size:1.2rem;
                text-align:center;
                width:100%;
            ">
                Failed to load games.json
            </div>
        `;
    }
}

loadGames();