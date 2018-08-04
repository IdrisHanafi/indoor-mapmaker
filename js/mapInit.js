// This example uses a GroundOverlay to place an image on the map
// showing an antique map of Newark, NJ.

var cuteCatOverlay;
var map;
var chicago = {
    lat: 42.2930, 
    lng: -83.7164
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function FloorControl(controlDiv, map, cuteCatOverlay, floorplans, imageBounds) {
    // We set up a variable for this since we're adding event listeners
    // later.
    var control = this;
    var currentFloor = 0;

    // Set the center property upon construction
    controlDiv.style.clear = 'both';
    cuteCatOverlay = new google.maps.GroundOverlay(
        floorplans[0],
        imageBounds[0]);
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
            cuteCatOverlay.setMap(null);
            cuteCatOverlay = new google.maps.GroundOverlay(
                floorplans[++currentFloor],
                imageBounds[currentFloor]);
            cuteCatOverlay.setMap(map);
            currentFloorText.innerHTML = currentFloor + 1;
            currentFloorUI.appendChild(currentFloorText);
        }
    });

    // Set up the click event listener for 'Set Center': Set the center of
    // the control to the current center of the map.
    goLowerFloorUI.addEventListener('click', function() {
        if(currentFloor > 0 ){
            cuteCatOverlay.setMap(null);
            cuteCatOverlay = new google.maps.GroundOverlay(
                floorplans[--currentFloor],
                imageBounds[currentFloor]);
            cuteCatOverlay.setMap(map);
            currentFloorText.innerHTML = currentFloor + 1;
            currentFloorUI.appendChild(currentFloorText);
        }
    });
}


function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 20,
        center: {
            lat: 42.2930, 
            lng: -83.7164
        }
    });


    // Create the DIV to hold the control and call the CenterControl()
    // constructor
    // passing in this DIV.
    var cats = ['http://cdn1.www.greenstyle.it/wp-content/uploads/2015/12/shutterstock_259729697.jpg',
                'https://pbs.twimg.com/profile_images/571260078292865024/0EvP5vXn_400x400.jpeg',
                'https://media.tenor.com/images/bb33cc1eaafa266ac1092ecff7c1c85d/tenor.gif',
                'https://i.imgur.com/gdWIxn2.jpg'];

    var bbb_floorplans = ["res/BBB_floorplan_1.png", "res/BBB_floorplan_2.png", "res/BBB_floorplan_3.png", "res/BBB_floorplan_4.png"];
    
    var imageBounds = [
        {
            north: 42.29314155,
            south: 42.29257419,
            east: -83.71565436,
            west: -83.71667291
        },
        {
            north: 42.29334549,
            south: 42.29265992,
            east: -83.71572972,
            west: -83.71662974
        },
        {
            north: 42.29335544,
            south: 42.2926579,
            east: -83.71573536,
            west: -83.71662678
        
        },
        {
            north: 42.29335509,
            south: 42.29265825,
            east: -83.71572271,
            west: -83.7166287
        
        }
    ];
    
    var FloorControlDiv = document.createElement('div');
    var floorControl = new FloorControl(FloorControlDiv, map, cuteCatOverlay, bbb_floorplans, imageBounds);

    FloorControlDiv.index = 2;
    FloorControlDiv.style['padding-top'] = '20px';
    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(FloorControlDiv);

    var cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: null,
      center: {lat: 42.292875723770415, lng: -83.71646203100681},
      radius: .5
    });

    
    
}

function readInGraphFromJson() {
  var requestURL = 'res/wayfinding_graph.json';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  
  request.onload = function() {
    var graph = request.response;
    createCirclesOnMapFromJson(graph["nodes"], map);
  }
};

function createCirclesOnMapFromJson(objson, map){

  for(var i = 0; i < objson.length; i++){
    var lat_in = objson[i].latitude;
    var lng_in =  objson[i].longitude;
    

    var cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: {lat: lat_in, lng: lng_in},
      radius: 2
    });
    
    
    
  }  

};

readInGraphFromJson();
