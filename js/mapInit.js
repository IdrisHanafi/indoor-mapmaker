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
    goUpperFloorText.innerHTML = '^';
    goUpperFloorUI.appendChild(goUpperFloorText);
    
    // Set CSS for the setCenter control border
    var goLowerFloorUI = document.createElement('div');
    goLowerFloorUI.id = 'goLowerFloorUI';
    goLowerFloorUI.title = 'Click to go down';
    controlDiv.appendChild(goLowerFloorUI);

    // Set CSS for the control interior
    var goLowerFloorText = document.createElement('div');
    goLowerFloorText.id = 'goLowerFloorText';
    goLowerFloorText.innerHTML = 'v';
    goLowerFloorUI.appendChild(goLowerFloorText);

    // Set up the click event listener for 'Center Map': Set the center of
    // the map
    // to the current center of the control.
    goUpperFloorUI.addEventListener('click', function() {
        //alert("Hello! I am an alert box!!");
        //this.control.setFloorplan(fp,map);
        cuteCatOverlay.set("url","https://pbs.twimg.com/profile_images/571260078292865024/0EvP5vXn_400x400.jpeg")
        cuteCatOverlay.setMap(map);
    });

    // Set up the click event listener for 'Set Center': Set the center of
    // the control to the current center of the map.
    goLowerFloorUI.addEventListener('click', function() {
        cuteCatOverlay.set("url","http://cdn1.www.greenstyle.it/wp-content/uploads/2015/12/shutterstock_259729697.jpg")
        cuteCatOverlay.setMap(map);
    });
}

  /**
   * Define a property to hold the current floorplan & floor number.
   * @private
   
  FloorControl.prototype.floorplans_ = ['https://pbs.twimg.com/profile_images/571260078292865024/0EvP5vXn_400x400.jpeg'];
  FloorControl.prototype.currentFloor = 1;
  */

  /**
   * Gets the map center.
   * @param int floor
   * @return {?google.maps.LatLng}
   
  FloorControl.prototype.getFloorplan = function(floor) {
      return floorplans[floor - 1];
  };*/

  /** XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   * Sets the map center.
   * @param {?google.maps.LatLng} center
   
  FloorControl.prototype.setFloorplan = function(floorplan,map) {
    this.cuteCatOverlay.set("url", this.floorplans_[0]);
    this.cuteCatOverlay.setMap(map);
  };

*/



  function initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 19,
          center: {
            lat: 42.2930, 
            lng: -83.7164
          }
      });

      // Create the DIV to hold the control and call the CenterControl()
      // constructor
      // passing in this DIV.
      var FloorControlDiv = document.createElement('div');
      var floorControl = new FloorControl(FloorControlDiv, map, cuteCatOverlay);

      FloorControlDiv.index = 2;
      FloorControlDiv.style['padding-top'] = '30px';
      map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(FloorControlDiv);

      
  }