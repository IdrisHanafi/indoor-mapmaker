  // This example uses a GroundOverlay to place an image on the map
  // showing an antique map of Newark, NJ.

  var cuteCatOverlay;
  var map;
  var chicago = {
      lat: 42.2930, 
      lng: -83.7164
  };

  var imageBounds = {
    north: 42.29335544,
    south: 42.2926579,
    east: -83.71573536,
    west: -83.71662678
  };

  /** 
   * Define a property to hold the center state.
   * @private
   */
  CenterControl.prototype.center_ = null;

  /**
   * Gets the map center.
   * @return {?google.maps.LatLng}
   */
  CenterControl.prototype.getCenter = function() {
      return this.center_;
  };

  /**
   * Sets the map center.
   * @param {?google.maps.LatLng} center
   */
  CenterControl.prototype.setCenter = function(center) {
      this.center_ = center;
  };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function FloorControl(controlDiv, map, cuteCatOverlay) {
    // We set up a variable for this since we're adding event listeners
    // later.
    var control = this;
    var floorplans = ['http://cdn1.www.greenstyle.it/wp-content/uploads/2015/12/shutterstock_259729697.jpg',
                       'https://pbs.twimg.com/profile_images/571260078292865024/0EvP5vXn_400x400.jpeg',
                       'https://media.tenor.com/images/bb33cc1eaafa266ac1092ecff7c1c85d/tenor.gif',
                       'https://i.imgur.com/gdWIxn2.jpg'];
    var currentFloor = 0;

    // Set the center property upon construction
    controlDiv.style.clear = 'both';

    cuteCatOverlay = new google.maps.GroundOverlay(
        'http://cdn1.www.greenstyle.it/wp-content/uploads/2015/12/shutterstock_259729697.jpg',
        imageBounds);
    cuteCatOverlay.setMap(map);


    // Set CSS for the control border
    var goUpperFloorUI = document.createElement('div');
    goUpperFloorUI.id = 'goUpperFloorUI';
    goUpperFloorUI.title = 'Click to go up';
    controlDiv.appendChild(goUpperFloorUI);

    // Set CSS for the control interior
    var goUpperFloorText = document.createElement('div');
    goUpperFloorText.id = 'goUpperFloorText';
    goUpperFloorText.innerHTML = '/\\';
    goUpperFloorUI.appendChild(goUpperFloorText);


    // Set CSS for the current floor control border
    var currentFloorUI = document.createElement('div');
    currentFloorUI.id = 'currentFloorUI';
    currentFloorUI.title = 'Current floor';
    controlDiv.appendChild(currentFloorUI);

    // Set CSS for the control interior
    var currentFloorText = document.createElement('div');
    currentFloorText.id = 'currentFloorText';
    currentFloorText.innerHTML = '1';
    currentFloorUI.appendChild(currentFloorText);
    

    // Set CSS for the setCenter control border
    var goLowerFloorUI = document.createElement('div');
    goLowerFloorUI.id = 'goLowerFloorUI';
    goLowerFloorUI.title = 'Click to go down';
    controlDiv.appendChild(goLowerFloorUI);

    // Set CSS for the control interior
    var goLowerFloorText = document.createElement('div');
    goLowerFloorText.id = 'goLowerFloorText';
    goLowerFloorText.innerHTML = '\\/';
    goLowerFloorUI.appendChild(goLowerFloorText);

    // Set up the click event listener for 'Center Map': Set the center of
    // the map
    // to the current center of the control.
    goUpperFloorUI.addEventListener('click', function() {
        if(currentFloor < floorplans.length - 1 ){
            cuteCatOverlay.set("url",floorplans[++currentFloor]);
            cuteCatOverlay.setMap(map);
            currentFloorText.innerHTML = currentFloor + 1;
            currentFloorUI.appendChild(currentFloorText)
        }
    });

    // Set up the click event listener for 'Set Center': Set the center of
    // the control to the current center of the map.
    goLowerFloorUI.addEventListener('click', function() {
        if(currentFloor > 0 ){
            cuteCatOverlay.set("url",floorplans[--currentFloor]);
            cuteCatOverlay.setMap(map);
            currentFloorText.innerHTML = currentFloor + 1;
            currentFloorUI.appendChild(currentFloorText)
        }
    });
}


  function initMap() {
    var styledMapType = new google.maps.StyledMapType(
        [
          {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
          {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{color: '#c9b2a6'}]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [{color: '#dcd2be'}]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{color: '#ae9e90'}]
          },
          {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#93817c'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [{color: '#a5b076'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#447530'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#f5f1e6'}]
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{color: '#fdfcf8'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#f8c967'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#e9bc62'}]
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [{color: '#e98d58'}]
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.stroke',
            stylers: [{color: '#db8555'}]
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{color: '#806b63'}]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.fill',
            stylers: [{color: '#8f7d77'}]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#ebe3cd'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{color: '#b9d3c2'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#92998d'}]
          }
        ],
        {name: 'Styled Map'});

      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 19,
          center: {
            lat: 42.2930, 
            lng: -83.7164
          }

      });
      
      map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');

      // Create the DIV to hold the control and call the CenterControl()
      // constructor
      // passing in this DIV.
      var FloorControlDiv = document.createElement('div');
      var floorControl = new FloorControl(FloorControlDiv, map, cuteCatOverlay);

      FloorControlDiv.index = 2;
      FloorControlDiv.style['padding-top'] = '20px';
      map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(FloorControlDiv);

      alert(FloorControl.currentFloor);
  }