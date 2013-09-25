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