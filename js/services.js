angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.service('Data', function($firebase) {

  var promos;

  if (!DEBUG) {
    var dataUrl = "https://lastminute.firebaseio.com/";
    var dataRef = new Firebase(dataUrl);
    promos = $firebase(dataRef);


    return {

      getPromos: function() {
        return promos;
      },

      getOffer: function(promoId,offerId) {
        return promos.$child(promoId + '/' + offerId);
      },

      getPromo: function(promoId) {
        return promos.$child(promoId);
      },

      updateDistances: function() {

      }

    };
  } else {

    promos = {
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

.service('Map', function($interval,$ionicLoading,$rootScope) {

  DEFLAT = 44;
  DEFLONG  = -8;
  
  var m = {
    zoom: 8,
    center: {
      latitude: DEFLAT,
      longitude: DEFLONG,
    },
    myposition: {}
  };

  var first = true;

  var getLocation = function() {
    
    if (first) {
      var loading = $ionicLoading.show({
        content: 'A determinar localização...',
        showBackdrop: false
      });
    }

    navigator.geolocation.getCurrentPosition(function(pos) {
      m.myposition = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      }

      m.locked = true;
      $rootScope.$broadcast('locationChanged');
      console.log('location: ' + pos.coords.latitude +', '+ pos.coords.longitude);
      if (first) {
        m.center.latitude = m.myposition.latitude;
        m.center.longitude = m.myposition.longitude;
        loading.hide();
        first = false;

      }
    });

  };
  getLocation();

  // $interval(getLocation,5000);

  return m;
    
})

.service('Filter', function() {

  var f = {
    radius: 10,
    room: 'duplo',
    roomOptions: [],
    price : {
      max: 30,
      min: 0
    }, 
    number : 1,
    bedtype: 'single',
  }

  return f;

})