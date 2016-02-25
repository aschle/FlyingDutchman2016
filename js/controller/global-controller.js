/**
 * global-controller.js
 */
(function () {
    'use strict';
 
    angular
        .module('barApp')
        .controller('GlobalController', GlobalController);

    GlobalController.$inject = ['$scope', '$location', '$window', 'AuthService'];

    function GlobalController($scope, $location, $window, AuthService) {

        $scope.init = function() {
            if(AuthService.isLoggedIn()){
                $('.panel').show();
                $('.navbar .container-fluid').show();  
            } else {
                console.log("hide general all panels");
                $('.panel').hide();
                $('.navbar .container-fluid').hide();  
            }

            $scope.AuthService = AuthService;
        }

        $scope.init();
 
        $scope.logout = function() {
            AuthService.killLoggedInUser();
            $window.location.reload();
        };

        $scope.isActive = function (viewLocation) { 
            return viewLocation === $location.path();
        };
    }
})();