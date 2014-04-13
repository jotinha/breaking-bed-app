angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.service('Data', function($firebase) {

  var promos;

  if (!DEBUG) {
    var dataUrl = "https://lastminute.firebaseio.com/";
    var dataRef = new Firebase(dataUrl);
    data = $firebase(dataRef);


    return {

      getAll: function() {
        return data;
      },

      getOffer: function(promoId,offerId) {
        return data.$child(promoId + '/offers/' + offerId);
      },

      getHotel: function(promoId) {
        return data.$child(promoId);
      },

      updateDistances: function() {

      }

    };
  } else {

    data = loadDebug();

    return {

      getAll: function() {
        return data;
      },

      getOffer: function(promoId,offerId) {
        return data[promoId]['offers'][offerId];
      },

      getHotel: function(promoId) {
        return data[promoId];
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

.service('Filter', function(Map) {

  var f = {
    radius: 10,
    price : {
      max: 30,
      min: 0
    }, 
    number : 1,
    bedtype: 'single',
  }

  f.hotelObeys = function(hotel) {
      var ret =  (!Map.myposition || !hotel.location || getDistanceMeters(Map.myposition, hotel.location)/1000 <= f.radius);
      return ret;
  };

  f.offerObeys = function(offer) {
     var ret = (offer.number >= f.number &&
            offer.bedtype === f.bedtype &&
            offer.price >= f.price.min &&
            offer.price <= f.price.max);
      return ret;
  };

  return f;

})