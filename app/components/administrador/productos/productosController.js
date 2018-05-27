
'use strict'
angular.module('userModule')
.controller('productosController',function($scope,OperationsProductos,$location,$route){

    $scope.imagenSAVE = "";
    $scope.categoria= {
       nombre_categoria: ""
   }
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

    $('document').ready(function () {
        $("#imgload").change(function () {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#imgshow').attr('src', e.target.result);
                    $scope.imagenSAVE = e.target.result;
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    });

    $scope.postProducto = function postProducto(producto){
        OperationsProductos.addProductos(producto, $scope.imagenSAVE, function(response) {
            console.log("respuesta!!")
            console.log(response)
            if (response.success){

                console.log("Entro")
                //$location.path('productos');
                location.reload();
            }
        });
    };/*
    var select1 = document.getElementById('s_cate_m');
    var selectedOption1;
    select1.addEventListener('change',
        function(){
            selectedOption1 = this.options[select1.selectedIndex];
            localStorage.setItem("categoria",selectedOption1.text);
        });*/
    $scope.modificarProducto = function modificarProducto(producto){
        OperationsProductos.modificarProductos($scope.producto, function(response) {
            if (response.success){
            }
        });
    };

    $scope.deleteProducto = function deleteProducto(producto){
        OperationsProductos.deleteProductos($scope.producto.id, function(response) {
            console.log(response)
            if (response.success){
                $location.path('productos');
                $route.reload();
            }
        });
    };
});
