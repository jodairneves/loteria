const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const config = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: Number(process.env.PGPORT),
};
const pool = new Pool(config);

module.exports = pool;
