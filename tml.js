    var beercounter = 0;

    function drop_handler(ev) {

          // find out ID of beer
          

          // add item to cart - local storage
          // TODO: this code should be in some angulare directive to use the service!!!
          var cart = JSON.parse(localStorage.getItem("cart"));
          cart.push({"beer_id": beerID});
          jsonStr = JSON.stringify(cart);
          localStorage.setItem("cart", jsonStr);

          beercounter += 1;

          if (beercounter == 5) {
            $('.list-group-item').attr("draggable", "false");
          } else {
            //$('.list-group-item').attr("draggable", "true");
          }
        }
    }