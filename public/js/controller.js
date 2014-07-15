var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'view/login.html',
            controller: 'loginController'
        })
        .when('/home', {
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

//Login Controller
myApp.controller('loginController', ['$scope', '$http', function ($scope, $http) {
    console.log('i m in Login Controller');

    $scope.signupClick = function () {
        console.log('signUp Click');
        console.log($scope.emailId);
        var tmpObj = {email: $scope.emailId};
        $http.post("/signuprequest", tmpObj)
            .success(function (data) {
                console.log(data);
            })
            .error(function (err) {
                console.log(err);
            });

    }

    $scope.logInClick = function () {
        console.log('LogIn Button Clicked');

        console.log($scope.email);
        console.log($scope.password);

        $http.post('/verifyAccount', {email: $scope.email, password: $scope.password})
            .success(function (result) {
                console.log(result);

                if (result != "Invalid User") {
                    console.log('Successfully Login');
                    //$location.path('master.html');
                }
                else {
                    alert('Invalid User');
                }

            })
            .error(function (err) {
                console.log(err);
            })
    }
}]);

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
