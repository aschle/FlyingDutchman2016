/**
 * beer-controller.js
 */
(function () {
    'use strict';
 
    angular
        .module('barApp')
        .controller('AllBeersController', AllBeersController);

    AllBeersController.$inject = ['$scope', '$window', 'DataService', 'LocalStorageService'];

    function AllBeersController($scope, $window, DataService, LSService) {

        $scope.cartMax = 5;
        $scope.currentCartCount = 0;
        $scope.allBeers = [];
        $scope.balance = 0;

        $scope.cart = [];       // should be in local storage
        $scope.limit = 0;       // should be also in local storage
        $scope.likes = [];      // should be in local storage

        $scope.beersInCart = [];
        $scope.allBeers = [];
        $scope.isCartActive = true;

        $scope.init = function () {

            $('#menu-vip').show();
            $('#menu-admin').hide();
            $('.navbar .container-fluid').show();

            var beers = [];

            DataService.getInventory().then(function(response){
                var count = 0;

                $.each(response.data.payload, function(index, value){
                    count += 1;

                    // check if it is a valid beer
                    if(value.namn !== "") {
                        // get specific data per beer
                        DataService.getBeerById(value.beer_id).then(function(responseBeer){
                            value.additionalInfos = (responseBeer.data.payload[0]);
                            var beer = getCleanBeerData(value);
                            beers.push(beer);

                            // if the beer is in the cart also keep those infos
                            $.each($scope.cart, function(i, v){
                                if (value.beer_id == v.beer_id) {
                                    $scope.beersInCart.push(beer);
                                }
                            });

                        }, function(responseBeer){
                            $scope.content = "Something went wrong!";
                        })
                    }
                });

                $scope.content = beers;
                $scope.allBeers = beers;

            }, function(response){
                $scope.content = "Something went wrong!";
            });

            // check for the cart
            if(LSService.getObject("cart") === null) {
                LSService.setObject("cart", []);
            } else {
                $scope.cart = LSService.getObject("cart");
            }

            $scope.limit = Number(LSService.getObject("limit"));
            $scope.likes = LSService.getObject("likes");

            // set the current balance a user has
            DataService.getBalanceByUser(LSService.getElement("username"), LSService.getElement("password")).then(function(response){
                $scope.balance = Number(response.data.payload[0].assets);
                console.log(response.data.payload[0]);
            }, function(response){
                // error: TODO
            });
        };

        /**
         * Looks at the local storage variable 'cart' and send an purchase for each element to the DB.
         */
        $scope.placeOrder = function () {
            $scope.cart = LSService.getObject("cart");
            $.each($scope.cart, function(index, value){
                DataService.purchaseOneBeer(value.beer_id).then(function(response){
                    // reset the cart in local storage
                    LSService.setObject("cart", []);
                    $window.location.reload();

                }, function(response){
                    $scope.content = "Something went wrong!";
                })
            });
        }

        $scope.deleteBeer = function (index) {
            console.log(index);
        }

        /**
        * Handels the dropping of a beer into the cart.
        * The cart is saved to the local storage.
        * In case of reload things can be restored.
        */
        $scope.handleDrop = function(id) {

            // very inefficient stuff here sorry
            // find beer with id
            var beer;
            $.each($scope.allBeers, function(key, value){
                if(value.id == id){
                    beer = value;
                }
            });

            // if maximum of bottles is not reached yet or credit limit will not be exceeded then it is save to add beer to cart
            if ($scope.cart.length < $scope.cartMax && isSave(beer)) {
                $scope.cart = LSService.getObject("cart");
                $scope.cart.push({"beer_id": id});
                LSService.setObject("cart", $scope.cart);
                $scope.beersInCart.push(beer);

            } else {
                $scope.isCartActive = false;
            }

            // to update the scope so the total number in cart changes
            $scope.$apply() 
        }

        $scope.totalItems = function() {
            return $scope.cart.length;
        }

        $scope.totalMoney = function() {
            var sum = 0;
            $.each($scope.beersInCart, function(key, value){
                sum += Number(value.price);
            })
            return sum;
        }

        function isSave(beer){
            var futureMoney = $scope.totalMoney() + Number(beer.price);
            var current = $scope.limit + $scope.balance;
            console.log(futureMoney);
            console.log(current);

            return futureMoney <= current;
        }

        function getCleanBeerData(beer){
            var cleanBeer = {};
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

            return cleanBeer;
        }

        $scope.init();

    }
})();

