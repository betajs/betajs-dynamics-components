/*!
betajs-dynamics-components - v0.0.13 - 2016-07-20
Copyright (c) Oliver Friedmann, Victor Lingenthal
MIT Software License.
*/
(function () {

var Scoped = this.subScope();

Scoped.binding("module", "global:BetaJS.Dynamics.Components");
Scoped.binding("tests", "global:BetaJS.Dynamics.Components.Tests");
Scoped.binding("dynamics", "global:BetaJS.Dynamics");
Scoped.binding("base", "global:BetaJS");
Scoped.binding("browser", "global:BetaJS.Browser");
Scoped.binding("ui", "global:BetaJS.UI");

Scoped.binding("jquery", "global:jQuery");

Scoped.define("module:", function () {
	return {
		guid: "5d9ab671-06b1-49d4-a0ea-9ff09f55a8b7",
		version: '120.1468987998862'
	};
});

Scoped.extend('module:Templates', function () {
return {"input":"<input autofocus>","overlaycontainer":"<overlaycontainer     ba-tap=\"showoverlay = false\"     ba-if=\"{{showoverlay}}\">      <overlayinner>          <ba-{{view.overlay}} ba-noscope>             <message>{{model.message}}</message>         </ba-{{view.overlay}}>      </overlayinner>  </overlaycontainer>","testoverlaycontainer":" <button ba-click=\"showoverlay = !showoverlay\">Show Overlaycontainer</button>  <ba-overlaycontainer         ba-overlay=\"{{=overlay}}\"         ba-showoverlay=\"{{=showoverlay}}\">          </ba-overlaycontainer>","scrollpicker":"<container>         <element ba-repeat-element=\"{{element_value :: value_array}}\" data-id=\"{{element_value}}\">                 {{element_value}}         </element> </container>","test_scrollpicker":" <ba-scrollpicker id=\"321\"></ba-scrollpicker> <ba-scrollpicker id=\"322\"></ba-scrollpicker> ","loading":" <loading>      <div class='uil-spin-css' style='-webkit-transform:scale(0.32)'><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>  </loading> ","loadmore":" <loadmore ba-click=\"load_more()\">      <button>Load more</button>  </loadmore>","eventitem":" <button         class=\"{{model.class}}\">     {{model.value}} - {{counter}} </button>","selectableitem":" <selectableitem         ba-class=\"{{{selected : selected.cid == this.cid()}}}\"         ba-click=\"select()\">     {{model.value}} </selectableitem>","swipeclickcontainer":" <behind>     <icon class='{{view.lefticon||lefticon}}'></icon>     <div></div>     <icon class='{{view.righticon||righticon}}'></icon> </behind>  <!--style=\"left: {{view.left}}px\"--> <swipe         class='{{start_swipe}}'         ba-gesture:click=\"{{{data: model, options: click_gesture}}}\"         ba-gesture:drag=\"{{drag_gesture}}\"         ba-interaction:drag=\"{{{data: model, options: drag_interaction}}}\"         ba-interaction:drop=\"{{{data: model, options: drop_interaction}}}\"         ba-gesture:swipe=\"{{swipe_gesture}}\"         ba-interaction:swipe=\"{{swipe_interaction}}\">      <container>          <ba-{{view.inner||inner}} ba-noscope>         </ba-{{view.inner||inner}}>          <swipeleft>             <div></div>             <icon class='{{view.lefticon||lefticon}}'></icon>         </swipeleft>          <swiperight>             <icon class='{{view.righticon||righticon}}'></icon>             <div></div>         </swiperight>      </container>  </swipe> ","list":" <list ba-repeat=\"{{collectionitem :: (model.listcollection||listcollection)}}\">      <ba-{{view.listitem||collectionitem.listitem||listitem}}         ba-cache         ba-data:id=\"{{collectionitem.cid()}}\"         ba-functions=\"{{collectionitem.callbacks}}\"         ba-view=\"{{collectionitem.view||view.listinner}}\"         ba-model=\"{{collectionitem}}\">      </ba-{{view.listitem||collectionitem.listitem||listitem}}>  </list>  <ba-loadmore ba-if=\"{{loadmore}}\" ba-show=\"{{!loading}}\" ba-event:loadmore=\"moreitems\"> </ba-loadmore> <ba-loading ba-if=\"{{loadmore}}\" ba-show=\"{{loading}}\"> </ba-loading> ","test_list_clickitem":" <ba-list ba-attrs=\"{{testmodel}}\"> </ba-list>","test_list_listcollection":" <ba-list ba-listcollection=\"{{listcollection}}\"> </ba-list>","test_list_listoflist":" <ba-list         ba-listitem=\"list\"         ba-listcollection=\"{{listcollection}}\"> </ba-list>","test_list_loadmore":" <ba-list ba-view=\"{{view}}\" ba-listcollection=\"{{listcollection}}\"> </ba-list>","test_list_pushfunc":"<button ba-click=\"test(input_value)\">Test func</button> <input ba-return=\"test(input_value)\" placeholder=\"Push item to list\" value=\"{{=input_value}}\"> <ba-titledlist ba-attrs=\"{{testmodel}}\"> </ba-titledlist>","test_list_swipecontainer":" <ba-list         ba-model=\"{{model}}\"         ba-view=\"{{view_model}}\"> </ba-list>","searchlist":" <searchbox ba-if=\"{{view.showsearch}}\">     <icon class=\"icon-search\"></icon>     <input placeholder=\"{{view.placeholder}}\" value=\"{{=searchvalue}}\"> </searchbox>  <ba-loading ba-if=\"{{searchingindication}}\"> </ba-loading>  <ba-list ba-noscope></ba-list> ","test_searchlist":" <ba-searchlist         ba-view=\"{{view}}\">  </ba-searchlist>","test_titledlist":" <ba-titledlist         ba-model=\"{{model}}\"         ba-view=\"{{view}}\"         ba-functions=\"{{callbacks}}\"         ba-listcollection=\"{{listcollection}}\">  </ba-titledlist>","test_titledlist_swipe":" <ba-titledlist         ba-listcollection=\"{{listcollection}}\"         ba-attrs=\"{{push_attrs}}\">  </ba-titledlist>","titledlist":" <ba-{{view.titleitem}}     ba-click=\"click_title()\"     ba-functions=\"{{model.title_callbacks}}\"     ba-model=\"{{model.title_model}}\">{{model.title_model.value}}</ba-{{view.titleitem}}>  <ba-list         ba-noscope         ba-show=\"{{!collapsed}}\">  </ba-list> ","addtitle":" <addtitle>     <title ba-click=\"clicktitle()\">{{model.value}}</title>     <button ba-click=\"addbutton()\">         <span class=\"icon-plus\"></span>     </button> </addtitle>","test_addtitle":" <ba-addtitle         ba-attrs=\"{{testmodel}}\"> </ba-addtitle> ","clickitem":" <button         class=\"{{model.class}}\"         ba-click=\"click()\">     {{model.value}} </button>","clicktestcontainer":" <ba-{{view.inner||inner}}     ba-gesture:click=\"{{{data: model, options: click_gesture}}})\"     ba-noscope>     {{model.value||value}} </ba-{{view.inner||inner}}> ","header":" <ba-list ba-listcollection=\"{{left_collection}}\"></ba-list>","toggle_menu":"<button ba-click=\"toggle_menu()\" class=\"icon-reorder\"></button>","menu_web":" <ba-titledlist         ba-collapsible=\"{{false}}\"         ba-model=\"{{model}}\"         ba-listcollection=\"{{menu_collection}}\">  </ba-titledlist>","layout_web":"<header>     <ba-{{view.header}}>Header</ba-{{view.header}}> </header> <main>     <menu ba-show=\"{{view.display_menu}}\">         <ba-{{view.menu}} ba-view=\"{{view.menuview}}\">Menu</ba-{{view.menu}}>     </menu>     <content>         <ba-{{view.content}} ba-model={{contentmodel}}>Content</ba-{{view.content}}>     </content> </main>","index":"<!DOCTYPE html> <html> <head lang=\"en\">     <meta charset=\"UTF-8\">      <!--<script src=\"../vendors/jquery-1.9.closure-extern.js\"></script>-->     <script src=\"../vendors/jquery-2.1.4.js\"></script>      <script src=\"../vendors/scoped.js\"></script>     <script src=\"../vendors/beta.js\"></script>     <script src=\"../vendors/betajs-browser-noscoped.js\"></script>     <!--<script src=\"../vendors/betajs-ui.js\"></script>-->     <script src=\"../../betajs-ui/dist/betajs-ui.js\"></script>     <script src=\"../vendors/betajs-dynamics-noscoped.js\"></script>      <script src=\"components.js\"></script>      <!--<script src=\"../vendors/betajs-simulator.js\"></script>-->     <script src=\"../../betajs-simulator/dist/betajs-simulator.js\"></script>     <link rel=\"stylesheet\" href=\"../..//betajs-simulator/dist/betajs-simulator.css\" />      <script src=\"../dist/betajs-dynamics-components-noscoped.js\"></script>     <link rel=\"stylesheet\" href=\"../dist/betajs-dynamics-components.css\" />     <link rel=\"stylesheet\" href=\"../vendors/icomoon/style.css\" />      <script src=\"//localhost:1337/livereload.js\"></script>      <title>BetaJS Simulator</title>      <script>      </script>  </head> <body>  <ba-simulator></ba-simulator>  <script>     console.log('Unresolved Dependencies : ');     console.log(Scoped.unresolved('global:')); </script>  </body> </html>"};
});

Scoped.define("module:Input", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {
    return Dynamic.extend({scoped: scoped}, {

        template: Templates.input,

        attrs: {
            model : {
                value : ""
            },
            view : {
                placeholder : "",
                autofocus : true
            }

        }

    }).register();

});

Scoped.define("module:Overlaycontainer", [
    "dynamics:Dynamic",
    "module:Templates"
], [
    "dynamics:Partials.TapPartial"
], function (Dynamic, Templates, scoped) {

	return Dynamic.extend({scoped: scoped}, {
		
		template: Templates.overlaycontainer,
		
		attrs : {
            view : {
                overlay : ""
            },
            model : {
                message : "This is a message"
            },
            value : null,
            showoverlay : true
        }
	
	}).register();

});


Scoped.define("tests:Testoverlaycontainer", [
    "dynamics:Dynamic",
    "module:Templates"
],[
    "module:Overlaycontainer"
],function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.testoverlaycontainer,

        attrs : {
            showoverlay : false,
            overlay : "timepicker"
        }

    }).register();

});


