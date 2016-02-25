/**
 * beer-controller.js
 */
(function () {
    'use strict';
 
    angular
        .module('barApp')
        .controller('AllBeersController', AllBeersController);

    AllBeersController.$inject = ['$scope', '$window', 'DataService', 'LocalStorageService'];

    function AllBeersController($scope, $window, DataService, LSService) {

        $scope.init = function () {

            $('#menu-vip').show();
            $('#menu-admin').hide();
            $('.navbar .container-fluid').show();

            var beers = [];

            DataService.getInventory().then(function(response){
                var count = 0;

                $.each(response.data.payload, function(index, value){
                    count += 1;

                    // check if it is a valid beer
                    if(value.namn !== "") {
                        // get specific data per beer
                        DataService.getBeerById(value.beer_id).then(function(responseBeer){
                            value.additionalInfos = (responseBeer.data.payload[0]);
                            beers.push(value);
                        }, function(responseBeer){
                            $scope.content = "Something went wrong!";
                        })
                    }
                });

                $scope.items = count;
                $scope.content = beers;

            }, function(response){
                $scope.content = "Something went wrong!";
            });

            // check for the cart
            if(LSService.getObject("cart") === null) {
                LSService.setObject("cart", []);
            } else {
                // do something smart here
            }
        };

        /**
         * Looks at the local storage variable 'cart' and send an purchase for each element to the DB.
         */
        $scope.placeOrder = function () {
            var cart = LSService.getObject("cart");
            $.each(cart, function(index, value){
                DataService.purchaseOneBeer(value.beer_id).then(function(response){
                    // reset the cart in local storage
                    LSService.setObject("cart", []);
                    $window.location.reload();

                }, function(response){
                    $scope.content = "Something went wrong!";
                })
            });
        }

        $scope.init();

    }
})();

