define(["Libras","../../../widgets/Navigation/ViewModels/NavigationControl","../../../widgets/Navigation/Core/Utils"],function(t,i,e){"use strict";var o=t.defined,a=t.Ray,r=t.IntersectionTests,n=t.Cartesian3,s=t.SceneMode,c=function(t,e){i.apply(this,arguments),this.name=e?"放大":"缩小",this.svgColor="#000",this.text=e?"+":"-",this.cssClass="navigation-control-icon-zoom-"+(e?"in":"out"),this.relativeAmount=2,e&&(this.relativeAmount=1/this.relativeAmount)};c.prototype.relativeAmount=1,(c.prototype=Object.create(i.prototype)).activate=function(){this.zoom(this.relativeAmount)};var l=new n;return c.prototype.zoom=function(t){if(this.isActive=!0,o(this.terria)){var i=this.terria.scene,c=i.screenSpaceCameraController;if(!c.enableInputs||!c.enableZoom)return;var h,d=i.camera;switch(i.mode){case s.MORPHING:break;case s.SCENE2D:d.zoomIn(d.positionCartographic.height*(1-this.relativeAmount));break;default:var p;if(p=o(this.terria.trackedEntity)?new n:e.getCameraFocus(this.terria,!1),o(p))h={direction:d.direction,up:d.up};else{var u=new a(d.worldToCameraCoordinatesPoint(i.globe.ellipsoid.cartographicToCartesian(d.positionCartographic)),d.directionWC);p=r.grazingAltitudeLocation(u,i.globe.ellipsoid),h={heading:d.heading,pitch:d.pitch,roll:d.roll}}var v=n.subtract(d.position,p,l),m=n.multiplyByScalar(v,t,v),g=n.add(p,m,p);o(this.terria.trackedEntity)||i.mode==s.COLUMBUS_VIEW?d.position=g:d.flyTo({destination:g,orientation:h,duration:.5,convert:!1})}}this.isActive=!1},c});