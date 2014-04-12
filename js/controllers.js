angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope,$ionicLoading) {
  // $scope.map = {
  //     center: {
  //         latitude: 45,
  //         longitude: -73
  //     },
  //     zoom: 8
  // };
  function initialize() {
    var mapOptions = {
      center: new google.maps.LatLng(43.07493,-89.381388),
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

    // Stop the side bar from dragging when mousedown/tapdown on the map
    google.maps.event.addDomListener(document.getElementById('map'), 'mousedown', function(e) {
      e.preventDefault();
      return false;
    });

    $scope.map = map;
  }
  google.maps.event.addDomListener(window, 'load', initialize);
  
  $scope.centerOnMe = function() {
    if(!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });
  };

  $scope.$on('viewState.viewEnter', function(e, d) {
    console.log('View enter', e, d, $scope);
    var mapEl = angular.element(document.getElementById('map'));
    var iScope = mapEl.isolateScope();
    var map = iScope.map;
    google.maps.event.trigger(map, "resize");
  });

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

