/**
 * beer-controller.js
 *
 */




(function () {
    'use strict';

    angular
        .module('barApp')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$scope', 'DataService', ContactService];

    function UsersController($scope, DataService, ContactService) {


        $scope.contacts = ContactService.list();

        $scope.saveContact = function () {
            ContactService.save($scope.newcontact);
            $scope.newcontact = {};
        }


        $scope.delete = function (id) {

            ContactService.delete(id);
            if ($scope.newcontact.id == id) $scope.newcontact = {};
        }


        $scope.edit = function (id) {
            $scope.newcontact = angular.copy(ContactService.get(id));
        }

        $scope.init = function () {

            $('.panel').show();
            $('.navbar .container-fluid').show();

            DataService.getAllUsers().then(function(response){

                var userList = {};
                $.each(response.data.payload, function(index, value){
                   console.log(index, value);

                });


                $scope.content = response.data.payload;


            }, function(response){
                $scope.content = "Something went wrong!";
            });
        };

        $scope.init();

    }


})();



