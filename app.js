angular.module('userModule', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when("/pedidos", {
                templateUrl: 'pedidos/pedidos.html',
                controller: 'pedidosController'
            }).when("/productos", {
                templateUrl: 'productos/productos.html',
                controller: 'productosController'
            }).when("/productosc", {
                templateUrl: 'productos/productos.html',
                controller: 'productoscController'
            }).when("/perfil", {
                templateUrl: 'perfil/perfil.html',
                controller: 'compradorController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
    ]);