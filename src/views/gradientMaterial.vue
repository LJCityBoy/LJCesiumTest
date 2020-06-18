<template>
  <!-- <div> -->
  <div id="ceiumView"></div>
  <!-- </div> -->
</template>

<script>

import * as Cesium from "cesium/Cesium";
export default {
  name: "gradientMaterial",
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

    //添加墙体
    let wallEnty = self.viewer.entities.add({
        name :'my entity wall',
        wall:{
            positions:Cesium.Cartesian3.fromDegreesArrayHeights([
                121.444409, 31.247417, 200.0,
                121.533521, 31.235685, 200.0,
                121.563273, 31.190347, 200.0,
                121.546744, 31.194054, 200.0,
                121.516705, 31.191459, 200.0,
                121.502188, 31.203074, 200.0
            ]),
            minimumHeights:[3000,2000,1500,2100,3000,2000],
            // material:Cesium.Color.RED
            // material: getMultmaterial([0.0,0.046,0.1,0.16,0.25,0.33,0.58,1.0]), //渐变色
            material:new Cesium.ImageMaterialProperty({ //透明
                image:getMultmaterial([0.0,0.046,0.1,0.16,0.25,0.33,0.58,1.0]),
                 transparent:true, //允许透明
            })
           
        }
    })
    //渐变纹理绘制
    function getMultmaterial(ramp){
        let canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 100;
        let ctx = canvas.getContext('2d');
        let grd = ctx.createLinearGradient(0,0,0,100)
        grd.addColorStop(ramp[0],'#000000')
        grd.addColorStop(ramp[1],'#ffdd11')
        grd.addColorStop(ramp[2],'#f12542')
        grd.addColorStop(ramp[3],'#155f5a')
        grd.addColorStop(ramp[4],'#22ff0f')
        grd.addColorStop(ramp[5],'#0f12f0')
        grd.addColorStop(ramp[6],'#68df71')

        ctx.fillStyle = grd;
        ctx.fillRect(0,0,1,100);
        
        return canvas

    }
    
    self.viewer.zoomTo(wallEnty)
     
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