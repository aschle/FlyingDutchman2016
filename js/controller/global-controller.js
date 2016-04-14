/**
 * File: global-controller.js
 * Author: Alexa Schlegel
 *
 * This controller looks after global stuff, like highlighting the current
 * navigation element, performing logging out, and switching the language.
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

        /* TODO */
        $scope.passValue =  function(value){
            LSService.setElement("Item",value.namn);    
            $route.reload();

        }

        /* TODO */
        $scope.expandNotice = function () {
            if($scope.activeNotices){
                $scope.content = [];
                $scope.activeNotices = false;
            }else{
                $scope.content = $scope.notices;
                $scope.activeNotices = true;
            }
        }

        /* TODO */
        $scope.changeTheme = function () {
            console.log("change");
            $('body').addClass("alt_theme");
        }

        /* Is called when clicking on change language button, delegates it to
         * the service.
         */
        $scope.switchLanguage = function () {
            I18nService.switchLanguage();
        }
 
        /* Performes logout, removes relvant data from local storage. */
        $scope.logout = function() {
            AuthService.killLoggedInUser();
            $window.location.reload();
        };

        /* Handles highligting of navigation elements. */
        $scope.isActive = function (viewLocation) { 
            return viewLocation === $location.path();
        };

        $scope.init();
    }

})();