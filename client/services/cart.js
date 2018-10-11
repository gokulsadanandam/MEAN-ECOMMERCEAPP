myApp.service('cart', function() {

    this.cart = new Array

    this.setcart = function(data) {
        this.cart = data
    }

    this.getcart = function() {
        return this.cart
    }

    this.additem = function(data) {
        var flag = 1
        this.cart.forEach(function(items) {
            if (items["1"] == data["1"]) {
                items["2"] = items["2"] + data["2"]
                flag = 0
            }
        })
        if (flag) {
            this.cart.push(data)
        }
    }

    this.updatecart = function(data) {
        this.cart = []
        this.cart.push(data)
    }

    this.emptycart = function() {
        this.cart = []
    }

    this.usersavedcart = function() {
        let cart = sessionStorage.getItem("cart");
        cart = cart.split(",")
        let i = 0;
        while ((i < (cart.length)) && (cart.length > 2)) {
            this.cart.push(cart.slice(i, i + 6))
            i = i + 6
        }
    }

    this.usersavedcart()

})