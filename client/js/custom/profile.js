myApp.controller('profile', function($scope, $http , profile , cart , api ) {
    console.log(profile)
    $scope.flag = false
    $scope.userimagesrc = "/uploads/" +  profile.data[0]

    $scope.loyaltyid = profile.data[1]
    $scope.email = profile.data[2]
    $scope.name = profile.data[3] + profile.data[4]
    $scope.contact = profile.data[5]
    $scope.time = profile.data[6]
    $scope.wishlist = cart.getcart()

    api.userorders().then(function(data) {
                $scope.orders = data.data
                
            })


    $scope.upload = function() {

        var formdata = new FormData();
        formdata.append('file', $scope.test);
        $http.post('/test', formdata, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).then(function(response) {
            $scope.flag = true
        })
    }
})

