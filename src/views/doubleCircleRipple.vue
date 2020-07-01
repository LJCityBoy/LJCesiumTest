<template>
  <!-- <div> -->
  <div id="ceiumView"></div>
  <!-- </div> -->
</template>

<script>
import * as Cesium from "cesium/Cesium";
export default {
  name: "doubleCircleRipple",
  components: {},
  data() {
    return {
      viewer: null
    };
  },
  mounted() {
    document.title = "双涟漪扫描圈";
    this.initCesium();

    let datas = {
        id: ['1','2'],
        lon:113.2201,
        lat:22.47101,
        height:0,
        maxR:3000,
        minR:0,//最好为0
        deviationR:20,//差值 差值也大 速度越快
        eachInterval:1000,//两个圈的时间间隔
        imageUrl:"http://192.168.188.65:8889/redCircle2.png"
    }
    this.addDoubleCircleRipple(datas);
    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(113.2201, 22.47101, 6500.0),
      orientation: {
        heading: Cesium.Math.toRadians(90.0), // east, default value is 0.0 (north) //东西南北朝向
        pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉
        roll: 0.0 // default value
      },
      duration: 3 //3秒到达战场
    });
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
    addDoubleCircleRipple(data) {
        let self = this
      let r1 = data.minR,
        r2 = data.minR;
      function changeR1() {
        r1 = r1 + data.deviationR;
        if (r1 >= data.maxR) {
          r1 = data.minR;
        }
        return r1;
      }
      function changeR2() {
        r2 = r2 + data.deviationR;
        if (r2 >= data.maxR) {
          r2 = data.minR;
        }
        return r2;
      }
      self.viewer.entities.add({
        name: "",
        id: data.id[0],
        position: Cesium.Cartesian3.fromDegrees(
          data.lon,
          data.lat,
          data.height
        ),
        ellipse: {
          semiMinorAxis: new Cesium.CallbackProperty(changeR1, false),
          semiMajorAxis: new Cesium.CallbackProperty(changeR2, false),
          height: data.height,
          material: new Cesium.ImageMaterialProperty({
            image: data.imageUrl,
            repeat: new Cesium.Cartesian2(1.0, 1.0),
            transparent: true,
            color: new Cesium.CallbackProperty(function() {
              return Cesium.Color.WHITE.withAlpha(1 - r1 / data.maxR); //entity的颜色透明 并不影响材质，并且 entity也会透明哦
            }, false)
          })
        }
      });
      setTimeout(() => {
        self.viewer.entities.add({
          name: "",
          id: data.id[1],
          position: Cesium.Cartesian3.fromDegrees(
            data.lon,
            data.lat,
            data.height
          ),
          ellipse: {
            semiMinorAxis: new Cesium.CallbackProperty(changeR1, false),
            semiMajorAxis: new Cesium.CallbackProperty(changeR2, false),
            height: data.height,
            material: new Cesium.ImageMaterialProperty({
              image: data.imageUrl,
              repeat: new Cesium.Cartesian2(1.0, 1.0),
              transparent: true,
              color: new Cesium.CallbackProperty(function() {
                return Cesium.Color.WHITE.withAlpha(1 - r1 / data.maxR); //entity的颜色透明 并不影响材质，并且 entity也会透明哦
              }, false)
            })
          }
        });
      }, data.eachInterval);
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