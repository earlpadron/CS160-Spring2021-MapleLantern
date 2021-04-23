<template>
  <div id="map">
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
      geocodingService: {},
      map: {}
    };
  },
  props: ['query2'],
  created(){
    
  },
  async mounted() {
    // Initialize the platform object:
    const platform = new window.H.service.Platform({
      apikey: this.apikey
    });
    this.platform = platform;
    this.geocodingService = this.platform.getSearchService();
    this.initializeHereMap();
  },
  methods: {
    initializeHereMap() { // rendering map

      const mapContainer = this.$refs.hereMap;
      const H = window.H;
      // Obtain the default map types from the platform object
      var maptypes = this.platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      this.map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 9,
        center: this.center
      });

      this.geocodingService.geocode({
        q: this.query2
      }, (result) => {
        // Add a marker for each location found
        result.items.forEach((item) => {
          this.map.addObject(new H.map.Marker(item.position));
        });
      }, error => {
        console.log(error)
      });

      addEventListener("resize", () => this.map.getViewPort().resize());

      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

      // add UI
      H.ui.UI.createDefault(this.map, maptypes);
      // End rendering the initial map
    }
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