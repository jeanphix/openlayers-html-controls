var map = null;

function zoomIn(){
    map.zoomIn();
    return false;
}

function zoomOut(){
    map.zoomOut();
    return false;
}

function localize(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            map.setCenter(new OpenLayers.LonLat(
                    position.coords.longitude,
                    position.coords.latitude
                ).transform(
                    new OpenLayers.Projection("EPSG:4326"),
                    map.getProjectionObject()
            ), 5);
        });
    }
}

var initMap = function(){
    map = new OpenLayers.Map("map", {
        controls: [
            new OpenLayers.Control.KeyboardDefaults(),
            new OpenLayers.Control.Navigation()
        ]
    });
    map.addLayer(new OpenLayers.Layer.OSM());
    map.setCenter(new OpenLayers.LonLat(0,30).transform(
        new OpenLayers.Projection("EPSG:4326"),
        map.getProjectionObject()
    ), 1.5);
}

 window.addEventListener("load", initMap);