Scoped.define("module:Scrollpicker", [
    "dynamics:Dynamic",
    "module:Templates",
    "ui:Interactions.Loopscroll"
], [
    "dynamics:Partials.RepeatElementPartial"
], function (Dynamic, Templates, Loopscroll, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.scrollpicker,

        attrs : {
            initial_value : 14,
            current_value : 10,
            first : 0,
            last : 23,
            increment : 1,
            currentTop : false,
            value_array : []
        },

        create : function () {

            this.call('initialize_value_array');
            this.call('initialize_value');

            console.log('Scrollpicker initial value :');
            console.log(this.get('initial_value'));

        },

        functions : {

            initialize_value : function () {
                var inc = this.get('increment');
                var rounded_value = inc * Math.round(this.get('initial_value')/inc);
                var index = this.get('value_array').indexOf(rounded_value);
                var displayed_value = index > -1 ? rounded_value : this.get('value_array')[0];
                this.set('current_value', parseInt(displayed_value, 10));
            },

            initialize_value_array : function () {

                var first = this.get('first');
                var last = this.get('last');
                var inc = this.get('increment');

                var value_array  = [];
                for (var i = last ; i >= first ; i -= inc) {
                    value_array.push(i);
                }
                this.set('value_array',value_array);

            }

        },

        _afterActivate : function (element) {

            element = element.find('container');

            var scroll = new Loopscroll(element, {
                enabled: true,
                currentTop: this.get('currentTop'),
                discrete: true,
                scrollEndTimeout: 200,
                currentCenter: true
            });

            //var self = this;
            //element.scroll(function () {
            //    console.log('There is a Scroll happening');
            //    console.log(self.__cid);
            //});

            console.log('Scroll to Value');
            console.log(this.get('current_value'));
            var ele = $(element.find("[data-id='" + this.get('current_value') + "']"));
            scroll.scrollToElement(ele, {
                animate: false
            });
            ele.css({
                "color": "black",
                "background" : "white"
            });

            scroll.on("scrollend", function () {
                console.log(this);
                this.set('current_value', scroll.currentElement().data( "id" ));
            }, this);

            scroll.on("scroll", function () {
                element.children().css({
                    "color" : "#999999",
                    "background" : "#F4F4F4"
                });
                scroll.currentElement().css({
                    "color" : "black",
                    "background" : "white"
                });
            });

        }

    }).register();

});

