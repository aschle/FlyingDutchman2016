/**
 * login-controller.js
 */
(function () {
    'use strict';
 
    angular
        .module('barApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$http', '$location', 'DataService', 'LocalStorageService', 'AuthService'];

    function LoginController($scope, $http, $location, DataService, LocalStorageService, AuthService) {
 
        $scope.login = function() {
            //Miss-using getBalanceByUser to check if that person exists in DB
            DataService.getBalanceByUser()
            .then(function(response) {
            //First function handles success
            if(response.data.payload[0].hasOwnProperty('assets')) {
                //this user seems to exist
                //check password equals username
                if($scope.username === $scope.password) {
                    // find out user role: could not find it in API so I created a new local JSON file
                    var users = LocalStorageService.getObject('users');
                    var role, limit, likes;
                    $.each(users, function(key, value) {
                        if (value.name === $scope.username) {
                            role = value.role;
                            limit = value.limit;
                            likes = value.likes;
                            //store stuff in local storage to use later for API and whatever else is needed
                            AuthService.setLoggedInUser($scope.username, $scope.password, role, limit, likes);
                        } else {
                            //TODO: do something if something went wrong
                        }
                    });
                    //Redirect depending on role to admin/user home page 
                    $location.path('/' + role + '/');
                } else {
                    //password was incorrect
                    //TODO: Error Message to user
                }

            } else {
                //user not in DB
                //TODO: Error Message to user
            }
            }, function(response) {
            //Second function handles error
            $scope.content = "Something went wrong with the DB.";
            });
        };

        $scope.init = function () {            
            // write JSON file to local storage
            $http.get('users.JSON')
            .then(function(response) {
                LocalStorageService.setObject('users', response.data.users);
            }, function(response) {
                $scope.content = "Something went wrong with file: user.JSON.";
            });

            //check if somebody is already logged in skip page then
            //Redirect depending on role to admin/user home page
            if(AuthService.isLoggedIn() == true) {
                $location.path('/' + AuthService.getLoggedInUserRole() + '/');
            }
        };

        $scope.init();
    }
})();