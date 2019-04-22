!function(n){"use strict";n(function(){function n(n,r,e,u){return t(n).then(r,e,u)}function t(n){var t,u;return n instanceof r?t=n:i(n)?(u=o(),n.then(function(n){u.resolve(n)},function(n){u.reject(n)},function(n){u.progress(n)}),t=u.promise):t=e(n),t}function r(n){this.then=n}function e(n){return new r(function(r){try{return t(r?r(n):n)}catch(n){return u(n)}})}function u(n){return new r(function(r,e){try{return e?t(e(n)):u(n)}catch(n){return u(n)}})}function o(){function n(n,t,r){return p(n,t,r)}function e(n){return g(n)}function i(n){return g(u(n))}function c(n){return v(n)}var f,s,a,p,v,g;return f=new r(n),s=[],a=[],p=function(n,t,r){var e,u;return e=o(),u="function"==typeof r?function(n){try{e.progress(r(n))}catch(n){e.progress(n)}}:function(n){e.progress(n)},s.push(function(r){r.then(n,t).then(e.resolve,e.reject,u)}),a.push(u),e.promise},v=function(n){return h(a,n),n},g=function(n){return n=t(n),p=n.then,g=t,v=l,h(s,n),a=s=y,n},{then:n,resolve:e,reject:i,progress:c,promise:f,resolver:{resolve:e,reject:i,progress:c}}}function i(n){return n&&"function"==typeof n.then}function c(t,r,e,u,i){return a(2,arguments),n(t,function(t){function c(n){y(n)}function f(n){g(n)}var s,h,a,p,v,g,y,m,j,d;if(j=t.length>>>0,s=Math.max(0,Math.min(r,j)),a=[],h=j-s+1,p=[],v=o(),s)for(m=v.progress,y=function(n){p.push(n),--h||(g=y=l,v.reject(p))},g=function(n){a.push(n),--s||(g=y=l,v.resolve(a))},d=0;d<j;++d)d in t&&n(t[d],f,c,m);else v.resolve(a);return v.then(e,u,i)})}function f(n,t,r,e){return a(1,arguments),s(n,p).then(t,r,e)}function s(t,r){return n(t,function(t){var e,u,i,c,f,s;if(i=u=t.length>>>0,e=[],s=o(),i)for(c=function(t,u){n(t,r).then(function(n){e[u]=n,--i||s.resolve(e)},s.reject)},f=0;f<u;f++)f in t?c(t[f],f):--i;else s.resolve(e);return s.promise})}function h(n,t){for(var r,e=0;r=n[e++];)r(t)}function a(n,t){for(var r,e=t.length;e>n;)if(null!=(r=t[--e])&&"function"!=typeof r)throw new Error("arg "+e+" must be a function")}function l(){}function p(n){return n}var v,g,y;return n.defer=o,n.resolve=t,n.reject=function(t){return n(t,u)},n.join=function(){return s(arguments,p)},n.all=f,n.map=s,n.reduce=function(t,r){var e=g.call(arguments,1);return n(t,function(t){var u;return u=t.length,e[0]=function(t,e,o){return n(t,function(t){return n(e,function(n){return r(t,n,o,u)})})},v.apply(t,e)})},n.any=function(n,t,r,e){return c(n,1,function(n){return t?t(n[0]):n[0]},r,e)},n.some=c,n.chain=function(t,r,e){var o=arguments.length>2;return n(t,function(n){return n=o?e:n,r.resolve(n),n},function(n){return r.reject(n),u(n)},r.progress)},n.isPromise=i,r.prototype={always:function(n,t){return this.then(n,n,t)},otherwise:function(n){return this.then(y,n)},yield:function(n){return this.then(function(){return n})},spread:function(n){return this.then(function(t){return f(t,function(t){return n.apply(y,t)})})}},g=[].slice,v=[].reduce||function(n){var t,r,e,u,o;if(o=0,u=(t=Object(this)).length>>>0,(r=arguments).length<=1)for(;;){if(o in t){e=t[o++];break}if(++o>=u)throw new TypeError}else e=r[1];for(;o<u;++o)o in t&&(e=n(e,t[o],o,t));return e},n})}("function"==typeof define&&define.amd?define:function(n){"object"==typeof exports?module.exports=n():this.when=n()});