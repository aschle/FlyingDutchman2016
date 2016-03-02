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

            // home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'HomeController'
            })

            // login page
            .when('/login', {
                templateUrl : 'pages/login.html',
                controller  : 'LoginController'
            })

           // User: All beers
            .when('/user', {
                templateUrl : 'pages/user/all-beers.html',
                controller  : 'AllBeersController'
            })

            // User: Last orders page
            .when('/last-orders', {
                templateUrl : 'pages/user/last-orders.html',
                controller  : 'LastOrdersController'
            })

            // admin start page
            .when('/admin', {
                templateUrl : 'pages/admin/index.html',
                controller  : 'TMPadminController'
            })

            // statistics page
            .when('/statistics', {
                templateUrl : 'pages/admin/statistics.html',
                controller  : 'StatisticsController'
            })

            // stock start page
            .when('/stock', {
                templateUrl : 'pages/admin/stock.html',
                controller  : 'StockController'
            })


            .otherwise({
                redirectTo: '/'
            });
    });
})();