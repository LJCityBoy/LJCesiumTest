<template>
  <!-- <div> -->
  <div id="ceiumView"></div>
  <!-- </div> -->
</template>

<script>
import * as Cesium from "cesium/Cesium";
export default {
  name: "multMaterial",
  components: {},
  data() {
    return {
      viewer: null
    };
  },
  mounted() {
    this.initCesium();
    this.addMaterial();
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
    //添加材质
    addMaterial() {
      let self = this;
      //   self.viewer.camera.flyTo({
      //     destination: Cesium.Cartesian3.fromDegrees(113.232, 22.1, 600),
      //     orientation: {
      //       heading: Cesium.Math.toRadians(0),
      //       pitch: Cesium.Math.toRadians(-90),
      //       roll: Cesium.Math.toRadians(0)
      //     },
      //     duration: 1,
      //     complete: function() {
      //       //   self.viewer.camera.moveBackward(500);
      //     }
      //   });
      
      function computeCircle(radius) {
        var positions = [];
        for (var i = 0; i < 360; i++) {
          var radians = Cesium.Math.toRadians(i);
          positions.push(
            new Cesium.Cartesian2(
              radius * Math.cos(radians),
              radius * Math.sin(radians)
            )
          );
        }
        return positions;
      }
      let tubeEnty = self.viewer.entities.add({
        name: "my tube",
        polylineVolume: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            113.232,22.1,
            113.282,22.12,
            113.301,22.101
          ]),
          shape: computeCircle(60.0),
          material:new Cesium.ColorMaterialProperty(
              new Cesium.CallbackProperty(function(){
                  return Cesium.Color.fromRandom({
                      minimumRed:0.750,
                      minimumGreen:0.450,
                      minimumBlue:0.680,
                      alpha:0.80
                  })
              },false)
          )
        }
      });

      self.viewer.zoomTo(tubeEnty);
    }
  },
  destroyed() {}
};
</script>

<style>
#ceiumView {
  width: 100%;
  height: 100%;
}
</style>