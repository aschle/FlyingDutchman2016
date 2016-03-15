/**
 * global-controller.js
 */
(function () {
    'use strict';
 
    angular
        .module('barApp')
        .controller('GlobalController', GlobalController);

    GlobalController.$inject = ['$scope', '$route', '$location', '$window', '$http', 'AuthService', 'LocalStorageService', 'DataService', 'I18nService'];

    function GlobalController($scope, $route, $location, $window, $http, AuthService, LSService, DataService, I18nService) {

        $scope.I18nService = I18nService;

        $scope.init = function() {

            if(AuthService.isLoggedIn()){
                $('.panel').show();
                $('.navbar .container-fluid').show();  
            } else {
                $('.panel').hide();
                $('.navbar .dropdown').hide();
            }

            $scope.AuthService = AuthService;

            var beers = [];

            DataService.getInventory().then(function(response){

                $.each(response.data.payload, function(index, value){

                    // check if it is a valid beer
                    if(value.namn !== "" && value.count < 1) {
                        beers.push(value);
                    }

                });

                $scope.content = [];
                $scope.notices = beers
                $scope.activeNotices = false;
            }, function(response){
                $scope.content = "Something went wrong!";

            });

        }

        $scope.passValue =  function(value){
            LSService.setElement("Item",value.namn);    
            $route.reload();

        }

        $scope.expandNotice = function () {
            if($scope.activeNotices){
                $scope.content = [];
                $scope.activeNotices = false;
            }else{
                $scope.content = $scope.notices;
                $scope.activeNotices = true;
            }
        }

        $scope.changeTheme = function () {
            console.log("change");
            $('body').addClass("alt_theme");
        }

        $scope.switchLanguage = function () {
            I18nService.switchLanguage();
        }
 
        $scope.logout = function() {
            AuthService.killLoggedInUser();
            $window.location.reload();
        };

        $scope.isActive = function (viewLocation) { 
            return viewLocation === $location.path();
        };

        $scope.init();
    }

})();