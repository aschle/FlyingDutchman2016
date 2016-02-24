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

            $('#menu-VIP').hide();
            $('#menu-admin').show();
            $('.navbar .container-fluid').show();  
        };

        $scope.init();

    }
})();

