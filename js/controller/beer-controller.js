/**
 * File: beer-controller.js
 * Author: Alexa Schlegel
 *
 * This controller is responsible for the complete process of
 * "placing an order". It displays a list of all beers, which can be added to
 * the cart, it also provided the functionality for undo/redo.
 * 
 */
(function () {
    'use strict';
 
    angular
        .module('barApp')
        .controller('AllBeersController', AllBeersController);

    AllBeersController.$inject = ['$scope', '$window', 'DataService', 'LocalStorageService', 'AuthService'];

    function AllBeersController($scope, $window, DataService, LSService, AuthService) {

        // ******
        // VARIABLES START
        // ******

        // Variables for canceling an order after certain amount of time
        var limit = 10000; // time to cancel an oder
        var timer = null;
        var counter = null;

        // Number of advertised beers
        $scope.popularLimit = 2;

        // Name of logged in user
        $scope.username = "";

        // Number of maximal items in cart
        $scope.cartMax = 5;

        // Number of current elements in cart
        $scope.currentCartCount = 0;

        // List of all beers
        $scope.allBeers = [];

        // Current balance of user
        $scope.balance = 0;

        // List of beers in cart
        $scope.cart = [];

        // Credit limit of the user
        $scope.limit = 0;

        // List of beers the user saved as favorites
        $scope.likes = [];

        // List of beers in cart
        $scope.beersInCart = [];
        
        // Boolean for indicating if it is still possible to put beer in
        $scope.isCartActive = true;

        // ******
        // VARIABLES END
        // ******

        /**
        * Function which is called, when the vip customer page is loaded.
        * It shows a list of all beers and initializes everything needed, it
        * sets global variables, needed within this controller.
        */
        $scope.init = function () {

            $scope.cartHistory = [];
            $scope.cartCurrent = -1;

            $scope.username = AuthService.getLoggedInUser().username;

            // Show and hide relevant menus
            $('#menu-vip').show();
            $('#menu-admin').hide();
            $('#warnings').hide();
            $('.navbar .dropdown').show();

            var beers = [];

            // check for the liked beers in local storage
            // retrieve if this user already had saved something
            if(LSService.getObject($scope.username + "_likes") === null) {
                LSService.setObject($scope.username + "_likes", []);
            } else {
                $scope.likes = LSService.getObject($scope.username + "_likes");
            }

            // load the inventory and display nicely
            DataService.getInventory().then(function(response){
                var count = 0;

                $.each(response.data.payload, function(index, value){
                    console.log(response.data.payload);
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

            }, function(response){
                $scope.content = "Something went wrong!";
            });

            // check for the cart in local storage
            if(LSService.getObject("cart") === null) {
                LSService.setObject("cart", []);
            } else {
                $scope.cart = LSService.getObject("cart");
            }

            // set the credit limit of the user
            $scope.limit = Number(LSService.getObject("limit"));

            // set the current balance a user has
            DataService.getBalanceByUser(LSService.getElement("username"), LSService.getElement("password")).then(function(response){
                $scope.balance = Number(response.data.payload[0].assets);
            }, function(response){
                // Error
            });
        };


        /*
         * Undo an actions that has previously been executed.
         */
        $scope.undoAction = function() {

            //get the current state of the cart action queue
            var actions = $scope.cartHistory;
            var cursor = $scope.cartCurrent;

            //only undo if there is and action to undo at the current state of the queue
            if(cursor != -1){
                if(actions[cursor][0] == "add"){
                    $scope.deleteBeerById(actions[cursor][1]);
                }else{
                    $scope.handleDrop(actions[cursor][1]);
                }
                --$scope.cartCurrent;
            }
        }

        /*
         * Redo an action if there are any actions that have been undone.
         */
        $scope.redoAction = function() {

            //get the current state of the cart action queue
            var actions = $scope.cartHistory;
            var cursor = $scope.cartCurrent;

            //check if there is currently any actions that have been undone
            //and that the action queue length is greater than 0
            if(actions.length - 1 > (cursor) && actions.length != 0){
                $scope.cartCurrent++;
                cursor = $scope.cartCurrent;

                //determine if the undone action was an add or a remove
                if(actions[cursor][0] == "add"){
                    $scope.handleDrop(actions[cursor][1]);
                }else{
                    $scope.deleteBeerById(actions[cursor][1]);
                }
            }
        }

        /*
         * Add a new action to the action Queue with data needed to undo and
         * redo the action. This function will remove all previous redo-able
         * actions
         */
        $scope.addAction = function(action,value){

            //get the current state of the cart action queue
            var cursor = $scope.cartCurrent;
            var actions =  $scope.cartHistory;
            var target = value;

            //perform the action
            if(action == "add"){
                $scope.handleDrop(value);
                $scope.$apply();
            }else{
                target = $scope.deleteBeer(value);
            }

            //update the cart action queue with the new action and the value used to perform it
            //the action is inserted at the current queue position indicated by "cartCurrent"
            if(target != null){
                $scope.cartCurrent++;
                $scope.cartHistory.splice($scope.cartCurrent, (actions.length - cursor),[action, target]);

            }
        }

        /* Returns true if it is possoble to undo an action. */
        $scope.canUndo = function () {
            return !($scope.cartCurrent == -1);
        }

        /* Returns true if it is possoble to redo an action. */
        $scope.canRedo = function () {
            return !($scope.cartCurrent + 1 == $scope.cartHistory.length);
        }

        /* When closing the overlay (showing the items in the cart) the timer
         * has to be reset, when canceling the action.
         */
        function clearTimer() {
            $('.overlay-footer span').remove();
            clearTimeout(timer);
            timer = null;
            clearInterval(counter);
            counter = null;
        }

        /**
         * Looks at the local storage variable 'cart' and send an purchase for
         * each element to the DB.
         */
        $scope.placeOrder = function () {

            clearTimer();

            $scope.cart = LSService.getObject("cart");
            $.each($scope.cart, function(index, value){
                DataService.purchaseOneBeer(value.beer_id).then(function(response){
                    // reset the cart in local storage
                    LSService.setObject("cart", []);
                    $window.location.reload();

                }, function(response){
                    $scope.content = "Something went wrong!";
                })
            });;
        }

        /* Is called if the cancel button or X is clicked on the overlay. */
        $scope.cancelOrder = function () {
            clearTimer();
            $('.overlay').hide();
        }

        /* Shows an overlay, when clicking the purchase button, starts
         * animation/countdown.
         */
        $scope.showModal = function(){
            $('.overlay').show();
            timer = setTimeout($scope.placeOrder, limit + 10);

            var i;
            for (i = 0; i < limit/1000; i++) { 
                $('.overlay-footer').append("<span class='tick'></span>");
            }

            counter = setInterval(function(){
                $('.overlay-footer').prepend("<span class='tick active'></span>");
                $('.overlay-footer span:last-child').remove();
            }, 1000);
        };

        /* Deletes a beer from cart, in local storage and in model. */
        $scope.deleteBeer = function (index) {
            // update local storage
            $scope.cart.splice(index,1);
            LSService.setObject("cart", $scope.cart);
            var beer = $scope.beersInCart.splice(index,1);
            $scope.isCartActive = true;
            return beer[0].id;
        }

        /* Delete a beer from the cart using ID as a key. */
        $scope.deleteBeerById = function (beerid) {

            var index = null;
            $.each($scope.cart, function (key, value) {
                if (value.beer_id == beerid) {
                    index = key;
                }
            });

            $scope.deleteBeer(index);
        }

        // This is somehow stupid, actually it should just work straight away:
        // See here: http://jsfiddle.net/buehler/HCjrQ/
        // But it is not: http://stackoverflow.com/questions/28541803/angularjs-checkbox-filter-true-and-false
        $scope.checkboxClickFav = function (event) {
            if(event === false) {
                $scope.checkedFavorite = "";
            }
        }

        // This is somehow stupid, actually it should just work straight away:
        // See here: http://jsfiddle.net/buehler/HCjrQ/
        // But it is not: http://stackoverflow.com/questions/28541803/angularjs-checkbox-filter-true-and-false
        $scope.checkboxClickOrganic = function (event) {
            if(event === false) {
                $scope.checkedOrganic = "";
            }
        }

        /* Handles marking beers as favorite and saving so local storang. */
        $scope.markAs = function (index, value, id) {

            // setting the like value
            $scope.filteredContent[index].isFavorite = value;
            
            // save to local storage too
            if (value == true) {
                $scope.likes.push(Number(id));
            } else {
                var i = $scope.likes.indexOf(id);
                $scope.likes.splice(i, 1);
            }

            LSService.setObject($scope.username + "_likes", $scope.likes);
        }

        /**
        * Handels the dropping of a beer into the cart.
        * The cart is saved to the local storage.
        * In case of reload things can be restored.
        */
        $scope.handleDrop = function(id) {

            // very inefficient stuff here sorry
            // find beer with id
            var returnVal = null;
            var beer = null;
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
                returnVal = $scope.beersInCart.push(beer) - 1;


            } else {
                $scope.isCartActive = false;
            }

            return returnVal;
        }

        /* Returns the number of items in the cart. */
        $scope.totalItems = function() {
            return $scope.cart.length;
        }

        /* Returns total money of stuff in cart. */
        $scope.totalMoney = function() {
            var sum = 0;
            $.each($scope.beersInCart, function(key, value){
                sum += Number(value.price);
            })
            return sum;
        }

        /* Returns true if it is possible to add a beer to the cart.
         * eighter 5 bottle limit is reaches or credit limit is reached
         */
        function isSave(beer){
            var futureMoney = $scope.totalMoney() + Number(beer.price);
            var current = $scope.limit + $scope.balance;
            return futureMoney <= current;
        }

        /* Reformats the beer data to use in the view. */
        function getCleanBeerData(beer){
            var cleanBeer = {};
            cleanBeer.name          = beer.namn;
            cleanBeer.name2         = beer.namn2;
            cleanBeer.price         = beer.pub_price;
            cleanBeer.id            = beer.beer_id;
            cleanBeer.count         = Number(beer.count);
            cleanBeer.outofstock    = beer.count >= 1 ? false : true;
            cleanBeer.alk           = beer.additionalInfos.alkoholhalt;
            cleanBeer.iskoscher     = beer.additionalInfos.koscher == 1 ? true : false;
            cleanBeer.isorganic     = beer.additionalInfos.ekologisk == 1 ? true : false;
            cleanBeer.packaging     = beer.additionalInfos.forpackning;
            cleanBeer.origin        = beer.additionalInfos.ursprunglandnamn;
            cleanBeer.isFavorite    = false;

            // set favorite beers here
            $.each($scope.likes, function(key, value){
                if (value == beer.beer_id) {
                    cleanBeer.isFavorite = true;
                }
            });

            return cleanBeer;
        }

        $scope.init();

    }
})();

