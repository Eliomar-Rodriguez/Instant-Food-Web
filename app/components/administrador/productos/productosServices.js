
'use strict'
angular.module('userModule')
    .factory('OperationsProductos',function($http,$location){
        //var urlp="https://guarded-eyrie-96688.herokuapp.com/";
        var urlp="http://localhost:5000/";
        var respuesta = {
          getProductos: function(producto,callback){
                $http({
                    method  :'POST',
                    url     : urlp+"seleccionarProductosEmpresa",
                    params: {id: producto.id}
                })
                    .then(function(data){
                        callback(data.data.data);
                    }).catch(function(data) {
                        mostrarNotificacion("Error de conexion, revise su conexion a Internet",1);
                });
            },
            deleteProductos: function(producto,callback){
                $http({
                    method  : 'POST',
                    url     : urlp+"eliminarProducto",
                    data    : {id: sessionStorage.getItem("productoId")}

                })
                .then(function (response) {
                    if(response.data.success){
                        mostrarNotificacion("Se elimino con exito",2);
                        callback({success: true});
                    }
                    else{
                        mostrarNotificacion("Introduzca los datos de forma correcta",1);
                    }
                }, function (response) {
                    mostrarNotificacion("Revise su conexion a Internet",1);
                    callback({success: false});
                })
                .catch(function (response) {
                    console.log(response)
                })
            },
            addProductos: function(producto,img,callback){
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
                        if(response.data.success){
                            mostrarNotificacion("Se agrego con exito",2);
                            callback({success: true});
                        }
                        else{
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
            modificarProductos: function(producto,img,callback){
                debugger
                if (img.length === 0){
                    img = sessionStorage.getItem("imagenProd");
                    if(img.length === 0){
                        img = document.getElementById('imgEditShow').value
                    }
                }
                debugger
                $http({
                    method  : 'POST',
                    url     : urlp+"editarProducto",
                    data    : {
                        id: sessionStorage.getItem("productoId"),
                        producto: document.getElementById("productoEdit").value,
                        precio: document.getElementById("precioEdit").value,
                        ingredientes: document.getElementById("ingredientesEdit").value,
                        categoria: document.getElementById("categoriaEdit").value,
                        cantidadCalorias: document.getElementById("caloriasEdit").value,
                        imagen: img
                    }
                })// si la insercion fue exitosa entra al succes de lo contrario retorna un error departe del servidor
                    .then(function (response) {
                        if(response.data.success){
                            mostrarNotificacion("El producto se ha modificaco correctamente",2);
                            callback({success: true});
                        }
                        else{
                            mostrarNotificacion("No se ha logrado modificar el producto",1);
                        }
                    }, function(response) {
                        mostrarNotificacion("Revise su conexion a Internet",1);
                        callback({success: false});
                    })
                    .catch(function (response) {
                        console.log(response)
                    });
            }
        }
        return respuesta;
    });
