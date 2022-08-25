function getFlagAssetPrefix(t){var n=$(t+" button svg").find("use").attr("xlink:href")||"",i=n.split("#");return 2==i.length?i[0]:""}function updateFlagToFlagId(t,n){var i=getFlagAssetPrefix(t);$(t+" button svg").find("use").attr("xlink:href",i+n)}function setupCountrySwitcherForId(t){updateFlagToFlagId(t,nriUtil.getCountryFlagId()),$(t+" .country-switcher-dropdown").on("hide.bs.dropdown",function(n){return nriUtil.canBeForced()?void n.preventDefault():($(t+" .overlay").removeClass("show"),!0)}),$(t+" .country-switcher-dropdown").on("show.bs.dropdown",function(){return $(t+" .overlay.show-always").addClass("show"),nriUtil.canBeForced()&&$(t+" .overlay.show-forced").addClass("show"),!0}),$(t).ready(function(){nriUtil.canBeForced()&&$(t+" .country-switcher-dropdown button").click()}),$(t+" .country-container-js").on("click",function(n){var i=$(n.currentTarget).data("country-id"),o=$(n.currentTarget).data("country-link");nriUtil.canUpdateCookie()&&nriUtil.setCountry(i),updateFlagToFlagId(t,nriUtil.getCountryFlagId()),nriUtil.canRedirect()&&(updateFlagToFlagId(t,"#country-"+i),nriUtil.redirectTo(o))})}$(document).ready(function(){setupCountrySwitcherForId(window.innerWidth<768?"#country-switcher-mobile":"#country-switcher-desktop")});var domainUtil={COUNTRY_LINKS:{india:"/",canada:"/ca/nri",united_states:"/us/nri",singapore:"/sg/nri",uae:"/ae/nri",rest_of_the_world:"/nri"},isOnHomepageOf:function(t){var n=window.location.pathname;return this.COUNTRY_LINKS[t]===n},getCountryIdOfCurrentPage:function(){var t=window.location.pathname,n=this;return Object.keys(this.COUNTRY_LINKS).find(function(i){var o=n.COUNTRY_LINKS[i];return o==t})},isIndianHomepage:function(){var t=window.location.pathname;return"/"===t},isNriHomepage:function(){var t=window.location.pathname;return"/nri"===t},isNriCountryHomepage:function(){var t=window.location.pathname;return!this.isNriHomepage()&&t.endsWith("/nri")},isIndianSubDomain:function(){return!this.isIndianHomepage()&&!this.isNriHomepage()&&!this.isNriCountryHomepage()}},nriUtil={NRI_COUNTRY_KEY:"nri_country",AUTO_REDIRECT_COUNTRIES:["india","canada","united_states","singapore","uae"],checkForAutoRedirection:function(){if(this.canAutoRedirect()){var t=this.getCountry(),n=domainUtil.COUNTRY_LINKS[t];this.redirectTo(n)}},canBeForced:function(){return!(!domainUtil.isNriHomepage()||this.isCountrySet())||!(!domainUtil.isNriCountryHomepage()||domainUtil.isOnHomepageOf(this.getCountry()))},canUpdateCookie:function(){return!0},canRedirect:function(){return!domainUtil.isIndianSubDomain()},canAutoRedirect:function(){if(domainUtil.isNriHomepage()&&this.isCountrySet()){var t=this.getCountry();return this.AUTO_REDIRECT_COUNTRIES.indexOf(t)>-1}return!1},getCountryFlagId:function(){return domainUtil.isIndianSubDomain()?this.isCountrySet()?"#country-"+this.getCountry():"#country-india":"#country-"+domainUtil.getCountryIdOfCurrentPage()},redirectTo:function(t){window.location.replace(window.location.origin+t+window.location.search)},isCountrySet:function(){return!!this.getCountry()},getCountry:function(){return cookieUtil.getCookie(this.NRI_COUNTRY_KEY)},setCountry:function(t){cookieUtil.setCookie(this.NRI_COUNTRY_KEY,t,365)}},cookieUtil={setCookie:function(t,n,i){var o="";if(i){var e=new Date;e.setTime(e.getTime()+24*i*60*60*1e3),o="; expires="+e.toUTCString()}document.cookie=t+"="+(n||"")+o+"; path=/"},getCookie:function(t){for(var n=t+"=",i=document.cookie.split(";"),o=0;o<i.length;o++){for(var e=i[o];" "==e.charAt(0);)e=e.substring(1,e.length);if(0==e.indexOf(n))return e.substring(n.length,e.length)}return null},eraseCookie:function(t){document.cookie=t+"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"}};nriUtil.checkForAutoRedirection();