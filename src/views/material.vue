<template>
  <!-- <div> -->
  <div id="ceiumView"></div>
  <!-- </div> -->
</template>

<script>
import * as Cesium from "cesium/Cesium";
export default {
  name: "material",
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
      self.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(113.232, 22.1, 600),
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-90),
          roll: Cesium.Math.toRadians(0)
        },
        duration: 1,
        complete: function() {
          //   self.viewer.camera.moveBackward(500);
        }
      });

      //tu
      let ellipsEnty = self.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(113.232, 22.1, 50),
        ellipse: {
          semiMajorAxis: 100,
          semiMinorAxis: 70,
          //   material: Cesium.Color.BLUE.withAlpha(0.5)
          material: new Cesium.ImageMaterialProperty({
            image: "http://192.168.188.31/lijiang/51/bg1.png",
            color: Cesium.Color.RED,
            repeat: new Cesium.Cartesian2(4, 4),
            glowPower: 0.8
          })
        }
      });

      let politLine = self.viewer.entities.add({
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            113.252,
            22.1,
            113.211,
            22.1
          ]),
          width: 10,
          // material:Cesium.Color.RED
          //发光
          // material:new Cesium.PolylineGlowMaterialProperty({
          //   glowPower:0.5,
          //   color:Cesium.Color.YELLOW
          // })
          material: new Cesium.PolylineOutlineMaterialProperty({
            color: Cesium.Color.ORANGE,
            outlineWidth: 3, //边缘宽度
            outlineColor: Cesium.Color.GREEN //边缘颜色
          })
        }
      });
      self.viewer.zoomTo(politLine);




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