const mariadb = require("mariadb");
const pool = mariadb.createPool({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "smart_home",
    connectionLimit: 5
});

module.exports = pool;