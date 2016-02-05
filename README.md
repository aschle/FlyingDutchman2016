# FlyingDutchman2016
Repo for the course User Interface Programming I

## API
* Admin: svetor|svetor
* User: ankov|ankov

### User
#### `purchases_get`
* Role: `user`
* Gives a list of all purchases made by the specified user.

#### `purchases_append`
* Role: `user`
* Additional parameter: `beer_id`
* Adds a purchase of one beer to the system for the specified user. The id of the beer purchased beer is a required additional parameter.

#### `payments_get`
* Role: `user`
* Returns a list of payments made by the specified user.

#### `payments_append`
* Role: `user`
* Additional parameter: `amount`
* Adds a payment of specified amount to the system for the specified user. The amount is a required additional parameter.

#### `iou_get`
* Role: `user`
* Returns the total amount that the specified user has at his disposal for buying beer. A negative balance means that the user has a debt.

#### `beer_data_get`
* Role: `user`
* Additional parameter: `beer_id`
* Returns all information available in the system for a specified beer. This includes name, price, alcohol volume, etc. The id of the beer for inquiry is a required additional parameter.
