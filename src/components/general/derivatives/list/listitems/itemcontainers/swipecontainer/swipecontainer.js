
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Swipecontainer", {

	template: BetaJS.Dynamics.Dynamic.Components.Templates.swipecontainer,

	initial: {

		attrs : {
			type : "clickitem",
			model : {title : "Swipeitem - Title"},
			lefticon : 'icon-ok',
			righticon : 'icon-time',
			actions : {
				"other": {
					less: -1/4,
					execute: function () {
						//this.get("model").set("archived", true);
					}
				},
				"archive": {
					less: 1/3,
					execute: function () {
						//alert("archive?");
					}
				},
				"delete": {
					greater: 1/3,
					execute: function (element) {

						//alert("yes");
						element.parent().parent().slideUp();
						//scope.doodad_properties.remove();
					}
				}
			}
		}

	},

	_afterActivate : function (element) {
		var actions = this.get('actions');

		var swipe_element = element.find("swipe");
		var drag = new BetaJS.UI.Interactions.Drag(swipe_element, {
			enabled : true,
			draggable_y: false,
			start_event: null
		});
		var drag_gesture = new BetaJS.UI.Gestures.Gesture(drag.element(), BetaJS.UI.Gestures.defaultGesture({
			mouse_up_activate: false,
			wait_time: 250,
			wait_activate: false,
			disable_x: -1,
			disable_y: 10,
			enable_x: 10,
			enable_y: -1
		}));
		drag_gesture.on("activate", drag.start, drag);
		drag_gesture.on("deactivate", drag.stop, drag);
		drag.on("move", function (event) {
			var element = event.element;
			var parent = element.parent();
			var x = parseInt(element.css("left"), 10);
			var w = parseInt(element.css("width"), 10);
			var a = {};
			for (var cls in actions) {
				a = actions[cls];
				if ((!a.less || x <= w * a.less) && (!a.greater || x >= w * a.greater))
					parent.addClass(cls);
				else
					parent.removeClass(cls);
			}
		}, this);
		drag.on("release", function (event) {
			var element = event.element;
			var x = parseInt(element.css("left"), 10);
			var w = parseInt(element.css("width"), 10);
			for (var cls in actions) {
				a = actions[cls];
				if ((!a.less || x <= w * a.less) && (!a.greater || x >= w * a.greater)) {
					event.source.abort();
					if (a.execute)
						a.execute.call(this, element);
				}
			}
		}, this);

	}

}).register();