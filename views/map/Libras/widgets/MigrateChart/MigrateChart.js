define(["Libras","../../_Color"],function(e,t){e.SceneMode,e.GeoJsonDataSource;var o=e.Color,i=e.Cartesian3,n=e.PolylineOutlineMaterialProperty,r=e.defined,a=e.DeveloperError,l=e.JulianDate;function s(e){var s,h,d=document.createElement("canvas"),p=d.getContext("2d");d.height=4,d.width=4,p.fillStyle=e.pointStyle.color,p.arc(2,2,2,0,2*Math.PI,!1),p.fill(),h=d.toDataURL(),this.entityCollection=s=e.viewer.entities.add({}),e.viewer.clockViewModel.shouldAnimate=!0;var u=function(e,t,o,i){if(e&&e instanceof Array&&t&&t instanceof Array){var n=[],r=[];return t.map(function(t){for(var a={lng:t[0],lat:t[1]},l={lng:e[0],lat:e[1]},s=function(e,t){t=t||{};for(var o=[],i=0;i<e.length-1;i++){var n=c(e[i],e[i+1],t.count);n&&n.length>0&&(o=o.concat(n))}return o}([l,a]),h=[],d=0,p=s.length;d<s.length;d++,p--)n.push({geometry:{type:"Point",coordinates:s[d]},time:o&&p||d}),h.push(s[d][0]),h.push(s[d][1]),h.push(i);r.push({geometry:{type:"LineString",coordinates:h}})}),{point:n,line:r}}}(e.center,e.points,e.direction,e.height),f=u.line,g=u.point,y=[],v=e.lineStyle,m=new o(32/255,228/255,243/255,.8),w=1,S=new o(65/255,105/255,225/255,.8);v&&(v.color&&(m=t(v.color)),v.size&&(w=v.size));for(var P=0;P<f.length;++P)y[P]=e.viewer.entities.add({parent:s,polyline:{positions:i.fromDegreesArrayHeights(f[P].geometry.coordinates),width:w,material:new n({color:m,outlineWidth:.1,outlineColor:S}),depthFailMaterial:new n({color:m,outlineWidth:.1,outlineColor:S})}});var D=new o(243/255,242/255,249/255,.8),M=8;e.endPointStyle&&e.endPointStyle.color&&(D=t(e.endPointStyle.color)),e.endPointStyle&&e.endPointStyle.size&&(M=e.endPointStyle.size);var z=[];for(P=0;P<e.points.length;++P)z[P]=e.viewer.entities.add({parent:s,position:i.fromDegrees(e.points[P][0],e.points[P][1],e.height),point:{color:D,pixelSize:M}});var C={start:0,end:50},F=85,A=C.end-C.start,I=function(e){if(!r(e))throw new a("time is required.");var t=l.toDate(e).getTime()/F%A+C.start,o=o||10;return!!(t&&this.nameID>t-o&&this.nameID<t)},b=[],x=e.pointStyle,L=D,E=5;x&&(x.color&&(L=t(x.color)),x.size&&(E=x.size));for(P=0;P<g.length;++P){var J=g[P].geometry.coordinates[0],W=g[P].geometry.coordinates[1];b[P]=e.viewer.entities.add({parent:s,position:i.fromDegrees(J,W,e.height),nameID:g[P].time,billboard:{image:h,width:E,height:E,color:L}}),b[P].isAvailable=I}var k=e.centerPointStyle,q=new o(192/255,16/255,26/255,.8),G=24;k&&(k.color&&(q=t(k.color)),k.size&&(G=k.size)),z[P]=e.viewer.entities.add({parent:s,position:i.fromDegrees(e.center[0],e.center[1],e.height),point:{show:!0,color:q,pixelSize:G}})}function c(e,t,o){if(!e||!t)return null;var i,n,r,a,l,s,c=function(e){return 1-2*e+e*e},h=function(e){return 2*e-2*e*e},d=function(e){return e*e},p=[],u=(o=o||40,0),f=0;if(void 0!==t){var g=parseFloat(e.lat),y=parseFloat(t.lat),v=parseFloat(e.lng),m=parseFloat(t.lng);for(m>v&&parseFloat(m-v)>180&&v<0&&(v=parseFloat(360+v)),v>m&&parseFloat(v-m)>180&&m<0&&(m=parseFloat(360+m)),0,s=0,y==g?(i=0,n=v-m):m==v?(i=Math.PI/2,n=g-y):(i=Math.atan((y-g)/(m-v)),n=(y-g)/Math.sin(i)),0==s&&(s=i+Math.PI/5),l=(r=n/2)*Math.cos(s)+v,a=r*Math.sin(s)+g,u=0;u<o+1;u++)p.push([v*c(f)+l*h(f)+m*d(f),g*c(f)+a*h(f)+y*d(f)]),f+=1/o;return p}void 0!==p&&(p=[])}return s.prototype.destroy=function(e){this.entityCollection.entityCollection.removeAll(),e.entities.remove(this.entityCollection)},s});