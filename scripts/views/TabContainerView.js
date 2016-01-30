define(["require","ok","ok.dollarview","jquery","underscore"],function(e){var t=e("ok");e("ok.dollarview");var n=e("jquery"),r=e("underscore"),i=38,s=37,o=40,u=39,a=t.$View.extend({init:function(){r.bindAll(this,"handleKeyDown","handleFocus","handleFocusItem","handleBlur")},start:function(){this.stop(),n(window).on("keydown",this.handleKeyDown),this.$el.on("focus",this.handleFocus),this.$el.on("focus","a",this.handleFocusItem),this.el.addEventListener("blur",this.handleBlur,!0)},stop:function(){n(window).off("keydown",this.handleKeyDown),this.$el.off("focus",this.handleFocus),this.$el.off("focus","a",this.handleFocusItem),this.el.removeEventListener("blur",this.handleBlur)},getSelector:function(){return this.selector||"a:visible"},goUp:function(){var e=this.getSelector(),t=n(document.activeElement),r=this.$el,i=r.find(e),s=i.index(t)-1;s=Math.min(Math.max(s,0),i.length),this.$lastFocus=i.eq(s).focus()},goDown:function(){var e=this.getSelector(),t=n(document.activeElement),r=this.$el,i=r.find(e),s=i.index(t)+1;s=Math.min(Math.max(s,0),i.length),this.$lastFocus=i.eq(s).focus()},handleKeyDown:function(e){var t=this.el,r=e.which,a=r===i||r===o||r===s||r===u,f=n.contains(t,document.activeElement),l,c,h,p,d;a&&f&&(e.preventDefault(),r===i?this.goUp():r===o&&this.goDown())},handleFocus:function(){this.$el.attr("tabindex",-1).blur();if(this.$lastFocus)this.$lastFocus.focus();else{var e=this.getSelector(),t=n(document.activeElement),r=this.$el,i=r.find(e);i.first().focus()}},handleFocusItem:function(){this.$lastFocus=n(document.activeElement)},handleBlur:function(){this.$el.attr("tabindex",0)}});return a});