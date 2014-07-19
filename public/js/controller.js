var myApp = angular.module('myApp', ['ngRoute']);

//Routing Config
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
        .when('/myfriend', {
            templateUrl: 'view/myFriend.html',
            controller: 'myfriend'
        })
        .when('/form', {
            templateUrl: 'view/form.html',
            controller: 'formController'
        })
        .when('/profileedit', {
            templateUrl: 'view/profileedit.html',
            controller: 'profileEditController'
        })
        .otherwise({ redirectTo: '/' });
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

        if ($.cookie('_id') == null || $.cookie('_id') == 'undefined') {
            $scope.logout();
        }
        else {
            console.log('Restoring Session');
            restoreUserSession();
            $scope.$apply;
        }
    };

    function restoreUserSession() {

        $http.get('/user/' + $.cookie('_id'))
            .success(function (data) {
                $scope.master.usersession = data[0];
                console.log($scope.master.usersession);
            })
            .error(function (err) {
                console.log(err);
            });
    }
}]);

//Home Controller
myApp.controller('homeController', ['$scope', '$http', function ($scope, $http) {
    console.log('I m Home Controller');
    $scope.checkPermission();

    //Set Time Interval For New Notifications


    //Do Something here

}]);

//MyFriend Controller
myApp.controller('myfriend', ['$scope', '$http', function ($scope, $http) {
    console.log('I m MyFriend Controller');
    $scope.checkPermission();

    $scope.friend = {};
    $scope.friend.all = {};

    $http.get('/user')
        .success(function (data) {

            var toRemove = [];
            toRemove.push($scope.master.usersession._id);

            for (var da = 0; da < $scope.master.usersession.friends.length; da++) {
                toRemove.push($scope.master.usersession.friends[da]._id);
            }

            //Filtering existing friend and myself from the users
            var filterResult = data.filter(function (usr) {
                return !toRemove.some(function (idx) {
                    return idx == usr._id;
                })
            });

            data = filterResult;

            $scope.friend.all = data;

        })
        .error(function (err) {
            console.log(err);
        });

    $scope.sendRequest = function (userindex) {
        console.log($scope.friend.all[userindex]);

        //Add Friend with TRUE Status in his own list
        var youAreMyFriend = {_id: $scope.friend.all[userindex]._id, status: true};
        $scope.master.usersession.friends.push(youAreMyFriend);
        $http.put('/user/' + $scope.master.usersession._id, $scope.master.usersession)
            .success(function (data) {
                console.log(data);
            })
            .error(function (err) {
                console.log(err);
            });

        //Add Me in Your Friend List with Status False
        var addMeAsFriend = {_id: $scope.master.usersession._id, status: false};
        $scope.friend.all[userindex].friends.push(addMeAsFriend);
        $http.put('/user/' + $scope.friend.all[userindex]._id, $scope.friend.all[userindex])
            .success(function (data) {
                console.log(data);
                $scope.friend.all.splice(userindex, 1);
                $scope.$apply;
            })
            .error(function (err) {
                console.log(err);
            });
    };
}]);

//Form Controller
myApp.controller('formController', ['$scope', '$http', function ($scope, $http) {
    console.log('I m form Controller');
    $scope.checkPermission();

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
            $scope.master.usersession = data[0];
        }).error(function (err) {
            console.log(err);
        });

    $scope.profileupdate = function () {
        console.log('Profile update button clicked');

        if ($.cookie('_id')) {
            $http.put('/user/' + $scope.master.usersession._id, $scope.master.usersession)
                .success(function (data) {
                    console.log("result>> " + data);
                })
                .error(function (err) {
                    console.log("Error >>" + err);
                });
        }
        else {
        }
    };
}]);