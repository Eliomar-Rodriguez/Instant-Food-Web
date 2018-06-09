angular.module('userModule', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when("/pedidos", {
                templateUrl: 'pedidos/pedidos.html',
                controller: 'pedidosController'
            }).when("/productos", {
                templateUrl: 'productos/productos.html',
                controller: 'productosController'
            }).when("/inicio", {
            templateUrl: 'index.html',
            controller: 'mainController'
            })
            .otherwise({
                redirectTo: '/inicio'
            });
    }
    ]);