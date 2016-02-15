
/**
 * order-controller.js
 */
(function () {
    'use strict';

    var app = angular.module('barApp');
    app.controller('lastOrdersController', function($scope, $http) {

        var username = "ankov";
        var password = "ankov";
        var action = "purchases_get";

        $http({
            method: 'GET',
            url: 'http://pub.jamaica-inn.net/fpdb/api.php',
            params: { username : username, password : password, action : action }
        }).then(function successCallback(response) {

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