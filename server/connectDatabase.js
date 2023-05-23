const Pool = require('pg').Pool;

const pool = new Pool({

    user: 'postgres',
    password: 'Narbu36t',
    host: 'localhost',
    port: 5432,
    database: 'library'

})

module.exports = pool;