/**
 * order-controller.js
 */
(function () {
    'use strict';

    var app = angular.module('barApp');
    app.controller('statisticsController', function($scope) {

        DataService.getAllPurchases().then(function successCallback(response) {

            var sum = 0;
            var count = 0;
            $.each(response.data.payload, function(index, value){
                sum += Number(value.price);
                count += 1;
            });

            $scope.total = sum.toFixed(2);
            $scope.items = count;
            $scope.content = response.data.payload;
        }, function errorCallback(response) {
            $scope.content = "Something went wrong!";
        });
    });

}());