Scoped.define("module:Test_scrollpicker", [
    "dynamics:Dynamic",
    "module:Templates"
], [
   'module:Scrollpicker'
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.test_scrollpicker,

        attrs : {
        },

        create : function () {


        }

    }).register();

});


Scoped.define("module:Loading", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.loading

    }).register();

});

Scoped.define("module:Loadmore", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.loadmore,

        attrs: {
            view: {
                value: "Placeholder"
            }
        },

        functions: {

            load_more: function () {
                this.chainedTrigger('loadmore', this);
            }

        }

    }).register();

});

Scoped.define("module:Eventitem", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template: Templates.eventitem,

        attrs: {
            counter : 0,
            model : {
                value : 'Eventitem - Clicked '
            }
        },

        functions : {
            click : function () {
                this.trigger('event', this.cid());
            }
        },

        create : function () {

            this.on("event", function (cid) {
                this.set('counter',this.get('counter') + 1);
            }, this);

            this.parent().on('archive', function () {
                console.log('archived');
            }, this);

        }

    }).register();

});

Scoped.define("module:Selectableitem", [
    "dynamics:Dynamic",
    "module:Templates",
    "base:Objs"
], [
    "dynamics:Partials.ClassPartial"
], function (Dynamic, Templates, Objs, scoped) {

    Dynamic.extend({scoped: scoped}, {

        template: Templates.selectableitem,

        bindings : {
            selected: "<+[tagname='ba-list']:selected_item"
        },

        scopes: {
            parent_list: "<+[tagname='ba-list']"
        },

        attrs : {
            model : {
                value :'Selectableitem - Value'
            }
        },

        create : function () {

            var parentlist = this.scopes.parent_list;

            if (!parentlist)
                console.log('There is no parent list the selector can attach to, this currently only works  with ba-list');
            else if (parentlist.get('listcollection'))
                if (!this.scopes.parent_list.get('selected_item'))
                    this.call('select')

        },

        functions : {

            select : function () {
                console.log(this.scopes.parent_list);
                this.scopes.parent_list.set('selected_item', Objs.extend({
                	cid: this.cid()
                }, this.get("model").data()));
            }

        }

    }).register();
});


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

