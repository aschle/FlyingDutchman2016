/**
 * beer-controller.js
 */
(function () {
    'use strict';
 
    angular
        .module('barApp')
        .controller('AllBeersController', AllBeersController);

    AllBeersController.$inject = ['$scope', 'DataService'];

    function AllBeersController($scope, DataService) {
 
        $scope.init = function () {
            DataService.getInventory().then(function(response){
                var count = 0;
                var beerList = {};
                $.each(response.data.payload, function(index, value){
                    count += 1;

                    // get specific data per beer
                    DataService.getBeerById(value.beer_id).then(function(responseBeer){
                        value.additionalInfos = (responseBeer.data.payload[0]);
                    }, function(responseBeer){
                        $scope.content = "Something went wrong!";
                    })
                });

                $scope.items = count;
                $scope.content = response.data.payload;


            }, function(response){
                $scope.content = "Something went wrong!";
            });
        };

        $scope.init();
    }
})();

