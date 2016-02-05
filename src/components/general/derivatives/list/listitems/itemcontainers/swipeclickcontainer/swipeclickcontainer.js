
Scoped.define("module:Swipeclickcontainer", [
	"dynamics:Dynamic",
	"module:Templates",
	"base:Timers.Timer"
],[
	"ui:Dynamics.GesturePartial",
	"ui:Dynamics.InteractionPartial"
], function (Dynamic, Templates, Timer, scoped) {

	return Dynamic.extend({scoped: scoped}, {

		template: Templates.swipeclickcontainer,

		scopes : {
			child_dynamic: ">"
		},

		attrs: {
			value: "Swipeclickitem - Title",
			lefticon: 'icon-ok',
			righticon: 'icon-time',
			inner: "eventitem",
			swipe_actions: {
				"other": {
					less: -1/6,
					greater: -1,
					execute: function () {
						//this.get("model").set("archived", true);
						console.log("Swipe: other");
						this.trigger('other');
					}
				},
				"nothing": {
					greater : -1/6,
					less: 1/6
				},
				"archive": {
					greater : 1/6,
					less: 2/3,
					execute: function (element,pos) {
						this.trigger('archive');
						this.call('slideout',element,pos);
					}
				},
				"delete": {
					greater: 2 / 3,
					less: 1,
					execute: function (element) {
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

						for (var cls in actions) {
							a = actions[cls];

							if ((!('greater' in a) || x <= w * a.less) && (!('less' in a) || x >= w * a.greater)) {
								event.source.abort();
								if (a.execute)
									a.execute.call(this, element, x);
							}
						}
					}
				}
			}

		},

		functions : {
			click : function (doodad) {
				this.scopes.child_dynamic.call('click');
			},
			slideout : function (element,pos) {
				console.log('Element : ');
				console.log(pos);
				console.log(element);
				console.log(element.width());

				//var test = new Timer({
				//	delay : 100,
				//	fire : function () {
				//		console.log('Timer Fired')
				//	},
				//	context : this
				//});

				console.log(element.parent());
				//element.parent().slideUp();
			}
		}

	}).register();

});