/**
 * beer-controller.js
 */
(function () {
    'use strict';

    var app = angular.module('barApp');
    app.controller('allBeersController', ['$scope', '$http',
        function($scope, $http) { 
            "use strict";

            var action = "inventory_get";

            $http({
                method: 'GET',
                url: 'http://pub.jamaica-inn.net/fpdb/api.php',
                params: { username : "ankov", password : "ankov", action : action }
            }).then(function successCallback(response) {

                var count = 0;
                $.each(response.data.payload, function(index, value){
                    count += 1;
                });

                $scope.items = count;
                $scope.content = response.data.payload;
            }, function errorCallback(response) {
                $scope.content = "Something went wrong!";
            });
        }
    ]);

}());

