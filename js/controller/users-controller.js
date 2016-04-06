/**
 * File: users-controller.js
 *
 * This file is the controller for adding/deletin/editing users at "The Flying Dutchman" containing JavaScript code.
 *
 * Version 1.0
 * Author: Erik Naess
 */




(function () {
    'use strict';
    // Configuring the controller and selecting which services that will be included (DataService, ContactService etc)
    angular
        .module('barApp')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$scope', 'DataService', 'ContactService'];

    function UsersController($scope, DataService, ContactService) {

    // Fetching the contact list from ContactService in services.js
        $scope.contacts = ContactService.list();

    // Save new or existing contact using function "save" defined in services.js
        $scope.saveContact = function () {
            ContactService.save($scope.newcontact);
            $scope.newcontact = {};
        }

    // Deletes contact using function "delete" defined in services.js
        $scope.delete = function (id) {

            ContactService.delete(id);
            if ($scope.newcontact.id == id) $scope.newcontact = {};
        }

        // Edit contact using function "edit" defined in services.js and copying the user information to form text fields
        $scope.edit = function (id) {
            $scope.newcontact = angular.copy(ContactService.get(id));
        }

    // Initiates controller
        $scope.init();

    }


})();



