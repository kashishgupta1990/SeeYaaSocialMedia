var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider

        .when('/home', {
            templateUrl: 'view/login.html',
            controller: 'loginController'
        })
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
        .when('/profileedit',{
            templateUrl:'view/profileedit.html',
            controller:'profileEditController'
        });
});

//Main Controller
myApp.controller('mainController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    console.log('I m Main Controller');

    $scope.usersession = {
        id: null,
        email:"kashishgupta1990@yahoo.com",
        password:"#sssleelel#",
        imgurl:"img/53c511478381385b2cbe90d9.jpg",
        fullname:"Kashish Gupta",
        sex:"M",
        age:"11-Oct-1990",
        mobilenumber:"9999749722",
        relationship:"Single",
        status:true,
        friends:['id1','id2','id3']
    };

    $scope.logout = function () {
        $scope.usersession.id = null;
    };

    $scope.checkPermission = function () {
        console.log($scope.usersession.id);
        if ($scope.usersession.id == null) {
            $location.path('/');
        }
    }

}]);

//Login Controller
myApp.controller('loginController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
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

    };

    $scope.logInClick = function () {
        console.log('LogIn Button Clicked');

        $http.post('/verifyAccount', {email: $scope.email, password: $scope.password})
            .success(function (result) {

                if (result != "Invalid User") {
                    console.log('Successfully Login');
                    $scope.usersession.id = result;
                    console.log($scope.usersession);
                    $location.path('home');
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

//Home Controller
myApp.controller('homeController', ['$scope', '$http', function ($scope, $http) {
    console.log('I m Home Controller');
    $scope.checkPermission();

    //Do Something here

}]);

//Chart Controller
myApp.controller('chartController', ['$scope', '$http', function ($scope, $http) {
    console.log('I m Chart Controller');
    $scope.checkPermission();

    //Do Something here
}]);

//Form Controller
myApp.controller('formController', ['$scope', '$http', function ($scope, $http) {
    console.log('I m form Controller');
    $scope.checkPermission();

    //Do Something here
}]);

//Profile Edit Controller
myApp.controller('profileEditController', ['$scope', '$http', function ($scope, $http) {
    console.log('I m Profile Edit Controller');
    //$scope.checkPermission();

    //Do Something here
}]);