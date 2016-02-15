// myjs.js

// create the module and name it
var barApp = angular.module('barApp', ['ngRoute']);

// configure our routes
barApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })

        // route for the last order page
        .when('/last-orders', {
            templateUrl : 'pages/last-orders.html',
            controller  : 'lastOrdersController'
        })

        // route for alle beer page
        .when('/all-beers', {
            templateUrl : 'pages/all-beers.html',
            controller  : 'allBeersController'
        })
});

// Services are used for sharing information across controllers
barApp.factory('UserService', function() {

    factory = {};

    factory.getCurrentUser = function() {
        return "ankov";
    }

    factory.getPassword = function() {
        return "ankov";
    }

    return factory;
});

// create the controller and inject Angular's $scope
barApp.controller('mainController', function($scope) {

    // create a message to display in our view
    $scope.message = 'This is the main page - like home.';
});



// create the controller and inject Angular's $scope
barApp.controller('lastOrdersController', function($scope, $http) {

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

barApp.controller('allBeersController', ['$scope', '$http', 'UserService',
    function($scope, $http, UserService) { 
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
