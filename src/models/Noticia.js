const { Schema, model } = require("mongoose");

const Noticia = new Schema({
    id_usuario: {
        type: String,
        required: true
    },
    categoria: {//(value>=1)
        type: Number,
        required: true,
    },
    nombre: {
        type: String,
        required: true
    },
    resumen: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    visible: {//(value>=1) and [1 = visble, 2 = no visible]
        type: Number,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    }
});

module.exports = model('Noticia', Noticia);