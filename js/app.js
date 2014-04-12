// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
DEBUG = true;

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','firebase','google-maps'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.map', {
      url: '/map',
      views: {
        'tab-map': {
          templateUrl: 'templates/tab-map.html',
          controller: 'MapCtrl'
        }
      }
    })

    .state('tab.promos', {
      url: '/promos',
      views: {
        'tab-promos': {
          templateUrl: 'templates/tab-promos.html',
          controller: 'PromosCtrl',
        }
      }
    })
    
    .state('tab.promo-detail', {
      url: '/promo/:promoId',
      views: {
        'tab-promos': {
          templateUrl: 'templates/promo-detail.html',
          controller: 'PromoDetailCtrl'
        }
      }
    })


    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/promos');

})

.service('Data', function($firebase) {

  if (!DEBUG) {
    var dataUrl = "https://lastminute.firebaseio.com/";
    var dataRef = new Firebase(dataUrl);
    var promos = $firebase(dataRef);


    return {

      getPromos: function() {
        return promos;
      },

      getOffer: function(promoId,offerId) {
        return promos.$child(promoId + '/' + offerId);
      },

      getPromo: function(promoId) {
        return promos.$child(promoId);
      }

    };
  } else {

    var promos = {
        "2133" : {
          "offers" : {
            "-JKGiwDEeUgfLMJfy7Db" : {
              "price" : "10€",
              "type" : "room",
              "room" : "bunk bed",
              "desc" : "Quarto com vista para a ria de Aveiro 2"
            },
            "-JKGb3jLHze_L4EN_-QL" : {
              "price" : "20€",
              "discount" : "99%",
              "room" : "Duplo",
              "desc" : "Quarto com vista para a praia da barra"
            },
            "-JKHZaHmNym_Oeu8fOZQ" : {
              "price" : "Caro",
              "discount" : "80 porcento",
              "type" : "room",
              "room" : "Duplo",
              "imgs" : [ "teste" ],
              "desc" : "Quarto Bonito e Bom"
            }
          },
          "location" : {
            "latitude" : 41.75373,
            "longitude" : -8.09017
          },
          "name" : "Hotel 1"
        }
      }

    return {

      getPromos: function() {
        return promos;
      },

      getOffer: function(promoId,offerId) {
        return promos[promoId][offerId];
      },

      getPromo: function(promoId) {
        return promos[promoId];
      }
 
    };
  }

})
