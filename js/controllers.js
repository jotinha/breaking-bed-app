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
    $scope.modal.hide();
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

