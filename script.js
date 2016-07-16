var map;

window.onload = function() {
  map = new GMaps( {
    div: '#map',
    lat: 43.6569619,
    lng: -79.3858808
  } );

  GMaps.geolocate( {
    success: function( position ) {
      map.setCenter( position.coords.latitude, position.coords.longitude );
      console.log("position.coords = ", position.coords);
      map.addMarker({
        lat: position.coords.latitude, lng: position.coords.longitude,
        title: 'Your location',
        infoWindow: {
          content: '<p>You are here</p>'
        }
      });
    },
    error: function( error ) {
      alert( 'Geolocation failed: ' + error.message );
    },
    not_supported: function() {
      alert( "Your browser does not support geolocation" );
    },
    always: function() {
      alert( "Done!" );
    }
  } );


}
