
Scoped.define("module:Hoverbuttoncontainer", [
	"dynamics:Dynamic",
	"browser:Loader",
	"browser:Dom",
	"base:Loggers.Logger"
],[
	"ui:Dynamics.GesturePartial",
	"ui:Dynamics.InteractionPartial",
	"ui:Interactions.Drag",
	"ui:Interactions.Drop"
], function (Dynamic, Loader, Dom, Logger, scoped) {

	var logger = Logger.global().tag("dynamic", "list");
	
	return Dynamic.extend({scoped: scoped}, {

		template: "<%= template(filepathnoext + '.html') %>",

		attrs: {
			show_hover_buttons: false,
			view : {
				slide_finish : false,
				left: 0
			},
			buttons : {
				"delete" : {
					icon : 'icon-trash',
					tooltip : 'Delete',
					click : function () {
						console.log('Delete was clicked')
					}
				},
				"archive" : {
                    icon : 'icon-archive',
                    tooltip : 'Archive',
                    click : function () {
						console.log('Archive was clicked')
					}
                },
                "snooze" : {
                    icon : 'icon-time',
                    tooltip : 'Snooze',
                    click : function () {
                        console.log('Snooze was clicked')
                    }
                }
			},
			value: "Swipeclickitem - Title",
			inner: "eventitem",
			// swipe_actions: {
			// 	"other": {
			// 		execute: function (element,pos) {
			// 			this.execute('slideout',element,pos,'other');
			// 		}
			// 	},
			// 	"nothing": {
			// 	},
			// 	"archive": {
			// 		execute: function (element,pos) {
			// 			this.execute('slideout',element,pos,'archive');
			// 		}
			// 	},
			// 	"delete": {
			// 		execute: function (element,pos) {
			// 			this.execute('slideout',element,pos,'delete');
			// 		}
			// 	}
			// },
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

						var source_doodad = event.source.data;

						this.scope(">").execute('dropped', source_doodad);

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
//				element.addEventListener("transitionend",function () {
					//element.find('ba-eventitem').css('visibility','hidden');
					setTimeout(function () {
						//element.parent().slideUp(200);
						element.parentNode.style.display = 'none';
						// Now we should remove the added element from the dom again, otherwise we have a leak.
						// this.get("temporary_style_element").remove();
						self.trigger(trigger);
					}, 10);
	//			});

				var max_left = parseInt(element.style.width, 10);
				var sign = Math.sign(current_left);

				 //Instead of the create_style call, you should be able to user betajs browser (please update first):
				this.set("temporary_style_element", Loader.inlineStyles(
					'.new_class { left: ' + sign*max_left + 'px; }'
				));
				
				this.call('create_style','new_class',sign*max_left);
				this.set('start_swipe','swipe new_class');
			}
		}

	}).register();

});