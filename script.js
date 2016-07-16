var map;

$( window ).resize( function() {
  $( '#map' ).css( "height", $( window ).height() );
  $( '#map' ).css( "width", $( window ).width() );
  google.maps.event.trigger( map, 'resize' );
  map.setZoom( map.getZoom() );
} );

function loadResults( data ) {
  var items, markers_data = [];
  if ( data.length > 0 ) {
    items = data;

    for ( var i = 0; i < items.length; i++ ) {
      var item = items[ i ];

      if ( item.Latitude != undefined && item.Longitude != undefined ) {

        markers_data.push( {
          lat: item.Latitude,
          lng: item.Longitude,
          title: item.name,
          infoWindow: {
            content: '<h3>' + item.Org_Name + '</h3><ul><li>Address: ' + item.Address_w + '</li><li>Target Age: ' + item.Targ_Age + '</li><li>Postal Code: ' + item['Postal Code'] + '</li><li>Lead Agency? ' + item['Lead Agency'] + '</li></ul>'
          }
        } );
      }
    }
  }

  map.addMarkers( markers_data );
}

function printResults( data ) {
  $( '#foursquare-results' ).text( JSON.stringify( data ) );
}

$( document ).on( 'click', '.pan-to-marker', function( e ) {
  e.preventDefault();

  var position, lat, lng, $index;

  $index = $( this ).data( 'marker-index' );

  position = map.markers[ $index ].getPosition();

  lat = position.lat();
  lng = position.lng();

  map.setCenter( lat, lng );
} );

$( document ).ready( function() {

  map = new GMaps( {
    div: '#map',
    lat: 43.6569619,
    lng: -79.3858808
  } );

  $( '#map' ).css( "height", $( window ).height() );
  $( '#map' ).css( "width", $( window ).width() );

  // GMaps.geolocate( {
  //   success: function( position ) {
  //     map.setCenter( position.coords.latitude, position.coords.longitude );
  //     console.log( "position.coords = ", position.coords );
  //     map.addMarker( {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude,
  //       title: 'Your location',
  //       infoWindow: {
  //         content: '<p>You are here</p>'
  //       }
  //     } );
  //   },
  //   error: function( error ) {
  //     alert( 'Geolocation failed: ' + error.message );
  //   },
  //   not_supported: function() {
  //     alert( "Your browser does not support geolocation" );
  //   },
  //   always: function() {
  //     alert( "Done!" );
  //   }
  // } );

  map.on( 'marker_added', function( marker ) {
    var index = map.markers.indexOf( marker );
    $( '#results' ).append( '<li><a href="#" class="pan-to-marker" data-marker-index="' + index + '">' + marker.title + '</a></li>' );

    if ( index == map.markers.length - 1 ) {
      map.fitZoom();
    }
  } );

  var xhr = $.getJSON( 'https://raw.githubusercontent.com/PoliHackSteppingStones/SteppingStones/master/yow.json' );

  xhr.done( printResults );
  xhr.done( loadResults );
} );

// var map;

// var data = https://raw.githubusercontent.com/PoliHackSteppingStones/SteppingStones/master/yow.json

// window.onload = function() {
//   map = new GMaps( {
//     div: '#map',
//     lat: 43.6569619,
//     lng: -79.3858808
//   } );

//   GMaps.geolocate( {
//     success: function( position ) {
//       map.setCenter( position.coords.latitude, position.coords.longitude );
//       console.log("position.coords = ", position.coords);
//       map.addMarker({
//         lat: position.coords.latitude, lng: position.coords.longitude,
//         title: 'Your location',
//         infoWindow: {
//           content: '<p>You are here</p>'
//         }
//       });
//     },
//     error: function( error ) {
//       alert( 'Geolocation failed: ' + error.message );
//     },
//     not_supported: function() {
//       alert( "Your browser does not support geolocation" );
//     },
//     always: function() {
//       alert( "Done!" );
//     }
//   } );

// }
