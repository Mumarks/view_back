define(["Libras"],function(e){var r=function(){};return r.cartesian2Degrees=function(t,i){var n={},a=e.Cartographic.fromCartesian(t,i);return n.longitude=r.rad2Degree(a.longitude),n.latitude=r.rad2Degree(a.latitude),n.height=a.height,n},r.distance=function(t,i){if(!e.defined(t.longitude)||!e.defined(t.latitude))throw new e.DeveloperError("起始点必须包含经纬度信息");if(!e.defined(i.longitude)||!e.defined(i.latitude))throw new e.DeveloperError("结束点必须包含经纬度信息");var n,a,d,o;return n=r.degree2Rad(t.longitude),d=r.degree2Rad(t.latitude),a=r.degree2Rad(i.longitude),o=r.degree2Rad(i.latitude),6378137*Math.acos(Math.sin(d)*Math.sin(o)+Math.cos(d)*Math.cos(o)*Math.cos(a-n))},r.distanceByCartesian=function(r,t){if(!r instanceof e.SimplePoint||!t instanceof e.SimplePoint)throw new e.DeveloperError("point must be SimplePoint.");var i=new e.Cartesian3(r.longitude,r.latitude),n=new e.Cartesian3(t.longitude,t.latitude);return e.Cartesian3.distance(i,n)},r.degree2Rad=function(r){if(!e.defined(r))throw new e.DeveloperError("degree is required.");return Math.PI*r/180},r.rad2Degree=function(r){if(!e.defined(r))throw new e.DeveloperError("radians is required.");return 180*r/Math.PI},r});