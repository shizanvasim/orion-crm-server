const Pool = require('pg').Pool

const pool = new Pool({
    // connectionString: `postgres://neworioncrm_user:kAraeqt8CXHp6IrEFiFpcFYWOOVWAWt9@dpg-ck59g0mg2bec73fhpt7g-a.oregon-postgres.render.com/neworioncrm `
    user: 'neworioncrm_user',
    host: 'dpg-ck59g0mg2bec73fhpt7g-a.oregon-postgres.render.com',
    database: 'neworioncrm',
    password: 'kAraeqt8CXHp6IrEFiFpcFYWOOVWAWt9',
    port: 5432,
    ssl: true
})

module.exports = pool