const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mysql = require('mysql2/promise')


const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

require('dotenv').config();
const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
    DB_PORT,
} = process.env;

const dbConfig = {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
};

const pool = mysql.createPool(dbConfig);

(async() => {
    try {
        const connection = await pool.getConnection();

        console.log("db is connected")

        connection.release()
    } catch (error) {
        console.log(error);
    }
})();



app.get('/test', (req, res) => {
    res.status(200).json({ message: "hello world" });
});

app.listen(port, () => {
    console.log('server is running');
}).on('error', (err) => {
    console.log(err);
})