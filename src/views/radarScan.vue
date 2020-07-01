<template>
  <!-- <div> -->
  <div id="ceiumView"></div>
  <!-- </div> -->
</template>

<script>
import * as Cesium from "cesium/Cesium";
export default {
  name: "radarScan",
  components: {},
  data() {
    return {
      viewer: null
    };
  },
  mounted() {
    document.title = "雷达扫描";
    this.initCesium();

    let datas = {
      lon: 113.2201, //经度
      lat: 22.47101, //纬度
      scanColor: new Cesium.Color(0, 1.0, 0, 1),
      r: 1500, //扫描半径
      interval: 4000 //时间间隔
    };
    this.addRadarScan(datas);

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
    addRadarScan(data) {
      let self = this;
      self.viewer.scene.globe.depthTestAgainstTerrain = true;
      let CartographicCenter = new Cesium.Cartographic(
        Cesium.Math.toRadians(data.lon),
        Cesium.Math.toRadians(data.lat),
        0
      );
      let cartographicCenter = new Cesium.Cartographic(
        Cesium.Math.toRadians(data.lon),
        Cesium.Math.toRadians(data.lat),
        0
      );
      let radius = data.r,
        scanColor = data.scanColor,
        duration = data.interval;
      let ScanSegmentShader = require("./shaders/radarScanShader.js");
      let _Cartesian3Center = Cesium.Cartographic.toCartesian(
        cartographicCenter
      );
      let _Cartesian4Center = new Cesium.Cartesian4(
        _Cartesian3Center.x,
        _Cartesian3Center.y,
        _Cartesian3Center.z,
        1
      );
      let _CartographicCenter1 = new Cesium.Cartographic(
        cartographicCenter.longitude,
        cartographicCenter.latitude,
        cartographicCenter.height + 500
      );
      let _Cartesian3Center1 = Cesium.Cartographic.toCartesian(
        _CartographicCenter1
      );
      let _Cartesian4Center1 = new Cesium.Cartesian4(
        _Cartesian3Center1.x,
        _Cartesian3Center1.y,
        _Cartesian3Center1.z,
        1
      );
      let _CartographicCenter2 = new Cesium.Cartographic(
        cartographicCenter.longitude + Cesium.Math.toRadians(0.001),
        cartographicCenter.latitude,
        cartographicCenter.height
      );
      let _Cartesian3Center2 = Cesium.Cartographic.toCartesian(
        _CartographicCenter2
      );
      let _Cartesian4Center2 = new Cesium.Cartesian4(
        _Cartesian3Center2.x,
        _Cartesian3Center2.y,
        _Cartesian3Center2.z,
        1
      );
      let _RotateQ = new Cesium.Quaternion();
      let _RotateM = new Cesium.Matrix3();
      let _time = new Date().getTime();
      let _scratchCartesian4Center = new Cesium.Cartesian4();
      let _scratchCartesian4Center1 = new Cesium.Cartesian4();
      let _scratchCartesian4Center2 = new Cesium.Cartesian4();
      let _scratchCartesian3Normal = new Cesium.Cartesian3();
      let _scratchCartesian3Normal1 = new Cesium.Cartesian3();
      let ScanPostStage = new Cesium.PostProcessStage({
        fragmentShader: ScanSegmentShader,
        uniforms: {
          u_scanCenterEC: function() {
            return Cesium.Matrix4.multiplyByVector(
              self.viewer.camera._viewMatrix,
              _Cartesian4Center,
              _scratchCartesian4Center
            );
          },
          u_scanPlaneNormalEC: function() {
            const temp = Cesium.Matrix4.multiplyByVector(
              self.viewer.camera._viewMatrix,
              _Cartesian4Center,
              _scratchCartesian4Center
            );
            const temp1 = Cesium.Matrix4.multiplyByVector(
              self.viewer.camera._viewMatrix,
              _Cartesian4Center1,
              _scratchCartesian4Center1
            );
            _scratchCartesian3Normal.x = temp1.x - temp.x;
            _scratchCartesian3Normal.y = temp1.y - temp.y;
            _scratchCartesian3Normal.z = temp1.z - temp.z;
            Cesium.Cartesian3.normalize(
              _scratchCartesian3Normal,
              _scratchCartesian3Normal
            );
            return _scratchCartesian3Normal;
          },
          u_radius: radius,
          u_scanLineNormalEC: function() {
            const temp = Cesium.Matrix4.multiplyByVector(
              self.viewer.camera._viewMatrix,
              _Cartesian4Center,
              _scratchCartesian4Center
            );
            const temp1 = Cesium.Matrix4.multiplyByVector(
              self.viewer.camera._viewMatrix,
              _Cartesian4Center1,
              _scratchCartesian4Center1
            );
            const temp2 = Cesium.Matrix4.multiplyByVector(
              self.viewer.camera._viewMatrix,
              _Cartesian4Center2,
              _scratchCartesian4Center2
            );
            _scratchCartesian3Normal.x = temp1.x - temp.x;
            _scratchCartesian3Normal.y = temp1.y - temp.y;
            _scratchCartesian3Normal.z = temp1.z - temp.z;
            Cesium.Cartesian3.normalize(
              _scratchCartesian3Normal,
              _scratchCartesian3Normal
            );
            _scratchCartesian3Normal1.x = temp2.x - temp.x;
            _scratchCartesian3Normal1.y = temp2.y - temp.y;
            _scratchCartesian3Normal1.z = temp2.z - temp.z;
            const tempTime =
              ((new Date().getTime() - _time) % duration) / duration;
            Cesium.Quaternion.fromAxisAngle(
              _scratchCartesian3Normal,
              tempTime * Cesium.Math.PI * 2,
              _RotateQ
            );
            Cesium.Matrix3.fromQuaternion(_RotateQ, _RotateM);
            Cesium.Matrix3.multiplyByVector(
              _RotateM,
              _scratchCartesian3Normal1,
              _scratchCartesian3Normal1
            );
            Cesium.Cartesian3.normalize(
              _scratchCartesian3Normal1,
              _scratchCartesian3Normal1
            );
            return _scratchCartesian3Normal1;
          },
          u_scanColor: scanColor
        }
      });
      self.viewer.scene.postProcessStages.add(ScanPostStage);
      return ScanPostStage;
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