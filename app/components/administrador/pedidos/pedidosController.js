
'use strict'
angular.module('userModule')
.controller('pedidosController',function($scope,OperationsPedidos,$location,$route){
    $scope.pedido={
        nombre_usuario:'',
        id_pedido:'',
        estado:'',
        fecha:''
    }
    $scope.detalle={
        nombre_producto:"",
        nombre_categoria:"",
        cantidad:"",
        total:""
    }
    $scope.getPedidos= function getPedidos(){
        OperationsPedidos.getPedidos( function(res){
            $scope.listaPedidos = res;
            console.log(res);
        });
    };
    $scope.verResultado=function(){
        console.log($scope.pedido);
    }
    $scope.verDetalles=function verDetalles(pedido){
        $scope.pedido=pedido;
        OperationsPedidos.getDetalles(pedido,function(res){
            $scope.listaDetalles=res;
            var counta=0;
            for(var x=0;x<res.length;x++){
                var subtotal=0;
                for(var y=0;y<res[x].total.length;y++){
                    if(subtotal[x]===','){
                        subtotal=subtotal[x].substr(0,y);
                    }
                    if(res[x].total[y]==='.'){
                        subtotal=res[x].total.substr(0,y)+res[x].total.substr(y+1,res[x].total.length-1);
                    }
                }
                counta=counta+parseFloat(subtotal);
            }
            $scope.total=counta;
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
