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
                controller  : 'HomeController'
            })

            // login page
            .when('/login', {
                templateUrl : 'pages/login.html',
                controller  : 'LoginController'
            })

            // admin page
            .when('/admin', {
                templateUrl : 'pages/admin/index.html'
            })

            // user page
            .when('/user', {
                templateUrl : 'pages/user/index.html'
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