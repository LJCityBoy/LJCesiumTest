<template>
  <div id="ceiumView"></div>
</template>

<script>
import * as Cesium from "cesium/Cesium";

export default {
  name: "geojson",
  components: {},
  data() {
    return {
      viewer: null
    };
  },
  mounted() {
    this.initCesium();
    this.loadWaterGlod(); //全球水
    this.loadGeoJosn();
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
        requestWaterMask: false,
        requestVertexNormals: false
      });

      this.viewer._cesiumWidget._creditContainer.style.display = "none";

    //   //限制可视区域
    //   var coffeeBeltRectangle = Cesium.Rectangle.fromDegrees(110.0, 23.43687, 114.0, 25.43687);

    //     //开启限制
    //     this.viewer.scene.globe.cartographicLimitRectangle = coffeeBeltRectangle;


this.viewer.imageryLayers.addImageryProvider(imgprov)
    },
    //全球水纹
    loadWaterGlod() {
      var worldRectangle = this.viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.RectangleGeometry({
              rectangle: Cesium.Rectangle.fromDegrees(-180, -90, 180.0, 90.0),
              vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
            })
          }),
          appearance: new Cesium.EllipsoidSurfaceAppearance({
            aboveGround: true,
            material: new Cesium.Material({
              fabric: {
                type: "Water",
                uniforms: {
                  specularMap: "http://192.168.188.65:8889/earthspec1k.jpg",
                  normalMap: Cesium.buildModuleUrl(
                    "http://192.168.188.65:8889/waterNormals.jpg"
                  ),
                  frequency: 10000.0, //频率
                  animationSpeed: 0.1, //动画速度
                  amplitude: 3.0 //振幅
                }
              }
            })
          }),
          show: true
        })
      );
    },
    loadGeoJosn() {
      let self = this;
      let geo = Cesium.GeoJsonDataSource.load(
        "http://192.168.188.65:8889/jsonpoint.json",{}
      );
      geo.then(function(dataSource) {
        self.viewer.dataSource.add(dataSource);
        var entities = dataSource.entities.values;
        //可对单个实体进行设置
        for (var i = 0; i < entities.length; i++) {
          var entity = entities[i];
          //修改图片
          entity.billboard.image = "http://192.168.188.65:8889/car.png";
          //添加注记
          entity.label = new Cesium.LabelGraphics({
            text: entity.properties.NAME._value,
            font: "12px sans-serif",
            pixelOffset: new Cesium.Cartesian2(0.0, 10)
          });
        }
      });
      self.viewer.flyTo(geo);
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