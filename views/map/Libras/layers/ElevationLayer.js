define(["Libras"],function(e){var t=e.Rectangle,r=e.Ellipsoid,a=e.GeographicTilingScheme,i=e.WebMercatorTilingScheme,n=e.defaultValue,o=e.defined,l=e.defineProperties,h=e.HeightmapTerrainData,g=e.loadArrayBuffer,s=e.TerrainProvider,u=e.Resource.fetchImage,m=e.getImagePixels,f=e.DeveloperError,c=e.Credit,p=e.Event,d=e.Resource.fetchXML,y=e.createGuid,S=e.when,M={},v=function(e,r){var a=Math.max(e.west,r.west),i=Math.min(e.east,r.east),n=Math.max(e.south,r.south),o=Math.min(e.north,r.north);return i<=a||n>=o?void 0:new t(a,n,i,o)};M.CRS=[{name:"CRS:84",ellipsoid:r.WGS84,firstAxeIsLatitude:!1,tilingScheme:a,supportedCRS:"urn:ogc:def:crs:OGC:2:84"},{name:"EPSG:4326",ellipsoid:r.WGS84,firstAxeIsLatitude:!0,tilingScheme:a,SupportedCRS:"urn:ogc:def:crs:EPSG::4326"},{name:"EPSG:3857",ellipsoid:r.WGS84,firstAxeIsLatitude:!1,tilingScheme:i,SupportedCRS:"urn:ogc:def:crs:EPSG::3857"},{name:"OSGEO:41001",ellipsoid:r.WGS84,firstAxeIsLatitude:!1,tilingScheme:i,SupportedCRS:"urn:ogc:def:crs:EPSG::3857"}],M.FormatImage=[{format:"image/png",extension:"png"},{format:"image/jpeg",extension:"jpg"},{format:"image/jpeg",extension:"jpeg"},{format:"image/gif",extension:"gif"},{format:"image/png; mode=8bit",extension:"png"}],M.FormatArray=[{format:"image/bil",postProcessArray:function(e,t,r,a,i){var n,o=new DataView(e),l=new ArrayBuffer(t.height*t.width*2),h=new DataView(l);if(l.byteLength===e.byteLength){for(var g,s=0,u=0,m=0;m<l.byteLength;m+=2)if((g=o.getInt16(m,!1)-i)>a&&g<r)h.setInt16(m,g,!0),u+=g,s++;else{var f=0===s?1:u/s;h.setInt16(m,f,!0)}n=new Int16Array(l)}return n}}],M.WMSParser={},M.TMSParser={},M.WMTSParser={},M.parser=function(e){var t;switch((e=n(e,n.EMPTY_OBJECT)).service){case"TMS":t=M.TMSParser.generate(e);break;case"WMTS":t=M.WMTSParser.generate(e);break;default:t=M.WMSParser.generate(e)}return t},M.WMSParser.generate=function(e){var t;if(e=n(e,n.EMPTY_OBJECT),o(e.url)){var r=e.url,a=r.lastIndexOf("?");a>-1&&(r=r.substring(0,a));var i=r+"?SERVICE=WMS&REQUEST=GetCapabilities&tiled=true";o(e.proxy)&&(i=e.proxy.getURL(i)),t=S(d(i),function(t){return M.WMSParser.getMetaDatafromXML(t,e)})}else{if(!o(e.xml))throw new f("either description.url or description.xml are required.");t=M.WMSParser.getMetaDatafromXML(e.xml,e)}return t},M.WMSParser.getMetaDatafromXML=function(e,r){if(!(e instanceof XMLDocument))throw new f("xml must be a XMLDocument");if(!o(r.layerName))throw new f("description.layerName is required.");var a={},i=r.layerName,l=n(r.maxLevel,11),h=void 0;a.heightMapWidth=n(r.heightMapWidth,65),a.heightMapHeight=n(r.heightMapHeight,a.heightMapWidth);var g={width:65,height:65},s=void 0;a.formatImage=r.formatImage,a.formatArray=r.formatArray,a.tilingScheme=void 0;var u=void 0,m=void 0;a.ready=!1,a.levelZeroMaximumGeometricError=void 0,a.waterMask=n(r.waterMask,!1),"boolean"!=typeof a.waterMask&&(a.waterMask=!1),a.offset=n(r.offset,0),a.highest=n(r.highest,12e3),a.lowest=n(r.lowest,-500);var c=r.styleName;a.hasStyledImage=n(r.hasStyledImage,"string"==typeof r.styleName);var p=e.querySelector("[version]");null!==p&&(h=p.getAttribute("version"),m=/^1\.[3-9]\./.test(h));var d=e.querySelector("Request>GetMap OnlineResource").getAttribute("xlink:href"),y=d.indexOf("?");y>-1&&(d=d.substring(0,y)),o(r.proxy)&&(d=r.proxy.getURL(d));var S=e.querySelectorAll("Request>GetMap>Format");if(!o(a.formatImage))for(var x=0;x<S.length&&!o(a.formatArray);x++){(w=M.FormatArray.filter(function(e){return e.format===S[x].textContent})).length>0&&(a.formatArray=w[0])}o(a.formatArray)&&"string"==typeof a.formatArray.format&&"function"==typeof a.formatArray.postProcessArray?a.formatArray.terrainDataStructure={heightScale:1,heightOffset:0,elementsPerHeight:1,stride:1,elementMultiplier:256,isBigEndian:!1,lowestEncodedHeight:0,highestEncodedHeight:1e4}:a.formatArray=void 0;for(x=0;x<S.length&&!o(a.formatImage);x++){var w;(w=M.FormatImage.filter(function(e){return e.format===S[x].textContent})).length>0&&(a.formatImage=w[0])}o(a.formatImage)&&"string"==typeof a.formatImage.format?a.formatImage.terrainDataStructure={heightScale:1,heightOffset:0,elementsPerHeight:2,stride:4,elementMultiplier:256,isBigEndian:!0,lowestEncodedHeight:0,highestEncodedHeight:1e4}:a.formatImage=void 0;for(var T,A=e.querySelectorAll("Layer[queryable='1'],Layer[queryable='true']"),I=0;I<A.length&&!o(T);I++)if(A[I].querySelector("Name").textContent===i){var b=(T=A[I]).getAttribute("fixedHeight"),L=T.getAttribute("fixedWidth");o(b)&&(b=parseInt(b),a.heightMapHeight=b>0&&b<a.heightMapHeight?b:a.heightMapHeight,g.height=b>0?b:g.height),o(L)&&(L=parseInt(L),a.heightMapWidth=L>0&&L<a.heightMapWidth?L:a.heightMapWidth,g.width=L>0?L:g.width)}if(o(T)&&o(h)){for(var C=!1,R=0;R<M.CRS.length&&!C;R++){var W=M.CRS[R],H=W.name,q=T.querySelector("BoundingBox[SRS='"+H+"'],BoundingBox[CRS='"+H+"']");if(null!==q){var D,P,E,k;s=H,u=W.firstAxeIsLatitude,a.tilingScheme=new W.tilingScheme({ellipsoid:W.ellipsoid}),u&&m?(D=parseFloat(q.getAttribute("miny")),P=parseFloat(q.getAttribute("maxy")),E=parseFloat(q.getAttribute("minx")),k=parseFloat(q.getAttribute("maxx"))):(D=parseFloat(q.getAttribute("minx")),P=parseFloat(q.getAttribute("maxx")),E=parseFloat(q.getAttribute("miny")),k=parseFloat(q.getAttribute("maxy")));var N=new t(D,E,P,k);a.getTileDataAvailable=function(e,t,r){var i=!1,n=a.tilingScheme.tileXYToNativeRectangle(e,t,r);if(r<l){var h=v(N,n);i=o(h)}return i},C=!0}}if(o(c)){for(var G=T.querySelectorAll("Style>Name"),F=!1,U=0;U<G.length&&!F;U++)c===G[U].textContent&&(F=!0);F||(c=void 0)}for(var X=e.querySelectorAll("VendorSpecificCapabilities>TileSet"),O=!1,B=0;B<X.length&&!O;B++){var V=null!==X[B].querySelector("BoundingBox[SRS='"+s+"'],BoundingBox[CRS='"+s+"']");X[B].querySelector("Layers").textContent===i&&V&&(g.width=parseInt(X[B].querySelector("Width").textContent),g.height=parseInt(X[B].querySelector("Height").textContent),O=!0)}a.ready=C&&(o(a.formatImage)||o(a.formatArray))&&o(h)}if(a.ready){var Y=d+"?SERVICE=WMS&REQUEST=GetMap&layers="+i+"&version="+h+"&bbox=";if(Y+=m&&u?"{south},{west},{north},{east}":"{west},{south},{east},{north}",Y+="&crs="+s+"&srs="+s,a.formatImage){var _=Y+"&format="+a.formatImage.format+"&width="+g.width+"&height="+g.height;o(c)&&(_+="&styles="+c+"&style="+c),a.URLtemplateImage=function(){return _},a.imageSize=g}if(a.formatArray){var z=Y+"&format="+a.formatArray.format+"&width="+a.heightMapWidth+"&height="+a.heightMapHeight;a.URLtemplateArray=function(){return z}}}return a},M.TMSParser.generate=function(e){var t;if(e=n(e,n.EMPTY_OBJECT),o(e.url))t=d(e.url).then(function(t){return M.TMSParser.parseXML(t,e)});else{if(!o(e.xml))throw new f("either description.url or description.xml are required.");t=M.TMSParser.parseXML(e.xml,e)}return t},M.TMSParser.parseXML=function(e,t){if(!(e instanceof XMLDocument))throw new f("xml must be a XMLDocument");var r;if(null!=e.querySelector("TileMapService")){if(!o(t.layerName))throw new f("layerName is required.");var a=[].slice.apply(e.querySelectorAll("TileMap[title='"+t.layerName+"']")).map(function(e){var r=e.getAttribute("href");return o(t.proxy)&&(r=t.proxy.getURL(r)),S(d(r),function(e){return M.TMSParser.getMetaDatafromXML(e,t)})});r=S.all(a).then(function(e){for(var t,r=0;r<e.length&&!o(t);r++)o(e[r])&&(t=e[r]);return t}).then(function(e){return e})}else r=M.TMSParser.getMetaDatafromXML(e,t);return r},M.TMSParser.getMetaDatafromXML=function(e,r){var a={ready:!1};a.heightMapWidth=n(r.heightMapWidth,65),a.heightMapHeight=n(r.heightMapHeight,a.heightMapWidth);var i=n(r.maxLevel,11),l=r.proxy;a.hasStyledImage=n(r.hasStyledImage,"string"==typeof r.styleName),a.waterMask=n(r.waterMask,!1),"boolean"!=typeof a.waterMask&&(a.waterMask=!1),a.offset=n(r.offset,0),a.highest=n(r.highest,12e3),a.lowest=n(r.lowest,-500);var h=e.querySelector("SRS").textContent,g=M.CRS.filter(function(e){return e.name===h});g.length>0&&(a.tilingScheme=new g[0].tilingScheme({ellipsoid:g[0].ellipsoid}));var s=e.querySelector("TileFormat"),u=M.FormatImage.filter(function(e){return e.extension==s.getAttribute("extension")});u.length>0&&(a.formatImage=u[0],a.imageSize={},a.imageSize.width=parseInt(s.getAttribute("width")),a.imageSize.height=parseInt(s.getAttribute("height")));var m=[].slice.call(e.querySelectorAll("TileSets>TileSet")),f=[];if(o(a.formatImage)&&((f=m.map(function(e){var t=e.getAttribute("href")+"/{x}/{tmsY}."+a.formatImage.extension;return o(l)&&(t=l.getURL(t)),{url:t,level:parseInt(e.getAttribute("order"))}})).sort(function(e,t){return e.level-t.level}),f.length>0&&(a.tileSets=f)),o(a.tileSets)&&o(a.formatImage)&&o(a.tilingScheme)){a.URLtemplateImage=function(e,t,r){var a="";return r<f.length&&(a=f[r].url),a};var c=e.querySelector("BoundingBox"),p=parseFloat(c.getAttribute("miny")),d=parseFloat(c.getAttribute("maxy")),y=parseFloat(c.getAttribute("minx")),S=parseFloat(c.getAttribute("maxx")),x=new t(y,p,S,d);a.getTileDataAvailable=function(e,t,r){var n=a.tilingScheme.tileXYToNativeRectangle(e,t,r),l=v(x,n);return o(l)&&r<i&&r<f.length},a.ready=!0}else a=void 0;return a},M.WMTSParser.generate=function(e){var t;if(e=n(e,n.EMPTY_OBJECT),o(e.url)){var r=e.url,a=r.lastIndexOf("?");a>-1&&(r=r.substring(0,a));var i=r+"?REQUEST=GetCapabilities";o(e.proxy)&&(i=e.proxy.getURL(i)),t=d(i).then(function(t){return M.WMTSParser.getMetaDatafromXML(t,e)})}else{if(!o(e.xml))throw new f("either description.url or description.xml are required.");t=M.WMTSParser.getMetaDatafromXML(e.xml,e)}return t},M.WMTSParser.getMetaDatafromXML=function(e,t){if(!(e instanceof XMLDocument))throw new f("xml must be a XMLDocument");var r={},a=t.layerName;r.ready=!1,r.heightMapWidth=n(t.heightMapWidth,65),r.heightMapHeight=n(t.heightMapHeight,r.heightMapWidth);var i,l=n(t.maxLevel,12),h=t.proxy,g=t.styleName;r.hasStyledImage=n(t.hasStyledImage,"string"==typeof t.styleName),r.waterMask=n(t.waterMask,!1),"boolean"!=typeof r.waterMask&&(r.waterMask=!1),r.offset=n(t.offset,0),r.highest=n(t.highest,12e3),r.lowest=n(t.lowest,-500);for(var s,u,m,c=[],p=[].slice.call(e.querySelectorAll('Operation[name="GetTile"] HTTP Get')).map(function(e){var t,r=e.querySelector("Value").textContent;return"KVP"===r&&(t={node:e,type:"KVP"}),"RESTful"===r&&(t={node:e,type:"RESTful"}),t}).filter(function(e){return o(e)}),d=0;d<p.length;d++){var y=p[d];"RESTful"!==y.type||o(u)||(u=y.node.getAttribute("xlink:href"),o(h)&&(u=h.getURL(u))),"KVP"!==y.type||o(s)||(s=y.node.getAttribute("xlink:href"),o(h)&&(s=h.getURL(s)))}var S,v=e.querySelectorAll("Contents>Layer>Identifier");for(d=0;d<v.length&&!o(S);d++)a===v[d].textContent&&(S=v[d].parentNode);if(o(S)){var x,w,T=S.querySelectorAll("Style");for(d=0;d<T.length;d++){var A=T[d].querySelector("Identifier").textContent;null!=T[d].getAttribute("isDefault")&&(x=A),A===g&&(w=A)}o(g)&&g==w||(g=n(x,""));for(var I=[].slice.call(S.querySelectorAll("Format")),b=0;b<M.FormatImage.length&&!o(m);b++){I.filter(function(e){return e.textContent===M.FormatImage[b].format}).length>0&&(m=M.FormatImage[b])}c=S.querySelectorAll("TileMatrixSetLink")}for(var L=[].slice.call(e.querySelectorAll("TileMatrixSet>Identifier")),C=0;C<c.length&&!r.ready;C++){var R,W,H=c[C],q=H.querySelector("TileMatrixSet").textContent;for(d=0;d<L.length&&!o(R);d++)L[d].textContent===q&&(R=L[d].parentNode);for(var D=R.querySelector("SupportedCRS").textContent,P=0;P<M.CRS.length&&!o(W);P++)M.CRS[P].SupportedCRS===D&&(W=M.CRS[P]);if(o(W)){var E,k=[].slice.call(R.querySelectorAll("TileMatrix"));(E=k.map(function(e){var t=e.querySelector("Identifier").textContent,r=parseInt(e.querySelector("MatrixWidth").textContent),a=parseInt(e.querySelector("MatrixHeight").textContent),i=parseInt(e.querySelector("TileWidth").textContent),n=parseInt(e.querySelector("TileHeight").textContent);return{id:t,maxWidth:r,maxHeight:a,scaleDenominator:parseFloat(e.querySelector("ScaleDenominator").textContent),complete:!1,tileWidth:i,tileHeight:n}})).sort(function(e,t){return t.scaleDenominator-e.scaleDenominator}),listTileMatrixLimits=H.querySelectorAll("TileMatrixSetLimits>TileMatrixLimits");for(var N=0;N<E.length;N++)for(var G=E[N],F=0;F<listTileMatrixLimits.length;F++){var U=listTileMatrixLimits[F];G.id===U.querySelector("TileMatrix").textContent&&(G.minTileRow=parseInt(U.querySelector("MinTileRow").textContent),G.maxTileRow=parseInt(U.querySelector("MaxTileRow").textContent),G.minTileCol=parseInt(U.querySelector("MinTileCol").textContent),G.maxTileCol=parseInt(U.querySelector("MaxTileCol").textContent),G.complete=!0,E[N]=G)}if(E.length>0){r.tilingScheme=new W.tilingScheme({ellipsoid:W.ellipsoid,numberOfLevelZeroTilesX:E[0].maxWidth,numberOfLevelZeroTilesY:E[0].maxHeight});var X=S.querySelector("ResourceURL[format='"+m.format+"']");if(null!=X?i=X.getAttribute("template").replace("{TileRow}","{y}").replace("{TileCol}","{x}").replace("{Style}",g).replace("{TileMatrixSet}",q).replace("{layer}",a).replace("{infoFormatExtension}",m.extension):o(s)&&(i=s+"service=WMTS&request=GetTile&version=1.0.0&layer="+a+"&style="+g+"&format="+m.format+"&TileMatrixSet="+q+"&TileMatrix={TileMatrix}&TileRow={y}&TileCol={x}"),o(i)){r.getTileDataAvailable=function(e,t,r){var a=!1;if(r<l&&r<E.length){var i=E[r];a=i.complete?t<=i.maxTileRow&&t>=i.minTileRow&&e<=i.maxTileCol&&e>=i.minTileCol:e<i.maxWidth&&t<i.maxHeight}return a},r.URLtemplateImage=function(e,t,a){var n="";if(r.getTileDataAvailable(e,t,a)){var o=E[a];n=i.replace("{TileMatrix}",o.id)}return n};var O={width:E[0].tileWidth,height:E[0].tileHeight};0==E.filter(function(e){return e.tileWidth!=O.width||e.tileHeight!=O.height}).length&&(r.imageSize=O),r.ready=!0}}}}return r};var x=function(e){if(!o(e))throw new f("description is required.");var t=new p,r=e.url.lastIndexOf("/");e.layerName=e.url.substr(r+1),e.url=e.url.substr(0,r),this.id=e.id||y(),e.heightMapWidth=e.heightMapWidth||65,e.heightMapHeight=e.heightMapHeight||65,e.maxLevel=e.maxLevel||13,e.formatImage=e.formatImage||{format:"image/png",extension:"png"},e.styleName=e.styleName||"grayToColor",e.hasStyledImage=e.hasStyledImage||!0,e.waterMask=e.waterMask||!1;var a=e.credit;"string"==typeof a&&(a=new c(a)),this.ready=!1,this._readyPromise=S.defer(),l(this,{errorEvent:{get:function(){return t}},credit:{get:function(){return a}},hasVertexNormals:{get:function(){return!1}},readyPromise:{get:function(){return this._readyPromise.promise}}}),w(M.parser(e),this)};function w(e,t){S(e,function(e){o(e)&&e.ready&&(e.levelZeroMaximumGeometricError=s.getEstimatedLevelZeroGeometricErrorForAHeightmap(e.tilingScheme.ellipsoid,e.heightMapWidth,e.tilingScheme.getNumberOfXTilesAtLevel(0)),o(e.URLtemplateImage)&&(e.getHeightmapTerrainDataImage=function(r,a,i){var n;if(!isNaN(r+a+i)){var l=T(e.URLtemplateImage(r,a,i),r,a,i,t),g={highest:e.highest,lowest:e.lowest,offset:e.offset},s=A(r,a,i,t),m=u(l);o(m)&&(n=S(m,function(t){return x.imageToHeightmapTerrainData(t,g,{width:e.heightMapWidth,height:e.heightMapHeight},e.waterMask,s,e.hasStyledImage)}).otherwise(function(){return new h({buffer:new Uint16Array(e.heightMapWidth*e.heightMapHeight),width:e.heightMapWidth,height:e.heightMapHeight,childTileMask:s,waterMask:new Uint8Array(e.heightMapWidth*e.heightMapHeight),structure:e.formatImage.terrainDataStructure})}))}return n}),o(e.URLtemplateArray)&&(e.getHeightmapTerrainDataArray=function(r,a,i){var n;if(!isNaN(r+a+i)){var l=T(e.URLtemplateArray(r,a,i),r,a,i,t),s={highest:e.highest,lowest:e.lowest,offset:e.offset},u=A(r,a,i,t),m=g(l);o(m)&&(n=S(m,function(t){return x.arrayToHeightmapTerrainData(t,s,{width:e.heightMapWidth,height:e.heightMapHeight},e.formatArray,e.waterMask,u)}).otherwise(function(){return o(e.getHeightmapTerrainDataImage)?e.getHeightmapTerrainDataImage(r,a,i):new h({buffer:new Uint16Array(e.heightMapWidth*e.heightMapHeight),width:e.heightMapWidth,height:e.heightMapHeight,childTileMask:u,waterMask:new Uint8Array(e.heightMapWidth*e.heightMapHeight),structure:e.formatImage.terrainDataStructure})}))}return n}),t.getLevelMaximumGeometricError=function(t){return e.levelZeroMaximumGeometricError/(1<<t)},t.requestTileGeometry=function(t,r,a){var i;return o(e.getHeightmapTerrainDataArray)?i=e.getHeightmapTerrainDataArray(t,r,a):o(e.getHeightmapTerrainDataImage)&&(i=e.getHeightmapTerrainDataImage(t,r,a)),i},l(t,{tilingScheme:{get:function(){return e.tilingScheme}},ready:{get:function(){return e.ready}},hasWaterMask:{get:function(){return e.waterMask}},heightMapHeight:{get:function(){return e.heightMapHeight}},heightMapWidth:{get:function(){return e.heightMapWidth}},getTileDataAvailable:{get:function(){return e.getTileDataAvailable}}})),t._readyPromise.resolve(e.ready)})}function T(e,t,r,a,i){var n=i.tilingScheme.tileXYToNativeRectangle(t,r,a),o=(n.east-n.west)/(i.heightMapWidth-1),l=(n.north-n.south)/(i.heightMapHeight-1);n.west-=.5*o,n.east+=.5*o,n.south-=.5*l,n.north+=.5*l;var h=i.tilingScheme.getNumberOfYTilesAtLevel(a)-r-1;return e.replace("{south}",n.south).replace("{north}",n.north).replace("{west}",n.west).replace("{east}",n.east).replace("{x}",t).replace("{y}",r).replace("{tmsY}",h)}function A(e,t,r,a){var i=0,n=r+1;return i|=a.getTileDataAvailable(2*e,2*t,n)?1:0,i|=a.getTileDataAvailable(2*e+1,2*t,n)?2:0,i|=a.getTileDataAvailable(2*e,2*t+1,n)?4:0,i|=a.getTileDataAvailable(2*e+1,2*t+1,n)?8:0}return x.arrayToHeightmapTerrainData=function(e,t,r,a,i,n){"number"==typeof r&&(r={width:r,height:r});var l=a.postProcessArray(e,r,t.highest,t.lowest,t.offset);if(!o(l))throw new f("no good size");var g={buffer:l,width:r.width,height:r.height,childTileMask:n,structure:a.terrainDataStructure};if(i){for(var s=new Uint8Array(l.length),u=0;u<l.length;u++)l[u]<=0&&(s[u]=255);g.waterMask=s}return new h(g)},x.imageToHeightmapTerrainData=function(e,t,r,a,i,n){"number"==typeof r&&(r={width:r,height:r});for(var o=m(e,r.width,r.height),l=new Uint8Array(o.length/4),g=new Int16Array(o.length/4),s=0,u=0,f=0;f<o.length;f+=4){var c=o[f],p=o[f+1],d=o[f+2]>128,y=(c<<8|p)-t.offset-32768;y>t.lowest&&y<t.highest&&(d||n)?(g[f/4]=y,u+=y,s++):g[f/4]=0==s?0:u/s}var S={buffer:g,width:r.width,height:r.height,childTileMask:i,structure:{heightScale:1,heightOffset:0,elementsPerHeight:1,stride:1,elementMultiplier:256,isBigEndian:!1}};if(a){for(l=new Uint8Array(g.length),f=0;f<g.length;f++)g[f]<=0&&(l[f]=255);S.waterMask=l}return new h(S)},x});