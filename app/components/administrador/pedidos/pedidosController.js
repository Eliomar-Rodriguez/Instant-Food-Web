
'use strict'
angular.module('userModule')
.controller('pedidosController',function($scope,OperationsPedidos,$location,$route){
    $scope.pedido={
        id:'',
        producto:'',
        estado:'',
        fecha:'',
        cantidad:'',
        imagen:'',
        latitud:'',
        longitud:'',
        preciofinal:''
    };
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

    $scope.verDetalles=function verDetalles(pedido){
        console.log(pedido)
        debugger
        $scope.pedido=pedido;
        OperationsPedidos.getDetalles(pedido,function(res){
            $scope.listaDetalles=res;

        });
    }
    $scope.modificarPedido=function modificarPedido(estado){
        if(estado===1){
            OperationsPedidos.aceptaPedido({estado:estado.toString(),id_pedido:$scope.pedido.id_pedido}, function(res){
                if (res.success) {
                    $location.path('pedidos')
                    $route.reload();
                }
            });
        }else{
            var text="";
            alertify.prompt( 'Prompt Title', 'Prompt Message', 'Prompt Value'
                , function(evt, value) { alertify.success('You entered: ' + value);
                    text=value;
                    console.log({estado:estado,id_pedido:$scope.pedido.id_pedido,detalle:text});
                    OperationsPedidos.rechazaPedido({estado:estado,id_pedido:$scope.pedido.id_pedido,detalle:text}, function(res){
                        if (res.success) {
                            $location.path('pedidos')
                            $route.reload();
                        }
                    });}
                , function() { alertify.error('Cancel') });
        }
    }
    $scope.getPedidos();
});
