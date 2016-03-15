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
                   DataService.getBalanceByUser(value.username,value.username ).then(function(user){
                      value.id = user.data.payload[0].user_id;
                       value.currentBalance = user.data.payload[0].assets;
                       console.log(index, value, user, user.data.payload[0].user_id);
                   }, function(user){
                       $scope.content = "Something went wrong!";
                   })
                   console.log(index, value);

                });
                $scope.content = response.data.payload;


            }, function(response){
                $scope.content = "Something went wrong!";
            });

            $scope.currentUser = "Selected user";
            $scope.currentID = "";
            $scope.currentCredit = ""
        };

        $scope.updateCredit = function (newCredit, CurrentID) {

           DataService.addCredit(newCredit, CurrentID);

            

            $("#credit-not-added").attr("id", "credit-success");

            setTimeout(function(){location.reload();},3000);


        }


        $scope.init();

    }


})();