Scoped.define("module:List", [
    "dynamics:Dynamic",
    "module:Templates",
    "base:Async"
], [
    "dynamics:Partials.RepeatPartial",
    "dynamics:Partials.IfPartial",
    "dynamics:Partials.DataPartial",
    "dynamics:Partials.FunctionsPartial",
    "dynamics:Partials.CachePartial"
], function (Dynamic, Templates, Async, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.list,

        attrs: {
            listitem: "clickitem",
            model: false,
            view : {
            }
        },

        collections: {
            listcollection: [
                {value: "List - Item 1"},
                {value: "List - Item 2"},
                {value: "List - Item 3"}
            ]
        },
        
        functions: {
        	moreitems: function () {
        		this.set("loading", true);
               	Async.eventually(function () {
               		this.get("loadmore").increase_forwards().callback(function () {
               			 this.set("loading", false);
               		}, this);
               	}, this);
        	}
        }

    }).register();

});

Scoped.define("tests:Test_list_clickitem", [
    "dynamics:Dynamic",
    "module:Templates",
    "base:Collections.Collection"
], [
    "module:List"
], function (Dynamic, Templates, Collection, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template: Templates.test_list_clickitem,

        attrs: {
            testmodel : {
                listitem : 'clickitem',
                listcollection : new Collection({objects: [
                    {value: "Item 1"},
                    {value: "Item 2"},
                    {value: "Item 3"},
                    {value: "Item 4"},
                    {value: "Item 5"}
                ]})
            }
        }

    }).register();

});

