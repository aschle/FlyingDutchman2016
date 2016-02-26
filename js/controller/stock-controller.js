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

            }, function(response){
                $scope.content = "Something went wrong!";
            });


        };


        $scope.init();

    }
})();
