// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
DEBUG = true;

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','firebase','google-maps'])

.run(function($ionicPlatform,$ionicLoading,$rootScope) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });


})

.config(function($stateProvider, $urlRouterProvider) {

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


    .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-home.html',
          controller: 'HomeCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/promos');

})


