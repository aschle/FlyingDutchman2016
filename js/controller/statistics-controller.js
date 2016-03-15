(function () {

    'use strict';

    angular
        .module('barApp')
        .controller('StatisticsController', StatisticsController);

    StatisticsController.$inject = ['$scope', '$window', 'DataService', 'LocalStorageService'];



    google.charts.load('current', {'packages':['corechart']});
    function StatisticsController($scope, $window, DataService, LSService) {

        $scope.init = function () {


            $('#menu-vip').hide();
            $('#menu-admin').show();
            $('#warnings').show();
            $('.navbar .dropdown').show();


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
                            value.sold = 8;
                            beers[result].push(value);

                        }else{
                            var newBeer = [];
                            newBeer.push(value);
                            beers.push(newBeer);

                        }

                    }
                });

                $scope.items = count;
                $scope.content = beers;
                $scope.length = beers.length;


            }, function(response){
                $scope.content = "Something went wrong!";
            });
        };



        function search(nameKey, myArray){
            for (var i=0; i < myArray.length; i++) {
                if (myArray[i][0].beer_id == nameKey) {
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
                //console.log(dayTime[0] + dayTime[1]);

                newValues.push(values[i]);
            }
            return newValues.sort(compareDate);

        }

        $scope.displayWarnings = function() {
            var warningPanel = document.getElementById('curve_chart');
            warningPanel.innerHTML = mu;
        }


        $scope.addToGraph = function(values){



            var cleanDates = cleanData(values);

            var options = {
                title: "last 25 beverage sales",
                width:500,
                height:400,
                legend: { position: 'none' },
                chartArea: {  width: "85%", height: "70%" },
                vAxis: {title:"sold", viewWindowMode:'explicit', format: '0',
                    viewWindow:{
                        max:50,
                        min:0
                    }},
                hAxis:{title:"date"}

            };

            var dataArray =  [['saledate', values[0].name]];

            var idate = new Date();
            idate.setDate(idate.getDate() - 30);

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);


            for (var i = idate; i < tomorrow; i.setDate(i.getDate() + 1)) {
                var currentMonth = parseInt(i.getMonth());
                currentMonth++;
                var parse = searchDate(i,cleanDates);
                if(parse != 0){
                    dataArray.push([currentMonth.toString() +'/'+ i.getDate(), parse]);
                }else{
                    dataArray.push([currentMonth.toString() +'/'+ i.getDate(),0]);
                }
            }

            var data = google.visualization.arrayToDataTable(dataArray);

            var chart = new google.visualization.ColumnChart(document.getElementById('curve_chart'));
            chart.draw(data, options);

        }



        $scope.init();

    }
})();
