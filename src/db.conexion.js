const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const conexionDB = async () => {
    try {
        const DB = await mongoose.connect('mongodb://localhost:27017/heraldo', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conexion establecida con la DB:', DB.connection.name);
    } catch (error) {
        console.log('Error de conexion con la DB:', error);
    }
}

module.exports = conexionDB;
