
Scoped.define("module:Swipeclickcontainer", [
	"dynamics:Dynamic",
	"module:Templates",
	"browser:Loader"
],[
	"ui:Dynamics.GesturePartial",
	"ui:Dynamics.InteractionPartial"
], function (Dynamic, Templates, Loader, scoped) {

	return Dynamic.extend({scoped: scoped}, {

		template: Templates.swipeclickcontainer,

		attrs: {
			start_swipe :'',
			view : {
				slide_finish : false,
				left: 0
			},
			value: "Swipeclickitem - Title",
			lefticon: 'icon-ok',
			righticon: 'icon-time',
			inner: "eventitem",
			swipe_actions: {
				"other": {
					less: -1/7,
					greater: -1,
					execute: function (element,pos) {
						this.call('slideout',element,pos,'other');
					}
				},
				"nothing": {
					greater : -1/7,
					less: 1/7
				},
				"archive": {
					greater : 1/7,
					less: 2/3,
					execute: function (element,pos) {
						this.call('slideout',element,pos,'archive');
					}
				},
				"delete": {
					greater: 2 / 3,
					less: 1,
					execute: function (element,pos) {
						this.call('slideout',element,pos,'delete');
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
				droppable: true,
				type: "drag",
				clone_element: true,
				start_event: null,
				events: {
					"move": function (model, event) {
						console.log('Swipeclickcontainer:');
						console.log(model);
						event.actionable_modifier.csscls("focus", true);
						event.modifier.csscls("unfocus", true);

					}
				}
			},
			drop_interaction: {
				enabled: true,
				type: "drop",
				classes: {
					"hover.modifier": "green-style"
				},
				events: {
					"dropped": function (data, event) {
						console.log('Drop successful');
						//var source_doodad = event.source.data;
						//var target_doodad = data;
						//alert(source_doodad.get("v") + " --> " + target_doodad.get("v"));
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
								element.addClass(cls);
							else
								element.removeClass(cls);
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
				this.scope(">").call('click');
			},
			create_style : function (name,left) {
				var style = document.createElement('style');
				style.type = 'text/css';
				style.innerHTML = '.' + name + ' { left: ' + left + 'px; }';
				document.getElementsByTagName('head')[0].appendChild(style);
			},
			slideout : function (element,pos,trigger) {
				var current_left = pos;

				this.call('create_style','old_class',current_left);
				this.set('start_swipe','old_class');
				
				var self = this;
				element.on("transitionend",function () {
					element.find('ba-eventitem').css('visibility','hidden');
					setTimeout(function () {
						element.parent().slideUp(200);
						// Now we should remove the added element from the dom again, otherwise we have a leak.
						// this.get("temporary_style_element").remove();
					}, 10);
					self.trigger(trigger);
				});

				var max_left = element.width();
				var sign = Math.sign(current_left);

				/*
				 * Instead of the create_style call, you should be able to user betajs browser (please update first):
				 */
				this.set("temporary_style_element", Loader.inlineStyles(
					'.new_class { left: ' + sign*max_left + 'px; }'
				));
				
				this.call('create_style','new_class',sign*max_left);
				this.set('start_swipe','swipe new_class');
			}
		}

	}).register();

});