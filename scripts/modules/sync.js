define(["require","exports","module","jquery","underscore"],function(e,t){var n=e("jquery"),r=e("underscore");t.getData=function(e){var t=r.extend({page:null,after:null,before:null,limit:null,count:null,show:null},e),i="https://www.reddit.com"+(t.page||"/")+".json";delete t.page;var s=n.ajax({url:i,dataType:"jsonp",jsonp:"jsonp",data:t});return s}});