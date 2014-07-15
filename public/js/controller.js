var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'view/home.html',
            controller: 'homeController'
        })
        .when('/chart', {
            templateUrl: 'view/chart.html',
            controller: 'chartController'
        })
        .when('/form', {
            templateUrl: 'view/form.html',
            controller: 'formController'
        })
});

//Main Controller
myApp.controller('mainController', ['$scope', '$http', function ($scope, $http) {
    console.log('I m Main Controller');
}]);

//Home Controller
myApp.controller('homeController', ['$scope', '$http', function ($scope, $http) {
    console.log('I m Home Controller');
}]);

//Chart Controller
myApp.controller('chartController', ['$scope', '$http', function ($scope, $http) {
    console.log('I m Chart Controller');
}]);

//Form Controller
myApp.controller('formController', ['$scope', '$http', function ($scope, $http) {
    console.log('I m form Controller');
}]);
