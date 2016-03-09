/**
 * beer-controller.js
 */
(function () {
    'use strict';
 
    angular
        .module('barApp')
        .controller('TMPadminController', TMPadminController);

    TMPadminController.$inject = ['$scope'];

    function TMPadminController($scope) {

        $scope.init = function () {
            $('#menu-vip').hide();
            $('#menu-admin').show();
            $('.navbar .dropdown').show();
        };

        $scope.init();

    }
})();

