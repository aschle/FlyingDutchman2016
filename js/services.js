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

        // TODO: remove user/pw params
        dataService.getBalanceByUser = function (username, password) {
            return $http.get(urlBase + '?username=' + username + '&password=' + password + '&action=iou_get');
        };

        dataService.getInventory = function () {
            return $http.get(urlBase + '?username=' + username + '&password=' + password + '&action=inventory_get');
        }

        dataService.getBeerById = function (id) {
            return $http.get(urlBase + '?username=' + username + '&password=' + password + '&action=beer_data_get' + '&beer_id=' + id);
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
            return JSON.parse($window.localStorage[key] || '{}');
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

        authService.setLoggedInUser = function(username, password, role){
            LSService.setElement("username", username);
            LSService.setElement("password", password);
            LSService.setElement("role", role);
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
            // keep Information about user
            LSService.setElement('oldUser', LSService.getElement('username'));
            LSService.remove('username');
            LSService.remove('password');
            LSService.remove('role');
        }

        return authService;
    }]);