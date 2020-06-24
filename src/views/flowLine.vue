<template>
  <div id="ceiumView"></div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
export default {
  name: "fly",
  data() {
    return {
      viewer: null
    };
  },
  created() {},
  mounted() {
    this.initCesium();
    let ps = [
      {
        longitude: 114.38,
        latitude: 36.9,
        height: 351.68,
        heading: 0.0,
        pitch: -28.0,
        roll: 0.0,
        duration: 3
      },
      {
        longitude: 114.68,
        latitude: 36.3,
        height: 351.68,
        heading: 0.0,
        pitch: -28.0,
        roll: 0.0,
        duration: 3
      },
      {
        longitude: 114.98,
        latitude: 36.6,
        height: 321.28,
        heading: 0.0,
        pitch: -28.0,
        roll: 0.0,
        duration: 3
      }
    ];
    this.lineFly(ps);
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
    addprototype(){
        function PolylineTrailLinkMaterialProperty(color,duration){
            this._definitionChanged = new Cesium.Event();
            this._color = undefined;
            this._colorSubscription = undefined;
            this.color = color;
            this.duration = duration || 3000;
            this._time = (new Date()).getTime();
            this.isTranslucent = function(){
                return true;
            }
        }

        Object.defineProperties(PolylineTrailLinkMaterialProperty.prototype,{
            isConstant:{
                get:function(){
                    return false;
                }
            },
            definitionChanged:{
                get:function(){
                    return this._definitionChanged;
                }
            },
            color:Cesium.createPropertyDescriptor('color')
        })

        PolylineTrailLinkMaterialProperty.prototype.getType = function(time){
            return 'PolylineTrailLink'
        }

        PolylineTrailLinkMaterialProperty.prototype.getValue = function(time,result){
            if(!Cesium.defined(result)){
                result = {}
            }
        }
    }
  }
};
</script>

<style>
</style>