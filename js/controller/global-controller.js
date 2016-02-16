/**
 * global-controller.js
 */
(function () {
    'use strict';
 
    angular
        .module('barApp')
        .controller('GlobalController', GlobalController);

    GlobalController.$inject = ['$scope', '$location', 'AuthService'];

    function GlobalController($scope, $location, AuthService) {

        $scope.init = function() {
            if(AuthService.isLoggedIn()){
                $('.nav').show();
                $('.navbar .container-fluid').show();  
            } else {
                $('.nav').hide();
                $('.navbar .container-fluid').hide();  
            }
        }

        $scope.init();
 
        $scope.logout = function() {
            AuthService.killLoggedInUser();
            $location.path('/');
        };
    }
})();