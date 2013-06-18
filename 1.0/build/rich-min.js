/*! autocomplete - v1.0 - 2013-06-18 1:48:10 PM
* Copyright (c) 2013 舒克; Licensed  */
KISSY.add(function(a,b,c,d){var e="query",f="result",g="afterQueryChange",h="results",i="select",j="activeItem",k="hoverItem",l="ks-ac-active",m="ks-ac-hover",n="J_AcItem",o="ks-autocomplete",p="ks-autocomplete-input",q="."+n,r=a.isArray,s=document;s.body;var t=a.DOM,u=window,v=function(){this.initRich.apply(this,arguments)};return v.ATTRS={width:{value:null,getter:"_getWidth"},enableAutoFill:{value:!0},activeFirstItem:{value:!0},activeItem:{value:null},hoveredItem:{readOnly:!0,value:null},visible:{value:!1},resultsListVisible:{value:!1},messageVisible:{value:!1},align:{value:{node:null,points:["bl","tl"],offset:[0,-1],overflow:{adjustX:0,adjustY:0}},setter:"_setAlign"},boundingBoxTemplate:{value:'<div class="ks-ac-header"></div><div class="ks-ac-body">   <div class="ks-ac-message J_AcMessage"></div>   <div class="ks-ac-content J_AcContent">       <div class="J_HotList"></div>       <div class="J_ResultsList"></div>   </div></div><div class="ks-ac-footer"><span></span></div>'},listNodeTemplate:{value:'<div class="ks-ac-list"></div>'},itemNodeTemplate:{value:'<div class="ks-ac-item"></div>'},noResultsMessage:{value:'\u6ca1\u6709"<span class="ks-ac-message-hightlight">{query}</span>"\u76f8\u5173\u7684\u63a8\u8350'},trigger:{value:[]}},v.prototype={overlay:null,overlayNode:null,contentNode:null,resultsListNode:null,messageNode:null,hotNode:null,headerNode:null,footerNode:null,initRich:function(){this._renderRich(),this._bindRich()},destructor:function(){this.resultsListNode.detach(),this.detach(),this.overlay=null},_renderRich:function(){var b=this.get("inputNode");b.addClass(p);var c=this.get("align");c.node=c.node?c.node:b;var e=this.overlay=new d({align:c,content:this.get("boundingBoxTemplate")});e.render();var f=e.get("el");this.overlayId="J_Ks"+a.guid(),f.prop("id",this.overlayId).addClass(o).attr("tabindex","-1"),this.overlayNode=f,this.headerNode=f.one(".J_AcHeader"),this.bodyNode=f.one(".J_AcBody"),this.footerNode=f.one(".J_AcFooter"),this.messageNode=f.one(".J_AcMessage").hide(),this.contentNode=f.one(".J_AcContent"),this.hotNode=f.one(".J_HotList").hide(),this.resultsListNode=f.one(".J_ResultsList").hide(),a.one(u).on("resize",a.buffer(this._syncPosition,100,this),this)},_buildList:function(b){var c=a.one(a.DOM.create(this.get("listNodeTemplate")));return a.each(b,function(a){c.append(this._createItemNode(a).data(f,a))},this),c},_createItemNode:function(b){var c=a.one(t.create(this.get("itemNodeTemplate")));return c.addClass(n).append(b.display),c},_bindRich:function(){var b=this.get("inputNode");this.on("afterVisibleChange",this._afterVisibleChange,this),this.on("afterResultsListVisibleChange",this._afterResultsListVisibleChange,this),this.on("afterMessageVisibleChange",this._afterMessageVisibleChange,this),b.on("keydown",a.bind(this._afterKeyDown,this)),b.on("focus",this._onFocus,this),this.on(h,a.bind(this._onResults,this)),this.on(g,this._onQuery,this),this.on("afterActiveItemChange",a.bind(this._afterActiveChange,this)),this.on("afterHoverItemChange",a.bind(this._afterHoverChange,this)),this.on(i,this._onSelect,this);var c=a.one(s),d=a.bind(this._afterDocClick,this);this.overlay.on("afterVisibleChange",function(a){return a.newVal?(c.on("click",d),void 0):(c.detach("click",d),void 0)},this),this.bindList()},bindList:function(){this.resultsListNode.delegate("mouseenter",q,function(b){var c=a.one(b.currentTarget);this.hoverItem(c)},this),this.resultsListNode.delegate("click",q,function(b){b.preventDefault();var c=a.one(b.currentTarget);this.selectItem(c)},this),this.resultsListNode.on("mouseleave",function(){this.set(k,null)},this)},_onResults:function(b){var c=b.results,d=b.query,e=this.resultsListNode;this._isSelectVal||(r(c)&&c.length>0?(this._clear(),e.empty(),e.append(this._buildList(c)),this.set("messageVisible",!1),this.get("activeFirstItem")&&this.set(j,this._getFirstItem()),s.activeElement==this.inputNode[0]&&this.set("resultsListVisible",!0)):(d=a.escapeHTML(d),s.activeElement==this.inputNode[0]&&this.showMessage(a.substitute(this.get("noResultsMessage"),{query:d}))))},showMessage:function(a){this.messageNode.html(a);var b=this;return setTimeout(function(){b.set("messageVisible",!0)},1),this},_syncPosition:function(){var a=this.get("align");this.overlay.align(a.node,a.points,a.offset,a.overflow)},_clear:function(){this.set(j,null),this.set(k,null)},selectItem:function(a){a||(a=this.get(j));var b=a.data(f);return this.fire(i,{node:a,result:b}),this},_afterVisibleChange:function(a){var b=a.newVal;this._syncPosition(),b?this.overlay.show():this.overlay.hide()},_afterResultsListVisibleChange:function(a){var b=a.newVal;b?(this.overlay.set("width",this.get("width")),this.resultsListNode.show(),this.set("visible",!0),this._syncPosition()):this.resultsListNode.hide(),""!==this.get(e).query&&a.newVal===!1&&this.get("enableAutoFill")&&this.get(j)&&this.selectItem()},_afterMessageVisibleChange:function(a){var b=a.newVal;b?(this.overlay.set("width",this.get("width")),this.messageNode.show(),this.set("visible",!0)):(this.messageNode.hide(),this.set("visilbe",!1))},_onFocus:function(a){var b=this;b.set("messageVisible",!1),setTimeout(function(){b._isSelectVal||a.currentTarget.select()},100)},_isOutSide:function(b,c){for(var d=0,e=c.length;e>d;d++){var f=c[d][0];if(b===f||a.one(b).parent(function(a){return a===f?!0:void 0}))return!1}return!0},_afterDocClick:function(a){var b=a.target;this._isOutSide(b,[this.overlayNode,this.inputNode].concat(this.get("trigger")))&&(this.set("resultsListVisible",!1),this.set("visible",!1))},_onSelect:function(a){var b=this,c=this.get("inputNode");this._updateValue(a.result.text),this._isSelectVal=!0,setTimeout(function(){b._isSelectVal=!1},200),c[0].focus(),this.set(j,null),this.set("resultsListVisible",!1),this.set("visible",!1)},_onQuery:function(a){0===a.newVal.query.length&&(this.set("resultsListVisible",!1),this.set("messageVisible",!1))},_afterActiveChange:function(a){var b=a.prevVal,c=a.newVal;b&&b.removeClass(l),c&&c.addClass(l)},_afterHoverChange:function(a){var b=a.prevVal,c=a.newVal;b&&b.removeClass(m),c&&c.addClass(m)},_afterKeyDown:function(a){switch(a.keyCode){case 38:a.preventDefault(),this.activePrevItem();break;case 40:a.preventDefault(),this.activeNextItem();break;case 13:a.preventDefault(),this.get("resultsListVisible")&&this.get(j)&&this.selectItem();break;case 9:this.get("resultsListVisible")&&this.get(j)&&(a.preventDefault(),this.selectItem()),this.set("resultsListVisible",!1),this.set("visible",!1);break;case 27:this.set("resultsListVisible",!1),this.set("visible",!1)}},hoverItem:function(a){a&&this.set(k,a)},activeNextItem:function(){var a,b=this.get(j);b?(a=b.next(q),a||(a=this._getFirstItem())):a=this._getFirstItem(),this.set(j,a)},activePrevItem:function(){var a=this.get(j),b=a?a.prev(q)||this._getLastItem():this._getLastItem();this.set(j,b)},_getFirstItem:function(){return this.resultsListNode.one(q)},_getLastItem:function(){return this.resultsListNode.one(q+":last-child")},_getWidth:function(b){return a.isNumber(b)?b:b instanceof a.NodeList?b.outerWidth():null===b?this.get("inputNode").outerWidth():void 0},_setAlign:function(b){var c={node:null,points:["bl","tl"],offset:[0,-1],overflow:{adjustX:0,adjustY:0}};return a.mix(c,b,void 0,void 0,!0),c.node=a.isString(c.node)?a.one(c.node):c.node,c.node?c:(c.node=this.get("inputNode"),c)}},v},{requires:["node","event","overlay","sizzle"]});