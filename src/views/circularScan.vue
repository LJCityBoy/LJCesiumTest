<template>
  <!-- <div> -->
  <div id="ceiumView"></div>
  <!-- </div> -->
</template>

<script>
import * as Cesium from "cesium/Cesium";
export default {
  name: "circularScan",
  components: {},
  data() {
    return {
      viewer: null
    };
  },
  mounted() {
      document.title = "圆形扫描"
    this.initCesium();
    this.circleScan();
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
    //添加圆区扫描
    circleScan() {
      let self = this;
      self.viewer.scene.globe.depthTestAgainstTerrain = true;
      let datas = {
        lon: 117.217124, //经度
        lat: 31.809777, //纬度
        scanColor: new Cesium.Color(0, 1.0, 0, 1),
        r: 1500, //扫描半径
        interval: 4000 //时间间隔
      };
      self.addCircleScan(datas);
      self.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          117.217124,
          31.809777,
          6500.0
        ),
        orientation: {
          heading: Cesium.Math.toRadians(90.0), // east, default value is 0.0 (north) //东西南北朝向
          pitch: Cesium.Math.toRadians(-90), // default value (looking down)  //俯视仰视视觉
          roll: 0.0 // default value
        },
        duration: 3 //3秒到达战场
      });
    },
    addCircleScan(data) {
      let self = this;
      let cartographicCenter = new Cesium.Cartographic(
        Cesium.Math.toRadians(data.lon),
        Cesium.Math.toRadians(data.lat),
        0
      );
      let maxRadius = data.r,scanColor = data.scanColor, duration = data.interval
        const _Cartesian3Center = Cesium.Cartographic.toCartesian(cartographicCenter);
        const _Cartesian4Center = new Cesium.Cartesian4(_Cartesian3Center.x, _Cartesian3Center.y, _Cartesian3Center.z, 1);
        const _CartographicCenter1 = new Cesium.Cartographic(cartographicCenter.longitude, cartographicCenter.latitude, cartographicCenter.height + 500);
        const _Cartesian3Center1 = Cesium.Cartographic.toCartesian(_CartographicCenter1);
        const _Cartesian4Center1 = new Cesium.Cartesian4(_Cartesian3Center1.x, _Cartesian3Center1.y, _Cartesian3Center1.z, 1);
        const _time = (new Date()).getTime();
        const _scratchCartesian4Center = new Cesium.Cartesian4();
        const _scratchCartesian4Center1 = new Cesium.Cartesian4();
        const _scratchCartesian3Normal = new Cesium.Cartesian3();
        const ScanPostStage = new Cesium.PostProcessStage({
            fragmentShader: require('./shaders/circularScanShader.js'),
            uniforms: {
                u_scanCenterEC: function () {
                    return Cesium.Matrix4.multiplyByVector(self.viewer.camera._viewMatrix, _Cartesian4Center, _scratchCartesian4Center);
                },
                u_scanPlaneNormalEC: function () {
                    const temp = Cesium.Matrix4.multiplyByVector(self.viewer.camera._viewMatrix, _Cartesian4Center, _scratchCartesian4Center);
                    const temp1 = Cesium.Matrix4.multiplyByVector(self.viewer.camera._viewMatrix, _Cartesian4Center1, _scratchCartesian4Center1);
                    _scratchCartesian3Normal.x = temp1.x - temp.x;
                    _scratchCartesian3Normal.y = temp1.y - temp.y;
                    _scratchCartesian3Normal.z = temp1.z - temp.z;
                    Cesium.Cartesian3.normalize(_scratchCartesian3Normal, _scratchCartesian3Normal);
                    return _scratchCartesian3Normal;

                },
                u_radius: function () {
                    return maxRadius * (((new Date()).getTime() - _time) % duration) / duration;
                },
                u_scanColor: scanColor
            }
        });
        self.viewer.scene.postProcessStages.add(ScanPostStage)
        return ScanPostStage
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