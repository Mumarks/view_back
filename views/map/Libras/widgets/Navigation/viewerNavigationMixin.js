define(["Libras","../../widgets/Navigation/LibrasNavigation"],function(i,r){"use strict";i=Libras.defined;var e=Libras.defineProperties,n=Libras.DeveloperError;function t(r,t){if(!i(r))throw new n("viewer is required.");a(r,t).addOnDestroyListener(function(i){return function(){delete i.librasNavigation}}(r)),e(r,{librasNavigation:{configurable:!0,get:function(){return r.librasWidget.librasNavigation}}})}t.mixinWidget=function(i,r){return a.apply(void 0,arguments)};var a=function(n,t){var a=new r(n,t),o=i(n.librasWidget)?n.librasWidget:n;return e(o,{librasNavigation:{configurable:!0,get:function(){return a}}}),a.addOnDestroyListener(function(i){return function(){delete i.librasNavigation}}(o)),a};return t});