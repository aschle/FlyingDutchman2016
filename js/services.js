/**
 * service.js
 * 
 * shared code goes here
 * also API stuff should go here
 * 
 */

 angular.module('barApp')
    .factory('DataService', ['$http', 'AuthService', function ($http, AuthService) {

        var dataService = {};
        var urlBase = 'http://pub.jamaica-inn.net/fpdb/api.php';

        var user = AuthService.getLoggedInUser();
        var username = user.username;
        var password = user.password;

        dataService.getBalanceByUser = function (username, password) {
            return $http.get(urlBase + '?username=' + username + '&password=' + password + '&action=iou_get');
        };

         dataService.getAllPurchases = function () {
             return $http.get(urlBase + '?username=svetor' + '&password=svetor' + '&action=purchases_get_all');
         };

         dataService.getPurchaseByUser = function () {
            return $http.get(urlBase + '?username=' + username + '&password=' + password + '&action=purchases_get');
         }

        dataService.getInventory = function () {
            return $http.get(urlBase + '?username=' + username + '&password=' + password + '&action=inventory_get');
        }

        dataService.getBeerById = function (id) {
            return $http.get(urlBase + '?username=' + username + '&password=' + password + '&action=beer_data_get' + '&beer_id=' + id);
        }

        dataService.purchaseOneBeer =function (id) {
            return $http.get(urlBase + '?username=' + username + '&password=' + password + '&action=purchases_append' + '&beer_id=' + id);
        }
        dataService.updateInventory = function(id, amount, price){
            return $http.get(urlBase + '?username=' + username + '&password=' + password + '&action=inventory_append' + '&beer_id=' + id + '&amount=' + amount + '&price=' + price);
        }

        dataService.getAllUsers = function(){
            return $http.get(urlBase + '?username=' + username + '&password=' + password + '&action=iou_get_all');
        }

        return dataService;
    }]);


// Reference: http://learn.ionicframework.com/formulas/localstorage/
angular.module('barApp')
    .factory('LocalStorageService', ['$window', function ($window) {

        var lsService = {};

        /** Setter for simple key value pair */
        lsService.setElement = function(key, value) {
            $window.localStorage.setItem(key, value);
        };

        /** Getter for simple key value pair */
        lsService.getElement = function(key) {
            return localStorage.getItem(key);    
        };

        /** Setter for JSON Object */
        lsService.setObject = function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        }

        /** Getter for JSON Object */
        lsService.getObject = function(key) {
            return JSON.parse($window.localStorage[key] || null);
        }

        /** Remove Item */
        lsService.remove = function(key) {
            $window.localStorage.removeItem(key);
        }

        return lsService;
    }]);

// Reference: http://learn.ionicframework.com/formulas/localstorage/
angular.module('barApp')
    .factory('AuthService', ['LocalStorageService', function (LSService) {

        var authService = {};

        authService.setLoggedInUser = function(username, password, role, limit, likes){
            LSService.setElement("username", username);
            LSService.setElement("password", password);
            LSService.setElement("role", role);
            LSService.setElement("limit", limit);
            LSService.setElement("likes", likes);
        };

        authService.getLoggedInUser = function(){
            var username = LSService.getElement('username');
            var password = LSService.getElement('password');
            var role = LSService.getElement('role');
            return {'username': username, 'password': password, 'role': role};
        };

        authService.isLoggedIn = function() {
            if (LSService.getElement('username') != null) {
                return true;
            } else { return false; }
        }

        authService.getLoggedInUserRole = function(){
            return LSService.getElement('role');
        };

        authService.killLoggedInUser = function(){
            LSService.remove('username');
            LSService.remove('password');
            LSService.remove('role');
        }

        return authService;
    }]);

angular.module('barApp')
    .service('ContactService', function () {
        //to create unique contact id
        var uid = 1;

        //contacts array to hold list of all contacts
        var contacts = [{
            id: 0,
            'firstName': 'Erik',
            'lastName': 'Naess',
            'addAssets': '500'
        }];

        //save method create a new contact if not already exists
        //else update the existing object
        this.save = function (contact) {
            if (contact.id == null) {
                //if this is new contact, add it in contacts array
                contact.id = uid++;
                contacts.push(contact);
            } else {
                //for existing contact, find this contact using id
                //and update it.
                for (i in contacts) {
                    if (contacts[i].id == contact.id) {
                        contacts[i] = contact;
                    }
                }
            }

        }

        //simply search contacts list for given id
        //and returns the contact object if found
        this.get = function (id) {
            for (i in contacts) {
                if (contacts[i].id == id) {
                    return contacts[i];
                }
            }

        }

        //iterate through contacts list and delete
        //contacts if found
        this.delete = function (id) {
            for (i in contacts) {
                if (contacts[i].id == id) {
                    contacts.splice(i, 1);
                }
            }
        }

        //simply returns the contacts list
        this.list = function () {
            return contacts;
        }
    });