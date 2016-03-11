/**
 * Created by PandaCentral on 2016-03-10.
 */
(function () {

    'use strict';

    angular
        .module('barApp')
        .controller('OrderHistoryController', OrderHistoryController);

    OrderHistoryController.$inject = ['$scope', '$window', 'DataService', 'LocalStorageService'];


    function OrderHistoryController($scope, $window, DataService, LSService) {

        $scope.init = function () {


            $('#menu-vip').hide();
            $('#menu-admin').show();
            $('#warnings').show();
            $('.navbar .container-fluid').show();


            var beers = [];


            DataService.getAllPurchases().then(function(response){
                var count = 0;
                var result;
                $.each(response.data.payload, function(index, value){


                    // check if it is a valid beer
                    if(value.namn !== "") {
                        // get specific data per beer
                        count += 1;


                        result = search(value,beers);
                        value.name = value.namn;
                        if(result != -1) {
                            value.sold = 8;
                            beers[result].push(value);

                        }else{
                            var newBeer = [];
                            newBeer.push(value);
                            beers.push(newBeer);

                        }

                    }
                });

                $scope.currentBeers = [];
                $scope.items = count;
                $scope.content = beers;
                $scope.length = beers.length;


            }, function(response){
                $scope.content = "Something went wrong!";
            });
        };

        $scope.checkOrder = function(order) {
            $scope.currentBeers = order;
        }

        function cleanData(values){
            var newValues = [];
            for (var i = 0; i < values.length; ++i) {
                var dayTime =  values[i].timestamp.split(" ");

                dayTime[0] =  dayTime[0].split("-");
                dayTime[1] =  dayTime[1].split(":");

                var aDate = new Date();
                aDate.setFullYear(dayTime[0][0],dayTime[0][1]-1 ,dayTime[0][2]);
                values[i].date = aDate;
                values[i].time = dayTime[1][0] + dayTime[1][1] + dayTime[1][2];
               // values[i].cmpdate = parseInt(dayTime[0][0] + dayTime[0][1] + dayTime[0][2] + dayTime[1][0] + dayTime[1][1] + dayTime[1][2]);
                //console.log(dayTime[0] + dayTime[1]);

                newValues.push(values[i]);
            }
            return newValues.sort(compareDate);

        }

        function search(value, myArray){
            for (var i=0; i < myArray.length; i++) {
                if (myArray[i][0].timestamp == value.timestamp && myArray[i][0].user_id == value.user_id) {
                    return i;
                }

            }
            return -1;
        }

        function searchDate(keyDate, myArray){
            var count = 0;
            for (var i=0; i < myArray.length; i++) {

                if (myArray[i].date.getFullYear() == keyDate.getFullYear() &&
                    myArray[i].date.getMonth() == keyDate.getMonth() &&
                    myArray[i].date.getDate() == keyDate.getDate()) {
                    count++;
                }

            }
            return count;

        }

        function compareDate(a,b) {
            if (a.date < b.date)
                return -1;
            else if (a.date > b.date)
                return 1;
            else
                return 0;
        }

        $scope.getTotal = function(){
            var total = 0;
            for(var i = 0; i < $scope.currentBeers.length; i++){
                var product = $scope.currentBeers[i];
                total += parseFloat(product.price);
            }
            return total;
        }



        $scope.init();

    }
})();
