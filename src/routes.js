const express = require('express');
const usuario_controller = require('./controllers/usuario.controller');
const noticia_controller = require('./controllers/noticia.controller');
const response = require('./shared/response');

const router = express.Router();

//Ruta para el crear usuario
router.post('/crear_usuario', function (req, res) {
    const { nombre, direccion, telefono, usuario, password, correo } = req.body;

    if (nombre && direccion && telefono && usuario && password && correo) {
        const result = usuario_controller.crear_usuario(nombre, direccion, telefono, usuario, password, correo);
        result.then((obj) => {
            res.status(200).json(obj);
        }).catch(error => {
            res.status(200).json(response.obj(-10, 'Algo salio mal en el servidor', error.message));
        })
    } else {
        res.status(200).json(response.obj(-1, 'Parametros invalidos'));
    }
});

//Ruta para el login
router.post('/login', function (req, res) {
    const { usuario, password } = req.body;

    if (usuario && password) {
        const result = usuario_controller.login(usuario, password);
        result.then((obj) => {
            res.status(200).json(obj);
        }).catch(error => {
            res.status(200).json(response.obj(-10, 'Algo salio mal en el servidor', error.message));
        })
    } else {
        res.status(200).json(response.obj(-1, 'Parametros invalidos'));
    }
});

//Ruta para mostrar todos los usuarios
router.get('/usuarios', function (req, res) {

    const result = usuario_controller.usuarios();
    result.then((obj) => {
        res.status(200).json(obj);
    }).catch(error => {
        res.status(200).json(response.obj(-10, 'Algo salio mal en el servidor', error.message));
    })
});

//Ruta para mostrar un usuario
router.get('/usuario_detalle/:id_usuario', function (req, res) {
    const { id_usuario } = req.params;

    if (id_usuario) {
        const result = usuario_controller.usuario_detalle(id_usuario);
        result.then((obj) => {
            res.status(200).json(obj);
        }).catch(error => {
            res.status(200).json(response.obj(-10, 'Algo salio mal en el servidor', error.message));
        })
    } else {
        res.status(200).json(response.obj(-1, 'Parametros invalidos'));
    }
});

//Ruta para mostrar las noticias de un usuario
router.get('/noticia_usuario/:id_usuario', function (req, res) {
    const { id_usuario } = req.params;

    if (id_usuario) {
        const result = noticia_controller.noticia_usuario(id_usuario);
        result.then((obj) => {
            res.status(200).json(obj);
        }).catch(error => {
            res.status(200).json(response.obj(-10, 'Algo salio mal en el servidor', error.message));
        })
    } else {
        res.status(200).json(response.obj(-1, 'Parametros invalidos'));
    }
});

//Ruta para crear una noticia
router.post('/crear_noticia', function (req, res) {
    const { id_usuario, categoria, nombre, descripcion, visible, fecha, hora, imagen, resumen } = req.body;

    if (id_usuario && categoria && nombre && descripcion && visible && fecha && hora && imagen && resumen) {
        const result = noticia_controller.crear_noticia(id_usuario, categoria, nombre, descripcion, visible, fecha, hora, imagen, resumen);
        result.then((obj) => {
            res.status(200).json(obj);
        }).catch(error => {
            res.status(200).json(response.obj(-10, 'Algo salio mal en el servidor', error.message));
        })
    } else {
        res.status(200).json(response.obj(-1, 'Parametros invalidos'));
    }
});

//Ruta para editar una noticia
router.put('/editar_noticia/:id_noticia', function (req, res) {
    const { id_noticia } = req.params;
    const data = req.body;

    if (id_noticia && data) {
        const result = noticia_controller.editar_noticia(id_noticia, data);
        result.then((obj) => {
            res.status(200).json(obj);
        }).catch(error => {
            res.status(200).json(response.obj(-10, 'Algo salio mal en el servidor', error.message));
        })
    } else {
        res.status(200).json(response.obj(-1, 'Parametros invalidos'));
    }
});

//Ruta para eliminar una noticia
router.delete('/eliminar_noticia/:id_noticia', function (req, res) {
    const { id_noticia } = req.params;

    if (id_noticia) {
        const result = noticia_controller.eliminar_noticia(id_noticia);
        result.then((obj) => {
            res.status(200).json(obj);
        }).catch(error => {
            res.status(200).json(response.obj(-10, 'Algo salio mal en el servidor', error.message));
        })
    } else {
        res.status(200).json(response.obj(-1, 'Parametros invalidos'));
    }
});

//Ruta para mostrar todas las noticias
router.get('/noticias', function (req, res) {
    const result = noticia_controller.noticias('');
    result.then((obj) => {
        res.status(200).json(obj);
    }).catch(error => {
        res.status(200).json(response.obj(-10, 'Algo salio mal en el servidor', error.message));
    })
});

//Ruta para mostrar una noticia
router.get('/noticia_detalle/:id_noticia', function (req, res) {
    const { id_noticia } = req.params;

    if (id_noticia) {
        const result = noticia_controller.noticia_detalle(id_noticia);
        result.then((obj) => {
            res.status(200).json(obj);
        }).catch(error => {
            res.status(200).json(response.obj(-10, 'Algo salio mal en el servidor', error.message));
        })
    } else {
        res.status(200).json(response.obj(-1, 'Parametros invalidos'));
    }
});

module.exports = router;