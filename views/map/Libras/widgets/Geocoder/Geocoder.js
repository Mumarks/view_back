define(["Libras","./GeocoderViewModel"],function(e,t){"use strict";var n=e.defined,o=e.defineProperties,i=e.DeveloperError,s=e.FeatureDetection,r=e.knockout,a=e.getElement,d="M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z";function u(e){if(!n(e)||!n(e.container))throw new i("options.container is required.");if(!n(e.scene))throw new i("options.scene is required.");var o=a(e.container),u=new t(e);u._stopSearchPath=d;var c=document.createElement("form");c.setAttribute("data-bind","submit: search");var h=document.createElement("input");h.type="search",h.className="libras-geocoder-input",h.setAttribute("placeholder","Enter an address or landmark..."),h.setAttribute("data-bind",'textInput: searchText,disable: isSearchInProgress,event: { keyup: handleKeyUp, keydown: handleKeyDown, mouseover: deselectSuggestion },css: { "libras-geocoder-input-wide" : keepExpanded || searchText.length > 0 },hasFocus: _focusTextbox'),this._onTextBoxFocus=function(){setTimeout(function(){h.select()},0)},h.addEventListener("focus",this._onTextBoxFocus,!1),c.appendChild(h),this._textBox=h;var p=document.createElement("span"),m=document.createElement("span");p.className="libras-geocoder-searchButton",m.className="libras-icon-search",p.append(m),p.setAttribute("data-bind","click: search"),c.appendChild(p),o.appendChild(c);var l=document.createElement("div");l.className="search-results",l.setAttribute("data-bind","visible: _suggestionsVisible");var v=document.createElement("ul");v.setAttribute("data-bind","foreach: _suggestions");var g=document.createElement("li");v.appendChild(g),g.setAttribute("data-bind","text: $data.displayName, click: $parent.activateSuggestion, event: { mouseover: $parent.handleMouseover}, css: { active: $data === $parent._selectedSuggestion }"),l.appendChild(v),o.appendChild(l),r.applyBindings(u,c),r.applyBindings(u,l),this._container=o,this._searchSuggestionsContainer=l,this._viewModel=u,this._form=c,this._onInputBegin=function(e){o.contains(e.target)||(u._focusTextbox=!1,u.hideSuggestions())},this._onInputEnd=function(e){o.contains(e.target)&&(u._focusTextbox=!0,u.showSuggestions())},s.supportsPointerEvents()?(document.addEventListener("pointerdown",this._onInputBegin,!0),document.addEventListener("pointerup",this._onInputEnd,!0),document.addEventListener("pointercancel",this._onInputEnd,!0)):(document.addEventListener("mousedown",this._onInputBegin,!0),document.addEventListener("mouseup",this._onInputEnd,!0),document.addEventListener("touchstart",this._onInputBegin,!0),document.addEventListener("touchend",this._onInputEnd,!0),document.addEventListener("touchcancel",this._onInputEnd,!0))}return o(u.prototype,{container:{get:function(){return this._container}},searchSuggestionsContainer:{get:function(){return this._searchSuggestionsContainer}},viewModel:{get:function(){return this._viewModel}}}),u.prototype.isDestroyed=function(){return!1},u.prototype.destroy=function(){return s.supportsPointerEvents()?(document.removeEventListener("pointerdown",this._onInputBegin,!0),document.removeEventListener("pointerup",this._onInputEnd,!0)):(document.removeEventListener("mousedown",this._onInputBegin,!0),document.removeEventListener("mouseup",this._onInputEnd,!0),document.removeEventListener("touchstart",this._onInputBegin,!0),document.removeEventListener("touchend",this._onInputEnd,!0)),this._viewModel.destroy(),r.cleanNode(this._form),r.cleanNode(this._searchSuggestionsContainer),this._container.removeChild(this._form),this._container.removeChild(this._searchSuggestionsContainer),this._textBox.removeEventListener("focus",this._onTextBoxFocus,!1),destroyObject(this)},u});