Scoped.define("tests:Test_list_listcollection", [
    "dynamics:Dynamic",
    "module:Templates"
], [
    "module:List"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template: Templates.test_list_listcollection,

        collections : {
            listcollection : [
                {value: "Test - List - listollection - Item 1"},
                {value: "Test - List - listollection - Item 2"},
                {value: "Test - List - listollection - Item 3"},
                {value: "Test - List - listollection - Item 4"}
            ]
        }

    }).register();

});


Scoped.define("tests:Test_list_listoflist", [
    "dynamics:Dynamic",
    "module:Templates",
    "base:Collections.Collection"
], [
    "module:List"
], function (Dynamic, Templates, Collection, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template: Templates.test_list_listoflist,

        collections : {
            listcollection : [
                {listcollection : new Collection({objects: [
                    {value : "Test - list of list - Item 1"},
                    {value : "Test - list of list - Item 2"}
                ]})},
                {listcollection : new Collection({objects: [
                    {value : "Test - list of list - Item 1"},
                    {value : "Test - list of list - Item 2"}
                ]})}
            ]
        }

    }).register();

});

Scoped.define("tests:Test_list_loadmore", [
    "dynamics:Dynamic",
    "module:Templates",
    "base:Collections.Collection"
],[
    "module:List",
    "module:Loading"
], function (Dynamic, Templates, Collection, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template: Templates.test_list_loadmore,

        attrs : {
          view : {
              listend : {
                  item : 'loadmore',
                  value : 'Test Value'
              }
          }
        },

        collections : {
            listcollection : [
                {value: "Test - List - Loadmore - Item 1"},
                {value: "Test - List - Loadmore - Item 2"},
                {value: "Test - List - Loadmore - Item 3"},
                {value: "Test - List - Loadmore - Item 4"}
            ]
        },

        create : function () {
            var collection = new Collection({
                objects: [
                    {value: "Test - List - Loadmore - Item 0"}
                ]
            });
            for (var i = 1; i < 15; i++) {
                collection.add(
                    {value: "Test - List - Loadmore - Item " + i}
                );
            }
            this.set('listcollection',collection);
        }

    }).register();

});

Scoped.define("module:Test_list_pushfunc", [
    "dynamics:Dynamic",
    "module:Templates",
    "base:Collections.Collection"
],[
    "module:Titledlist",
    "module:Clickitem"
], function (Dynamic, Templates, Collection, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template: Templates.test_list_pushfunc,

        attrs: {
            testmodel : {
                model : {
                    listitem : 'clickitem'
                },
                functions : {
                    testfunc : function (argument) {
                        console.log('This is a testfunction');
                        console.log('This is the argument : ' + argument);
                        console.log(this.get('listcollection'));
                        this.get('listcollection').add(
                            {value : argument}
                        );
                    }
                },
                listcollection : new Collection({objects: [
                    {value: "Item 1"},
                    {value: "Item 2"},
                    {value: "Item 3"},
                    {value: "Item 4"},
                    {value: "Item 5"}
                ]})
            }
        },

        functions : {
            test : function (argument) {
                argument = argument ? argument : "no arg given";
                this.scope('>').get('model').functions.testfunc.call(this.scope('>'), argument);
            }
        }

    }).register();

});

Scoped.define("tests:Test_list_swipecontainer", [
        "dynamics:Dynamic",
        "module:Templates",
        "base:Collections.Collection"
    ],[
        "module:List",
        "module:Swipeclickcontainer",
        "module:Selectableitem"
    ], function (Dynamic, Templates, Collection, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.test_list_swipecontainer,

        attrs: {
            model : {
                listcollection : new Collection({objects: [
                    {value: "Item 1"},
                    {value: "Item 2"},
                    {value: "Item 3"},
                    {value: "Item 4"},
                    {value: "Item 5"}
                ]})
            },
            view_model : {
                listitem : 'swipeclickcontainer',
                inner : 'selectableitem'
            }
        }

    }).register();

});

