define(["Libras"],function(r){var e=r.WebMapServiceImageryProvider,i=r.defined,n=r.createGuid,a=r.DeveloperError;return function(r){if(!i(r.url))throw new a("url is required");r.parameters={format:"image/png",transparent:!0};var t=new e(r);return t.id=r.id||n(),t}});