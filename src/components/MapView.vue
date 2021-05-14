<template>
  <div id="map">
          <v-alert type="error" dismissible v-if="error"
        >Error in loading map</v-alert>
  <!--In the following div the HERE Map will render-->
    <div id="mapContainer" style="height:600px;width:100%" ref="hereMap"></div>
  </div>
</template>

<script>
export default {
  name: "HereMap",
  data() {
    return {
      platform: null,
      apikey: "MdNfW02JWd0ObORzCTvgp50BSBtUQgq6LBp23MfRsrs",
      center: { lat: 37.8272, lng: -122.2913 },
      geocoder: {},
      origin: "",
      location: null,
      route: null,
      error: false,
    };
  },
  props: ['destination', 'propPlace'],
  created(){
    
  },
  async mounted() {
    const platform = new window.H.service.Platform({
      apikey: this.apikey
    });
    this.platform = platform;
    this.geocoder = this.platform.getSearchService();
    this.initializeHereMap();
  },
  methods: {
    initializeHereMap() { // rendering map
      this.origin = this.propPlace.latitude + ',' + this.propPlace.longitude;

      const mapContainer = this.$refs.hereMap;
      const H = window.H;
      // Obtain the default map types from the platform object
      var maptypes = this.platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      var map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 9,
        center: this.center
      });

      //Find and plot destination
      if(this.destination == null)
      {
        this.location = this.center.lat + ',' + this.center.lng;
      }
      else
      {
        this.geocoder.geocode({
          q: this.destination
        }, (result) => {
          // Add a marker for each location found
          result.items.forEach((item) => {
            this.location = item.position.lat + ',' + item.position.lng;

            //Find and plot route
            var routingParameters = {
              'routingMode': 'fast',
              'transportMode': 'car',
              // The start point of the route:
              'origin': this.origin,//'37.72032,-121.91935',
              // The end point of the route:
              'destination': this.location,//'37.8272,-122.2913',
              // Include the route shape in the response
              'return': 'polyline'
            };

            
            // Define a callback function to process the routing response:
            var onResult = function(result) {
              // ensure that at least one route was found
              if (result.routes.length) {
                result.routes[0].sections.forEach((section) => {
                  // Create a linestring to use as a point source for the route line
                  let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

                  // Create a polyline to display the route:
                  let routeLine = new H.map.Polyline(linestring, {
                    style: { strokeColor: 'blue', lineWidth: 3 }
                  });

                  // Create a marker for the start point:
                  var icon1 = new H.map.Icon("https://img.icons8.com/dusk/2x/user-location.png", { size: { w: 56, h: 56 } });
                  let startMarker = new H.map.Marker(section.departure.place.location, {icon: icon1});

                  // Create a marker for the end point:
                  var icon2 = new H.map.Icon("https://img.icons8.com/dusk/2x/marker.png", { size: { w: 56, h: 56 } });
                  let endMarker = new H.map.Marker(section.arrival.place.location, {icon: icon2});

                  // Add the route polyline and the two markers to the map:
                  map.addObjects([routeLine, startMarker, endMarker]);
                });
              }
            };

            // Get an instance of the routing service version 8:
            var router = this.platform.getRoutingService(null, 8);
            let whatever = {lat: ((item.position.lat + this.propPlace.latitude)/2), lng: ((item.position.lng + this.propPlace.longitude)/2)}
            map.setCenter(whatever);

            // Call calculateRoute() with the routing parameters,
            // the callback and an error callback function (called if a
            // communication error occurs):
            router.calculateRoute(routingParameters, onResult,
              function(error) {
                alert('error: ', error);
                this.error = true;
            });

          });
        }, error => {
          console.log(error);
          this.error = true;
        });
        this.error = false
      }

      addEventListener("resize", () => map.getViewPort().resize());

      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // add UI
      H.ui.UI.createDefault(map, maptypes);
      // End rendering the initial map
    },
  }
};
</script>

<style scoped>
#map {
  width: 60vw;
  min-width: 360px;
  text-align: center;
  margin: 5% auto;
  background-color: #ccc;
}
</style>