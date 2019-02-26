/**
 * Created by Javelin on 16.3.2017.
 */

var pool = require('../config-postgreSQL');

function challenge() {
    var $this = this;
    this.sender = this.recipient = this.sendersocketid = this.recipientsocketid = this.response = this.player = "";
    this.dateofcreation = null;
    this.delivered = false;
    this.id = this.senderPokemontype = this.recipientPokemontype = 0;

    this.create = function (success, error) {
        pool.query('insert into challenges (sender,recipient,dateofcreation,delivered,response, sendersocketid)values($1,$2,localtimestamp, false, $3, $4) returning id',
            [$this.sender, $this.recipient, 'none', $this.sendersocketid], function(err, result){
            if (err) {
                console.log(err);
                error(err);
            }
            else {
                success(result.rows[0]);
            }
        });
    };

    this.getByRecipient = function (success, error) {
        pool.query('update challenges set delivered=true, recipientsocketid=$2 where delivered=false and recipient=$1 returning *',
            [$this.recipient, $this.recipientsocketid], function(err, result){
                if (err) {
                    error(err);
                }
                else {
                    success(result.rows);
                }
            });
    };

    this.getPlayersById = function (success, error) {
        pool.query("select sender, sendersocketid, recipient, recipientsocketid from challenges where id=$1", [$this.id], function (err, result) {
            if (err){
                console.log(err);
                error(err);
            }
            else {
                success(result.rows[0]);
            }
        })
    };

    this.accept = function (success, error) {
        pool.query('update challenges set response=$1 where id=$2', ['accept', $this.id], function(err, result){
            if (err) {
                error(err);
            }
            else {
                pool.query('select name, pokemontypeid from pokemontype INNER JOIN playerpokemon on pokemontype.id = playerpokemon.pokemontypeid ' +
                    'where playerpokemon.username=$1', [$this.recipient], function (err, result) {
                    if (err) {
                        error(err);
                    }
                    else {
                        success(result.rows);
                    }
                });
            }
        });
    };

    this.decline = function (success, error) {
        pool.query('update challenges set response=$1 where id=$2', ["decline", $this.id], function(err, result){
            if (err) {
                error(err);
            }
            else {
                success();
            }
        });
    };

    this.selectFighters = function (username, pokemontypeid, success, error) {
        pool.query('update challenges set ' +
                   'senderpokemontype =(case when sender=$1 then cast($2 as int) else senderpokemontype end), ' +
                   'recipientpokemontype =(case when recipient=$1 then cast($2 as int) else recipientpokemontype end) ' +
                   'where id=$3 returning *', [username, pokemontypeid, $this.id],
        function (err, result) {
            if (err) {
                console.log(err);
                error(err);
            }
            else {
                success(result.rows[0])
            }
        })
    };

    this.bothFightersChosen = function(success, error) {
        pool.query('select * from challenges where (senderpokemontype+recipientpokemontype)!=0 and id=$2', [$this.senderPokemontype, $this.id], function(err, result){
            if (err){
                error(err);
            }
            else if(result.rows.length == 0){
                success({startFight: false});
            }
            else {
                success({startFight: true});
            }
        });
    };
}

module.exports = challenge;