const express = require("express");
const app = express();
const mariadb = require("./mariadb/db");

app.use(express.json());
app.use(express.static("."));

const port = 3000

const datos = require("./datos.json");

app.get("/devices", (req, res) => {
    mariadb.getConnection()
    .then( (conn) => {
        console.log("Conectado");
        conn.end();
    })
    .catch( (err) =>{
        console.error('Error al conectar: ' + err);
    });
    res.json(datos);
});

app.get("/devices/:id", (req, res) => {
    const datosFiltrados = datos.filter(item => item.id == req.params.id);
    res.json(datosFiltrados);
});

app.post("/devices", (req, res) => {
    let datosFiltrados = datos.filter(item => item.id == req.body.id);
    if (datosFiltrados.length > 0) {
        datosFiltrados[0].state = req.body.state;
    }
    res.json(datosFiltrados);
});

app.listen(port, () => {
    console.log(`API funcionando en el puerto ${port}`)
});