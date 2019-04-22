define(["Libras"],function(i){function t(t){this.viewer=t.viewer,this.scene=this.viewer.scene,this.points=this.viewer.entities.add(new i.Entity),this.polylines=this.viewer.entities.add(new i.Entity),this.handler=new i.ScreenSpaceEventHandler(this.viewer.scene.canvas),this.isStartDraw=!1,this.isPolygon_fill=!1,this.PolygonPointArray_fill=[],this.poinsTemp=[],this.isFlat=!1;var e=this;viewer.dataSources.add(new i.GeoJsonDataSource("tempDataSource")).then(function(i){e.tempDataSource=i})}t.prototype.start=function(){var t=this;this.handler.setInputAction(function(i){t.fnLeftClickEvent(i)},i.ScreenSpaceEventType.LEFT_CLICK),this.handler.setInputAction(function(i){t.fnRightClickEvent(i)},i.ScreenSpaceEventType.RIGHT_CLICK)},t.prototype.fnLeftClickEvent=function(t){var e=t.position;if(!(e.x-t.position.x>3||e.x-t.position.x<-3||e.y-t.position.y>3||e.y-t.position.y<-3)&&(o=this.viewer.camera.pickEllipsoid(t.position,this.scene.globe.ellipsoid))){var o=this.scene.pickPosition(e),n=i.Cartographic.fromCartesian(o),l=i.Math.toDegrees(n.longitude),r=i.Math.toDegrees(n.latitude);return currentClickHei=n.height,this.isStartDraw?(this.isPolygon_fill&&tempDataSource.entities.add({name:"line on the surface",parent:polylines,clampToGround:!0,attachPolygon:!0,polyline:{positions:i.Cartesian3.fromDegreesArrayHeights([this.PolygonPointArray_fill[this.PolygonPointArray_fill.length-3],this.PolygonPointArray_fill[this.PolygonPointArray_fill.length-2],this.PolygonPointArray_fill[this.PolygonPointArray_fill.length-1],l,r,currentClickHei]),width:2,material:i.Color.BLUE,clampToGround:!0,attachPolygon:!0,disableDepthTestDistance:1e9}}),currentClickHei=CommobPolygonHeight):this.isPolygon_fill&&(this.tempDataSource.entities.add({position:o,clampToGround:!0,attachPolygon:!0,point:{parent:this.points,pixelSize:3,color:i.Color.YELLOW,disableDepthTestDistance:1e9}}),this.PolygonPointArray_fill=null,this.isStartDraw=!0,this.CommobPolygonHeight=parseInt(currentClickHei)),this.PolygonPointArray_fill.push(l,r,currentClickHei),void this.poinsTemp.push(o)}},t.prototype.fnRightClickEvent=function(t){if(this.isPolygon_fill){var e=this.viewer.camera.pickEllipsoid(t.position,this.scene.globe.ellipsoid);if(e&&this.isStartDraw){var o=i.Cartographic.fromCartesian(e),n=i.Math.toDegrees(o.longitude).toFixed(2),l=i.Math.toDegrees(o.latitude).toFixed(2),r=scene.pickPosition(movement.position),s=(o=i.Cartographic.fromCartesian(r),i.Math.toDegrees(o.longitude)),a=i.Math.toDegrees(o.latitude);o.height;n=s,l=a;var h=CommobPolygonHeight;null!=this.PolygonPointArray_fill&&this.PolygonPointArray_fill.push(n,l,h);var c=i.createGuid();if(this.PolygonPointArray_fill.length>=9){if(this.isFlat){targetDataSource.entities.add({name:"未命名面",polygon:{hierarchy:i.Cartesian3.fromDegreesArrayHeights(this.PolygonPointArray_fill),material:new i.Color(.5,1,1,.7),fill:!0,outline:!0,outlineColor:i.Color.YELLOW,perPositionHeight:!0}});this.poinsTemp.push(r),this.isFlat=!1,this.tempDataSource.entities.removeAll()}oFlatPosArray[c]=this.PolygonPointArray_fill,this.PolygonPointArray_fill=null,this.isPolygon_fill=!1,isStartDraw=!1,$("#CreatPolygon").removeAttr("disabled").removeClass("disabled"),$(".analysisBox").show().attr("data-id",c),$("#FlatHeight").val(CommobPolygonHeight)}else alert("绘制范围最少3个点")}else this.PolygonPointArray_fill=null,this.isPolygon_fill=!1,tempDataSource.entities.removeAll(),targetDataSource.entities.removeAll(),$("#CreatPolygon").removeAttr("disabled").removeClass("disabled"),this.isFlat=!1}}});