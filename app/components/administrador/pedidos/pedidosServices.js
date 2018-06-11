'use strict'
angular.module('userModule')
    .factory('OperationsPedidos',function($http,$location){
        var urlp="https://guarded-eyrie-96688.herokuapp.com/";
        //var urlp="http://localhost:5000/";
        var respuesta={
            getPedidos: function(callback){
                $http({
                    method  :'POST',
                    url     : urlp+"obtenerPedidosEmpresa",
                    params: {id: sessionStorage.getItem("id")}
                })
                    .then(function (response){
                    callback(response.data.data);
                })
                    .catch(function (response) {
                    //En caso de fallo en la peticion entra en esta funcion
                    callback(response);
                });
            },
            getDetalles: function(pedido,callback){
                $http({
                    method  :'POST',
                    url     : urlp+"detallesPedido",
                    data    : {id: pedido.idpedido}
                })
                    .then(function(data){
                        callback(data);
                    })
                    .catch(function(data){
                        callback(data);
                });
            },
            aceptaRechazaPedido:function(id,estado,callback){
                $http({
                    method  : 'POST',
                    url     : urlp+"acepRechaPedido",
                    data    : {
                        id: id,
                        estado: estado
                    }

                })// si la insercion fue exitosa entra al succes de lo contrario retorna un error departe del servidor
                    .then(function (response) {

                        if(response.data.success){
                            if(estado == 1)
                                mostrarNotificacion("Pedido aceptado!",2);
                            else
                                mostrarNotificacion("El pedido a sido rechazado.",2);
                            callback({success: true});
                        }
                        else{
                            mostrarNotificacion("Error en el sistema.",1);
                        }
                    }, function (response) {
                        mostrarNotificacion("Revise su conexión a Internet.",1);
                        callback({success: false});
                    })
                    .catch(function (error) {
                        //console.log(error);
                        callback({success: false});
                    })
            }
        };
        return respuesta;
    });
