
Scoped.define("module:Swipecontainer", [
	"dynamics:Dynamic",
	"module:Templates"
],[
	"ui:Dynamics.GesturePartial",
	"ui:Dynamics.InteractionPartial"
], function (Dynamic, Templates, scoped) {

	return Dynamic.extend({scoped: scoped}, {

		template: Templates.swipecontainer,

		attrs: {
			model: {
				value: "Swipeitem - Title"
			},
			lefticon: 'icon-ok',
			righticon: 'icon-time',
			inner: "clickitem",
			swipe_actions: {
				"other": {
					less: 0,
					greater: -1,
					execute: function () {
						//this.get("model").set("archived", true);
						console.log("Swipe: other");
					}
				},
				"archive": {
					greater : 0,
					less: 2 / 5,
					execute: function (element) {
						console.log("Swipe: archive");
						//element.parent().slideUp();
					}
				},
				"delete": {
					greater: 2 / 5,
					execute: function (element) {
						console.log("Swipe: delete");
						element.parent().slideUp();
					}
				}
			},
			swipe_gesture: {
				mouse_up_activate: false,
				wait_time: 250,
				wait_activate: false,
				disable_x: -1,
				disable_y: -1,
				enable_x: 10,
				enable_y: -1,
				interaction: "swipe"
			},
			swipe_interaction: {
				type: "drag",
				enabled: true,
				draggable_y: false,
				start_event: null,
				events: {
					"move": function (doodad, event) {
						console.log('move');
						var element = event.element;
						var parent = element.parent();
						var w = parseInt(element.css("width"), 10)/3;
                        var x = parseInt(element.css("left"), 10) + w;
                        var a = {};
						var actions = this.get('swipe_actions');
						for (var cls in actions) {
							a = actions[cls];
							if ((!a.less || x <= w * a.less) && (!a.greater || x >= w * a.greater))
								parent.addClass(cls);
							else
								parent.removeClass(cls);
						}
					},
					"release": function (doodad, event) {
						var element = event.element;
						var w = parseInt(element.css("width"), 10)/3;
						var x = parseInt(element.css("left"), 10) + w;
						var actions = this.get('swipe_actions');

						for (var cls in actions) {
							a = actions[cls];

							if ((!('greater' in a) || x <= w * a.less) && (!('less' in a) || x >= w * a.greater)) {
								event.source.abort();
								if (a.execute)
									a.execute.call(this, element);
							}
						}
					}
				}
			}
		}

	}).register();

});