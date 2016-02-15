/**
 * app.js
 * 
 * initialization, config and routing
 */

(function () {
    'use strict';
     var app = angular.module('barApp', ['ngRoute']);

    // configure our routes
    app.config(function($routeProvider) {
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
})();