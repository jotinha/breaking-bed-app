angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope,Map,Data) {

  $scope.map = Map;

  $scope.hotels = Data.getAll();

  $scope.centerOnMe = function() {
    $scope.map.center.latitude = $scope.map.myposition.latitude;
    $scope.map.center.longitude = $scope.map.myposition.longitude;
  }
})

.controller('PromosCtrl', function($scope,$firebase,Map,Data,Filter) {


  $scope.hotels = Data.getAll();

  $scope.myposition = Map.myposition;

  $scope.getDistanceToHotel = function(hotel) {
    if (hotel.location && Map.myposition) {
      return Math.round(getDistanceMeters(hotel.location,Map.myposition)/1000);
    }
  }

  $scope.hotelObeys = function(hotel) {
    return Filter.hotelObeys(hotel);
  }

  $scope.offerObeys = function(offer) {
    return Filter.offerObeys(offer);
  }

})

.controller('PromoDetailCtrl', function($scope, $stateParams, Data) {
  
  $scope.hotel = Data.getHotel($stateParams.hotelId);
  $scope.offer = Data.getOffer($stateParams.hotelId,$stateParams.offerId);
 

  $scope.$watch('offer.notes',function() {
    var notes = $scope.offer.notes[0];
    if (notes) {
      $scope.notes = notes.split('\n');
    }

  })

  $scope.randomNumber = function() {
    return Math.floor(Math.random()*20)
  }

})

.controller('HomeCtrl',function($scope,$ionicModal,Filter) {
  
  $scope.filter = Filter;
  
  $scope.bedtypeOptions = ['bunk','single','double','twin','triple'];

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    if ($scope.modal) $scope.modal.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });


  $scope.openOptions = function(type) {
    $scope.option = type;
    $scope.openModal();
  } 

  $scope.setValue = function(val) {
    $scope.filter[$scope.optVar] = val;
    $scope.closeModal();
  }

  $scope.$watch('filter.bedtype', function() {
    $scope.closeModal();  /*hack*/
  });


})

// .controller('ModalCtrl', function($scope) {

//   $scope.val = $scope.filter[$scope.optVar];

//   $scope.$watch($scope.optVar,function() {
//     $scope.val = $scope.filter[$scope.optVar];
//   });

// })

