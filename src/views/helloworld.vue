<template>
  <!-- <div> -->
    <div id="ceiumView"></div>
  <!-- </div> -->
</template>

<script>
import * as Cesium from "cesium/Cesium";
export default {
  name: "helloworld",
  components: {},
  data() {
    return {
      viewer: null
    };
  },
  mounted() {
    this.initCesium();
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
      this.viewer._cesiumWidget._creditContainer.style.display = 'none'
    }
    
  },
  destroyed() {}
};
</script>

<style>
#ceiumView{
 width: 100%;
 height: 100%;   
}
</style>