
'use strict'
angular.module('userModule')
.controller('pedidosController',function($scope,OperationsPedidos,$location,$route){
    $scope.pedido={
        idpedido:'',
        fecha:'',
        cantidad:'',
        latitud:'',
        longitud:'',
        preciofinal:''
    };
    $scope.total = 0;

    $scope.getPedidos= function getPedidos(){
        OperationsPedidos.getPedidos(function(res){
            var diaF,mesF,anoF;
            var contador1=0;
            var concatena1="";
            for(var a = 0; a < res.length; a++) {
                var fechaActual = res[a].fecha;
                for (var x = 0; x < fechaActual.length; x++) {
                    var letra = fechaActual[x];
                    if (fechaActual[x] == '-') {
                        if (contador1 == 0) {
                            anoF = concatena1;
                            concatena1 = "";
                            contador1++;
                        }
                        else if (contador1 == 1) {
                            mesF = concatena1;
                            concatena1 = "";
                            contador1++;
                            var lista = fechaActual.substr(x+1, x+2).split("T");
                            diaF = lista[0];
                            break;
                        }
                    }
                    else
                        concatena1 += fechaActual[x];
                }
                res[a].fecha = diaF + '/' + mesF + '/' + anoF;
            }
            $scope.listaPedidos = res;
        });
    };

    $scope.verResultado=function(){
        console.log($scope.pedido);
    }
    $scope.mostrarMapa = function (lat,lng) {
        var uluru = {lat: lat, lng: lng};
        // The map, centered at Uluru
        var map = new google.maps.Map(
            document.getElementById('map'), {zoom: 16.9, center: uluru});
        // The marker, positioned at Uluru
        var marker = new google.maps.Marker({position: uluru, map: map});
    };
    $scope.verDetalles=function verDetalles(pedido){
        $scope.pedido=pedido;
        OperationsPedidos.getDetalles(pedido,function(res){
            $scope.listaDetalles=res.data.data;
            $scope.mostrarMapa(pedido.latitud,pedido.longitud)
        });
    }
    $scope.aceptaoRechazaPedido = function aceptaPedido(elemento, estado){
        OperationsPedidos.aceptaRechazaPedido(elemento.idpedido,estado, function(res){
            if (res.success) {
                $location.path('pedidos')
                $route.reload();
            }
            else{
                mostrarNotificacion("Error en la operacion realizada.",1);
            }
        });
    }
    $scope.getPedidos();
});
