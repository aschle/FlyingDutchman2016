/**
 * File: OrderHistoryController.js
 *
 * This file is the controller for displaying order history of purchases at "The Flying Dutchman"
 *
 * Version 1.0
 * Author: Johan Herelius
 */
(function () {

    'use strict';

    angular
        .module('barApp')
        .controller('OrderHistoryController', OrderHistoryController);

    OrderHistoryController.$inject = ['$scope', '$window', 'DataService', 'LocalStorageService'];

    /* The main control logic for the OrderHistoryController */
    function OrderHistoryController($scope, $window, DataService, LSService) {

        $scope.init = function () {


            $('#menu-vip').hide();
            $('#menu-admin').show();
            $('#warnings').show();
            $('.navbar .container-fluid').show();


            var beers = [];


            DataService.getAllPurchases().then(function(response){
                var count = 0;
                var result;
                $.each(response.data.payload, function(index, value){


                    // check if it is a valid beer
                    if(value.namn !== "") {
                        // get specific data per beer
                        count += 1;


                        result = search(value,beers);
                        value.name = value.namn;
                        if(result != -1) {
                            value.sold = 8;
                            beers[result].push(value);

                        }else{
                            var newBeer = [];
                            newBeer.push(value);
                            beers.push(newBeer);

                        }

                    }
                });

                //save relevant variables to scope
                $scope.currentBeers = [];
                $scope.items = count;
                $scope.content = beers;
                $scope.length = beers.length;


            }, function(response){
                $scope.content = "Something went wrong!";
            });
        };

        /*initialises currentBeers in scope to order*/
        $scope.checkOrder = function(order) {
            $scope.currentBeers = order;
        }

        /*returns index of value in myArray*/
        function search(value, myArray){
            for (var i=0; i < myArray.length; i++) {
                if (myArray[i][0].timestamp == value.timestamp && myArray[i][0].user_id == value.user_id) {
                    return i;
                }

            }
            return -1;
        }

        /* Returns total amount of currentBeers in scope limiting to two decimals*/
        $scope.getTotal = function(){
            var total = 0;
            for(var i = 0; i < $scope.currentBeers.length; i++){
                var product = $scope.currentBeers[i];
                total += parseFloat(product.price);
            }
            return total.toFixed(2);
        }


        $scope.init();

    }
})();
