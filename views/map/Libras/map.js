require.config({baseUrl:"../Libras"}),require(["./views/SceneView","./Graphic","./layers/ElevationLayer"],function(e,i,r){viewer=new e({container:"map-content"}),elevationLayer=new r({url:"http://192.168.10.191:8082/libra/admin/wms/cq_dem@dem"})});