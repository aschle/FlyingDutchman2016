/**
 * app.js
 *
 * This file includes the main setup of the angular app. Here we register the
 * barApp module and the configuration of the routing. We define which
 * controller should be used for what page/route.
 * 
 */

(function () {
    'use strict';
     var app = angular.module('barApp', ['ngRoute']);

    // Configure our routes
    app.config(function($routeProvider) {
        $routeProvider

            // Home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'HomeController'
            })

            // Login page
            .when('/login', {
                templateUrl : 'pages/login.html',
                controller  : 'LoginController'
            })

           // User page: all beers page (ordering page) - Start page of user
            .when('/user', {
                templateUrl : 'pages/user/all-beers.html',
                controller  : 'AllBeersController'
            })

            // User page: last orders page
            .when('/last-orders', {
                templateUrl : 'pages/user/last-orders.html',
                controller  : 'LastOrdersController'
            })

            // Admin page:  start page of admin (redirects to statistics)
            .when('/admin', {
                redirectTo : '/statistics'
            })

            // Admin page: statistics page
            .when('/statistics', {
                templateUrl : 'pages/admin/statistics.html',
                controller  : 'StatisticsController'
            })

            // Admin page: stock page
            .when('/stock', {
                templateUrl : 'pages/admin/stock.html',
                controller  : 'StockController'
            })

            // Admin page: list of all users
            .when('/all-users', {
                templateUrl : 'pages/admin/all-users.html',
                controller  : 'UsersController'
            })

            // Admin page: list of users and credits
            .when('/add-credit', {
                templateUrl : 'pages/admin/add-credit.html',
                controller  : 'AddCreditController'
            })

            // Admin page: List of users and the order history
            .when('/order-history', {
                templateUrl : 'pages/admin/order-history.html',
                controller  : 'OrderHistoryController'
            })

            // In all other cases redirect to very start page
            // If somebody is logged in this will redirect to admin or users
            // start page.
            .otherwise({
                redirectTo: '/'
            });
    });
})();