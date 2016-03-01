(function () {
    google.charts.load('current', {'packages':['corechart']});
    'use strict';

    angular
        .module('barApp')
        .controller('StatisticsController', StatisticsController);

    StatisticsController.$inject = ['$scope', '$window', 'DataService', 'LocalStorageService'];

    function StatisticsController($scope, $window, DataService, LSService) {

        $scope.init = function () {



            $('#menu-vip').show();
            $('#menu-admin').show();
            $('.navbar .container-fluid').show();

            //google.charts.load('current', {'packages':['corechart']});
            //google.charts.setOnLoadCallback(drawChart);

            var beers = [];

            DataService.getAllPurchases().then(function(response){
                var count = 0;
                var result;
                $.each(response.data.payload, function(index, value){


                    // check if it is a valid beer
                    if(value.namn !== "") {
                        // get specific data per beer
                        count += 1;


                        result = search(value.beer_id,beers);
                        value.name = value.namn;
                        if(result != -1) {

                            beers[result].sold += 1;

                        }else{
                            value.sold = 1;
                            beers.push(value);

                        }

                    }
                });

                $scope.items = count;
                $scope.content = beers;


                google.charts.setOnLoadCallback(drawChart);

            }, function(response){
                $scope.content = "Something went wrong!";
            });
        };


        //google.charts.load('current', {'packages':['corechart']});
        //google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = google.visualization.arrayToDataTable([
                ['Year', 'Sales', 'Expenses'],
                ['2004',  1000,      400],
                ['2005',  1170,      460],
                ['2006',  660,       1120],
                ['2007',  1030,      540]
            ]);

            var options = {
                title: 'Company Performance',
                width:400,
                height:300,

            };

            var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

            chart.draw(data, options);
        }


        function search(nameKey, myArray){
            for (var i=0; i < myArray.length; i++) {
                if (myArray[i].beer_id == nameKey) {
                    return i;
                }

            }
            return -1;
        }




        $scope.init();

    }
})();

