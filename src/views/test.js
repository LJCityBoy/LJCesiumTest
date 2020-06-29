
// import * as Cesium from "cesium/Cesium";
// viewer = new Cesium.Viewer("ceiumView")

var playgon = viewer.scene.primitives.add(new Cesium.Primitive({
    geometryInstances : new Cesium.GeometryInstance({
        geometry : new Cesium.PolygonGeometry({
            polygonHierarchy : new Cesium.PolygonHierarchy(
                Cesium.Cartesian3.fromDegreesArray([
                    "86.808767','42.126409",'86.834064','42.093017','86.837513','41.994449',
                    '86.771973','41.987586','86.747826','41.852756','86.939848','41.885417',
                    '87.161765','41.9318','87.420477','41.83642','87.344589','41.898304',
                    '87.330791','42.033037','87.091626','42.063034','86.883506','42.135824',
                    '86.819116','42.147805'
                ])
            ),
            vertexFormat : Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
        })
    }),
    appearance : new Cesium.EllipsoidSurfaceAppearance({
        aboveGround : true,
        fabric :{
            type:'Water',
            uniforms : {
                normalMap:Cesium.buildModuleUrl('../assets/waterNormals.jpg'),
                frequency:10000.0,
                animationSpeed:0.01,
                amplitude:50
            }

        }
    }),
    show : true
}))
