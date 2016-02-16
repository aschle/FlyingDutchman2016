/**
 * global-controller.js
 */
(function () {
    'use strict';
 
    angular
        .module('barApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope'];

    function HomeController($scope) {
 
        $scope.init = function() {
            $('.nav').hide();
            $('.navbar .container-fluid').hide();

        };

        $scope.init();
    }
})();