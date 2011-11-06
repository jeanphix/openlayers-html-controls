(function(){
    var HTMLMap = function(element){
        var map = null;

        this.zoomIn = function(){
            this.map.zoomIn();
        };

        this.zoomOut = function(){
            this.map.zoomOut();
        };

        this.locateTo = function(latitude, longitude, zoom){
            this.map.setCenter(new OpenLayers.LonLat(
                    longitude,
                    latitude
                ).transform(
                    new OpenLayers.Projection("EPSG:4326"),
                    this.map.getProjectionObject()
            ), zoom);
        };

        this.localizeMe = function(){
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(function(position){
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;
                    this.locateTo(latitude, longitude, 10);
                });
            }
            return false;
        };

        this.init = function(){
            if (typeof(element) == "string") element = document.getElementById(element);
            this.map = new OpenLayers.Map(element, {
                controls: [
                    new OpenLayers.Control.KeyboardDefaults(),
                    new OpenLayers.Control.Navigation()
                ]
            });
            this.map.addLayer(new OpenLayers.Layer.OSM());
            this.locateTo(30, 0, 1.5);
            var navs = element.getElementsByTagName("nav");
            for (var len = navs.length, i = 0; i < len; i++){
                var links = element.getElementsByTagName("a");
                for (var llen = links.length, li = 0; li < llen; li++){
                    var link = links[li];
                    if(link.getAttribute("data-action") != null){
                        // As addEventListener("click") doesn't work on Opera
                        link.onclick = function(e){
                            this();
                            e.preventDefault();
                        }.bind(this[link.getAttribute("data-action")]);
                    }
                }
            }
        };

        return this;
    };

    var map = HTMLMap("map");
    map.init();
})()
