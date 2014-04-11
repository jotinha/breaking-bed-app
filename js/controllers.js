angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('AccountCtrl', function($scope) {
})

.controller('PromosCtrl', function($scope,$firebase,Data) {

  $scope.promos = Data.getPromos();

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

})

.controller('PromoDetailCtrl', function($scope, $stateParams, Data) {
  $scope.promo = Data.getPromo($stateParams.promoId);

})

