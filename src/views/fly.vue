<template>
  <div id="ceiumView"></div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
export default {
  name: "fly",
  data() {
    return {
      viewer: null
    };
  },
  created() {},
  mounted() {
    this.initCesium();
    let ps = [
      {
        longitude: 114.38,
        latitude: 36.9,
        height: 351.68,
        heading: 0.0,
        pitch: -28.0,
        roll: 0.0,
        duration: 3
      },
      {
        longitude: 114.68,
        latitude: 36.3,
        height: 351.68,
        heading: 0.0,
        pitch: -28.0,
        roll: 0.0,
        duration: 3
      },
      {
        longitude: 114.98,
        latitude: 36.6,
        height: 321.28,
        heading: 0.0,
        pitch: -28.0,
        roll: 0.0,
        duration: 3
      }
    ];
    this.lineFly(ps);
  },
  methods: {
    //初始化
    initCesium() {
      this.viewer = new Cesium.Viewer("ceiumView", {
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        baseLayerPicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        vrButton: false,
        infoBox: false,
        shouldAnimate: true,
        selectionIndicator: false,
        clampToGround: true,
        baseLayerPicker: false,
        requestWaterMask: true,
        requestVertexNormals: true
      });
      this.viewer._cesiumWidget._creditContainer.style.display = "none";
    },
    lineFly(positionList) {
      let self = this;
      let count = 0;
      fly()
      function fly() {
        if (count >= positionList.length) {
          return;
        }
        var position = positionList[count];

        self.viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            position.longitude,
            position.latitude,
            position.height
          ),
          duration: parseFloat(position.duration),
          orientation: {
            heading: Cesium.Math.toRadians(position.heading),
            pitch: Cesium.Math.toRadians(position.pitch),
            roll: Cesium.Math.toRadians(position.roll)
          },
          complete: function() {
            fly();
          }
        });
        count++;
      }
    }
  }
};
</script>

<style>
</style>