const express = require('express');
const cors = require('cors');
const conexionDB = require('./db.conexion');
const app = express();
const appRoutes = require('./routes');

// Conexion a la DB
conexionDB();

// Config
app.set('port', process.env.PORT || 8000);
app.use(cors());

// Middleware
app.use(express.json());

// Rutas principales
app.get("/", function (req, res) {
    res.send("index");
});
app.use('/api', appRoutes);
app.use(function (req, res) {
    res.send("Error");
});

// Puerto de la app
const server = app.listen(app.get('port'), function () {
    console.log(`Puerto de la APP http://localhost:${server.address().port}`);
});