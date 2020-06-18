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
       let rotation = Cesium.Math.toRadians(30);
      function drawCanvas() {
        let canvas = document.createElement("canvas");
        canvas.width = 700;
        canvas.height = 100;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 700, 100);
        ctx.font = 'italic 40pt Calibri' 
        ctx.fillStyle = "red";
        ctx.fillText(
          Cesium.JulianDate.toDate(Cesium.JulianDate.now()).getTime(),
          20,
          100
        );

        return canvas;
      }
     
      function getRotaion(){
          rotation += 0.005;
          return rotation
      }
      let textEnty = self.viewer.entities.add({
        name: "Rotating rectangle with rotating texture coordinate",
        rectangle: {
          coordinates: Cesium.Rectangle.fromDegrees(-90.0, 30.0, -70.0, 35.0),
          material: new Cesium.ImageMaterialProperty({
            //添加回调
            image: new Cesium.CallbackProperty(drawCanvas, false),
            transparent: true
          }),
          rotation:new Cesium.CallbackProperty(getRotaion,false),
          stRotation:new Cesium.CallbackProperty(getRotaion,false)

        }
      });

      self.viewer.zoomTo(textEnty);
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