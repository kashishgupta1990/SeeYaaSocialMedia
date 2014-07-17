var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider

        .when('/profileedit', {
            templateUrl: 'view/login.html',
            controller: 'loginController'
        })
        .when('/home', {
            templateUrl: 'view/home.html',
            controller: 'homeController'
        })
        .when('/changepassword', {
            templateUrl: 'view/changePassword',
            controller: 'changePasswordController'
        })
        .when('/chart', {
            templateUrl: 'view/chart.html',
            controller: 'chartController'
        })
        .when('/form', {
            templateUrl: 'view/form.html',
            controller: 'formController'
        })
        .when('/', {
            templateUrl: 'view/profileedit.html',
            controller: 'profileEditController'
        });
});

//Main Controller
myApp.controller('mainController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    console.log('I m Main Controller');


    $scope.master = {};
    $scope.master.usersession = {
        _id: "53c66782f42108c74addeed2",
        email: "rishbh.dixit123@gmail.com",
        status: true,
        imgurl: "img/find_user.png",
        friends: [ ],
        password: "1405511655740",
        fullname: "Rishab",
        sex: "M",
        relationship: "Single",
        mobilenumber: "99989889",
        age: "89"
    };
    /*$scope.master.usersession = {
     _id: null,
     imgurl: "/img/find_user.png",
     fullname: "",
     mobilenumber: "",
     relationship: "",
     status: true
     };*/

    $scope.logout = function () {
        console.log('loging out event');
        $scope.master.usersession = {
            _id: null,
            imgurl: "img/find_user.png",
            fullname: "",
            mobilenumber: "",
            relationship: "",
            status: true
        };
    };

    $scope.checkPermission = function () {
        console.log("Checking Permission " + $scope.master.usersession._id);
        if ($scope.master.usersession._id == null) {
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
                result = result.replace(/"/g, "");
                if (result != "Invalid User") {

                    $http.get('/user/' + result)
                        .success(function (data) {
                            console.log(data[0]);

                            $scope.master.usersession = data[0];

                            console.log($scope.master.usersession);
                        })
                        .error(function (err) {
                            console.log(err);
                        });

                    console.log($scope.master.usersession);
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
    console.log($scope.master.usersession);
    // $scope.checkPermission();

    //Do Something here

}]);

//Chart Controller
myApp.controller('chartController', ['$scope', '$http', function ($scope, $http) {
    console.log('I m Chart Controller');
    // $scope.checkPermission();

    //Do Something here
}]);

//Form Controller
myApp.controller('formController', ['$scope', '$http', function ($scope, $http) {
    console.log('I m form Controller');
    //$scope.checkPermission();

    //Do Something here
}]);

//Change password Controller
myApp.controller('changePasswordController', ['$scope', '$http', function ($scope, $http) {
    console.log('I m Change Password');


}]);

//Profile Edit Controller
myApp.controller('profileEditController', ['$scope', '$http', function ($scope, $http) {
    console.log('I m Profile Edit Controller');
    //$scope.checkPermission();

    $scope.profileupdate = function () {
        console.log('Profile update button clicked');

        console.log($scope.master.usersession);
        $http.put('/user/' + $scope.master.usersession._id, $scope.master.usersession)
            .success(function (data) {
                console.log("result>> " + data);
            })
            .error(function (err) {
                console.log("Error >>" + err);
            });
    };
}]);