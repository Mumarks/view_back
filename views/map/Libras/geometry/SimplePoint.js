define(["Libras","../core/GeoUtils"],function(i,t){var e=i.defaultValue,o=i.Cartesian3,s=i.DeveloperError,n=i.defined;return function(i){if(!n(i.position))throw new s("position is required");var h=i.position;if(h instanceof o){this.x=i.position.x,this.y=i.position.y,this.z=i.position.z;var r=t.cartesian2Degrees(postion);this.longitude=r.longitude,this.latitude=r.latitude,this.height=r.height}else{if(!n(h.longitude)||!n(h.latitude))throw new s("postion.longitude and postion.latitude is required");this.longitude=h.longitude,this.latitude=h.latitude,this.height=e(h.height,0),r=o.fromDegrees(h.longitude,h.latitude,h.height),this.x=r.x,this.y=r.y,this.z=r.z}}});