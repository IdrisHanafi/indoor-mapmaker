  // This example uses a GroundOverlay to place an image on the map
      // showing an antique map of Newark, NJ.

      var cuteCatOverlay;
      var map;
      var chicago = {lat: 41.85, lng: -87.65};

      function CenterControl(controlDiv, map, center) {
        // We set up a variable for this since we're adding event listeners
        // later.
        var control = this;

        // Set the center property upon construction
        control.center_ = center;
        controlDiv.style.clear = 'both';

        // Set CSS for the control border
        var goCenterUI = document.createElement('div');
        goCenterUI.id = 'goCenterUI';
        goCenterUI.title = 'Click to recenter the map';
        controlDiv.appendChild(goCenterUI);

        // Set CSS for the control interior
        var goCenterText = document.createElement('div');
        goCenterText.id = 'goCenterText';
        goCenterText.innerHTML = 'Center Map';
        goCenterUI.appendChild(goCenterText);

        // Set CSS for the setCenter control border
        var setCenterUI = document.createElement('div');
        setCenterUI.id = 'setCenterUI';
        setCenterUI.title = 'Click to change the center of the map';
        controlDiv.appendChild(setCenterUI);

        // Set CSS for the control interior
        var setCenterText = document.createElement('div');
        setCenterText.id = 'setCenterText';
        setCenterText.innerHTML = 'Set Center';
        setCenterUI.appendChild(setCenterText);

        // Set up the click event listener for 'Center Map': Set the center of
        // the map
        // to the current center of the control.
        goCenterUI.addEventListener('click', function() {
          var currentCenter = control.getCenter();
          map.setCenter(currentCenter);
        });

        // Set up the click event listener for 'Set Center': Set the center of
        // the control to the current center of the map.
        setCenterUI.addEventListener('click', function() {
          var newCenter = map.getCenter();
          control.setCenter(newCenter);
        });
      }

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
    
      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 18,
          center: {lat: 42.29288599, lng: -83.71630461}
        });

        // Create the DIV to hold the control and call the CenterControl()
        // constructor
        // passing in this DIV.
        var centerControlDiv = document.createElement('div');
        var centerControl = new CenterControl(centerControlDiv, map, chicago);

        centerControlDiv.index = 1;
        centerControlDiv.style['padding-top'] = '10px';
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);


        var imageBounds = {
          north: 42.29335544,
          south: 42.2926579,
          east: -83.71573536,
          west: -83.71662678
        };
         

        cuteCatOverlay = new google.maps.GroundOverlay(
            'http://cdn1.www.greenstyle.it/wp-content/uploads/2015/12/shutterstock_259729697.jpg',
            imageBounds);
        cuteCatOverlay.setMap(map);
      }

