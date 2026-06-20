export function addToQueue(card, gameState){


    gameState.queue.push(card);


}



export function resolveQueue(gameState){


    if(gameState.queue.length < 5)
        return;



    const first =
        gameState.queue.shift();



    const second =
        gameState.queue.shift();



    const trash =
        gameState.queue.pop();



    first.owner.party.push(first);


    second.owner.party.push(second);


    gameState.trash.push(trash);


}



export function logQueue(gameState,title){

    console.log(
        title,
        gameState.queue
        .map(c=>c.name)
        .join(" > ")
    );

}