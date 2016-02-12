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
});

// create the controller and inject Angular's $scope
barApp.controller('mainController', function($scope) {

    // create a message to display in our view
    $scope.message = 'This is the main page - like home.';
});

// create the controller and inject Angular's $scope
barApp.controller('lastOrdersController', function($scope) {

    // create a message to display in our view
    $scope.message = 'Last oder page, will show last orders soon';
});