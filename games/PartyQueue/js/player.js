export class Player {

    constructor(id, name, type = "human") {

        this.id = id;
        this.name = name;

        this.type = type;

        this.deck = [];
        this.hand = [];
        this.party = [];
    }

}