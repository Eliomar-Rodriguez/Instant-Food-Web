
'use strict'
angular.module('userModule')
.controller('productosController',function($scope,OperationsProductos,$location,$route){

    $scope.imagenSAVE = "";
    $scope.categoria= {
       nombre_categoria: ""
   }
   $scope.producto={
       id:"",
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

    $('document').ready(function () {
        $("#imgEdit").change(function () {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#imgEditShow').attr('src', e.target.result);
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
        OperationsProductos.modificarProductos(producto,$scope.imagenSAVE,function(response) {
            console.log(response)
            if (response.success){
                console.log("modifico");
                $location.path('productos');
                location.reload();
            }
        });
    };
    $scope.cargarIdEliminar = function (producto) {
        sessionStorage.setItem("productoId",producto.id);
    }

    $scope.cargarProducto = function (producto) {
        sessionStorage.setItem("productoId",producto.id);
        sessionStorage.setItem("imagenProd",producto.imagen);

        document.getElementById("productoEdit").value = producto.producto;
        document.getElementById("precioEdit").value = producto.precio;
        document.getElementById("ingredientesEdit").value = producto.ingredientes;
        document.getElementById("categoriaEdit").value = producto.categoria;
        document.getElementById("caloriasEdit").value = producto.cantidadcalorias;
        document.getElementById("imgEditShow").src = producto.imagen;
    };

    $scope.deleteProducto = function deleteProducto(producto){
        OperationsProductos.deleteProductos(producto,function(response) {
            if (response.success){
                $location.path('productos');
                $route.reload();
            }
        });
    };
});
