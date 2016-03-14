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

        authService.setLoggedInUser = function(username, password, role, limit){
            LSService.setElement("username", username);
            LSService.setElement("password", password);
            LSService.setElement("role", role);
            LSService.setElement("limit", limit);
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
            LSService.remove('cart');
            LSService.remove('limit');
        }

        return authService;
    }]);

/**
* Service for translating a specific key to a specific language.
*/
angular.module('barApp')
    .factory('I18nService', ['LocalStorageService', '$http', '$rootScope', function (lsService, $http, $rootScope) {

        var i18nService = {};

        // dictionary to look up translations
        var dictionary = {
            "en": {
                "APP_TITLE": "FlyingDutchman VIP Customer* App",
                "APP_SLOGAN": "Do you feel like having a beer now?",
                "APP_HINT": "*Ask the bartender to become a VIP customer!",
                "SIGN_IN" : "Sign In",
                "LOGIN" : "Log in with your VIP Account",
                "CANCEL" : "Cancel",
                "SEARCH" : "Search",
                "BEVERAGE" : "Beverage",
                "AMOUNT" : "Amount",
                "UPDATE_STOCK" : "Update Stock",
                "SOLD" : "Sold",
                "SAVE" : "Save",
                "VIPUSERMAN" : "VIP User Management",
                "ADD_USER" : "Add user",
                "FIRSTNAME" : "First name",
                "LASTNAME" : "Last name",
                "EMAIL" : "Email",
                "PHONE" : "Phone",
                "EDIT" : "Edit",
                "DELETE" : "Delete",
                "DATE" : "Date",
                "ORDER_DETAILS" : "Order details",
                "NAME" : "Name",
                "ITEMS" : "Items",
                "TOTAL" : "Total",
                "PRICE" : "Price",
                "ADMIN_MENU" : "Admin Menu",
                "STATISTICS" : "Statistics",
                "STOCK" : "Stock",
                "VIP_USERS" : "VIP Users",
                "ADD_CREDIT" : "Add credit",
                "ORDER_HISTORY" : "Order history",
                "VIP_MENU" : "VIP Menu",
                "ALL_BEERS" : "All beers",
                "LAST_ORDERS" : "Last orders",
                "OUT_STOCK" : "beers out of stock",
                "EXPAND" : "Expand",
                "USERNAME" : "Username",
                "PASSWORD" : "Password"
            },
            "sv": {
                "APP_TITLE": "FlyingDutchman VIP Kund App",
                "APP_SLOGAN": "Sugen på en öl?",
                "APP_HINT":"Fråga bartendern om VIP-konto!",
                "SIGN_IN" : "Logga in",
                "LOGIN" : "Logga in med ditt VIP-konto",
                "CANCEL" : "Avbryt",
                "SEARCH" : "Sök",
                "BEVERAGE" : "Dryck",
                "AMOUNT" : "Antal",
                "UPDATE_STOCK" : "Uppdatera lager",
                "SOLD" : "Antal sålda",
                "SAVE" : "Spara",
                "VIPUSERMAN" : "VIP Användare Hantering",
                "ADD_USER" : "Lägg till användare",
                "FIRSTNAME" : "Förnamn",
                "LASTNAME" : "Efternamn",
                "EMAIL" : "Email",
                "PHONE" : "Telefon",
                "EDIT" : "Redigera",
                "DELETE" : "Ta bort",
                "DATE" : "Datum",
                "ORDER_DETAILS" : "Order detaljer",
                "NAME" : "Namn",
                "ITEMS" : "Produkter",
                "TOTAL" : "Totalt",
                "PRICE" : "Pris",
                "ADMIN_MENU" : "Admin Meny",
                "STATISTICS" : "Statistik",
                "STOCK" : "Lager",
                "VIP_USERS" : "VIP Användare",
                "ADD_CREDIT" : "Kredit",
                "ORDER_HISTORY" : "Order historik",
                "VIP_MENU" : "VIP Meny",
                "ALL_BEERS" : "Sortiment",
                "LAST_ORDERS" : "Senaste ordrar",
                "OUT_STOCK" : "drycker slut på lager",
                "EXPAND" : "Expandera",
                "USERNAME" : "Användarnamn",
                "PASSWORD" : "Lösenord"
            }
        };
        // current/default language
        var language = "en";
        // current/default inactive language
        var inactiveLanguage = "sv";

        // check for saved language setting in local strage, if none - save default
        if(!lsService.getElement("language")) {
            lsService.setElement("language", language);
            lsService.setElement("inactiveLanguage", inactiveLanguage);
        } else {
            language = lsService.getElement("language");
            inactiveLanguage = lsService.getElement("inactiveLanguage");
        }

        i18nService.translate = function (key) {
            return dictionary[language][key];
        }

        i18nService.switchLanguage = function () {
            var tmp = language;
            language = inactiveLanguage;
            inactiveLanguage = tmp;
            lsService.setElement("language", language);
            lsService.setElement("inactiveLanguage", inactiveLanguage);

            // for notifying the directive
            $rootScope.$broadcast('onLanguageChange');
        }

        i18nService.getLanguage = function () {
            return language;
        }

        i18nService.getInactiveLanguage = function () {
            return inactiveLanguage;
        }

        return i18nService;
    }]);

