/**
 * File: stock-controller.js
 * Author: Max Wijnbladh
 *
 * This controller is responsible for fetching the list of beverages in stock, as well as setting variables used in the stock
 * page and defining the function that is to be run when the Update Stock button is clicked.
 * 
 */

(function () {
    'use strict';

    angular
        .module('barApp')
        .controller('StockController', StockController);

    StockController.$inject = ['$scope', '$window','LocalStorageService', 'DataService'];
    //Init scope and start fetching the beverages in stock.
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
                
                //The list of beverages
                $scope.content = beers;
                //The currently selected beer.
                $scope.currentbeer = "";
                //The ID for the currently selected beer
                $scope.currentID = ""
                //The price for the currently selected beer
                $scope.currentPrice = "Price"
                //The number of bottles in stock for the currently selected beer.
                $scope.currentAmount = "Amount"
                

            //If  the fetching of beers fails, display error message
            }, function(response){
                $scope.content = "Something went wrong!";
            });


        };
        
        //The function which updates the inventory. Takes the ID of the beer that is to be adjusted, the new price and the new number of bottles in stock as parameters.
        $scope.updateInventory = function (currentID, newPrice, newAmount) {
            //Display the parameters in the console
            console.log(currentID, newPrice, newAmount);
            //Run the function definied in the Dataservice.
            DataService.updateInventory(currentID, newAmount, newPrice);

        }

        $scope.init();

    }
})();
