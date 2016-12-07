
Scoped.define("module:Htmlview", [
    "dynamics:Dynamic",
    "module:Templates",
    "base:Async",
    "browser:Loader",
    "jquery:"
], function (Dynamic, Templates, Async, Loader, $, scoped) {

	return Dynamic.extend({scoped: scoped}, {
		
		template: Templates.htmlview,
		
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
			var contentHtml = $(content);
			// Remove malicious scripts
			contentHtml.find("script").remove();
			// Remove malicious iframes
			contentHtml.find("iframe").remove();
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
			$(this.element()).contents().find("html").html(this._cleanupContent(this.get('html')));
			this._updateSize();
			this._timeout = 100;
		},
		
		_updateSize: function () {
			var iframe = $(this.element());
			var iframe_body = iframe.contents().find("body").get(0) || iframe.contents().find("html").get(0);
			var inner_width = iframe_body.scrollWidth;
			var inner_height = iframe_body.scrollHeight;
			if (!iframe.contents().find("body").get(0)) {
				var inner_height = 1;
				iframe.contents().find("html").children().each(function () {
					var tn = this.tagName.toLowerCase();
					if (tn === "style" || tn === "script" || tn === "head")
						return;
					inner_height = Math.max(inner_height, $(this).height() + $(this).offset().top);
				});
			}
			var outer_width = iframe.width();
			var scale = outer_width / inner_width;
			if (Math.abs(inner_height - iframe.height()) < 2)
				return;
			$(iframe_body).css('MozTransform','scale(' + scale + ')');
			$(iframe_body).css('zoom', (scale * 100) + '%');
			iframe.css("width", iframe.parent().width() + "px");
			iframe.css("height", Math.ceil(inner_height * scale + 10) + "px");
		}
	}).register();

});
