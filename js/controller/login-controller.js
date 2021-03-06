/**
 * File: login-controller.js
 * Author: Alexa Schlegel
 *
 * This controller performs the login of a user or admin. It first checks by
 * missusing the "getBalanceByUser" method if a username is in the database,
 * if yes it checks the passwords and looks up the role in a local JSON file.
 * If everything went fine, it saves the logged-in user in local storage.
 * Depending on the role of the user the appropriate start page is loaded.
 */
(function () {
    'use strict';
 
    angular
        .module('barApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$http', '$location', 'DataService', 'LocalStorageService', 'AuthService'];

    function LoginController($scope, $http, $location, DataService, LocalStorageService, AuthService) {

        $scope.isWrongPwUser = false;
        $scope.isWrongPwUser = false;
 
        $scope.login = function() {
            // add a spinnter to indicate it is doing something
            $('.btn-toolbar').append('<i class="fa fa-fw fa-2x fa-spinner fa-spin pull-right"></i>');

            // miss-using getBalanceByUser to check if that person exists in DB
            DataService.getBalanceByUser($scope.username, $scope.password)
            .then(function(response) {

            // first function handles success
            if(response.data.payload[0].hasOwnProperty('assets')) {

                // this user seems to exist
                // check password equals username
                if($scope.username === $scope.password) {

                    // find out user role: could not find it in API so
                    //I created a new local JSON file
                    var users = LocalStorageService.getObject('users');
                    var role, limit, likes;

                    $.each(users, function(key, value) {

                        if (value.name === $scope.username) {
                            role = value.role;
                            limit = value.limit;
                            //store stuff in local storage to use later for
                            // API and whatever else is needed
                            AuthService.setLoggedInUser($scope.username, $scope.password, role, limit);
                        } else {
                            //Error
                        }
                    });

                    //Redirect depending on role to admin/user home page 
                    $location.path('/' + role + '/');
                } else {
                    $scope.isWrongUser = true;
                    $('.fa-spinner').hide();
                }

            } else {
                //user not in DB
                $scope.isWrongUser = true;
                $('.fa-spinner').hide();
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