Scoped.define("module:Searchlist", [
    "dynamics:Dynamic",
    "module:Templates"
],[
    "module:List",
    "dynamics:Partials.NoScopePartial"
],function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.searchlist,

        attrs: {
            searchvalue : "",
            searchingindication: false,
            //searching: false,
            view : {
                placeholder : "Search for",
                listitem : "clickitem",
                showsearch : true
            }
        },

        collections : {
            listcollection : [
                {value: "Searchlist - Item 1"},
                {value: "Searchlist - Item 2"},
                {value: "Searchlist - Item 3"}
            ]
        },
        
        create: function () {
        	this.on("change:searchvalue", function () {
        		this.set("searchingindication", true);
        	}, this);
        	this.on("change:searching", function () {
        		this.set("searchingindication", this.get("searching"));
        	}, this);
            this.on("change:searchvalue", function () {
            	this.set("searching", true);
            }, this, {
                min_delay: 750
            });
        }

    }).register();

});

Scoped.define("tests:Test_searchlist", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template : Templates.test_searchlist,

        attrs : {
            view : {
                placeholder : "Test Searchlist",
                listitem : 'swipecontainer',
                listinner : {
                    inner : 'selectableitem'
                }
            }
        },

        collections : {
            listcollection : [
                {title: "Test searchlist Item 1"},
                {title: "Test searchlist Item 2"},
                {title: "Test searchlist Item 3"}
            ]
        }

    }).register();

});

Scoped.define("module:Test_titledlist", [
    "dynamics:Dynamic",
    "module:Templates"
],function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.test_titledlist,

        attrs : {
            view : {
                titleitem : 'addtitle',
                listitem : 'clickitem'
            },
            model : {
                title_model : {
                    value : 'Titledlist - Testtitle'
                },
                title_callbacks : {
                    addbutton : function () {
                        console.log('This comes from the Test Titledlist : ');
                        this.scope('<').call('additem', {value  : "Testtitledlist Item New"});
                    }
                    //clicktitle : function () {
                    //    console.log('This comes from the Test Titledlist : ');
                    //    this.scope('<').call('togglelist');
                    //}
                }
            }
        },

        collections : {
            listcollection : [
                {value: "Testtitledlist Item 1"},
                {value: "Testtitledlist Item 2"},
                {value: "Testtitledlist Item 3"}
            ]
        }

    }).register();

});


Scoped.define("module:Test_titledlist_swipe", [
    "dynamics:Dynamic",
    "module:Templates"
],[
    "module:Titledlist",
    "module:Selectableitem"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template : Templates.test_titledlist_swipe,

        attrs : {
            push_attrs : {
                title_model : {
                    value : 'Titledlist - Testtitle'
                },
                listitem: 'swipeclickcontainer',
                inner: 'selectableitem'
            }
        },

        collections : {
            listcollection : [
                {value: "Test - Titledlist - Swipe - Item 1"},
                {value: "Test - Titledlist - Swipe - Item 2"},
                {value: "Test - Titledlist - Swipe - Item 3"}
            ]
        }

    }).register();

});

Scoped.define("module:Titledlist", [
    "dynamics:Dynamic",
    "module:Templates"
], [
  "module:List",
  "dynamics:Partials.NoScopePartial",
  "dynamics:Partials.ClickPartial"
], function (Dynamic, Templates, scoped) {
    Dynamic.extend({scoped: scoped}, {

        template: Templates.titledlist,

        attrs: {
            model: {
                title_model: {
                    value: 'Titledlist - Title'
                }
            },
            collapsed: false,
            collapsible: true,
            listitem: 'selectableitem',
            titleitem: 'title'
        },

        collections: {
            listcollection: [
                {value: "Titledlist - Item 1"},
                {value: "Titledlist - Item 2"},
                {value: "Titledlist - Item 3"}
            ]
        },

        functions: {

            togglelist: function () {

                if (this.get('collapsible'))
                    this.set('collapsed', !this.get('collapsed'));

            },

            additem: function (item) {

                item = item ? item : {value: "Titledlist - New Item"};
                var index = this.get('listcollection').add(item);

                return this.get('listcollection').getByIndex(index).cid();

            },

            click_title: function () {
                console.log('You clicked the title');
                this.call('togglelist');
            }

        }

    }).register();

});

