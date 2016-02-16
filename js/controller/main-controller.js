/**
 * main-controller.js
 */
(function () {
    'use strict';

    var app = angular.module('barApp');
    app.controller('MainController', function($scope) {

        // create a message to display in our view
        $scope.message = 'This is the main page - like home.';
    });

}());