<template>
  <div id="ceiumView"></div>
</template>

<script>
import * as Cesium from "cesium/Cesium";

export default {
  name: "water",
  components: {},
  data() {
    return {
      viewer: null
    };
  },
  mounted() {
    this.initCesium();
    // this.loadWater1(); //局部动态水1
    // this.loadWater2(); //局部动态水2
    this.loadWaterGlod(); //全球水
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
    },
    //动态水1
    loadWater1() {
      var playgon = this.viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.PolygonGeometry({
              polygonHierarchy: new Cesium.PolygonHierarchy(
                Cesium.Cartesian3.fromDegreesArray([
                  86.808767,
                  42.126409,
                  86.834064,
                  42.093017,
                  86.837513,
                  41.994449,
                  86.771973,
                  41.987586,
                  86.747826,
                  41.852756,
                  86.939848,
                  41.885417,
                  87.161765,
                  41.9318,
                  87.420477,
                  41.83642,
                  87.344589,
                  41.898304,
                  87.330791,
                  42.033037,
                  87.091626,
                  42.063034,
                  86.883506,
                  42.135824,
                  86.819116,
                  42.147805
                ])
              ),
              vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
            })
          }),
          appearance: new Cesium.EllipsoidSurfaceAppearance({
            aboveGround: true,
            material: new Cesium.Material({
              fabric: {
                type: "Water",
                uniforms: {
                  normalMap: Cesium.buildModuleUrl(
                    "http://192.168.188.93:8889/waterNormals.jpg"
                  ),
                  frequency: 10000.0,
                  animationSpeed: 0.01,
                  amplitude: 50
                }
              }
            })
          }),
          show: true
        })
      );
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          86.808767,
          42.126409,
          15000.0
        )
      });
    },
    //动态水2
    loadWater2() {
        //这个是网上抄的，写法都一样
      function applydjk_WaterMaterial(primitive, scene) {
        primitive.appearance.material = new Cesium.Material({
          fabric: {
            type: "Water",
            uniforms: {
              normalMap: "http://192.168.188.93:8889/waterNormalsSmall.jpg",
              frequency: 10000.0,
              animationSpeed: 0.01,
              amplitude: 50
            }
          }
        });
      }
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          111.48894522023063,
          32.55843610413914,
          15000.0
        )
      });

      var djk_Polygon = this.viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.PolygonGeometry({
              polygonHierarchy: new Cesium.PolygonHierarchy(
                Cesium.Cartesian3.fromDegreesArray([
                  111.48894522023063,
                  32.55843610413914,
                  111.48869238776277,
                  32.55602570974643,
                  111.49004745721604,
                  32.5548361448687,
                  111.49250635559537,
                  32.5526581917131,
                  111.49401017612676,
                  32.55129837476868,
                  111.49557557543416,
                  32.549965127681524,
                  111.49805874806115,
                  32.550219820173126,
                  111.49881935514881,
                  32.550823388219456,
                  111.49893286824275,
                  32.55195597852755,
                  111.4983164393889,
                  32.5535655841798,
                  111.49817521853979,
                  32.554570336381104,
                  111.49914284747027,
                  32.55554277243855,
                  111.49967950821859,
                  32.555814392110264,
                  111.50062151969038,
                  32.556517275179836,
                  111.50149914222958,
                  32.55731250438687,
                  111.50207800636986,
                  32.55757396515373,
                  111.50386396090245,
                  32.55781206769338,
                  111.50391371888884,
                  32.559650818164926,
                  111.50077307397399,
                  32.56013340913413,
                  111.49625702141412,
                  32.560250133340446,
                  111.49171532588734,
                  32.560183453792156,
                  111.48920373670329,
                  32.56015020231049,
                  111.48844043918616,
                  32.55981856869106,
                  111.48743657311691,
                  32.55945303779285,
                  111.48760383414758,
                  32.55863069835514,
                  111.48812831262538,
                  32.55837951411848
                ])
              ),
              vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
            })
          }),
          appearance: new Cesium.EllipsoidSurfaceAppearance({
            aboveGround: true
          }),
          show: true
        })
      );
      applydjk_WaterMaterial(djk_Polygon, this.viewer.scene);
    },
    //全球水
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