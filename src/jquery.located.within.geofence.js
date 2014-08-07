/*
 *  Project: Located within Geofence
 *  Description: Detecting if an address is within a geofence
 *  Author: Bryant Hughes
 *  License: MIT
 */

;(function ( $, window, undefined ) {

  // Create the defaults once
  var pluginName = 'locatedWithinGeofence',
      document = window.document,
      defaults = {
        address: "",
        geofence: [],
        apikey: ""
      };

  // The actual plugin constructor
  function LocatedWithinGeofence(options ) {

    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
    return this;
  }

  LocatedWithinGeofence.prototype.init = function () {

    if(this.options.geofence.length){
      this.setGeofence();
    }

    if(this.options.address.length){
      this.setAddress();
    }

  };

  LocatedWithinGeofence.prototype.setGeofence = function(coords){

    var self = this;

    this.rawFenceCoords = coords !== undefined ? coords : this.options.geofence;
    this.realFenceCoords = [];

    $.each(this.rawFenceCoords, function(index, coords){

      self.realFenceCoords.push(new google.maps.LatLng(coords[0], coords[1]));

    });

    this.geofence = new google.maps.Polygon({
      paths: this.realFenceCoords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    });

  };

  LocatedWithinGeofence.prototype.setAddress = function(address){

    var self = this;

    this.address = address !== undefined ? address : this.options.address;

    var params = {
      address: this.address
    };

    if(this.options.apikey.length){
      params.key = this.options.apikey;
    }

    this.$addressLoaded = $.ajax({

      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      type: 'GET',
      dataType: 'json',
      data: params,

      success: function(data) {

        self.addressCoord = [data.results[0].geometry.location.lat, data.results[0].geometry.location.lng];

      }

    });

    return this.$addressLoaded;

  };

  LocatedWithinGeofence.prototype.isWithin = function(callback){

    var self = this;

    this.$addressLoaded.done(function(){

      var isWithin = self.geofence.containsLatLng(self.addressCoord[0], self.addressCoord[1]);

      callback.call(self, isWithin);

    });

  };

  //Assigning our plugin to jQuery.

  $.extend({
    locatedWithinGeofence: function(options){
      return new LocatedWithinGeofence(options);
    }
  });

}(jQuery, window));