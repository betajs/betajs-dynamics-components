
Scoped.define("module:Htmlview", [
    "dynamics:Dynamic",
    "base:Async",
    "browser:Loader",
    "browser:Dom"
], function (Dynamic, Async, Loader, Dom, scoped) {

	return Dynamic.extend({scoped: scoped}, {
		
		template: "<%= template(filepathnoext + '.html') %>",
		
		attrs: {
			"html": "",
			"loadhtml": ""
		},
		
		events: {
			"change:html": function () {
				if (this.activated())
					this._updateIFrame();
			},
			"change:loadhtml": function () {
				this._loadHtml();
			}
		},
		
		_loadHtml: function () {
			if (this.get("loadhtml")) {
				Loader.loadHtml(this.get("loadhtml"), function (content) {
					this.set("html", content);
				}, this);
			}
		},
		
		_cleanupContent: function (content) {
			var contentHtml = Dom.elementByTemplate("<div>" + content + "</div>");
			// Remove malicious scripts
			var scripts = contentHtml.querySelectorAll("script");
			for (var i = 0; i < scripts.length; ++i)
				scripts[i].parentNode.removeChild(scripts[i]);
			// Remove malicious iframes
			var iframes = contentHtml.querySelectorAll("iframe");
			for (var j = 0; j < iframes.length; ++j)
				iframes[j].parentNode.removeChild(iframes[j]);
			return contentHtml;
		},
		
		create : function () {
			var helper = function () {
				Async.eventually(function () {
					if (this.destroyed())
						return;
					this._updateSize();
					this._timeout *= 2;
					helper.call(this);
				}, this, this._timeout);
			};
			helper.call(this);
			this._loadHtml();
		},
		
		_afterActivate: function () {
			this._updateIFrame();
		},
		
		_updateIFrame: function () {
			this.activeElement().querySelector("iframe").contentDocument.querySelector("html").innerHTML = this._cleanupContent(this.get('html')).innerHTML;
			this._updateSize();
			this._timeout = 100;
		},
		
		_updateSize: function () {
			var iframe = this.activeElement().querySelector("iframe");
			var iframe_body = iframe.contentDocument.querySelector("html") || iframe.contentDocument.querySelector("body");
			var inner_width = iframe_body.scrollWidth;
			var inner_height = iframe_body.scrollHeight;
			if (!iframe.contentDocument.querySelector("body")) {
				inner_height = 1;
				var children = iframe.contentDocument.querySelector("html");
				for (var i = 0; i < children.length; ++i) {
					var tn = children[i].tagName.toLowerCase();
					if (tn === "style" || tn === "script" || tn === "head")
						return;
					inner_height = Math.max(inner_height, children[i].innerHeight + children[i].offsetTop);
				}
			}
			var outer_width = iframe.clientWidth;
			var scale = outer_width / inner_width;
			if (Math.abs(inner_height - iframe.clientHeight) < 2)
				return;
			iframe_body.style.MozTransform = 'scale(' + scale + ')';
			iframe_body.style.zoom = (scale * 100) + '%';
			iframe.style.width = iframe.parentNode.offsetWidth + "px";
			iframe.style.height = Math.ceil(inner_height * scale + 10) + "px";
		}
	}).register();

});
