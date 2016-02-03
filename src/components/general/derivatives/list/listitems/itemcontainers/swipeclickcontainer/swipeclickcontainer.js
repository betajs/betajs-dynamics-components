
Scoped.define("module:Swipeclickcontainer", [
	"dynamics:Dynamic",
	"module:Templates"
],[
	"ui:Dynamics.GesturePartial",
	"ui:Dynamics.InteractionPartial"
], function (Dynamic, Templates, scoped) {

	return Dynamic.extend({scoped: scoped}, {

		template: Templates.swipeclickcontainer,

		scopes : {
			child_dynamic: ">"
		},

		attrs: {
			model: {
				value: "Swipeclickitem - Title"
			},
			lefticon: 'icon-ok',
			righticon: 'icon-time',
			inner: "eventitem",
			swipe_actions: {
				"other": {
					less: 0,
					greater: -1,
					execute: function () {
						//this.get("model").set("archived", true);
						console.log("Swipe: other");
						this.trigger('other');
					}
				},
				"nothing": {
					greater : 0,
					less: 1/6,
					execute: function (element) {
						console.log("Swipe: Nothing will happen");
					}
				},
				"archive": {
					greater : 1/6,
					less: 2/3,
					execute: function (element) {
						console.log("Swipe: archive");
						//element.parent().slideUp();
						this.trigger('archive');
					}
				},
				"delete": {
					greater: 2 / 3,
					less: 1,
					execute: function (element) {
						console.log("Swipe: delete");
						this.trigger('delete');
						//element.parent().slideUp();
					}
				}
			},
			click_gesture: {
				mouse_up_activate: true,
				wait_time: 250,
				wait_activate: false,
				disable_x: 10,
				disable_y: 10,
				enable_x: -1,
				enable_y: -1,
				activate_event: "click"
			},
			drag_gesture: {
				mouse_up_activate: false,
				wait_time: 750,
				wait_activate: true,
				disable_x: 10,
				disable_y: 10,
				enable_x: -1,
				enable_y: -1,
				interaction: "drag"
			},
			drag_interaction: {
				type: "drag",
				clone_element: true,
				start_event: null,
				events: {
					"move": function (doodad, event) {
						event.actionable_modifier.csscls("focus", true);
						event.modifier.csscls("unfocus", true);
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
						//console.log('move');
						var element = event.element;
						var parent = element.parent();
						var w = parseInt(element.css("width"), 10);
                        var x = parseInt(element.css("left"), 10);
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
						var w = parseInt(element.css("width"), 10);
						var x = parseInt(element.css("left"), 10);
						var actions = this.get('swipe_actions');

						console.log(x);

						for (var cls in actions) {
							a = actions[cls];
							console.log(w * a.greater);

							if ((!('greater' in a) || x <= w * a.less) && (!('less' in a) || x >= w * a.greater)) {
								event.source.abort();
								if (a.execute)
									a.execute.call(this, element);
							}
						}
					}
				}
			}

		},

		functions: {
			click: function (doodad) {
				//this.set('click_counter',this.get('click_counter') + 1);
				console.log("Click ");
				console.log(this.scopes.child_dynamic);
				console.log(this.scopes.child_dynamic.get('counter'));
				this.scopes.child_dynamic.call('click');
			}
		}

	}).register();

});