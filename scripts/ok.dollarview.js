(function(e,t,n){typeof define=="function"&&define.amd?define("ok.dollarview",["ok","jquery","ok.views"],e):typeof module!="undefined"&&typeof require=="function"?(t=require("ok"),require("ok.views"),n=require("jquery"),e(t,n),module.exports=t):(t=window.okaylib,n=window.jQuery,e(t,n))})(function(e,t){e.$View=e.View.extend({$:function(e){return this.$el.find(e)},setElement:function(e){e instanceof t&&(e=e.get(0)),this.sup("setElement",arguments),this.$el=t(e)}})});