Scoped.define("module:Addtitle", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template:Templates.addtitle,

        attrs: {
            model : {value: 'Title'}
        },

        functions : {

            clicktitle : function () {

                this.parent().call('togglelist');

            },
            addbutton : function () {

                console.log("You clicked the addbuton, no addbutton() function given");

            }

        }

    }).register();

});

Scoped.define("tests:Test_addtitle", [
    "dynamics:Dynamic",
    "module:Templates"
], [
    "module:Addtitle"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template : Templates.test_addtitle,

        initial : {

            attrs : {
                testmodel : {
                    title : 'Test - Addtitle',
                    titlefunc : 'showlist',
                    addfunc : 'additem',
                    add_func : function () {
                        console.log('This is the add_func');
                    }
                }
            },

            functions : {
                additem : function () {
                    this.get('testmodel').add_func.call(this, null);
                    console.log("Add Item to List");
                },
                showlist : function () {
                    console.log("You clicked the title");
                }
            }

        }

    }).register();

});

Scoped.define("module:Clickitem", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template: Templates.clickitem,

        attrs: {
            model : {
                value : 'Clickitem - Value'
            }
        },

        functions : {
            click : function () {
                console.log('Click');
                //console.log("You Clicked item : " + this.properties().getProp('model.value'));
                //console.log(this.cid());
                //this.trigger('event', this.cid());
            }
        },

        create : function () {
            this.on("event", function (cid) {
                console.log('event from item: ' + cid);
            }, this);
        }

    }).register();

});

Scoped.define("module:Clicktestcontainer", [
	"dynamics:Dynamic",
	"module:Templates"
],[
	"ui:Dynamics.GesturePartial",
	"ui:Dynamics.InteractionPartial"
], function (Dynamic, Templates, scoped) {

	return Dynamic.extend({scoped: scoped}, {

		template: Templates.clicktestcontainer,

		attrs: {
			model: {
				value: "Cicktestcontainer - Title"
			},
			inner: "eventitem",

			click_gesture: {
				mouse_up_activate: true,
				wait_time: 250,
				wait_activate: false,
				disable_x: 10,
				disable_y: 10,
				enable_x: -1,
				enable_y: -1,
				activate_event: "click"
			}
		},

		functions : {
			click : function () {
				//Call Click in Child
			}
		}

	}).register();

});

Scoped.define("module:Header", [
    "dynamics:Dynamic",
    "module:Templates"
],function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.header,

        collections : {
            left_collection : [
                {listitem : 'toggle_menu'},
                {
                    value : '',
                    class : 'icon-home'
                },
                {
                    value : 'Big Brother',
                    class : 'icon-eye-open'
                },
                {value : 'Header 1'},
                {value : 'Header 2'}
            ]
        }

    }).register();

});


Scoped.define("module:Toggle_menu", [
    "dynamics:Dynamic",
    "module:Templates"
],function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.toggle_menu,

        functions : {
            toggle_menu : function () {
                this.scope("<+[tagname='ba-layout_web']").call('toggle_menu');
            }
        }

    }).register();

});




Scoped.define("module:Menu_web", [
    "dynamics:Dynamic",
    "module:Templates",
    "base:Collections.Collection"
],function (Dynamic, Templates, Collection, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.menu_web,

        attrs : {
            model : {
                title_model: {
                    value: "Menu Title"
                }
            }
        },

        collections : {
            menu_collection : [
                {value : 'Item 1'},
                {value : 'Item 2'},
                {
                    listitem : 'titledlist',
                    title_model : {
                        value: 'Item 3'
                    },
                    listcollection : new Collection({objects:[
                        {value : "Subitem 1"},
                        {value : "Subitem 2"}
                    ]})
                },
                {value : 'Item 4'}
            ]
        }

    }).register();

});



Scoped.define("module:Layout_web", [
    "dynamics:Dynamic",
    "module:Templates"
],function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.layout_web,

        attrs : {
            view : {
                header : "header",
                //header : null,
                menu : "menu_web",
                //menu : null,
                content : null,
                display_menu : true
            },
            model : {

            }
        },

        functions : {
            toggle_menu : function () {
                this.setProp('view.display_menu', !this.getProp('view.display_menu'));
            }
        }

    }).register();

});



}).call(Scoped);