/**
 * Created by Javelin on 29.3.2017.
 */

function fightLogic () {
    var $this = this;
    $this.getTurns = function (poke1, poke2){
        console.log(poke1.name);
        var turns = [];
        var currentTurn = poke1.id;
        while (poke1.hp > 0 && poke2.hp > 0){
            if (currentTurn == poke1.id){
                poke2.hp -= poke1.attack;
                currentTurn = poke2.id;
                turns.push({defender: "recipientPokemon" , damageDelivered: poke1.attack, poke1hp: poke1.hp, poke2hp: poke2.hp});
            }
            else {
                poke1.hp -= poke2.attack;
                currentTurn = poke1.id;
                turns.push({defender: "senderPokemon", damageDelivered: poke2.attack, poke1hp: poke1.hp, poke2hp: poke2.hp});
            }
        }
        if (poke1.hp == 0){
            return {winner: "right", turns: turns};
        }
        else {
            return {winner: "left", turns: turns};
        }

    }
}

module.exports = fightLogic;