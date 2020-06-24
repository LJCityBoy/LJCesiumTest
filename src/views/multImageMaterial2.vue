<template>
  <div>
    <div id="ceiumView"></div>
    <canvas class="canvas" id="canvas-a" width="700" height="100"></canvas>
    <canvas class="canvas" id="canvas-b" width="700" height="100"></canvas>
  </div>
</template>

<script>

//演示失败！！！
import * as Cesium from "cesium/Cesium";

export default {
  name: "multImageMaterial2",
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

      function getRotaion() {
        rotation += 0.005;
        return rotation;
      }
      var currCanvas = "a";
      let i = 0;
      function drawCanvasImage() {
        // var canvas = document.getElementById("canvas-" + currCanvas);
        let canvas = document.createElement('canvas')
        canvas.width = 700;
        canvas.height = 100
        let cwidth = 700;
        let cheight = 100;
        var ctx = canvas.getContext("2d");
        let img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = '../assets/arrow.png';
        ctx.clearRect(0, 0, cwidth, cheight);
        img.onload = function() {
          if (i <= cwidth) {
            ctx.drawImage(img, i, 0);
          } else {
            i = 0;
          }
          i += 3;
        };
        // currCanvas = currCanvas === "a" ? "b" : "a";
        return canvas;
      }

      let textEnty = self.viewer.entities.add({
        name: "Rotating rectangle with rotating texture coordinate",
        rectangle: {
          coordinates: Cesium.Rectangle.fromDegrees(-90.0, 30.0, -70.0, 35.0),
          material: new Cesium.ImageMaterialProperty({
            //添加回调
            image: new Cesium.CallbackProperty(drawCanvasImage, false),
            transparent: false
          })
          //   rotation:new Cesium.CallbackProperty(getRotaion,false),
          //   stRotation:new Cesium.CallbackProperty(getRotaion,false)
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

.canvas {
  position: absolute;
  left: 10px;
  top: 10px;
  /* display: none; */
}
#canvas-a {
  top: 10px;
}
#canvas-b {
  top: 120px;
}
</style>