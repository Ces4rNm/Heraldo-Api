const response = require('../shared/response');
const Usuario = require('../models/Usuario');
const crypto = require('crypto');

const usuario_test = [{
    _id: '123456789',
    nombre: 'Jessica Torres',
    direccion: 'Cra 234 # 54 -23',
    telefono: '3210000000',
    usuario: 'jtorres',
    password: '123',
    correo: 'jessica@gmail.com'
}]

exports.crear_usuario = function (nombre, direccion, telefono, usuario, password, correo) {
    return new Promise((resolve, reject) => {
        try {
            Usuario.findOne({ usuario }).then((res) => {
                if (!res) {
                    password = crypto.createHash('md5').update(password).digest("hex");
                    const nuevo_usuario = new Usuario({ nombre, direccion, telefono, usuario, password, correo });
                    nuevo_usuario.save().then((res_2) => {
                        if (res_2) {
                            resolve(response.obj(0, 'Usuario creado', nuevo_usuario));
                        } else {
                            resolve(response.obj(-6, 'Error guardando usuario', nuevo_usuario));
                        }
                    }).catch(error => {
                        resolve(response.obj(-5, 'Error guardando el usuario, valide los parametros', error.message));
                    });
                } else {
                    resolve(response.obj(-4, 'Usuario ya existe'));
                }
            }).catch(error => {
                resolve(response.obj(-3, 'Error en la busqueda del usuario:' + usuario, error.message));
            })
        } catch (error) {
            resolve(response.obj(-2, 'Error creando usuario', error));
        }
    });
}

exports.login = function (usuario, password) {
    return new Promise((resolve, reject) => {
        try {
            password = crypto.createHash('md5').update(password).digest("hex");
            Usuario.findOne({ usuario, password }).then((res) => {
                if (res) {
                    resolve(response.obj(0, 'Usuario valido', res));
                } else {
                    resolve(response.obj(-4, 'Usuario o password incorrectos'));
                }
            }).catch(error => {
                resolve(response.obj(-3, `Error en la busqueda del ${usuario} y ${password}`, error.message));
            })
        } catch (error) {
            resolve(response.obj(-2, 'Error validando usuario', error));
        }
    });
}

exports.usuarios = function () {
    return new Promise((resolve, reject) => {
        try {
            Usuario.find().then((res) => {
                if (res) {
                    resolve(response.obj(0, 'Todos los usuarios', res));
                } else {
                    resolve(response.obj(-4, 'No hay usuarios', []));
                }
            }).catch(error => {
                resolve(response.obj(-3, 'Error en la busqueda de los usuarios', error.message));
            })
        } catch (error) {
            resolve(response.obj(-2, 'Error listando usuarios', error));
        }
    });
}

exports.usuario_detalle = function (id_usuario) {
    return new Promise((resolve, reject) => {
        try {
            Usuario.findOne({ _id: id_usuario }).then((res) => {
                if (res) {
                    resolve(response.obj(0, 'Usuario detalle', res));
                } else {
                    resolve(response.obj(-4, 'Usuario no encontrado'));
                }
            }).catch(error => {
                resolve(response.obj(-3, 'Error en la busqueda del usuario id: ' + id_usuario, error.message));
            })
        } catch (error) {
            resolve(response.obj(-2, 'Error listando usuario', error));
        }
    });
}