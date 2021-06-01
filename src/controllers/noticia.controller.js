const response = require('../shared/response');
const Usuario = require('../models/Usuario');
const Noticia = require('../models/Noticia');

const time = new Date();
const noticia_test = [{
    _id: '12345',
    id_usuario: '123456789',
    categoria: 0,
    nombre: 'Google desarrollará algoritmos para atención médica junto a red de hospitales',
    descripcion: 'Google y la red estadounidense de hospitales HCA Healthcare anunciaron este miércoles un acuerdo por el que el gigante tecnológico desarrollará algoritmos con datos de pacientes para ayudar a la toma de decisiones en el ámbito de la atención médica.',
    visible: 1,
    fecha: time.toLocaleString(),
    hora: time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    imagen: 'https://www.elheraldo.co/sites/default/files/styles/width_1180/public/articulo/2021/05/26/google-logo.jpg?itok=fAmQzBVR',
    resumen: 'La privacidad y la seguridad serán prioritarias y que el acceso a los datos se gestionará a través de la infraestructura de Google Cloud.'
}];

exports.crear_noticia = function (id_usuario, categoria, nombre, descripcion, visible, fecha, hora, imagen, resumen) {
    return new Promise((resolve, reject) => {
        try {
            Usuario.findOne({ _id: id_usuario }).then((res) => {
                if (res) {
                    const nueva_noticia = new Noticia({ id_usuario, categoria, nombre, descripcion, visible, fecha, hora, imagen, resumen });
                    nueva_noticia.save().then((res_2) => {
                        if (res_2) {
                            resolve(response.obj(0, 'Noticia creada', nueva_noticia));
                        } else {
                            resolve(response.obj(-6, 'Error guardando noticia', nueva_noticia));
                        }
                    }).catch(error => {
                        resolve(response.obj(-5, 'Error guardando la noticia, valide los parametros', error.message));
                    });
                } else {
                    resolve(response.obj(-4, 'Usuario no encontrado'));
                }
            }).catch(error => {
                resolve(response.obj(-3, 'Error en la busqueda del usuario id: ' + id_usuario, error.message));
            })
        } catch (error) {
            resolve(response.obj(-2, 'Error creando noticia', error));
        }
    });
}

exports.editar_noticia = function (id_noticia, data) {
    return new Promise((resolve, reject) => {
        try {
            Noticia.findByIdAndUpdate(id_noticia, data).then((res) => {
                if (res) {
                    resolve(response.obj(0, 'Noticia editada', data));
                } else {
                    resolve(response.obj(-4, 'Noticia no encontrada'));
                }
            }).catch(error => {
                resolve(response.obj(-3, 'Error en la busqueda de la noticia id: ' + id_noticia, error.message));
            })
        } catch (error) {
            resolve(response.obj(-2, 'Error actualizando noticia', error));
        }
    });
}

exports.eliminar_noticia = function (id_noticia) {
    return new Promise((resolve, reject) => {
        try {
            Noticia.findByIdAndDelete(id_noticia).then((res) => {
                if (res) {
                    resolve(response.obj(0, 'Noticia eliminada'));
                } else {
                    resolve(response.obj(-4, 'Noticia no encontrada'));
                }
            }).catch(error => {
                resolve(response.obj(-3, 'Error en la busqueda de la noticia id: ' + id_noticia, error.message));
            })
        } catch (error) {
            resolve(response.obj(-2, 'Error eliminando noticia', error));
        }
    });
}

exports.noticias = function noticias(id_usuario) {
    return new Promise((resolve, reject) => {
        try {
            if (id_usuario) {
                id_usuario = { id_usuario };
            } else {
                id_usuario = { visible: 1 };
            }
            Noticia.find(id_usuario).then((res) => {
                if (res) {
                    resolve(response.obj(0, 'Todas las noticias', res));
                } else {
                    resolve(response.obj(-4, 'No hay noticias', []));
                }
            }).catch(error => {
                resolve(response.obj(-3, 'Error en la busqueda de las noticias', error.message));
            })
        } catch (error) {
            resolve(response.obj(-2, 'Error listando noticias', error));
        }
    });
}

exports.noticia_detalle = function (id_noticia) {
    return new Promise((resolve, reject) => {
        try {
            Noticia.findOne({ _id: id_noticia }).then((res) => {
                if (res) {
                    resolve(response.obj(0, 'Noticia detalle', res));
                } else {
                    resolve(response.obj(-4, 'Noticia no encontrada'));
                }
            }).catch(error => {
                resolve(response.obj(-3, 'Error en la busqueda de la noticia id: ' + id_noticia, error.message));
            })
        } catch (error) {
            resolve(response.obj(-2, 'Error listando noticia', error));
        }
    });
}

exports.noticia_usuario = function (id_usuario) {
    return new Promise((resolve, reject) => {
        try {
            Usuario.findOne({ _id: id_usuario }).then((res) => {
                if (res) {
                    resolve(this.noticias(id_usuario));
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