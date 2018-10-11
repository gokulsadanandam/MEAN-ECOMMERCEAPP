var myApp = angular.module('myApp', ['ngRoute', 'slickCarousel']);

myApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/partials/offers.html',
            controller: 'offers'
        })
        .when('/cart', {
            templateUrl: '/partials/cart.html',
            controller: 'mycart',
        })
        .when('/payment', {
            templateUrl: '/partials/payment.html',
            controller: 'payment'
        })
        .otherwise({
            templateUrl: '/partials/offers.html',
            controller: 'offers'
        })

})

