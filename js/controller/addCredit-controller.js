/**
 * addCredit-controller.js
 *
 * This file is the controller for adding credit to users at "The Flying Dutchman" containing JavaScript code.
 *
 * Version 1.0
 * Author: Erik Naess
 */




(function () {
    'use strict';
// Configuring the controller
    angular
        .module('barApp')
        .controller('AddCreditController', AddCreditController);

    AddCreditController.$inject = ['$scope', 'DataService'];

    function AddCreditController($scope, DataService) {


        $scope.init = function () {

    // Gathers all the user from the database with the DataService getAllUsers defined in services.js
            DataService.getAllUsers().then(function(response){

                // Sets the objects starting number
                var count = 0;
                // For each loop to gather all the objects from the service getAllUsers
                $.each(response.data.payload, function(index, value){
                // Within this loop, another for each loop is used because of limitations in the API. This loop
                // fetches specific data for each user. So for each username in getAllUsers it checks for the same username
                // in the service getBalanceByUser in order to get user_id and assets needed to add credit to a user in the API
                   DataService.getBalanceByUser(value.username,value.username ).then(function(user){
                      count += 1;
                // Fetches user id
                      value.id = user.data.payload[0].user_id;
                // Fetches correct balance
                       value.currentBalance = user.data.payload[0].assets;
                       console.log(index, value, user, user.data.payload[0].user_id);
                // Displays the progress of fetching all the data in a progress bar
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
            // Gets information from selected user in the right area
            $scope.currentUser = "Selected user";
            $scope.currentID = "";
            $scope.currentCredit = ""
        };
        // Function for updating credit using the DataService addCredit
        $scope.updateCredit = function (newCredit, CurrentID) {

           DataService.addCredit(newCredit, CurrentID);

            // Shows feedback message when adding credit
            $("#credit-not-added").attr("id", "credit-success");
            // Reloads the page after 3 secons in order to update credit
            setTimeout(function(){location.reload();},3000);


        }


        $scope.init();

    }


})();



