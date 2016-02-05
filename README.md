# FlyingDutchman2016
Repo for the course User Interface Programming I

## API
* Admin: svetor|svetor
* User: ankov|ankov

#### `purchases_get`
* Role: `user`
* Gives a list of all purchases made by the specified user.

          `http://pub.jamaica-inn.net/fpdb/api.php?username=ankov&password=ankov&action=purchases_get`
          
          {
           "namn": "Strongbow",
           "namn2": "",
           "transaction_id": "49773",
           "user_id": "51",
           "beer_id": "181903",
           "timestamp": "2016-02-03 13:48:33",
           "price": "33.00"
          },

#### `purchases_append`
* Role: `user`
* Additional parameter: `beer_id`
* Adds a purchase of one beer to the system for the specified user. The id of the beer purchased beer is a required additional parameter.
* no sucess/error messages

          `http://pub.jamaica-inn.net/fpdb/api.php?username=ankov&password=ankov&action=purchases_append&beer_id=2259`
          
          {
           "type": "empty",
           "payload": []
          }

#### `payments_get`
* Role: `user`
* Returns a list of payments made by the specified user.

          http://pub.jamaica-inn.net/fpdb/api.php?username=ankov&password=ankov&action=payments_get

          {
           "transaction_id": "74",
           "user_id": "51",
           "admin_id": "25",
           "amount": "30",
           "timestamp": "2013-05-31 18:49:26"
          }

#### `payments_append`
* Role: `user`
* Additional parameter: `amount`
* Adds a payment of specified amount to the system for the specified user. The amount is a required additional parameter.
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
* Returns the total amount that the specified user has at his disposal for buying beer. A negative balance means that the user has a debt.

#### `beer_data_get`
* Role: `user`
* Additional parameter: `beer_id`
* Returns all information available in the system for a specified beer. This includes name, price, alcohol volume, etc. The id of the beer for inquiry is a required additional parameter.

### Admin

#### `inventory_get`
* Role: `admin`
* Gives a list of all drinks available in the system.

#### `inventory_append`
Role: `admin` (I guess so)
Additional parameters: `beer_id`, `amount`, `price`
Updates the number of bottles available in stock and the price for a particular beer. The id of the beer to be updated is required along with its price and current amount of available bottles.

#### `purchases_get_all`
* Role: `admin`
* Gives a list of all purchases made by all users.

#### `payments_get_all`
* Role: `admin`
* Returns a list of payments made by all users.

#### `iou_get_all`
* Role: admin
* Returns all users and amounts they have at their disposal. For users with a negative balance it means that they have a debt.

#### `user_edit`
* Role: admin
* Additional parameters:
`new_username`, `new_password`, `first_name`, `last_name`, `email`, `phone` * Updates user information. All user information is required as additional parameters.
