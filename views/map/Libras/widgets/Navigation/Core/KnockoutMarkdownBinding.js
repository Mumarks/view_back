define(["../../../widgets/Navigation/Core/markdown-it-sanitizer","../../../widgets/Navigation/Core/markdown-it"],function(n,e){"use strict";var i=/<html(.|\s)*>(.|\s)*<\/html>/im,t=new e({html:!0,linkify:!0});function r(n){if(n instanceof HTMLAnchorElement&&(n.target="_blank"),n.childNodes&&n.childNodes.length>0)for(var e=0;e<n.childNodes.length;++e)r(n.childNodes[e])}return t.use(n,{imageClass:"",removeUnbalanced:!1,removeUnknown:!1}),{register:function(n){n.bindingHandlers.markdown={init:function(){return{controlsDescendantBindings:!0}},update:function(e,a){for(;e.firstChild;)n.removeNode(e.firstChild);var o,s=n.unwrap(a());o=i.test(s)?s:t.render(s);var d=n.utils.parseHtmlFragment(o,e);e.className=e.className+" markdown";for(var l=0;l<d.length;++l){var c=d[l];r(c),e.appendChild(c)}}}}}});