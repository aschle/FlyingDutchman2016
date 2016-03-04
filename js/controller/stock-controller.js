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

    StockController.$inject = ['$scope', '$window', 'DataService'];

    function StockController($scope, $window, DataService) {

        $scope.init = function () {


            var beers = [];

            DataService.getInventory().then(function(response){


                $.each(response.data.payload, function(index, value){

                    // check if it is a valid beer
                    if(value.namn !== "") {
                        beers.push(value);
                    }

                });

                $scope.content = beers;
                $scope.currentbeer = "Selected beer";
                $scope.currentID = ""
                $scope.currentPrice = "Price"
                $scope.currentAmount = "Amount"


            }, function(response){
                $scope.content = "Something went wrong!";
            });


        };

        $scope.changeBackground = function () {
            var body = document.getElementsByTagName('body')[0];
            console.log('bajs')
            body.background-image = 'url(../img/beer2.jpg)';

        }



        $scope.init();

    }
})();