angular.module('barApp')
    .service('ContactService', function () {
        //to create unique contact id
        var uid = 1;

        //contacts array to hold list of all contacts
        var contacts = [{
            id: 0,
            'username' : 'ernae',
            'first_name': 'Erik',
            'last_name': 'Naess',
            'email': 'erik@naess.com',
            'phone': '02133213'
        }, {
            id: 1,
            "username" : "maihon",
            "first_name" : "Maiken",
            "last_name" : "Honda",
            'email': 'erik@naess.com',
            'phone': '02133213'
        }, {
            id: 2,
            "username" : "jovsit",
            "first_name" : "Jove",
            "last_name" : "Sitz",
            'email': 'erik@naess.com',
            'phone': '02133213'
        }, {
            id: 3,
            "username" : "liatra",
            "first_name" : "Liam",
            "last_name" : "Traverso",
            'email': 'erik@naess.com',
            'phone': '02133213'
        }, {
            id: 4,
            "username" : "svetor",
            "first_name" : "Svetlana",
            "last_name" : "Torres",
            'email': 'erik@naess.com',
            'phone': '02133213'
        }, {
            id: 5,
            "username" : "livzha",
            "first_name" : "Livianus",
            "last_name" : "Zhao",
            'email': 'erik@naess.com',
            'phone': '02133213'
        }, {
            id: 6,
            "username" : "lasnic",
            "first_name" : "Lasse",
            "last_name" : "Nicholson",
            'email': 'erik@naess.com',
            'phone': '02133213'
        }, {
            id: 7,
            "username" : "kenolg",
            "first_name" : "Kenan",
            "last_name" : "Olguin",
            'email': 'erik@naess.com',
            'phone': '02133213'
        }, {
            id: 8,
            "username" : "dansch",
            "first_name" : "Danna",
            "last_name" : "Schermer",
            'email': 'erik@naess.com',
            'phone': '02133213'
        }, {
            id: 9,
            "username" : "elepic",
            "first_name" : "Elektra",
            "last_name" : "Pickle",
            'email': 'erik@naess.com',
            'phone': '02133213'
        }, {
            id: 10,
            "username" : "dansch",
            "first_name" : "Danna",
            "last_name" : "Schermer",
            'email': 'erik@naess.com',
            'phone': '02133213'
        }, {
            id: 11,
            "username" : "aqulyn",
            "first_name" : "Aquilina",
            "last_name" : "Lyndon",
            'email': 'erik@naess.com',
            'phone': '02133213'
        }, {
            id: 12,
            "username" : "gollan",
            "first_name" : "Golnar",
            "last_name" : "Langley",
            'email': 'erik@naess.com',
            'phone': '02133213'
        }, {
            id: 13,
            "username" : "felbar",
            "first_name" : "Felix",
            "last_name" : "Barto�",
            'email': 'erik@naess.com',
            'phone': '02133213'
        }, {
            id: 14,
            "username" : "einyam",
            "first_name" : "Einarr",
            "last_name" : "Yamauchi",
            'email': 'erik@naess.com',
            'phone': '02133213'
        }, {
            id: 15,
            "username" : "hirchr",
            "first_name" : "Hiram",
            "last_name" : "Christopherson",
            'email': 'erik@naess.com',
            'phone': '02133213'
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