/**
 * Created by max on 2016-02-26.
 */

/**
 * stock-controller.js
 */
(function () {
    'use strict';

    angular
        .module('barApp')
        .controller('StockController', StockController);

    StockController.$inject = ['$scope', '$window','LocalStorageService', 'DataService'];

    function StockController($scope, $window, LSService, DataService) {

        $scope.init = function () {

            $scope.search = LSService.getElement("Item");
            var beers = [];

            console.log($scope.search);
            DataService.getInventory().then(function(response){


                $.each(response.data.payload, function(index, value){

                    // check if it is a valid beer
                    if(value.namn !== "") {
                        beers.push(value);
                    }

                });

                $scope.content = beers;
                $scope.currentbeer = "";
                $scope.currentID = ""
                $scope.currentPrice = "Price"
                $scope.currentAmount = "Amount"


            }, function(response){
                $scope.content = "Something went wrong!";
            });


        };

        $scope.updateInventory = function (currentID, newPrice, newAmount) {
            console.log(currentID, newPrice, newAmount);
            DataService.updateInventory(currentID, newAmount, newPrice);

        }

        $scope.init();

    }
})();
