
'use strict'
angular.module('userModule')
.controller('productosController',function($scope,OperationsProductos,$location,$route){
   $scope.categoria={
       nombre_categoria:""
   }
   //console.log(sessionStorage.getItem("correo"))
   $scope.producto={
       id:0,
       producto:"",
       precio:"",
       ingredientes:"",
       categoria:"",
       cantidadcalorias:"",
       imagen:""
   }/*
    $scope.getCategorias= function getCategorias(){
        OperationsProductos.getCategorias(function(res){
            $scope.listaCategorias = res;
        });
    };*/
    //$scope.getCategorias();

    $scope.getProductos= function getProductos(){
        //var categoria=localStorage.getItem("categoria");
        console.log("ID "+sessionStorage.getItem("id"));
        OperationsProductos.getProductos({id: sessionStorage.getItem("id")},function(res){
            console.log(res);
            $scope.listaProductos = res;
        });
    };
    $scope.getProductos();


    //var select = document.getElementById('s_categoria');
    //var selectedOption;
    /*select.addEventListener('change',
        function(){
            selectedOption = this.options[select.selectedIndex];
            localStorage.setItem("categoria",selectedOption.text);
            $scope.getProductos();
        });*/
    $scope.actualizarProducto=function (producto) {
        $scope.producto=producto;
    }
    $scope.postProducto = function postProducto(producto){
        if(producto.estado==='1'){
            producto.estado='0';
        }
        else if(producto.estado==='0'){
            producto.estado='1';
        }
        console.log(producto);
        OperationsProductos.updateProductos(producto, function(response) {
            if (response.success){
                //$location.path('productos');
                //location.reload();
            }
        });
    };
    var select1 = document.getElementById('s_cate_m');
    var selectedOption1;
    select1.addEventListener('change',
        function(){
            selectedOption1 = this.options[select1.selectedIndex];
            localStorage.setItem("categoria",selectedOption1.text);
        });
    $scope.modificarProducto = function modificarProducto(producto){
        OperationsProductos.modificarProductos($scope.producto, function(response) {
            if (response.success){
            }
        });
    };
    $scope.putProducto = function putProducto(producto){
        OperationsProductos.addProductos(producto, function(response) {
            if (response.success){
                $location.path('productos');
                $route.reload();
            }
        });
    };
    $scope.deleteProducto = function deleteProducto(producto){
        OperationsProductos.deleteProductos($scope.producto, function(response) {
            if (response.success){
                $location.path('productos');
                $route.reload();
            }
        });
    };
});
