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
                templateUrl : 'pages/admin/statistics.html',
                controller  : 'StatisticsController'
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

            // List of users
            .when('/all-users', {
                templateUrl : 'pages/admin/all-users.html',
                controller  : 'UsersController'
            })

            // List of users
            .when('/add-credit', {
                templateUrl : 'pages/admin/add-credit.html',
                controller  : 'AddCreditController'
            })

            // List of users
            .when('/order-history', {
                templateUrl : 'pages/admin/order-history.html',
                controller  : 'OrderHistoryController'
            })

            .otherwise({
                redirectTo: '/'
            });
    });
})();