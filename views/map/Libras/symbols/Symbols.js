define(["./SimpleMarkerSymbol","./PictureMarkerSymbol","./WebStyleSymbol","./BoxSymbol","./SimpleLineSymbol","./SimpleFillSymbol","./TextSymbol","./LineSymbol3D","./PointSymbol3D","./EllipseSymbol"],function(e,n,i,t,o,l,r,y,p,s){var m=Libras.defined,a=Libras.RuntimeError;return function(f){if(!m(f))throw new a("the options is required");return"simple-marker"!==f.type||f instanceof e?"picture-marker"!==f.type||f instanceof n?"simple-line"!==f.type||f instanceof o?"simple-fill"!==f.type||f instanceof l?"web-style"!==f.type||f instanceof i?"box"!==f.type||f instanceof t?"text"!==f.type||f instanceof r?"line-3d"!==f.type||f instanceof y?"point-3d"!==f.type||f instanceof p?"ellipse"!==f.type||f instanceof s?f:new s(f):new p(f):new y(f):new r(f):new t(f):new i(f):new l(f):new o(f):new n(f):new e(f)}});