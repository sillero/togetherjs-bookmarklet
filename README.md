togetherjs-bookmarklet
======================

Just a bookmarklet for a lazier use of the [TogetherJS](https://togetherjs.com) javascript collaboration library by [Mozilla](https://mozilla.org)

###Bookmarklet
```javascript
javascript:(function(e,t,n){var r=function(){var t=function(e){e=e||10;var t='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUV0123456789';var n='';for(var r=0;r<e;r++){n+=t.charAt(Math.floor(Math.random()*t.length))}return n},n=t(),r=e.prompt('Type session ID to join or create\n (default is \'together\')')||'together',i={reason:'started',shareId:r,running:true,date:Date.now(),sessionId:n};if(typeof sessionStorage['togetherjs-session.status']!=='undefined'){i=JSON.parse(sessionStorage['togetherjs-session.status']);i.shareId=r;i.running=true}i=JSON.stringify(i);return i}();sessionStorage['togetherjs-session.status']=r;if(typeof TogetherJS!=='undefined'){if(TogetherJS._loaded){TogetherJS.on('close',function(){TogetherJS(e)});TogetherJS(e)}else{TogetherJS(e)}}else{var i=t.createElement('script'),s='https://togetherjs.com/togetherjs-min.js';i.setAttribute('src',s);t.body.appendChild(i)}})(window,document);
````

###Source
```javascript
(function(window, document, undefined){
	var session = (function(){
			var generateId = function (length) {
					//copy/paste from togetherjs/utils.js
					length = length || 10;
					var letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUV0123456789';
					var s = '';
					for (var i=0; i<length; i++) {
						s += letters.charAt(Math.floor(Math.random() * letters.length));
					}
					return s;
				},
				sessionId = generateId(),
				shareId = (window.prompt('Type session ID to join or create (default is \'together\')') || 'together'),
				sessionSt = {
					reason: 'started',
					shareId: shareId,
					running: true,
					date: Date.now(),
					sessionId: sessionId
				};

			if (typeof sessionStorage['togetherjs-session.status'] !== 'undefined') {
				sessionSt = JSON.parse(sessionStorage['togetherjs-session.status']);
				sessionSt.shareId = shareId;
				sessionSt.running = true;
			}
			sessionSt = JSON.stringify(sessionSt);

			return sessionSt;
		})();

	sessionStorage['togetherjs-session.status'] = session;

	if (typeof TogetherJS !== 'undefined') {
		if (TogetherJS._loaded) {
			TogetherJS.on("close", function () {
				TogetherJS(window);//open
			});
			TogetherJS(window);//close
		}
		else {
			TogetherJS(window);//open
		}
	}
	else {
		var script = document.createElement('script'),
			scriptSrc = 'https://togetherjs.com/togetherjs-min.js';

		script.setAttribute('src',scriptSrc);
		document.body.appendChild(script);
	}	
})(window, document);
```
