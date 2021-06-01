// Respuesta estandar de la api
exports.obj = function (codigo, mensaje, data) {
    return { codigo: codigo, mensaje: mensaje, data: data };
}