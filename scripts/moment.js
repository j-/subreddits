//! moment.js
//! version : 2.8.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function(e){function tt(e,t,n){switch(arguments.length){case 2:return e!=null?e:t;case 3:return e!=null?e:t!=null?t:n;default:throw new Error("Implement me")}}function nt(e,t){return o.call(e,t)}function rt(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function it(e){t.suppressDeprecationWarnings===!1&&typeof console!="undefined"&&console.warn&&console.warn("Deprecation warning: "+e)}function st(e,t){var n=!0;return ht(function(){return n&&(it(e),n=!1),t.apply(this,arguments)},t)}function ot(e,t){Z[e]||(it(t),Z[e]=!0)}function ut(e,t){return function(n){return vt(e.call(this,n),t)}}function at(e,t){return function(n){return this.localeData().ordinal(e.call(this,n),t)}}function ft(){}function lt(e,t){t!==!1&&Mt(e),pt(this,e),this._d=new Date(+e._d)}function ct(e){var n=Tt(e),r=n.year||0,i=n.quarter||0,s=n.month||0,o=n.week||0,u=n.day||0,a=n.hour||0,f=n.minute||0,l=n.second||0,c=n.millisecond||0;this._milliseconds=+c+l*1e3+f*6e4+a*36e5,this._days=+u+o*7,this._months=+s+i*3+r*12,this._data={},this._locale=t.localeData(),this._bubble()}function ht(e,t){for(var n in t)nt(t,n)&&(e[n]=t[n]);return nt(t,"toString")&&(e.toString=t.toString),nt(t,"valueOf")&&(e.valueOf=t.valueOf),e}function pt(e,t){var n,r,i;typeof t._isAMomentObject!="undefined"&&(e._isAMomentObject=t._isAMomentObject),typeof t._i!="undefined"&&(e._i=t._i),typeof t._f!="undefined"&&(e._f=t._f),typeof t._l!="undefined"&&(e._l=t._l),typeof t._strict!="undefined"&&(e._strict=t._strict),typeof t._tzm!="undefined"&&(e._tzm=t._tzm),typeof t._isUTC!="undefined"&&(e._isUTC=t._isUTC),typeof t._offset!="undefined"&&(e._offset=t._offset),typeof t._pf!="undefined"&&(e._pf=t._pf),typeof t._locale!="undefined"&&(e._locale=t._locale);if(m.length>0)for(n in m)r=m[n],i=t[r],typeof i!="undefined"&&(e[r]=i);return e}function dt(e){return e<0?Math.ceil(e):Math.floor(e)}function vt(e,t,n){var r=""+Math.abs(e),i=e>=0;while(r.length<t)r="0"+r;return(i?n?"+":"":"-")+r}function mt(e,t){var n={milliseconds:0,months:0};return n.months=t.month()-e.month()+(t.year()-e.year())*12,e.clone().add(n.months,"M").isAfter(t)&&--n.months,n.milliseconds=+t- +e.clone().add(n.months,"M"),n}function gt(e,t){var n;return t=Bt(t,e),e.isBefore(t)?n=mt(e,t):(n=mt(t,e),n.milliseconds=-n.milliseconds,n.months=-n.months),n}function yt(e,n){return function(r,i){var s,o;return i!==null&&!isNaN(+i)&&(ot(n,"moment()."+n+"(period, number) is deprecated. Please use moment()."+n+"(number, period)."),o=r,r=i,i=o),r=typeof r=="string"?+r:r,s=t.duration(r,i),bt(this,s,e),this}}function bt(e,n,r,i){var s=n._milliseconds,o=n._days,u=n._months;i=i==null?!0:i,s&&e._d.setTime(+e._d+s*r),o&&dn(e,"Date",pn(e,"Date")+o*r),u&&hn(e,pn(e,"Month")+u*r),i&&t.updateOffset(e,o||u)}function wt(e){return Object.prototype.toString.call(e)==="[object Array]"}function Et(e){return Object.prototype.toString.call(e)==="[object Date]"||e instanceof Date}function St(e,t,n){var r=Math.min(e.length,t.length),i=Math.abs(e.length-t.length),s=0,o;for(o=0;o<r;o++)(n&&e[o]!==t[o]||!n&&Ct(e[o])!==Ct(t[o]))&&s++;return s+i}function xt(e){if(e){var t=e.toLowerCase().replace(/(.)s$/,"$1");e=V[e]||$[t]||t}return e}function Tt(e){var t={},n,r;for(r in e)nt(e,r)&&(n=xt(r),n&&(t[n]=e[r]));return t}function Nt(n){var r,i;if(n.indexOf("week")===0)r=7,i="day";else{if(n.indexOf("month")!==0)return;r=12,i="month"}t[n]=function(s,o){var u,a,f=t._locale[n],l=[];typeof s=="number"&&(o=s,s=e),a=function(e){var n=t().utc().set(i,e);return f.call(t._locale,n,s||"")};if(o!=null)return a(o);for(u=0;u<r;u++)l.push(a(u));return l}}function Ct(e){var t=+e,n=0;return t!==0&&isFinite(t)&&(t>=0?n=Math.floor(t):n=Math.ceil(t)),n}function kt(e,t){return(new Date(Date.UTC(e,t+1,0))).getUTCDate()}function Lt(e,n,r){return an(t([e,11,31+n-r]),n,r).week}function At(e){return Ot(e)?366:365}function Ot(e){return e%4===0&&e%100!==0||e%400===0}function Mt(e){var t;e._a&&e._pf.overflow===-2&&(t=e._a[f]<0||e._a[f]>11?f:e._a[l]<1||e._a[l]>kt(e._a[a],e._a[f])?l:e._a[c]<0||e._a[c]>24||e._a[c]===24&&(e._a[h]!==0||e._a[p]!==0||e._a[d]!==0)?c:e._a[h]<0||e._a[h]>59?h:e._a[p]<0||e._a[p]>59?p:e._a[d]<0||e._a[d]>999?d:-1,e._pf._overflowDayOfYear&&(t<a||t>l)&&(t=l),e._pf.overflow=t)}function _t(t){return t._isValid==null&&(t._isValid=!isNaN(t._d.getTime())&&t._pf.overflow<0&&!t._pf.empty&&!t._pf.invalidMonth&&!t._pf.nullInput&&!t._pf.invalidFormat&&!t._pf.userInvalidated,t._strict&&(t._isValid=t._isValid&&t._pf.charsLeftOver===0&&t._pf.unusedTokens.length===0&&t._pf.bigHour===e)),t._isValid}function Dt(e){return e?e.toLowerCase().replace("_","-"):e}function Pt(e){var t=0,n,r,i,s;while(t<e.length){s=Dt(e[t]).split("-"),n=s.length,r=Dt(e[t+1]),r=r?r.split("-"):null;while(n>0){i=Ht(s.slice(0,n).join("-"));if(i)return i;if(r&&r.length>=n&&St(s,r,!0)>=n-1)break;n--}t++}return null}function Ht(e){var n=null;if(!v[e]&&g)try{n=t.locale(),require("./locale/"+e),t.locale(n)}catch(r){}return v[e]}function Bt(e,n){var r,i;return n._isUTC?(r=n.clone(),i=(t.isMoment(e)||Et(e)?+e:+t(e))- +r,r._d.setTime(+r._d+i),t.updateOffset(r,!1),r):t(e).local()}function jt(e){return e.match(/\[[\s\S]/)?e.replace(/^\[|\]$/g,""):e.replace(/\\/g,"")}function Ft(e){var t=e.match(E),n,r;for(n=0,r=t.length;n<r;n++)Y[t[n]]?t[n]=Y[t[n]]:t[n]=jt(t[n]);return function(i){var s="";for(n=0;n<r;n++)s+=t[n]instanceof Function?t[n].call(i,e):t[n];return s}}function It(e,t){return e.isValid()?(t=qt(t,e.localeData()),J[t]||(J[t]=Ft(t)),J[t](e)):e.localeData().invalidDate()}function qt(e,t){function r(e){return t.longDateFormat(e)||e}var n=5;S.lastIndex=0;while(n>=0&&S.test(e))e=e.replace(S,r),S.lastIndex=0,n-=1;return e}function Rt(e,t){var n,r=t._strict;switch(e){case"Q":return D;case"DDDD":return H;case"YYYY":case"GGGG":case"gggg":return r?B:N;case"Y":case"G":case"g":return F;case"YYYYYY":case"YYYYY":case"GGGGG":case"ggggg":return r?j:C;case"S":if(r)return D;case"SS":if(r)return P;case"SSS":if(r)return H;case"DDD":return T;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return L;case"a":case"A":return t._locale._meridiemParse;case"x":return M;case"X":return _;case"Z":case"ZZ":return A;case"T":return O;case"SSSS":return k;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"ww":case"WW":return r?P:x;case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"W":case"e":case"E":return x;case"Do":return r?t._locale._ordinalParse:t._locale._ordinalParseLenient;default:return n=new RegExp(Qt(Kt(e.replace("\\","")),"i")),n}}function Ut(e){e=e||"";var t=e.match(A)||[],n=t[t.length-1]||[],r=(n+"").match(z)||["-",0,0],i=+(r[1]*60)+Ct(r[2]);return r[0]==="+"?-i:i}function zt(e,n,r){var i,s=r._a;switch(e){case"Q":n!=null&&(s[f]=(Ct(n)-1)*3);break;case"M":case"MM":n!=null&&(s[f]=Ct(n)-1);break;case"MMM":case"MMMM":i=r._locale.monthsParse(n,e,r._strict),i!=null?s[f]=i:r._pf.invalidMonth=n;break;case"D":case"DD":n!=null&&(s[l]=Ct(n));break;case"Do":n!=null&&(s[l]=Ct(parseInt(n.match(/\d{1,2}/)[0],10)));break;case"DDD":case"DDDD":n!=null&&(r._dayOfYear=Ct(n));break;case"YY":s[a]=t.parseTwoDigitYear(n);break;case"YYYY":case"YYYYY":case"YYYYYY":s[a]=Ct(n);break;case"a":case"A":r._isPm=r._locale.isPM(n);break;case"h":case"hh":r._pf.bigHour=!0;case"H":case"HH":s[c]=Ct(n);break;case"m":case"mm":s[h]=Ct(n);break;case"s":case"ss":s[p]=Ct(n);break;case"S":case"SS":case"SSS":case"SSSS":s[d]=Ct(("0."+n)*1e3);break;case"x":r._d=new Date(Ct(n));break;case"X":r._d=new Date(parseFloat(n)*1e3);break;case"Z":case"ZZ":r._useUTC=!0,r._tzm=Ut(n);break;case"dd":case"ddd":case"dddd":i=r._locale.weekdaysParse(n),i!=null?(r._w=r._w||{},r._w.d=i):r._pf.invalidWeekday=n;break;case"w":case"ww":case"W":case"WW":case"d":case"e":case"E":e=e.substr(0,1);case"gggg":case"GGGG":case"GGGGG":e=e.substr(0,2),n&&(r._w=r._w||{},r._w[e]=Ct(n));break;case"gg":case"GG":r._w=r._w||{},r._w[e]=t.parseTwoDigitYear(n)}}function Wt(e){var n,r,i,s,o,u,f;n=e._w,n.GG!=null||n.W!=null||n.E!=null?(o=1,u=4,r=tt(n.GG,e._a[a],an(t(),1,4).year),i=tt(n.W,1),s=tt(n.E,1)):(o=e._locale._week.dow,u=e._locale._week.doy,r=tt(n.gg,e._a[a],an(t(),o,u).year),i=tt(n.w,1),n.d!=null?(s=n.d,s<o&&++i):n.e!=null?s=n.e+o:s=o),f=fn(r,i,s,u,o),e._a[a]=f.year,e._dayOfYear=f.dayOfYear}function Xt(e){var t,n,r=[],i,s;if(e._d)return;i=$t(e),e._w&&e._a[l]==null&&e._a[f]==null&&Wt(e),e._dayOfYear&&(s=tt(e._a[a],i[a]),e._dayOfYear>At(s)&&(e._pf._overflowDayOfYear=!0),n=rn(s,0,e._dayOfYear),e._a[f]=n.getUTCMonth(),e._a[l]=n.getUTCDate());for(t=0;t<3&&e._a[t]==null;++t)e._a[t]=r[t]=i[t];for(;t<7;t++)e._a[t]=r[t]=e._a[t]==null?t===2?1:0:e._a[t];e._a[c]===24&&e._a[h]===0&&e._a[p]===0&&e._a[d]===0&&(e._nextDay=!0,e._a[c]=0),e._d=(e._useUTC?rn:nn).apply(null,r),e._tzm!=null&&e._d.setUTCMinutes(e._d.getUTCMinutes()+e._tzm),e._nextDay&&(e._a[c]=24)}function Vt(e){var t;if(e._d)return;t=Tt(e._i),e._a=[t.year,t.month,t.day||t.date,t.hour,t.minute,t.second,t.millisecond],Xt(e)}function $t(e){var t=new Date;return e._useUTC?[t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()]:[t.getFullYear(),t.getMonth(),t.getDate()]}function Jt(n){if(n._f===t.ISO_8601){Yt(n);return}n._a=[],n._pf.empty=!0;var r=""+n._i,i,s,o,u,a,f=r.length,l=0;o=qt(n._f,n._locale).match(E)||[];for(i=0;i<o.length;i++)u=o[i],s=(r.match(Rt(u,n))||[])[0],s&&(a=r.substr(0,r.indexOf(s)),a.length>0&&n._pf.unusedInput.push(a),r=r.slice(r.indexOf(s)+s.length),l+=s.length),Y[u]?(s?n._pf.empty=!1:n._pf.unusedTokens.push(u),zt(u,s,n)):n._strict&&!s&&n._pf.unusedTokens.push(u);n._pf.charsLeftOver=f-l,r.length>0&&n._pf.unusedInput.push(r),n._pf.bigHour===!0&&n._a[c]<=12&&(n._pf.bigHour=e),n._isPm&&n._a[c]<12&&(n._a[c]+=12),n._isPm===!1&&n._a[c]===12&&(n._a[c]=0),Xt(n),Mt(n)}function Kt(e){return e.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(e,t,n,r,i){return t||n||r||i})}function Qt(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function Gt(e){var t,n,r,i,s;if(e._f.length===0){e._pf.invalidFormat=!0,e._d=new Date(NaN);return}for(i=0;i<e._f.length;i++){s=0,t=pt({},e),e._useUTC!=null&&(t._useUTC=e._useUTC),t._pf=rt(),t._f=e._f[i],Jt(t);if(!_t(t))continue;s+=t._pf.charsLeftOver,s+=t._pf.unusedTokens.length*10,t._pf.score=s;if(r==null||s<r)r=s,n=t}ht(e,n||t)}function Yt(e){var t,n,r=e._i,i=I.exec(r);if(i){e._pf.iso=!0;for(t=0,n=R.length;t<n;t++)if(R[t][1].exec(r)){e._f=R[t][0]+(i[6]||" ");break}for(t=0,n=U.length;t<n;t++)if(U[t][1].exec(r)){e._f+=U[t][0];break}r.match(A)&&(e._f+="Z"),Jt(e)}else e._isValid=!1}function Zt(e){Yt(e),e._isValid===!1&&(delete e._isValid,t.createFromInputFallback(e))}function en(e,t){var n=[],r;for(r=0;r<e.length;++r)n.push(t(e[r],r));return n}function tn(n){var r=n._i,i;r===e?n._d=new Date:Et(r)?n._d=new Date(+r):(i=y.exec(r))!==null?n._d=new Date(+i[1]):typeof r=="string"?Zt(n):wt(r)?(n._a=en(r.slice(0),function(e){return parseInt(e,10)}),Xt(n)):typeof r=="object"?Vt(n):typeof r=="number"?n._d=new Date(r):t.createFromInputFallback(n)}function nn(e,t,n,r,i,s,o){var u=new Date(e,t,n,r,i,s,o);return e<1970&&u.setFullYear(e),u}function rn(e){var t=new Date(Date.UTC.apply(null,arguments));return e<1970&&t.setUTCFullYear(e),t}function sn(e,t){if(typeof e=="string")if(!isNaN(e))e=parseInt(e,10);else{e=t.weekdaysParse(e);if(typeof e!="number")return null}return e}function on(e,t,n,r,i){return i.relativeTime(t||1,!!n,e,r)}function un(e,n,r){var i=t.duration(e).abs(),o=s(i.as("s")),u=s(i.as("m")),a=s(i.as("h")),f=s(i.as("d")),l=s(i.as("M")),c=s(i.as("y")),h=o<K.s&&["s",o]||u===1&&["m"]||u<K.m&&["mm",u]||a===1&&["h"]||a<K.h&&["hh",a]||f===1&&["d"]||f<K.d&&["dd",f]||l===1&&["M"]||l<K.M&&["MM",l]||c===1&&["y"]||["yy",c];return h[2]=n,h[3]=+e>0,h[4]=r,on.apply({},h)}function an(e,n,r){var i=r-n,s=r-e.day(),o;return s>i&&(s-=7),s<i-7&&(s+=7),o=t(e).add(s,"d"),{week:Math.ceil(o.dayOfYear()/7),year:o.year()}}function fn(e,t,n,r,i){var s=rn(e,0,1).getUTCDay(),o,u;return s=s===0?7:s,n=n!=null?n:i,o=i-s+(s>r?7:0)-(s<i?7:0),u=7*(t-1)+(n-i)+o+1,{year:u>0?e:e-1,dayOfYear:u>0?u:At(e-1)+u}}function ln(n){var r=n._i,i=n._f,s;return n._locale=n._locale||t.localeData(n._l),r===null||i===e&&r===""?t.invalid({nullInput:!0}):(typeof r=="string"&&(n._i=r=n._locale.preparse(r)),t.isMoment(r)?new lt(r,!0):(i?wt(i)?Gt(n):Jt(n):tn(n),s=new lt(n),s._nextDay&&(s.add(1,"d"),s._nextDay=e),s))}function cn(e,n){var r,i;n.length===1&&wt(n[0])&&(n=n[0]);if(!n.length)return t();r=n[0];for(i=1;i<n.length;++i)n[i][e](r)&&(r=n[i]);return r}function hn(e,t){var n;if(typeof t=="string"){t=e.localeData().monthsParse(t);if(typeof t!="number")return e}return n=Math.min(e.date(),kt(e.year(),t)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](t,n),e}function pn(e,t){return e._d["get"+(e._isUTC?"UTC":"")+t]()}function dn(e,t,n){return t==="Month"?hn(e,n):e._d["set"+(e._isUTC?"UTC":"")+t](n)}function vn(e,n){return function(r){return r!=null?(dn(this,e,r),t.updateOffset(this,n),this):pn(this,e)}}function mn(e){return e*400/146097}function gn(e){return e*146097/400}function yn(e){t.duration.fn[e]=function(){return this._data[e]}}function bn(e){if(typeof ender!="undefined")return;i=r.moment,e?r.moment=st("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.",t):r.moment=t}var t,n="2.8.4",r=typeof global!="undefined"?global:this,i,s=Math.round,o=Object.prototype.hasOwnProperty,u,a=0,f=1,l=2,c=3,h=4,p=5,d=6,v={},m=[],g=typeof module!="undefined"&&module&&module.exports,y=/^\/?Date\((\-?\d+)/i,b=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,w=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,E=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g,S=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,x=/\d\d?/,T=/\d{1,3}/,N=/\d{1,4}/,C=/[+\-]?\d{1,6}/,k=/\d+/,L=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,A=/Z|[\+\-]\d\d:?\d\d/gi,O=/T/i,M=/[\+\-]?\d+/,_=/[\+\-]?\d+(\.\d{1,3})?/,D=/\d/,P=/\d\d/,H=/\d{3}/,B=/\d{4}/,j=/[+-]?\d{6}/,F=/[+-]?\d+/,I=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,q="YYYY-MM-DDTHH:mm:ssZ",R=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],U=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],z=/([\+\-]|\d\d)/gi,W="Date|Hours|Minutes|Seconds|Milliseconds".split("|"),X={Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6},V={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",Q:"quarter",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},$={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},J={},K={s:45,m:45,h:22,d:26,M:11},Q="DDD w W M D d".split(" "),G="M D H h m s w W".split(" "),Y={M:function(){return this.month()+1},MMM:function(e){return this.localeData().monthsShort(this,e)},MMMM:function(e){return this.localeData().months(this,e)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(e){return this.localeData().weekdaysMin(this,e)},ddd:function(e){return this.localeData().weekdaysShort(this,e)},dddd:function(e){return this.localeData().weekdays(this,e)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return vt(this.year()%100,2)},YYYY:function(){return vt(this.year(),4)},YYYYY:function(){return vt(this.year(),5)},YYYYYY:function(){var e=this.year(),t=e>=0?"+":"-";return t+vt(Math.abs(e),6)},gg:function(){return vt(this.weekYear()%100,2)},gggg:function(){return vt(this.weekYear(),4)},ggggg:function(){return vt(this.weekYear(),5)},GG:function(){return vt(this.isoWeekYear()%100,2)},GGGG:function(){return vt(this.isoWeekYear(),4)},GGGGG:function(){return vt(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.localeData().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.localeData().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return Ct(this.milliseconds()/100)},SS:function(){return vt(Ct(this.milliseconds()/10),2)},SSS:function(){return vt(this.milliseconds(),3)},SSSS:function(){return vt(this.milliseconds(),3)},Z:function(){var e=-this.zone(),t="+";return e<0&&(e=-e,t="-"),t+vt(Ct(e/60),2)+":"+vt(Ct(e)%60,2)},ZZ:function(){var e=-this.zone(),t="+";return e<0&&(e=-e,t="-"),t+vt(Ct(e/60),2)+vt(Ct(e)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},x:function(){return this.valueOf()},X:function(){return this.unix()},Q:function(){return this.quarter()}},Z={},et=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"];while(Q.length)u=Q.pop(),Y[u+"o"]=at(Y[u],u);while(G.length)u=G.pop(),Y[u+u]=ut(Y[u],2);Y.DDDD=ut(Y.DDD,3),ht(ft.prototype,{set:function(e){var t,n;for(n in e)t=e[n],typeof t=="function"?this[n]=t:this["_"+n]=t;this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(e){return this._months[e.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(e){return this._monthsShort[e.month()]},monthsParse:function(e,n,r){var i,s,o;this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]);for(i=0;i<12;i++){s=t.utc([2e3,i]),r&&!this._longMonthsParse[i]&&(this._longMonthsParse[i]=new RegExp("^"+this.months(s,"").replace(".","")+"$","i"),this._shortMonthsParse[i]=new RegExp("^"+this.monthsShort(s,"").replace(".","")+"$","i")),!r&&!this._monthsParse[i]&&(o="^"+this.months(s,"")+"|^"+this.monthsShort(s,""),this._monthsParse[i]=new RegExp(o.replace(".",""),"i"));if(r&&n==="MMMM"&&this._longMonthsParse[i].test(e))return i;if(r&&n==="MMM"&&this._shortMonthsParse[i].test(e))return i;if(!r&&this._monthsParse[i].test(e))return i}},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(e){return this._weekdays[e.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(e){return this._weekdaysShort[e.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(e){return this._weekdaysMin[e.day()]},weekdaysParse:function(e){var n,r,i;this._weekdaysParse||(this._weekdaysParse=[]);for(n=0;n<7;n++){this._weekdaysParse[n]||(r=t([2e3,1]).day(n),i="^"+this.weekdays(r,"")+"|^"+this.weekdaysShort(r,"")+"|^"+this.weekdaysMin(r,""),this._weekdaysParse[n]=new RegExp(i.replace(".",""),"i"));if(this._weekdaysParse[n].test(e))return n}},_longDateFormat:{LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY LT",LLLL:"dddd, MMMM D, YYYY LT"},longDateFormat:function(e){var t=this._longDateFormat[e];return!t&&this._longDateFormat[e.toUpperCase()]&&(t=this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(e){return e.slice(1)}),this._longDateFormat[e]=t),t},isPM:function(e){return(e+"").toLowerCase().charAt(0)==="p"},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(e,t,n){return e>11?n?"pm":"PM":n?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(e,t,n){var r=this._calendar[e];return typeof r=="function"?r.apply(t,[n]):r},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(e,t,n,r){var i=this._relativeTime[n];return typeof i=="function"?i(e,t,n,r):i.replace(/%d/i,e)},pastFuture:function(e,t){var n=this._relativeTime[e>0?"future":"past"];return typeof n=="function"?n(t):n.replace(/%s/i,t)},ordinal:function(e){return this._ordinal.replace("%d",e)},_ordinal:"%d",_ordinalParse:/\d{1,2}/,preparse:function(e){return e},postformat:function(e){return e},week:function(e){return an(e,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}}),t=function(t,n,r,i){var s;return typeof r=="boolean"&&(i=r,r=e),s={},s._isAMomentObject=!0,s._i=t,s._f=n,s._l=r,s._strict=i,s._isUTC=!1,s._pf=rt(),ln(s)},t.suppressDeprecationWarnings=!1,t.createFromInputFallback=st("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(e){e._d=new Date(e._i+(e._useUTC?" UTC":""))}),t.min=function(){var e=[].slice.call(arguments,0);return cn("isBefore",e)},t.max=function(){var e=[].slice.call(arguments,0);return cn("isAfter",e)},t.utc=function(t,n,r,i){var s;return typeof r=="boolean"&&(i=r,r=e),s={},s._isAMomentObject=!0,s._useUTC=!0,s._isUTC=!0,s._l=r,s._i=t,s._f=n,s._strict=i,s._pf=rt(),ln(s).utc()},t.unix=function(e){return t(e*1e3)},t.duration=function(e,n){var r=e,i=null,s,o,u,a;return t.isDuration(e)?r={ms:e._milliseconds,d:e._days,M:e._months}:typeof e=="number"?(r={},n?r[n]=e:r.milliseconds=e):(i=b.exec(e))?(s=i[1]==="-"?-1:1,r={y:0,d:Ct(i[l])*s,h:Ct(i[c])*s,m:Ct(i[h])*s,s:Ct(i[p])*s,ms:Ct(i[d])*s}):(i=w.exec(e))?(s=i[1]==="-"?-1:1,u=function(e){var t=e&&parseFloat(e.replace(",","."));return(isNaN(t)?0:t)*s},r={y:u(i[2]),M:u(i[3]),d:u(i[4]),h:u(i[5]),m:u(i[6]),s:u(i[7]),w:u(i[8])}):typeof r=="object"&&("from"in r||"to"in r)&&(a=gt(t(r.from),t(r.to)),r={},r.ms=a.milliseconds,r.M=a.months),o=new ct(r),t.isDuration(e)&&nt(e,"_locale")&&(o._locale=e._locale),o},t.version=n,t.defaultFormat=q,t.ISO_8601=function(){},t.momentProperties=m,t.updateOffset=function(){},t.relativeTimeThreshold=function(t,n){return K[t]===e?!1:n===e?K[t]:(K[t]=n,!0)},t.lang=st("moment.lang is deprecated. Use moment.locale instead.",function(e,n){return t.locale(e,n)}),t.locale=function(e,n){var r;return e&&(typeof n!="undefined"?r=t.defineLocale(e,n):r=t.localeData(e),r&&(t.duration._locale=t._locale=r)),t._locale._abbr},t.defineLocale=function(e,n){return n!==null?(n.abbr=e,v[e]||(v[e]=new ft),v[e].set(n),t.locale(e),v[e]):(delete v[e],null)},t.langData=st("moment.langData is deprecated. Use moment.localeData instead.",function(e){return t.localeData(e)}),t.localeData=function(e){var n;e&&e._locale&&e._locale._abbr&&(e=e._locale._abbr);if(!e)return t._locale;if(!wt(e)){n=Ht(e);if(n)return n;e=[e]}return Pt(e)},t.isMoment=function(e){return e instanceof lt||e!=null&&nt(e,"_isAMomentObject")},t.isDuration=function(e){return e instanceof ct};for(u=et.length-1;u>=0;--u)Nt(et[u]);t.normalizeUnits=function(e){return xt(e)},t.invalid=function(e){var n=t.utc(NaN);return e!=null?ht(n._pf,e):n._pf.userInvalidated=!0,n},t.parseZone=function(){return t.apply(null,arguments).parseZone()},t.parseTwoDigitYear=function(e){return Ct(e)+(Ct(e)>68?1900:2e3)},ht(t.fn=lt.prototype,{clone:function(){return t(this)},valueOf:function(){return+this._d+(this._offset||0)*6e4},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){var e=t(this).utc();return 0<e.year()&&e.year()<=9999?"function"==typeof Date.prototype.toISOString?this.toDate().toISOString():It(e,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):It(e,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var e=this;return[e.year(),e.month(),e.date(),e.hours(),e.minutes(),e.seconds(),e.milliseconds()]},isValid:function(){return _t(this)},isDSTShifted:function(){return this._a?this.isValid()&&St(this._a,(this._isUTC?t.utc(this._a):t(this._a)).toArray())>0:!1},parsingFlags:function(){return ht({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(e){return this.zone(0,e)},local:function(e){return this._isUTC&&(this.zone(0,e),this._isUTC=!1,e&&this.add(this._dateTzOffset(),"m")),this},format:function(e){var n=It(this,e||t.defaultFormat);return this.localeData().postformat(n)},add:yt(1,"add"),subtract:yt(-1,"subtract"),diff:function(e,n,r){var i=Bt(e,this),s=(this.zone()-i.zone())*6e4,o,u,a;return n=xt(n),n==="year"||n==="month"?(o=(this.daysInMonth()+i.daysInMonth())*432e5,u=(this.year()-i.year())*12+(this.month()-i.month()),a=this-t(this).startOf("month")-(i-t(i).startOf("month")),a-=(this.zone()-t(this).startOf("month").zone()-(i.zone()-t(i).startOf("month").zone()))*6e4,u+=a/o,n==="year"&&(u/=12)):(o=this-i,u=n==="second"?o/1e3:n==="minute"?o/6e4:n==="hour"?o/36e5:n==="day"?(o-s)/864e5:n==="week"?(o-s)/6048e5:o),r?u:dt(u)},from:function(e,n){return t.duration({to:this,from:e}).locale(this.locale()).humanize(!n)},fromNow:function(e){return this.from(t(),e)},calendar:function(e){var n=e||t(),r=Bt(n,this).startOf("day"),i=this.diff(r,"days",!0),s=i<-6?"sameElse":i<-1?"lastWeek":i<0?"lastDay":i<1?"sameDay":i<2?"nextDay":i<7?"nextWeek":"sameElse";return this.format(this.localeData().calendar(s,this,t(n)))},isLeapYear:function(){return Ot(this.year())},isDST:function(){return this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month(5).zone()},day:function(e){var t=this._isUTC?this._d.getUTCDay():this._d.getDay();return e!=null?(e=sn(e,this.localeData()),this.add(e-t,"d")):t},month:vn("Month",!0),startOf:function(e){e=xt(e);switch(e){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return e==="week"?this.weekday(0):e==="isoWeek"&&this.isoWeekday(1),e==="quarter"&&this.month(Math.floor(this.month()/3)*3),this},endOf:function(t){return t=xt(t),t===e||t==="millisecond"?this:this.startOf(t).add(1,t==="isoWeek"?"week":t).subtract(1,"ms")},isAfter:function(e,n){var r;return n=xt(typeof n!="undefined"?n:"millisecond"),n==="millisecond"?(e=t.isMoment(e)?e:t(e),+this>+e):(r=t.isMoment(e)?+e:+t(e),r<+this.clone().startOf(n))},isBefore:function(e,n){var r;return n=xt(typeof n!="undefined"?n:"millisecond"),n==="millisecond"?(e=t.isMoment(e)?e:t(e),+this<+e):(r=t.isMoment(e)?+e:+t(e),+this.clone().endOf(n)<r)},isSame:function(e,n){var r;return n=xt(n||"millisecond"),n==="millisecond"?(e=t.isMoment(e)?e:t(e),+this===+e):(r=+t(e),+this.clone().startOf(n)<=r&&r<=+this.clone().endOf(n))},min:st("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(e){return e=t.apply(null,arguments),e<this?this:e}),max:st("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(e){return e=t.apply(null,arguments),e>this?this:e}),zone:function(e,n){var r=this._offset||0,i;return e==null?this._isUTC?r:this._dateTzOffset():(typeof e=="string"&&(e=Ut(e)),Math.abs(e)<16&&(e*=60),!this._isUTC&&n&&(i=this._dateTzOffset()),this._offset=e,this._isUTC=!0,i!=null&&this.subtract(i,"m"),r!==e&&(!n||this._changeInProgress?bt(this,t.duration(r-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,t.updateOffset(this,!0),this._changeInProgress=null)),this)},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){return this._tzm?this.zone(this._tzm):typeof this._i=="string"&&this.zone(this._i),this},hasAlignedHourOffset:function(e){return e?e=t(e).zone():e=0,(this.zone()-e)%60===0},daysInMonth:function(){return kt(this.year(),this.month())},dayOfYear:function(e){var n=s((t(this).startOf("day")-t(this).startOf("year"))/864e5)+1;return e==null?n:this.add(e-n,"d")},quarter:function(e){return e==null?Math.ceil((this.month()+1)/3):this.month((e-1)*3+this.month()%3)},weekYear:function(e){var t=an(this,this.localeData()._week.dow,this.localeData()._week.doy).year;return e==null?t:this.add(e-t,"y")},isoWeekYear:function(e){var t=an(this,1,4).year;return e==null?t:this.add(e-t,"y")},week:function(e){var t=this.localeData().week(this);return e==null?t:this.add((e-t)*7,"d")},isoWeek:function(e){var t=an(this,1,4).week;return e==null?t:this.add((e-t)*7,"d")},weekday:function(e){var t=(this.day()+7-this.localeData()._week.dow)%7;return e==null?t:this.add(e-t,"d")},isoWeekday:function(e){return e==null?this.day()||7:this.day(this.day()%7?e:e-7)},isoWeeksInYear:function(){return Lt(this.year(),1,4)},weeksInYear:function(){var e=this.localeData()._week;return Lt(this.year(),e.dow,e.doy)},get:function(e){return e=xt(e),this[e]()},set:function(e,t){return e=xt(e),typeof this[e]=="function"&&this[e](t),this},locale:function(n){var r;return n===e?this._locale._abbr:(r=t.localeData(n),r!=null&&(this._locale=r),this)},lang:st("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(t){return t===e?this.localeData():this.locale(t)}),localeData:function(){return this._locale},_dateTzOffset:function(){return Math.round(this._d.getTimezoneOffset()/15)*15}}),t.fn.millisecond=t.fn.milliseconds=vn("Milliseconds",!1),t.fn.second=t.fn.seconds=vn("Seconds",!1),t.fn.minute=t.fn.minutes=vn("Minutes",!1),t.fn.hour=t.fn.hours=vn("Hours",!0),t.fn.date=vn("Date",!0),t.fn.dates=st("dates accessor is deprecated. Use date instead.",vn("Date",!0)),t.fn.year=vn("FullYear",!0),t.fn.years=st("years accessor is deprecated. Use year instead.",vn("FullYear",!0)),t.fn.days=t.fn.day,t.fn.months=t.fn.month,t.fn.weeks=t.fn.week,t.fn.isoWeeks=t.fn.isoWeek,t.fn.quarters=t.fn.quarter,t.fn.toJSON=t.fn.toISOString,ht(t.duration.fn=ct.prototype,{_bubble:function(){var e=this._milliseconds,t=this._days,n=this._months,r=this._data,i,s,o,u=0;r.milliseconds=e%1e3,i=dt(e/1e3),r.seconds=i%60,s=dt(i/60),r.minutes=s%60,o=dt(s/60),r.hours=o%24,t+=dt(o/24),u=dt(mn(t)),t-=dt(gn(u)),n+=dt(t/30),t%=30,u+=dt(n/12),n%=12,r.days=t,r.months=n,r.years=u},abs:function(){return this._milliseconds=Math.abs(this._milliseconds),this._days=Math.abs(this._days),this._months=Math.abs(this._months),this._data.milliseconds=Math.abs(this._data.milliseconds),this._data.seconds=Math.abs(this._data.seconds),this._data.minutes=Math.abs(this._data.minutes),this._data.hours=Math.abs(this._data.hours),this._data.months=Math.abs(this._data.months),this._data.years=Math.abs(this._data.years),this},weeks:function(){return dt(this.days()/7)},valueOf:function(){return this._milliseconds+this._days*864e5+this._months%12*2592e6+Ct(this._months/12)*31536e6},humanize:function(e){var t=un(this,!e,this.localeData());return e&&(t=this.localeData().pastFuture(+this,t)),this.localeData().postformat(t)},add:function(e,n){var r=t.duration(e,n);return this._milliseconds+=r._milliseconds,this._days+=r._days,this._months+=r._months,this._bubble(),this},subtract:function(e,n){var r=t.duration(e,n);return this._milliseconds-=r._milliseconds,this._days-=r._days,this._months-=r._months,this._bubble(),this},get:function(e){return e=xt(e),this[e.toLowerCase()+"s"]()},as:function(e){var t,n;e=xt(e);if(e==="month"||e==="year")return t=this._days+this._milliseconds/864e5,n=this._months+mn(t)*12,e==="month"?n:n/12;t=this._days+Math.round(gn(this._months/12));switch(e){case"week":return t/7+this._milliseconds/6048e5;case"day":return t+this._milliseconds/864e5;case"hour":return t*24+this._milliseconds/36e5;case"minute":return t*24*60+this._milliseconds/6e4;case"second":return t*24*60*60+this._milliseconds/1e3;case"millisecond":return Math.floor(t*24*60*60*1e3)+this._milliseconds;default:throw new Error("Unknown unit "+e)}},lang:t.fn.lang,locale:t.fn.locale,toIsoString:st("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",function(){return this.toISOString()}),toISOString:function(){var e=Math.abs(this.years()),t=Math.abs(this.months()),n=Math.abs(this.days()),r=Math.abs(this.hours()),i=Math.abs(this.minutes()),s=Math.abs(this.seconds()+this.milliseconds()/1e3);return this.asSeconds()?(this.asSeconds()<0?"-":"")+"P"+(e?e+"Y":"")+(t?t+"M":"")+(n?n+"D":"")+(r||i||s?"T":"")+(r?r+"H":"")+(i?i+"M":"")+(s?s+"S":""):"P0D"},localeData:function(){return this._locale}}),t.duration.fn.toString=t.duration.fn.toISOString;for(u in X)nt(X,u)&&yn(u.toLowerCase());t.duration.fn.asMilliseconds=function(){return this.as("ms")},t.duration.fn.asSeconds=function(){return this.as("s")},t.duration.fn.asMinutes=function(){return this.as("m")},t.duration.fn.asHours=function(){return this.as("h")},t.duration.fn.asDays=function(){return this.as("d")},t.duration.fn.asWeeks=function(){return this.as("weeks")},t.duration.fn.asMonths=function(){return this.as("M")},t.duration.fn.asYears=function(){return this.as("y")},t.locale("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var t=e%10,n=Ct(e%100/10)===1?"th":t===1?"st":t===2?"nd":t===3?"rd":"th";return e+n}}),g?module.exports=t:typeof define=="function"&&define.amd?(define("moment",["require","exports","module"],function(e,n,s){return s.config&&s.config()&&s.config().noGlobal===!0&&(r.moment=i),t}),bn(!0)):bn()}).call(this);