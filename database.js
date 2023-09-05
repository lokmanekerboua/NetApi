const {Client} = require('pg');
// const connectString = new Client("postgres://net_w1yi_user:1Tr1v7mbn2sRKiyCtKwFQJvYi5jQbBYr@dpg-ch5gfabh4hsvr4co5m30-a.oregon-postgres.render.com/net_w1yi?ssl:true")

const connectString = new Client({
    connectionString: "postgres://net_rrch_user:RQHHmSKkt9v2xsvWWBSK9mG0eSxv74fM@dpg-cjrgurgjbais739m3v4g-a/net_rrch",
    ssl: {
      rejectUnauthorized: false
    }
  });

const client = new Client(connectString)

module.exports = client
