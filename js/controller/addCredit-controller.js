/**
 * beer-controller.js
 *
 */




(function () {
    'use strict';

    angular
        .module('barApp')
        .controller('AddCreditController', AddCreditController);

    AddCreditController.$inject = ['$scope', 'DataService'];

    function AddCreditController($scope, DataService) {


        $scope.init = function () {


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



