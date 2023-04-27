const {Client} = require('pg');

const client = new Client({
    host: 'localhost',
    user: "postgres",
    port: 5432,
    password: 'Lokmano9',
    database: 'net'
})

module.exports = client