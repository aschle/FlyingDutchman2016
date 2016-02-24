# FlyingDutchman2016
Repo for the course User Interface Programming I

## Running

     git clone git@github.com:aschle/FlyingDutchman2016.git
     cd FlyingDutchman2016
     
Install SASS first (http://sass-lang.com/)

Then compile SASS to CSS, 

     sass --watch sass/main.scss:css/main.css
     
If you want you can run a little HTTP server using python:
     
     python -m SimpleHTTPServer

on python3:

     python -m http.server    
	

## API
* Admin: svetor|svetor
* User: ankov|ankov

#### `purchases_get`
* Role: `user`
* Gives a list of all purchases made by the specified user.

          http://pub.jamaica-inn.net/fpdb/api.php?username=ankov&password=ankov&action=purchases_get
          
          ...
          {
           "namn": "Strongbow",
           "namn2": "",
           "transaction_id": "49773",
           "user_id": "51",
           "beer_id": "181903",
           "timestamp": "2016-02-03 13:48:33",
           "price": "33.00"
          }, ...

#### `purchases_append`
* Role: `user`
* Additional parameter: `beer_id`
* Adds a purchase of one beer to the system for the specified user. The id of the beer purchased beer is a required additional parameter
* no sucess/error messages

          http://pub.jamaica-inn.net/fpdb/api.php?username=ankov&password=ankov&action=purchases_append&beer_id=2259
          
          {
           "type": "empty",
           "payload": []
          }

#### `payments_get`
* Role: `user`
* Returns a list of payments made by the specified user.

          http://pub.jamaica-inn.net/fpdb/api.php?username=ankov&password=ankov&action=payments_get

          ...
          {
           "transaction_id": "74",
           "user_id": "51",
           "admin_id": "25",
           "amount": "30",
           "timestamp": "2013-05-31 18:49:26"
          },...

#### `payments_append`
* Role: `user`
* Additional parameter: `amount`
* Adds a payment of specified amount to the system for the specified user. The amount is a required additional parameter
* **Why is it not working?**

          http://pub.jamaica-inn.net/fpdb/api.php?username=ankov&password=ankov&action=payments_append&amount=10
          
          {
           "type": "error",
           "payload": [
            {
             "code": "3",
             "msg": "Not enough credentials"
            }]
          }

#### `iou_get`
* Role: `user`
* Returns the total amount that the specified user has at his disposal for buying beer. A negative balance means that the user has a debt

          http://pub.jamaica-inn.net/fpdb/api.php?username=ankov&password=ankov&action=iou_get
          
          {
           "type": "iou_get",
           "payload": [
            {
             "user_id": "51",
             "first_name": "Anders",
             "last_name": "Kovalchyck",
             "assets": "-3760"
            }
           ]
          }

#### `beer_data_get`
* Role: `user`
* Additional parameter: `beer_id`
* Returns all information available in the system for a specified beer. This includes name, price, alcohol volume, etc. The id of the beer for inquiry is a required additional parameter.

          http://pub.jamaica-inn.net/fpdb/api.php?username=ankov&password=ankov&action=beer_data_get&beer_id=181903
          
          {
           "type": "beer_data_get",
           "payload": [
            {
             "nr": "181903",
             "artikelid": "721551",
             "varnummer": "1819",
             "namn": "Strongbow",
             "namn2": "",
             "prisinklmoms": "18.50",
             "volymiml": "",
             "prisperliter": "",
             "saljstart": "2013-09-02",
             "slutlev": " ",
             "varugrupp": "Cider, Torr och halvtorr",
             "forpackning": "Flaska",
             "forslutning": "",
             "ursprung": "",
             "ursprunglandnamn": "Internationellt märke",
             "producent": "Stassen SA",
             "leverantor": "GL Brands AB",
             "argang": "",
             "provadargang": "",
             "alkoholhalt": "5%",
             "modul": "",
             "sortiment": "FS",
             "ekologisk": "0",
             "koscher": "0"
            }
           ]
          }

#### `inventory_get`
* Role: `admin`, `user`
* Gives a list of all drinks available in the system.

          http://pub.jamaica-inn.net/fpdb/api.php?username=ankov&password=ankov&action=inventory_get
          
          ...
          {
           "namn": "",
           "namn2": "",
           "sbl_price": "",
           "pub_price": "",
           "beer_id": "22590",
           "count": "214",
           "price": "14.00"
          }, ...

#### `inventory_append`
* Role: `admin`
* Additional parameters: `beer_id`, `amount`, `price`
* ** cant add new beers, like new **
* Updates the number of bottles available in stock and the price for a particular beer. The id of the beer to be updated is required along with its price and current amount of available bottles.
* ** no sucess/error message**

          {
           "type": "empty",
           "payload": []
          }

#### `purchases_get_all`
* Role: `admin`
* Gives a list of all purchases made by all users.

          http://pub.jamaica-inn.net/fpdb/api.php?username=svetor&password=svetor&action=purchases_get_all
          
          ...
          {
           "namn": "Nils Oscar",
           "namn2": "India Ale",
           "transaction_id": "49787",
           "user_id": "23",
           "beer_id": "146403",
           "timestamp": "2016-02-05 12:44:57",
           "price": "19.90",
           "first_name": "Aquilina",
           "last_name": "Lyndon",
           "username": "aqulyn"
          },...

#### `payments_get_all`
* Role: `admin`
* Returns a list of payments made by all users.

          http://pub.jamaica-inn.net/fpdb/api.php?username=svetor&password=svetor&action=payments_get_all

          ...
          {
           "admin_username": "saskru",
           "timestamp": "2015-12-08 10:10:29",
           "amount": "599",
           "admin_id": "25",
           "username": "ceznew",
           "first_name": "Cezar",
           "last_name": "Newman"
          },...

#### `iou_get_all`
* Role: admin
* Returns all users and amounts they have at their disposal. For users with a negative balance it means that they have a debt.

          http://pub.jamaica-inn.net/fpdb/api.php?username=svetor&password=svetor&action=iou_get_all
          
          {
           "username": "aqulyn",
           "first_name": "Aquilina",
           "last_name": "Lyndon",
           "assets": "1248"
          },

#### `user_edit`
* Role: admin
* Additional parameters:
`new_username`, `new_password`, `first_name`, `last_name`, `email`, `phone`
Updates user information. All user information is required as additional parameters.
**Why is it not working?**

          http://pub.jamaica-inn.net/fpdb/api.php?username=svetor&password=svetor&action=user_edit&new_username=svetor&new_password=svetor$first_name=Alexa&last_name=Uppsala&email=alexa.uppsala@gmail.com&phone=017678548599
          
          {
           "type": "error",
           "payload": [
            {
             "code": "6",
             "msg": "Wrong number or type of arguments"
            }
           ]
          }
