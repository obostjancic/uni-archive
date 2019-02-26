/**
 * Created by Javelin on 16.3.2017.
 */

var pool = require('../config-postgreSQL');
var util = require('../helpers/util');

function pokemon() {
    var $this = this;
    this.user = this.name = this.customName = "";
    this.id = this.x = this.y = this.pokemontypeid = 0;

    // gets all pokemons that user has
    this.getByUser = function (success, error){
        pool.query('select pokemontype.name, playerpokemon.customname from pokemontype INNER JOIN ' +
            'playerpokemon on pokemontype.id = playerpokemon.pokemontypeid where username=$1', [$this.user], function(err, result) {
            if (err){
                error(err);
            }
            else {
                success(result.rows);
            }
        });
    };

    this.getById = function (success, error) {
        pool.query('select * from pokemontype where id=$1', [$this.id], function(err, result) {
            if (err){
                error(err);
            }
            else {
                success(result.rows[0]);
            }
        });
    };

    this.catch = function (success, error) {
        //check if requested pokemon is still "valid", then get his catchchance and pokemontypeid
        pool.query('select * from pokemontype where id=(select pokemontypeid from sentpokemons where id=$1 and expiretimestamp > localtimestamp)', [$this.id], function (err, result) {
            if (err) {
                error(err);
            }
            else {
                //try to catch pokemon
                if (Math.random() >= result.rows[0].catchchance) {
                    //caught
                    pool.query('insert into playerpokemon values($1,$2)', [$this.user, result.rows[0].id], function (err) {
                        if (err){
                            error(err);
                        }
                        else {
                            success({
                                caught: true,
                                name: result.rows[0].name,
                                pokemontypeid: result.rows[0].pokemontypeid
                            });
                        }
                    });
                }
                //not caught
                else {
                    success({caught: false});
                }
            }
        });
    };

    this.spawn = function (userLocation, success, error) {
        pool.query('select * from pokemontype order by id asc', function (err, result) {
            var generatedPokemon = util.generatePokemon(userLocation, result.rows);
            pool.query("insert into sentpokemons (pokemontypeid, lat, lon, expired, expiretimestamp) " +
                "values($1, $2, $3, $4, CURRENT_TIMESTAMP + interval '10 minutes') returning id", [generatedPokemon.id, generatedPokemon.lat, generatedPokemon.lng, false], function (err, result2) {
                if (err) {
                    error(err);
                }
                else {
                    success({
                        sentpokemonsid: result2.rows[0].id,
                        pokemon: generatedPokemon
                    });
                }
            });
        });
    };

    this.giveCustomName = function (success, error) {
        pool.query('update playerpokemon set customname=$1 where username=$2 and pokemontypeid=$3',
            [$this.customName, $this.user, $this.pokemontypeid], function(err, result){
            if (err){
                error(err);
            }
            else {
                success();
            }
        });
    }
}


module.exports = pokemon;

