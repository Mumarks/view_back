define(["Libras"],function(t){var i=t.Check,e=t.AssociativeArray,r=t.RuntimeError;function n(t){this.viewer=t,this._items=new e,this.items=this._items._array,this.length=this.items.length}return n.prototype.add=function(t){i.typeOf.object("graphic",t);var e=t.id,n=this._items;if(n.contains(e))throw new r("A Graphic with id "+e+"already exist in this collection");return n.set(e,t),this.viewer.entities.add(t)},n.prototype.remove=function(t){return i.typeOf.object("graphic",t),this._items.remove(t.id),this.viewer.entities.remove(t)},n.prototype.findGraphicById=function(t){return i.typeOf.string("id",t),this._items.get(t)},n});