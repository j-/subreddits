define(["require","views/embedded/EmbeddedView","views/ResizableImageView"],function(e){var t=e("views/embedded/EmbeddedView"),n=e("views/ResizableImageView"),r=t.extend({className:"embedded-content embedded-deviantart",init:function(){this.canFetch=!0,this.imageView=new n({href:this.watch.get("url")})},render:function(){this.ensureContent()},ensureContent:function(){if(!this.canFetch)return;this.showLoading(),this.canFetch=!1,this.imageView.render();var e=this.watch.get("url"),t=e.match(r.hostExp),n=t[1],i=t[2],s="http://backend.deviantart.com/oembed?format=jsonp&url="+encodeURIComponent(e);$.ajax({url:s,context:this,dataType:"jsonp",success:function(e){var t=e.url;this.renderImage(t)},error:function(e,t,n){this.showError(),this.canFetch=!0}})},renderImage:function(e){this.imageView.setImageURL(e),this.empty(),this.$el.append(this.imageView.el)},showLoading:function(){var e=$.create("span").addClass("text-muted").text("Loading…");this.empty(),this.$el.append(e)},showError:function(){this.$el.text("There was an error loading this artwork")},start:function(){t.prototype.start.call(this),this.imageView.start()},stop:function(){t.prototype.stop.call(this),this.imageView.stop()}});return r.hostExp=/^https?:\/\/([^.]+)\.deviantart\.com\/art\/(.*?)/i,r.identify=function(e){var t=e.get("url");return r.hostExp.test(t)},r});