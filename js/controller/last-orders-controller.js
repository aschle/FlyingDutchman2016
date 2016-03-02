
/**
 * getPurchaseByUser
 * last-orders-controller.js
 */

(function () {
    'use strict';
 
    angular
        .module('barApp')
        .controller('LastOrdersController', LastOrdersController);

    LastOrdersController.$inject = ['$scope', 'DataService'];

    function LastOrdersController($scope, DataService) {

        $scope.init = function() {

            DataService.getPurchaseByUser().then(function(response){
                var sum = 0;
                var count = 0;
                $.each(response.data.payload, function(index, value){
                    sum += Number(value.price);
                    count += 1;
                });

                $scope.total = sum.toFixed(2);
                $scope.items = count;
                $scope.content = response.data.payload;

            }, function(response){
                $scope.content = "Something went wrong!";
            });

        };

        $scope.init();

    };

})();


            