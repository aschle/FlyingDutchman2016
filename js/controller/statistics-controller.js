(function () {
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

            var beers = [];

            DataService.getAllPurchases().then(function(response){
                var count = 0;

                $.each(response.data.payload, function(index, value){


                    // check if it is a valid beer
                    if(value.namn !== "") {
                        // get specific data per beer
                        count += 1;

                        if (beers.indexOf(getCleanBeerData(value)) > -1) {
                            beers[beers.indexOf(getCleanBeerData(value))].sold += 1;

                        }else{
                            DataService.getBeerById(value.beer_id).then(function (responseBeer) {
                                value.additionalInfos = (responseBeer.data.payload[0]);
                                beers.push(getCleanBeerData(value));

                            }, function (responseBeer) {
                                $scope.content = "Something went wrong!";
                            })
                        }
                    }
                });

                $scope.items = count;
                $scope.content = beers;

            }, function(response){
                $scope.content = "Something went wrong!";
            });
        };


        function getCleanBeerData(beer){
            var cleanBeer = {};
            cleanBeer.sold          = 1;
            cleanBeer.name          = beer.namn;
            cleanBeer.name2         = beer.namn2;
            cleanBeer.price         = beer.pub_price;
            cleanBeer.id            = beer.beer_id;
            cleanBeer.count         = beer.count;
            cleanBeer.outofstock    = beer.count >= 1 ? false : true;
            cleanBeer.alk           = beer.additionalInfos.alkoholhalt;
            cleanBeer.iskoscher     = beer.additionalInfos.koscher == 1 ? true : false;
            cleanBeer.isorganic     = beer.additionalInfos.ekologisk == 1 ? true : false;
            cleanBeer.packaging     = beer.additionalInfos.forpackning;
            cleanBeer.origin        = beer.additionalInfos.ursprunglandnamn;

            console.log(beer);
            console.log(cleanBeer);
            return cleanBeer;
        }

        $scope.init();

    }
})();

