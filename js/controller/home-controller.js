/**
 * File: home-controller.js
 * Author: Alexa Schlegel
 *
 * This controller only redicets to the correct start page depending on the
 * role of the user.
 */
(function () {
    'use strict';
 
    angular
        .module('barApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$location', 'AuthService'];

    function HomeController($scope, $location, AuthService) {
 
        $scope.init = function() {
            if(AuthService.isLoggedIn()){
                $location.path('/' + AuthService.getLoggedInUserRole() + '/');
            }
        };

        $scope.init();
    }
})();