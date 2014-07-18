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
        .when('/profileedit', {
            templateUrl: 'view/profileedit.html',
            controller: 'profileEditController'
        });
});

//Main Controller
myApp.controller('mainController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    console.log('I m Main Controller');

    $scope.master = {};
    $scope.master.usersession = {
        _id: null,
        email: "",
        status: true,
        imgurl: "img/find_user.png",
        friends: [ ],
        password: "",
        fullname: "",
        sex: "",
        relationship: "",
        mobilenumber: "",
        age: ""
    };

    /*$scope.master.usersession = {
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
     };*/

    $scope.logout = function () {
        console.log('loging out event');
        $scope.master.usersession = {
            _id: null,
            email: "",
            status: true,
            imgurl: "img/find_user.png",
            friends: [ ],
            password: "",
            fullname: "",
            sex: "",
            relationship: "",
            mobilenumber: "",
            age: ""
        };
    };
//todo jj
    $scope.checkPermission = function () {
        console.log("Checking Permission " + JSON.stringify($scope.master.usersession));
        var cook = $scope.getCookie('_id');
        //console.log();
        if (cook == null) {
            $location.path('/');
        }
        else {
            $http.get('/user/' + cook)
                .success(function (data) {
                    console.log("check PEr get data " + JSON.stringify(data));
                    $scope.master.usersession = data[0];
                })
                .error(function (err) {
                    console.log(err);
                });
        }
    };

    $scope.getCookie = function (name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return decodeURIComponent(parts.pop().split(";").shift()).split(/ /)[0].replace(/[^\d]/g, '');
    };

    //decodeURIComponent(getCookie("username"));

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
                $scope.master.usersession = data;
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
                            console.log("Before Assigning" + JSON.stringify(data[0]));

                            $scope.master.usersession = data[0];

                            console.log("just after login", $scope.master.usersession);
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
    $scope.checkPermission();

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