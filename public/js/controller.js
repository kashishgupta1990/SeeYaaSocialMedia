var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
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
    $scope.master.usersession = {};


    $scope.logout = function () {
        console.log('loging out event');
        $scope.resetCookie();
        window.location.href = '/index.html';
    };

    $scope.resetCookie = function () {
        console.log('reset cookie');
        $.removeCookie('_id');
        $.removeCookie('email');
        $.removeCookie('relationship');
        $.removeCookie('imgurl');
        $.removeCookie('fullname');

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
        }
    };

    $scope.checkPermission = function () {
        console.log("Checking Permission ");
        console.log($.cookie('_id'));
        if ($.cookie('_id') == 'null') {
            $scope.resetCookie();
            $location.path('/');
        }
        else {
            restoreUserSession()
            $scope.$apply;
        }
    };

    function restoreUserSession() {
        $scope.master.usersession = {
            _id: $.cookie('_id'),

            email: $.cookie('email'),

            status: true,
            imgurl: $.cookie('imgurl'),
            friends: [ ],
            password: "",
            fullname: $.cookie('fullname'),
            sex: "",
            relationship: $.cookie('relationship'),
            mobilenumber: "",
            age: ""
        };


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

    $scope.checkPermission();


}]);

//Profile Edit Controller
myApp.controller('profileEditController', ['$scope', '$http', function ($scope, $http) {
    console.log('I m Profile Edit Controller');
    $scope.checkPermission();

    $http.get('/user/' + $.cookie('_id'))
        .success(function (data) {
            console.log('ProfileEdit: Get HIT URL');
            console.log(data[0]);
            $scope.master.usersession = data[0];
        }).error(function (err) {
            console.log(err);
        });

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