const {Client} = require('pg');
// const connectString = new Client("postgres://net_w1yi_user:1Tr1v7mbn2sRKiyCtKwFQJvYi5jQbBYr@dpg-ch5gfabh4hsvr4co5m30-a.oregon-postgres.render.com/net_w1yi?ssl:true")

const connectString = new Client({
    connectionString: "postgres://net_wc6i_user:av99lksKQM5Q1SnPTauMXA6kkWGWzzBx@dpg-cjrg20dhe99c73etttu0-a/net_wc6i",
    ssl: {
      rejectUnauthorized: false
    }
  });

const client = new Client(connectString)

module.exports = client
