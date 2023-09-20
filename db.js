const Pool = require('pg').Pool

const pool = new Pool({
    // connectionString: `postgres://admin:hI42yMX9vsDZ3Vc2RWv4KARPMKWJnjCE@dpg-cjjfe6mphtvs73em0mng-a.oregon-postgres.render.com/orioncrmdb `
    user: 'postgres',
    host: 'localhost',
    database: 'neworioncrm',
    password: 'OrionLabs666999$$',
    port: 5432
})

module.exports = pool