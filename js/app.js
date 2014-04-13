// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
DEBUG = false;

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','firebase','google-maps'])

.run(function($ionicPlatform,$ionicLoading,$rootScope,$interval) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.t0 = new Date();
  $rootScope.t = new Date();
  
  //var dt = 1000;
  
  $interval(function() {
    var date = new Date()
    $rootScope.t = date.valueOf();
  },1000);


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
      url: '/promo/:hotelId/:offerId',
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
  $urlRouterProvider.otherwise('/tab/home');

})

.filter('newlines', function () {
    return function(text) {
        if (text) {
          return text.replace(/\n/g, '<br/>');
        } 
    }
})
.filter('noHTML', function () {
    return function(text) {
      if (text) {
        return text
                .replace(/&/g, '&amp;')
                .replace(/>/g, '&gt;')
                .replace(/</g, '&lt;');
      }
    }
})

.filter('timeDiff', function () {
    return function(t1,t0) {
      var d = new Date(t1) - new Date(t0);
      return d.valueOf();
    }
});

//distance between coordinates
var rad = function(x) {
  return x * Math.PI / 180;
};

var getDistanceMeters = function(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.latitude - p1.latitude);
  var dLong = rad(p2.longitude - p1.longitude);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};