angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope,Map) {

  $scope.map = Map;

  $scope.centerOnMe = function() {
    $scope.map.center.latitude = $scope.map.myposition.latitude;
    $scope.map.center.longitude = $scope.map.myposition.longitude;
  }
})

.controller('PromosCtrl', function($scope,$firebase,Data) {

  $scope.promos = Data.getPromos();

  $scope.debugme = function() {
    $scope.hello = 1;
    console.log("debug");
  }

  var getNumberOffers = function(promo) {
    var n = 0;
    for (var k in promo) {
      if(promo.hasOwnProperty(k))
        n += 1;
    }
    return n;
  };

})

.controller('PromoDetailCtrl', function($scope, $stateParams, Data) {
  $scope.promo = Data.getPromo($stateParams.promoId);

})

.controller('HomeCtrl',function($scope,Filter) {
  $scope.filter = Filter;

})

