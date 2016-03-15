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
                var count = 0;
                $.each(response.data.payload, function(index, value){
                   DataService.getBalanceByUser(value.username,value.username ).then(function(user){
                      count += 1;
                      value.id = user.data.payload[0].user_id;
                       value.currentBalance = user.data.payload[0].assets;
                       console.log(index, value, user, user.data.payload[0].user_id);
                       $scope.progress = (count+1)*100/response.data.payload.length;
                       if(response.data.payload.length == index + 1) {
                        $(".fa-spinner").hide();
                        $(".progress").hide();
                       }
                   }, function(user){
                       $scope.content = "Something went wrong!";
                   })
                   console.log(index, value);

                });
                $scope.content = response.data.payload;
                console.log("ready", response.data.payload.length);

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



