define(["../layers/GraphicsLayer","../others/EventDrive","../symbols/TextSymbol","../symbols/PrimitiveSymbol","../Graphic","../_Color","Libras"],function(e,i,t,s,h,n,o){function r(t){this.viewer=t.viewer,this.layer=new e,this.path=[],this.height=[],this.lines=null,this.label=[],this.screenPoints=[],this.point=this.viewer.entities.add({point:{color:o.Color.RED,pixelSize:10}}),this.event=new i({viewer:this.viewer,eventType:"left_click",callBack:e=>{4==this.path.length&&(this.path=[],this.screenPoints=[],this.height=[],this.viewer.map.remove(this.lines),this.label.forEach(e=>this.viewer.map.remove(e)),this.label=[]);let i=this.path,n=this.screenPoints,r=this.movePoint.longitude,l=this.movePoint.latitude,a=this.movePoint.height;if(a<-50)return;i.push(r,l),this.screenPoints.push(e.screenPoint.x,e.screenPoint.y),this.height.push(a);i.length;let c=new h({symbol:{type:"point-3d",style:{type:"cone",height:600,width:300,color:"#4af99d"}},geometry:{type:"point",longitude:r,latitude:l,height:a+300}}),p=new s({type:"circle",center:[r,l],radius:1,color:"#4af99d",class:"both"}),v=new s({type:"line",ranges:i,color:"red",width:2,class:"both"});if(this.layer.add(c),this.label.push(p),this.lines=v,this.viewer.map.add(v),this.viewer.map.add(p),4==this.screenPoints.length){let e=this.viewer.scene,i=n[0],s=n[1],h=n[2],r=n[3],l=50,a=Math.abs(i-h)/l,c=Math.abs(s-r)/l,p=null,v=null,d=null,m=[];i<h?(p=i,v=s,d=r):(p=h,v=r,d=s);for(let i=1;i<=l;i++){let t,s,h,n=new o.Cartesian2(p+a*i,v-d>0?v-c*i:v+c*i);if(e.pick(n)){if(h=e.pickPosition(n),t=e.pickPosition(new o.Cartesian2(p,v)),!h)return;s=this.viewer.scene.globe.ellipsoid.cartesianToCartographic(h)}else{let i=e.camera.getPickRay(n);h=e.globe.pick(i,e),t=e.globe.pick(e.camera.getPickRay(new o.Cartesian2(p,v)),e),s=o.Ellipsoid.WGS84.cartesianToCartographic(h)}let r=Math.sqrt(o.Cartesian3.distanceSquared(h,t));m.push({distance:r,height:s.height<0?0:s.height})}t.callBack&&t.callBack(m)}this.viewer.scene.requestRenderMode=!1}}),this.mouseMove=new i({eventType:"mouse_move",viewer:t.viewer,callBack:e=>{this.movePoint=e.mapPoint,this.point&&(this.point.position=e.cartesian)}})}return r.prototype.destroy=function(){this.viewer.entities.remove(this.labelTotle),this.viewer.entities.remove(this.point),this.label.forEach(e=>this.viewer.map.remove(e)),this.viewer.map.remove(this.lines),this.event.destroy(),this.mouseMove.destroy(),this.height=[],this.point=null,this.path=[],this.lines=null},r});