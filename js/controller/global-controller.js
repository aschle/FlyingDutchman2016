/**
 * global-controller.js
 */
(function () {
    'use strict';
 
    angular
        .module('barApp')
        .controller('GlobalController', GlobalController);

    GlobalController.$inject = ['$scope', '$route', '$location', '$window', '$http', 'AuthService', 'LocalStorageService', 'DataService'];

    function GlobalController($scope, $route, $location, $window, $http, AuthService, LSService, DataService) {

        // default language is english
        $scope.language = "en";
        $scope.inactiveLanguage = "sv";

        // dictionary to look up translations
        $scope.dictionary = [];

        $scope.init = function() {

            // check for the language setting
            if(!LSService.getElement("language")) {
                LSService.setElement("language", $scope.language);
                LSService.setElement("inactiveLanguage", $scope.inactiveLanguage);
            } else {
                $scope.language = LSService.getElement("language");
                $scope.inactiveLanguage = LSService.getElement("inactiveLanguage");
            }

            if(AuthService.isLoggedIn()){
                $('.panel').show();
                $('.navbar .container-fluid').show();  
            } else {
                $('.panel').hide();
                $('.navbar .dropdown').hide();
            }

            $scope.AuthService = AuthService;

            // Read the default language file
            $http.get('i18n/i18n-' + $scope.language + '.JSON')
            .then(function(response) {
                $scope.dictionary = response.data;
            }, function(response) {
                $scope.content = "Something went wrong with file: i18n/i18n-" + $scope.language + ".JSON'.";
            });

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
            $('body').addClass("testclass");
        }

        $scope.switchLanguage = function () {
            var tmp = $scope.language;
            $scope.language = $scope.inactiveLanguage;
            $scope.inactiveLanguage = tmp;
            LSService.setElement("language", $scope.language);
            LSService.setElement("inactiveLanguage", $scope.inactiveLanguage);

            // should be using some $watch here in the directive
            // instead of a page reload
            $window.location.reload();
        }
 
        $scope.logout = function() {
            AuthService.killLoggedInUser();
            $window.location.reload();
        };

        $scope.isActive = function (viewLocation) { 
            return viewLocation === $location.path();
        };


        $scope.i18n = function (message) {
            return $scope.dictionary[message];
        }

        $scope.init();
    }
})();