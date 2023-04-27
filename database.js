const {Client} = require('pg');

const client = new Client({
    host: 'postgres://net_w1yi_user:1Tr1v7mbn2sRKiyCtKwFQJvYi5jQbBYr@dpg-ch5gfabh4hsvr4co5m30-a/net_w1yi',
    user: "net_w1yi_user",
    port: 5432,
    password: '1Tr1v7mbn2sRKiyCtKwFQJvYi5jQbBYr',
    database: 'net_w1yi'
})

module.exports = client