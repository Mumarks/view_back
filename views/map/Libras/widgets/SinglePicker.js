define(["Libras","others/EventDrive","_Color"],function(e,t,r){function i(i){this.clickFeature,this.enterFeature,this.viewer=i.viewer;var c=this;i.viewer.scene.requestRenderMode=!1,this.clickEvent=t({viewer:viewer,eventType:"left_click",callBack:function(t){var n=viewer.scene.pick(t.screenPoint);n&&n.id?(c.clickFeature&&(c.clickFeature.id,n.id),c.clickFeature=n,i.clickPick&&i.clickPick.color&&n.primitive.getGeometryInstanceAttributes&&(n.primitive.getGeometryInstanceAttributes(n.id).color=e.ColorGeometryInstanceAttribute.toValue(r(i.clickPick.color))),i.clickPick&&i.clickPick.success&&i.clickPick.success(n)):i.clickPick&&i.clickPick.error&&i.clickPick.error()}}),this.enterEvent=t({viewer:viewer,eventType:"mouse_move",callBack:function(t){var n=viewer.scene.pick(t.screenPoint);if(n&&n.primitive instanceof e.GroundPrimitive){if(c.enterFeature&&c.enterFeature.id==n.id)return;c.enterFeature=n,i.enterPick&&i.enterPick.color&&n.primitive.getGeometryInstanceAttributes&&(n.primitive.getGeometryInstanceAttributes(n.id).color=e.ColorGeometryInstanceAttribute.toValue(r(i.enterPick.color))),i.enterPick&&i.enterPick.enter&&i.enterPick.enter(n)}else i.enterPick&&i.enterPick.colorOut&&c.enterFeature&&(c.enterFeature.primitive.getGeometryInstanceAttributes(c.enterFeature.id).color=e.ColorGeometryInstanceAttribute.toValue(r(i.enterPick.colorOut))),c.enterFeature=null,i.enterPick&&i.enterPick.out&&i.enterPick.out()}})}return i.prototype.destroy=function(){this.clickEvent.destroy(),this.enterEvent.destroy(),this.viewer.scene.requestRenderMode=!1},i});