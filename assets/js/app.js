
var hasc= angular.module("hasc",["ngRoute","ngResource","ui.calendar"])
    .config([$routeProvider,function($routeProvider)
    {
        $routeProvider.when("/admin",{
            templateUrl:"../admin/prescriptions/dashboard.html",
            controller:"dashboardCtrl"
        })
    }
    ]);
