define(["Libras","../../../widgets/Navigation/Core/Hammer"],function(n,i){"use strict";n.knockout;return{register:function(n){n.bindingHandlers.swipeLeft={init:function(t,e,a,r,o){var s=n.unwrap(e());new i(t).on("swipeleft",function(n){var i=o.$data;s.apply(i,arguments)})}},n.bindingHandlers.swipeRight={init:function(t,e,a,r,o){var s=n.unwrap(e());new i(t).on("swiperight",function(n){var i=o.$data;s.apply(i,arguments)})}}}}});