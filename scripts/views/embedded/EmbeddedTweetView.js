define(["require","views/embedded/EmbeddedView","views/ResizableImageView"],function(e){var t=e("views/embedded/EmbeddedView"),n=e("views/ResizableImageView"),r=t.extend({className:"embedded-content embedded-tweet",init:function(){this.canFetch=!0},render:function(){this.ensureContent()},ensureContent:function(){if(!this.canFetch)return;this.showLoading(),this.canFetch=!1;var e=this.watch.get("url"),t=e.match(r.tweetExp),n=t[2],i="https://api.twitter.com/1/statuses/oembed.json?format=jsonp&id="+n;$.ajax({url:i,context:this,dataType:"jsonp",success:function(e){var t=e.html;this.renderTweet(t)},error:function(e,t,n){this.showError(),this.canFetch=!0}})},renderTweet:function(e){this.empty(),this.$el.html(e)},showLoading:function(){var e=$.create("span").addClass("text-muted").text("Loading…");this.empty(),this.$el.append(e)},showError:function(){this.$el.text("There was an error loading this tweet")}});return r.tweetExp=/^https?:\/\/twitter\.com\/(\w+)\/status\/(\d+)/i,r.identify=function(e){var t=e.get("url");return r.tweetExp.test(t)},r});