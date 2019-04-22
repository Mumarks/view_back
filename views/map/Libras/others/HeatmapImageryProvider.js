define(["Libras"],function(t){"use strict";t.Credit;var e=t.defaultValue,i=t.defined,a=t.defineProperties,r=t.DeveloperError,n=(t.Event,t.GeographicTilingScheme,t.Rectangle,t.TileProviderError,function(t){var a=(t=e(t,{})).bounds,n=t.data;if(!i(a))throw new r("options.bounds is required.");if(!(i(a.north)&&i(a.south)&&i(a.east)&&i(a.west)))throw new r("options.bounds.north, options.bounds.south, options.bounds.east and options.bounds.west are required.");if(!i(n))throw new r("data is required.");if(!i(n.min)||!i(n.max)||!i(n.points))throw new r("options.bounds.north, bounds.south, bounds.east and bounds.west are required.");this._wmp=new Cesium.WebMercatorProjection,this._mbounds=this.wgs84ToMercatorBB(a),this._options=e(t.heatmapoptions,{}),this._options.gradient=e(this._options.gradient,{.25:"rgb(0,0,255)",.55:"rgb(0,255,0)",.85:"yellow",1:"rgb(255,0,0)"}),this._setWidthAndHeight(this._mbounds),this._options.radius=Math.round(e(this._options.radius,this.width>this.height?this.width/60:this.height/60)),this._spacing=1.5*this._options.radius,this._xoffset=this._mbounds.west,this._yoffset=this._mbounds.south,this.width=Math.round(this.width+2*this._spacing),this.height=Math.round(this.height+2*this._spacing),this._mbounds.west-=this._spacing*this._factor,this._mbounds.east+=this._spacing*this._factor,this._mbounds.south-=this._spacing*this._factor,this._mbounds.north+=this._spacing*this._factor,this.bounds=this.mercatorToWgs84BB(this._mbounds),this._container=this._getContainer(this.width,this.height),this._options.container=this._container,this._heatmap=h337.create(this._options),this._canvas=this._container.children[0],this._tilingScheme=new Cesium.WebMercatorTilingScheme({rectangleSouthwestInMeters:new Cesium.Cartesian2(this._mbounds.west,this._mbounds.south),rectangleNortheastInMeters:new Cesium.Cartesian2(this._mbounds.east,this._mbounds.north)}),this._image=this._canvas,this._texture=void 0,this._tileWidth=this.width,this._tileHeight=this.height,this._ready=!1,t.data&&(this._ready=this.setWGS84Data(t.data.min,t.data.max,t.data.points))});return a(n.prototype,{url:{get:function(){return this._url}},tileWidth:{get:function(){if(!this._ready)throw new r("tileWidth must not be called before the imagery provider is ready.");return this._tileWidth}},tileHeight:{get:function(){if(!this._ready)throw new r("tileHeight must not be called before the imagery provider is ready.");return this._tileHeight}},maximumLevel:{get:function(){if(!this._ready)throw new r("maximumLevel must not be called before the imagery provider is ready.");return 0}},minimumLevel:{get:function(){if(!this._ready)throw new r("minimumLevel must not be called before the imagery provider is ready.");return 0}},tilingScheme:{get:function(){if(!this._ready)throw new r("tilingScheme must not be called before the imagery provider is ready.");return this._tilingScheme}},rectangle:{get:function(){return this._tilingScheme.rectangle}},tileDiscardPolicy:{get:function(){if(!this._ready)throw new r("tileDiscardPolicy must not be called before the imagery provider is ready.")}},errorEvent:{get:function(){return this._errorEvent}},ready:{get:function(){return this._ready}},credit:{get:function(){return this._credit}},hasAlphaChannel:{get:function(){return!0}}}),n.prototype._setWidthAndHeight=function(t){this.width=t.east>0&&t.west<0?t.east+Math.abs(t.west):Math.abs(t.east-t.west),this.height=t.north>0&&t.south<0?t.north+Math.abs(t.south):Math.abs(t.north-t.south),this._factor=1,this.width>this.height&&this.width>2e3?(this._factor=this.width/2e3,this.height/this._factor<700&&(this._factor=this.height/700)):this.height>this.width&&this.height>2e3?(this._factor=this.height/2e3,this.width/this._factor<700&&(this._factor=this.width/700)):this.width<this.height&&this.width<700?(this._factor=this.width/700,this.height/this._factor>2e3&&(this._factor=this.height/2e3)):this.height<this.width&&this.height<700&&(this._factor=this.height/700,this.width/this._factor>2e3&&(this._factor=this.width/2e3)),this.width=this.width/this._factor,this.height=this.height/this._factor},n.prototype._getContainer=function(t,e,i){var a=document.createElement("div");return i&&a.setAttribute("id",i),a.setAttribute("style","width: "+t+"px; height: "+e+"px; margin: 0px; display: none;"),document.body.appendChild(a),a},n.prototype.wgs84ToMercator=function(t){return this._wmp.project(Cesium.Cartographic.fromDegrees(t.x,t.y))},n.prototype.wgs84ToMercatorBB=function(t){var e=this._wmp.project(Cesium.Cartographic.fromDegrees(t.east,t.north)),i=this._wmp.project(Cesium.Cartographic.fromDegrees(t.west,t.south));return{north:e.y,south:i.y,east:e.x,west:i.x}},n.prototype.mercatorToWgs84=function(t){var e=this._wmp.unproject(new Cesium.Cartesian3(t.x,t.y));return{x:e.longitude,y:e.latitude}},n.prototype.mercatorToWgs84BB=function(t){var e=this._wmp.unproject(new Cesium.Cartesian3(t.west,t.south)),i=this._wmp.unproject(new Cesium.Cartesian3(t.east,t.north));return{north:this.rad2deg(i.latitude),east:this.rad2deg(i.longitude),south:this.rad2deg(e.latitude),west:this.rad2deg(e.longitude)}},n.prototype.deg2rad=function(t){return t*(Math.PI/180)},n.prototype.rad2deg=function(t){return t/(Math.PI/180)},n.prototype.wgs84PointToHeatmapPoint=function(t){return this.mercatorPointToHeatmapPoint(this.wgs84ToMercator(t))},n.prototype.mercatorPointToHeatmapPoint=function(t){var e={};return e.x=Math.round((t.x-this._xoffset)/this._factor+this._spacing),e.y=Math.round((t.y-this._yoffset)/this._factor+this._spacing),e.y=this.height-e.y,e},n.prototype.setData=function(t,e,i){return!!(i&&i.length>0&&null!==t&&!1!==t&&null!==e&&!1!==e)&&(this._heatmap.setData({min:t,max:e,data:i}),!0)},n.prototype.setWGS84Data=function(t,e,i){if(i&&i.length>0&&null!==t&&!1!==t&&null!==e&&!1!==e){for(var a=[],r=0;r<i.length;r++){var n=i[r],s=this.wgs84PointToHeatmapPoint(n);(n.value||0===n.value)&&(s.value=n.value),a.push(s)}return this.setData(t,e,a)}return!1},n.prototype.getTileCredits=function(t,e,i){},n.prototype.requestImage=function(t,e,i){if(!this._ready)throw new r("requestImage must not be called before the imagery provider is ready.");return this._image},n.prototype.pickFeatures=function(){},n}),function(t,e,i){"undefined"!=typeof module&&module.exports?module.exports=i():"function"==typeof define&&define.amd?define(i):e.h337=i()}(0,this,function(){var t={defaultRadius:40,defaultRenderer:"canvas2d",defaultGradient:{.25:"rgb(0,0,255)",.55:"rgb(0,255,0)",.85:"yellow",1:"rgb(255,0,0)"},defaultMaxOpacity:1,defaultMinOpacity:0,defaultBlur:.85,defaultXField:"x",defaultYField:"y",defaultValueField:"value",plugins:{}},e=function(){var e=function(t){this._coordinator={},this._data=[],this._radi=[],this._min=0,this._max=1,this._xField=t.xField||t.defaultXField,this._yField=t.yField||t.defaultYField,this._valueField=t.valueField||t.defaultValueField,t.radius&&(this._cfgRadius=t.radius)},i=t.defaultRadius;return e.prototype={_organiseData:function(t,e){var a=t[this._xField],r=t[this._yField],n=this._radi,s=this._data,h=this._max,o=this._min,d=t[this._valueField]||1,u=t.radius||this._cfgRadius||i;return s[a]||(s[a]=[],n[a]=[]),s[a][r]?s[a][r]+=d:(s[a][r]=d,n[a][r]=u),s[a][r]>h?(e?this.setDataMax(s[a][r]):this._max=s[a][r],!1):{x:a,y:r,value:d,radius:u,min:o,max:h}},_unOrganizeData:function(){var t=[],e=this._data,i=this._radi;for(var a in e)for(var r in e[a])t.push({x:a,y:r,radius:i[a][r],value:e[a][r]});return{min:this._min,max:this._max,data:t}},_onExtremaChange:function(){this._coordinator.emit("extremachange",{min:this._min,max:this._max})},addData:function(){if(arguments[0].length>0)for(var t=arguments[0],e=t.length;e--;)this.addData.call(this,t[e]);else{var i=this._organiseData(arguments[0],!0);i&&this._coordinator.emit("renderpartial",{min:this._min,max:this._max,data:[i]})}return this},setData:function(t){var e=t.data,i=e.length;this._data=[],this._radi=[];for(var a=0;a<i;a++)this._organiseData(e[a],!1);return this._max=t.max,this._min=t.min||0,this._onExtremaChange(),this._coordinator.emit("renderall",this._getInternalData()),this},removeData:function(){},setDataMax:function(t){return this._max=t,this._onExtremaChange(),this._coordinator.emit("renderall",this._getInternalData()),this},setDataMin:function(t){return this._min=t,this._onExtremaChange(),this._coordinator.emit("renderall",this._getInternalData()),this},setCoordinator:function(t){this._coordinator=t},_getInternalData:function(){return{max:this._max,min:this._min,data:this._data,radi:this._radi}},getData:function(){return this._unOrganizeData()}},e}(),i=function(){var t=function(t){var e=t.gradient||t.defaultGradient,i=document.createElement("canvas"),a=i.getContext("2d");i.width=256,i.height=1;var r=a.createLinearGradient(0,0,256,1);for(var n in e)r.addColorStop(n,e[n]);return a.fillStyle=r,a.fillRect(0,0,256,1),a.getImageData(0,0,256,1).data},e=function(t,e){var i=document.createElement("canvas"),a=i.getContext("2d"),r=t,n=t;if(i.width=i.height=2*t,1==e)a.beginPath(),a.arc(r,n,t,0,2*Math.PI,!1),a.fillStyle="rgba(0,0,0,1)",a.fill();else{var s=a.createRadialGradient(r,n,t*e,r,n,t);s.addColorStop(0,"rgba(0,0,0,1)"),s.addColorStop(1,"rgba(0,0,0,0)"),a.fillStyle=s,a.fillRect(0,0,2*t,2*t)}return i};function i(e){var i=e.container,a=this.shadowCanvas=document.createElement("canvas"),r=this.canvas=e.canvas||document.createElement("canvas"),n=(this._renderBoundaries=[1e4,1e4,0,0],getComputedStyle(e.container)||{});r.className="heatmap-canvas",this._width=r.width=a.width=+n.width.replace(/px/,""),this._height=r.height=a.height=+n.height.replace(/px/,""),this.shadowCtx=a.getContext("2d"),this.ctx=r.getContext("2d"),r.style.cssText=a.style.cssText="position:absolute;left:0;top:0;",i.style.position="relative",i.appendChild(r),this._palette=t(e),this._templates={},this._setStyles(e)}return i.prototype={renderPartial:function(t){this._drawAlpha(t),this._colorize()},renderAll:function(t){this._clear(),this._drawAlpha(function(t){for(var e=[],i=t.min,a=t.max,r=t.radi,n=(t=t.data,Object.keys(t)),s=n.length;s--;)for(var h=n[s],o=Object.keys(t[h]),d=o.length;d--;){var u=o[d],c=t[h][u],l=r[h][u];e.push({x:h,y:u,value:c,radius:l})}return{min:i,max:a,data:e}}(t)),this._colorize()},_updateGradient:function(e){this._palette=t(e)},updateConfig:function(t){t.gradient&&this._updateGradient(t),this._setStyles(t)},setDimensions:function(t,e){this._width=t,this._height=e,this.canvas.width=this.shadowCanvas.width=t,this.canvas.height=this.shadowCanvas.height=e},_clear:function(){this.shadowCtx.clearRect(0,0,this._width,this._height),this.ctx.clearRect(0,0,this._width,this._height)},_setStyles:function(t){this._blur=0==t.blur?0:t.blur||t.defaultBlur,t.backgroundColor&&(this.canvas.style.backgroundColor=t.backgroundColor),this._opacity=255*(t.opacity||0),this._maxOpacity=255*(t.maxOpacity||t.defaultMaxOpacity),this._minOpacity=255*(t.minOpacity||t.defaultMinOpacity),this._useGradientOpacity=!!t.useGradientOpacity},_drawAlpha:function(t){for(var i=this._min=t.min,a=this._max=t.max,r=(t=t.data||[]).length,n=1-this._blur;r--;){var s,h=t[r],o=h.x,d=h.y,u=h.radius,c=Math.min(h.value,a),l=o-u,_=d-u,g=this.shadowCtx;this._templates[u]?s=this._templates[u]:this._templates[u]=s=e(u,n),g.globalAlpha=(c-i)/(a-i),g.drawImage(s,l,_),l<this._renderBoundaries[0]&&(this._renderBoundaries[0]=l),_<this._renderBoundaries[1]&&(this._renderBoundaries[1]=_),l+2*u>this._renderBoundaries[2]&&(this._renderBoundaries[2]=l+2*u),_+2*u>this._renderBoundaries[3]&&(this._renderBoundaries[3]=_+2*u)}},_colorize:function(){var t=this._renderBoundaries[0],e=this._renderBoundaries[1],i=this._renderBoundaries[2]-t,a=this._renderBoundaries[3]-e,r=this._width,n=this._height,s=this._opacity,h=this._maxOpacity,o=this._minOpacity,d=this._useGradientOpacity;t<0&&(t=0),e<0&&(e=0),t+i>r&&(i=r-t),e+a>n&&(a=n-e);for(var u=this.shadowCtx.getImageData(t,e,i,a),c=u.data,l=c.length,_=this._palette,g=3;g<l;g+=4){var f,m=c[g],p=4*m;if(p)f=s>0?s:m<h?m<o?o:m:h,c[g-3]=_[p],c[g-2]=_[p+1],c[g-1]=_[p+2],c[g]=d?_[p+3]:f}u.data=c,this.ctx.putImageData(u,t,e),this._renderBoundaries=[1e3,1e3,0,0]},getValueAt:function(t){var e=this.shadowCtx.getImageData(t.x,t.y,1,1).data[3],i=this._max,a=this._min;return Math.abs(i-a)*(e/255)>>0},getDataURL:function(){return this.canvas.toDataURL()}},i}(),a=function(){var e=!1;return"canvas2d"===t.defaultRenderer&&(e=i),e}(),r={merge:function(){for(var t={},e=arguments.length,i=0;i<e;i++){var a=arguments[i];for(var r in a)t[r]=a[r]}return t}},n=function(){var i=function(){function t(){this.cStore={}}return t.prototype={on:function(t,e,i){var a=this.cStore;a[t]||(a[t]=[]),a[t].push(function(t){return e.call(i,t)})},emit:function(t,e){var i=this.cStore;if(i[t])for(var a=i[t].length,r=0;r<a;r++){(0,i[t][r])(e)}}},t}(),n=function(t){var e=t._renderer,i=t._coordinator,a=t._store;i.on("renderpartial",e.renderPartial,e),i.on("renderall",e.renderAll,e),i.on("extremachange",function(e){t._config.onExtremaChange&&t._config.onExtremaChange({min:e.min,max:e.max,gradient:t._config.gradient||t._config.defaultGradient})}),a.setCoordinator(i)};function s(){var s=this._config=r.merge(t,arguments[0]||{});if(this._coordinator=new i,s.plugin){var h=s.plugin;if(!t.plugins[h])throw new Error("Plugin '"+h+"' not found. Maybe it was not registered.");var o=t.plugins[h];this._renderer=new o.renderer(s),this._store=new o.store(s)}else this._renderer=new a(s),this._store=new e(s);n(this)}return s.prototype={addData:function(){return this._store.addData.apply(this._store,arguments),this},removeData:function(){return this._store.removeData&&this._store.removeData.apply(this._store,arguments),this},setData:function(){return this._store.setData.apply(this._store,arguments),this},setDataMax:function(){return this._store.setDataMax.apply(this._store,arguments),this},setDataMin:function(){return this._store.setDataMin.apply(this._store,arguments),this},configure:function(t){return this._config=r.merge(this._config,t),this._renderer.updateConfig(this._config),this._coordinator.emit("renderall",this._store._getInternalData()),this},repaint:function(){return this._coordinator.emit("renderall",this._store._getInternalData()),this},getData:function(){return this._store.getData()},getDataURL:function(){return this._renderer.getDataURL()},getValueAt:function(t){return this._store.getValueAt?this._store.getValueAt(t):this._renderer.getValueAt?this._renderer.getValueAt(t):null}},s}();return{create:function(t){return new n(t)},register:function(e,i){t.plugins[e]=i}}});