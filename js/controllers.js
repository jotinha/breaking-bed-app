angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
})

.controller('PromosCtrl', function($scope,$firebase) {
  var dataRef = new Firebase("https://lastminute.firebaseio.com");

  $scope.promos = $firebase(dataRef);

  $scope.debugme = function() {
    $scope.hello = 1;
    console.log("debug");
  }

  var getNumberOffers = function(promo) {
    var n = 0;
    for (k in promo) {
      if(promo.hasOwnProperty(k))
        n += 1;
    }
    return n;
  }

});
