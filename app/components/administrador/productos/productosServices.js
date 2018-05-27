
'use strict'
angular.module('userModule')
    .factory('OperationsProductos',function($http,$location){
        var urlp="http://localhost:5000/";

        var respuesta = {
          getProductos: function(producto,callback){
                $http({
                    method  :'POST',
                    url     : urlp+"seleccionarProductosEmpresa",
                    params: {id: producto.id}
                })
                    .then(function(data){
                        console.log(data.data.data)
                        callback(data.data.data);
                    }).catch(function(data) {
                        mostrarNotificacion("Error de conexion,revise su conexion a Internet",1);
                });
            },
            deleteProductos: function(id,callback){
                $http({
                    method  : 'POST',
                    url     : urlp+"deleteProducto",
                    data    : {id: id}

                })// si la insercion fue exitosa entra al succes de lo contrario retorna un error departe del servidor
                    .then(function mySuccess(response) {
                        if(response.data.status){
                            mostrarNotificacion("Se elimino con exito",2);
                            callback({success: true});
                        }
                        else{
                            mostrarNotificacion("Introduzca los datos de forma correcta",1);
                        }
                    }, function myError(response) {
                        mostrarNotificacion("Revise su conexion a Internet",1);
                        callback({success: false});
                    });
            },
            addProductos: function(producto,img,callback){
                function lzw_encode(s) {
                    var dict = {};
                    var data = (s + "").split("");
                    var out = [];
                    var currChar;
                    var phrase = data[0];
                    var code = 256;
                    for (var i=1; i<data.length; i++) {
                        currChar=data[i];
                        if (dict[phrase + currChar] != null) {
                            phrase += currChar;
                        }
                        else {
                            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
                            dict[phrase + currChar] = code;
                            code++;
                            phrase=currChar;
                        }
                    }
                    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
                    for (var i=0; i<out.length; i++) {
                        out[i] = String.fromCharCode(out[i]);
                    }
                    return out.join("");
                }
                var imagen = lzw_encode(img);
                $http({
                    method  : 'POST',
                    url     : urlp+"insertarProducto",
                    data    : {
                    id: sessionStorage.getItem("id"),
                        producto: producto.producto,
                        precio: producto.precio,
                        ingredientes: producto.ingredientes,
                        categoria: producto.categoria,
                        cantidadCalorias: producto.cantidadcalorias,
                        imagen: img
                }

                })// si la insercion fue exitosa entra al succes de lo contrario retorna un error departe del servidor
                    .then(function (response) {
                        console.log("=====================");
                        console.log(response.data.success)
                        console.log("=====================");
                        if(response.data.success){
                            mostrarNotificacion("Se agrego con exito",2);
                            callback({success: true});
                        }
                        else{
                            console.log(response);
                            mostrarNotificacion("Error en la insercion",1);
                        }
                    }, function(response) {
                        mostrarNotificacion("Revise su conexion a Internet",1);
                        callback({success: false});
                    })
                    .catch(function (response) {
                        console.log(response)
                    });
            },
            updateProductos: function(producto,callback){
                $http({
                    method  : 'POST',
                    url     : urlp+"postProducto",
                    data    : producto

                })// si la insercion fue exitosa entra al succes de lo contrario retorna un error departe del servidor
                    .then(function mySuccess(response) {
                        if(response.data.status){
                            if(producto.estado==='1'){
                                mostrarNotificacion("Se cambio el estado a activo con exito",2);
                            }
                            else if(producto.estado==='0'){
                                mostrarNotificacion("Se cambio el estado a inactivo con exito",2);
                            }
                            callback({success: true});
                        }
                        else{
                            mostrarNotificacion("Introduzca los datos de forma correcta",1);
                        }
                    }, function myError(response) {
                        mostrarNotificacion("Revise su conexion a Internet",1);
                        callback({success: false});
                    });
            },
            modificarProductos: function(producto,callback){
                $http({
                    method  : 'POST',
                    url     : urlp+"postallProducto",
                    data    : producto

                })// si la insercion fue exitosa entra al succes de lo contrario retorna un error departe del servidor
                    .then(function mySuccess(response) {
                        if(response.data.status){
                            if(producto.estado==='1'){
                                mostrarNotificacion("Se cambio el estado a activo con exito",2);
                            }
                            else if(producto.estado==='0'){
                                mostrarNotificacion("Se cambio el estado a inactivo con exito",2);
                            }
                            callback({success: true});
                        }
                        else{
                            mostrarNotificacion("Introduzca los datos de forma correcta",1);
                        }
                    }, function myError(response) {
                        mostrarNotificacion("Revise su conexion a Internet",1);
                        callback({success: false});
                    });
            }
        }
        return respuesta;
    });
