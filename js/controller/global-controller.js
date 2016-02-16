/**
 * global-controller.js
 */
(function () {
    'use strict';
 
    angular
        .module('barApp')
        .controller('GlobalController', GlobalController);

    GlobalController.$inject = ['$scope', 'AuthService'];

    function GlobalController($scope, AuthService) {
 
        $scope.logout = function() {
            AuthService.killLoggedInUser();
            // TODO: Redirecting to very start page!
        };
    }
})();