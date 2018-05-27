'use strict'
angular.module('userModule')
    .factory('OperationsPedidos',function($http,$location){
        var urlp="http://172.24.47.10:8080/JogosPizza/server/pedidos/CRUDpedidos.php?Funcion=";
        var respuesta={
            getPedidos: function(callback){
                $http.get(
                    urlp+"ObtenertodosPedidos"
                ).success(function successCallback(response){
                    callback(response);
                }).error(function errorCallback(response) {
                    //En caso de fallo en la peticion entra en esta funcion
                    callback(response);
                });
            },
            getDetalles: function(pedido,callback){
                $http({
                    method  :'POST',
                    url     : urlp+"ObtenertodosDetalles",
                    data    : pedido
                })
                    .success(function(data){
                        callback(data);
                    }).error(function(data){

                });
            },
            aceptaPedido:function(pedido,callback){
                $http({
                    method  : 'POST',
                    url     : urlp+"updatePedidos",
                    data    : pedido

                })// si la insercion fue exitosa entra al succes de lo contrario retorna un error departe del servidor
                    .then(function mySuccess(response) {
                        if(response.data.status){
                            mostrarNotificacion("Se acepto con exito",2);
                            callback({success: true});
                        }
                        else{
                            mostrarNotificacion("Error en el sistema",1);
                        }
                    }, function myError(response) {
                        mostrarNotificacion("Revise su conexion a Internet",1);
                        callback({success: false});
                    });
            },
            rechazaPedido:function(pedido,callback){
                $http({
                    method  : 'POST',
                    url     : urlp+"updatePedidosR",
                    data    : pedido
                })// si la insercion fue exitosa entra al succes de lo contrario retorna un error departe del servidor
                    .then(function mySuccess(response){
                        if(response.data.status){
                            mostrarNotificacion("Se rechazo el pedido con exito",2);
                            callback({success: true});
                        }
                        else{
                            mostrarNotificacion("Error en el sistema",1);
                        }
                    },function myError(response) {
                        mostrarNotificacion("Revise su conexion a Internet",1);
                        callback({success: false});
                    });
            }
        }
        return respuesta;
    });
