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
 
        $scope.logout = function() {
            AuthService.killLoggedInUser();
            $location.path('/');
        };
    }
})();