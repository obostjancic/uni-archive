/**
 * Created by Javelin on 4.2.2017.
 */
var Pool = require('pg').Pool;
var pool = new Pool({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    database: 'postgres',
    max: 10, // max number of clients in pool
    idleTimeoutMillis: 1000, // close & remove clients which have been idle > 1 second
});

module.exports = pool;