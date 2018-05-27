'use strict'
angular.module('userModule')
.controller('mainController',function($scope,$location,$route,$http){
    //var urlp="https://lit-bayou-22188.herokuapp.com/";
    var urlp="http://localhost:5000/";
    $scope.Empresa={
        cedulajuridica: "",
        correo: "",
        contrasena: "",
        telefono: "",
        descripcion: "",
        nombre: "",
        provincia: "",
        canton: "",
        distrito: "",
        direccionexacta: ""
    };
    $scope.datos_usuario={
        correo: "",
        contrasena: ""
        // correo: document.getElementById('email').value,
        // contrasena: document.getElementById('pass').value
    };

    $scope.validaEmpresa=function(datos_usuario){
        $http({
            method  :'POST',
            url     : urlp+'iniciarSesion',
            params    : {
                correo: datos_usuario.correo,
                contrasena: datos_usuario.contrasena
            }
        })// si la insercion fue exitosa entra al succes de lo contrario retorna un error de parte del servidor
            .then(function (response) {
                console.log(response)

                if(response.data.success){
                    console.log("MESSAGE")

                    sessionStorage.setItem("id",response.data.data.id);
                    sessionStorage.setItem("nombre",response.data.data.nombre);
                    mostrarNotificacion(response.data.message,2);
                    window.location.href = ('app/components/administrador/administrador.html');
                }
                else{
                    console.log(response.data);
                    mostrarNotificacion(response.data.message,1);
                }
            }, function (response) {
                console.log(response.data);
            })
            .catch(
                console.log("Error")
            )
     }

     $scope.registrarEmpresa=function(empresa){
        //console.log(empresa);
         if(empresa.cedulajuridica.length === 0 | empresa.correo.length === 0 | empresa.contrasena.length === 0 | empresa.telefono.length === 0 |
         empresa.descripcion === 0 | empresa.nombre.length === 0 | empresa.provincia.length === 0 | empresa.canton.length === 0 | empresa.distrito.length === 0 |
             empresa.direccionexacta.length === 0){
             mostrarNotificacion("Error, no pueden haber espacios vacios",1);
             return;
         }
         $http({
             method  :'POST',
             url     : urlp+"registrarEmpresa",
             body: {
                 cedulajuridica: empresa.cedulajuridica,
                 correo: empresa.correo,
                 contrasena: empresa.contrasena,
                 telefono: empresa.telefono,
                 descripcion: empresa.descripcion,
                 nombre: empresa.nombre,
                 provincia: empresa.provincia,
                 canton: empresa.canton,
                 distrito: empresa.distrito,
                 direccionexacta: empresa.direccionexacta
             }
         })// si la insercion fue exitosa entra al succes de lo contrario retorna un error departe del servidor
             .then(function (response){
                 if(response.data.success){
                     console.log("TRUE")
                     mostrarNotificacion("Empresa registrada con exito",2);
                 }
                 else{
                     console.log(response.data);
                     mostrarNotificacion("Ha ocurrido un error, verifique los datos que ha ingresado",1);
                 }
             }, function (response) {
                 console.log(response)
                 mostrarNotificacion("Revise su conexion a la red",1);
             });
     }
});

