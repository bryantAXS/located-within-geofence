# jQuery Located Within Geofence

The purpose of this plugin is to allow the detection of a human readable address, and to tell whether or not
the location resides inside a specified geofence.

![Easier to understand with an image](http://cl.ly/image/031n3V462m3y/Screen%20Shot%202014-08-07%20at%209.34.41%20AM.png)

## Installation

Ensure you have jquery and the google maps javascrit library (including the geometry library) included in your page. Then
either install both files inside the *src* directory, or the minified version of the lib inside the *dest* directory. Note: the index.html file
inside the repo shows the correct setup and files which need to be included.

## Usage

First create an array of LatLng coordinates, which comprise your geofence:

```
var fenceCoords = [
  [41.976544, -87.650213],
  [41.911299, -87.625923],
  [41.910852, -87.649355],
  [41.939397, -87.688065],
  [41.975842, -87.689009]
];
```

Next, create an instance of the $.locatedWithinGeofence class, passing the coordinate array, along with a human readable
version of the address you want to check.

```
var $fence = $.locatedWithinGeofence({
  geofence: fenceCoords,
  address: "1060 W Addison St, Chicago, IL 60613"
});
```

Lastly, call the isWithin method on your instance, passing in a callback function with a single argument. The argument passed to your
callback method will be a boolean indicating if the address was located inside the geofence or not.

```
$fence.isWithin(function(status){
  console.log("Are we within the geofence: " + status);
});
```

## Rate Limiting

This plugin utilizese the Google Maps Geocoding service, which does rate limit requests. You can find more information here: https://developers.google.com/maps/documentation/geocoding/#Limits

If you want to provide an api key for your request, pass it into the option when instantiating your $.locatedWithinGeofence class.

```
var $fence = $.locatedWithinGeofence({
  geofence: fenceCoords,
  address: "1060 W Addison St, Chicago, IL 60613",
  apikey: "dkdjeivcieijfjdkwuvjcdj"
});
```

## Notes

* This class does not require that you actually have a google map created on the page. It works without ever adding or instantating a google map object itself, assuming you don't need it.

