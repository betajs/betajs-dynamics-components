/*!
betajs-dynamics-components - v0.0.2 - 2015-09-12
Copyright (c) Oliver Friedmann,Victor Lingenthal
MIT Software License.
*/
(function () {

var Scoped = this.subScope();

Scoped.binding("module", "global:BetaJS.Dynamics.Components");
Scoped.binding("dynamics", "global:BetaJS.Dynamics");
Scoped.binding("base", "global:BetaJS");
Scoped.binding("browser", "global:BetaJS.Browser");

Scoped.binding("jquery", "global:jQuery");

Scoped.define("module:", function () {
	return {
		guid: "5d9ab671-06b1-49d4-a0ea-9ff09f55a8b7",
		version: '31.1442043455182'
	};
});

BetaJS.Dynamics.Dynamic.Components = {};
BetaJS.Dynamics.Dynamic.Components.Templates = BetaJS.Dynamics.Dynamic.Components.Templates || {};
BetaJS.Dynamics.Dynamic.Components.Templates['overlaycontainer'] = '<overlaycontainer     ba-click="showoverlay = false"     ba-if="{{showoverlay}}">      <overlayinner>          <ba-{{overlay}} ba-value=\'{{=value}}\'>             <message>{{message}}</message>         </ba-{{overlay}}>      </overlayinner>  </overlaycontainer>';

BetaJS.Dynamics.Dynamic.Components.Templates['overlaycontainertest'] = ' <button ba-click="showoverlay = !showoverlay">Show Overlaycontainer</button>  <ba-overlaycontainer         ba-overlay="{{=overlay}}"         ba-showoverlay="{{=showoverlay}}">          </ba-overlaycontainer>';

BetaJS.Dynamics.Dynamic.Components.Templates['scrollpicker'] = '<element ba-repeat-element="{{element_value :: value_array}}" data-id="{{element_value}}">         {{element_value}} </element>';

BetaJS.Dynamics.Dynamic.Components.Templates['swipecontainer'] = ' <behind>     <icon class=\'{{lefticon}}\'></icon>     <div></div>     <icon class=\'{{righticon}}\'></icon> </behind>  <swipe>      <ba-{{type}}         class=\'{{itemclass}}\'         ba-model=\'{{model}}\'>         {{title}}     </ba-{{type}}>      <swipeleft>         <div></div>         <icon class=\'{{lefticon}}\'></icon>     </swipeleft>      <swiperight>         <icon class=\'{{righticon}}\'></icon>         <div></div>     </swiperight>  </swipe> ';

BetaJS.Dynamics.Dynamic.Components.Templates['clickitem'] = ' <clickitem         ba-click="click(model)">     {{model.title}} </clickitem>';

BetaJS.Dynamics.Dynamic.Components.Templates['selectableitem'] = ' <selectableitem         ba-class="{{{selected : selected == model}}}"         ba-click="select(model)">     {{model.title}} </selectableitem>';

BetaJS.Dynamics.Dynamic.Components.Templates['list'] = ' <list ba-repeat="{{collectionitem :: listcollection}}">      <ba-{{listitem}}         ba-model="{{collectionitem}}">         {{collectionitem.title}}     </ba-{{listitem}}>  </list>';

BetaJS.Dynamics.Dynamic.Components.Templates['searchlist'] = '<searchbox ba-if="{{showsearch}}">     <icon class="icon-search"></icon>     <input placeholder="{{placeholder}}" value="{{=searchvalue}}"> </searchbox> <ba-list         ba-listitem="{{listitem}}"         ba-listcollection="{{listcollection}}">  </ba-list>';

BetaJS.Dynamics.Dynamic.Components.Templates['titledlist'] = '<title ba-click="collapsed = !collapsed">{{title}}</title>  <list ba-if="{{!collapsed && collapsible}}" ba-repeat="{{collectionitem :: listcollection}}">      <ba-{{type}} ba-model="{{collectionitem}}">         {{collectionitem.title}}     </ba-{{type}}>  </list>';

BetaJS.Dynamics.Dynamic.Components.Templates['components'] = '<ba-titledlist         ba-title="Components"         ba-selected_item="{{=current_component}}"         ba-listcollection="{{components}}"></ba-titledlist> ';

BetaJS.Dynamics.Dynamic.Components.Templates['controls'] = ' <h4>Controls </h4>  <controls>      <ba-layout></ba-layout>      <ba-components></ba-components>  </controls>';

BetaJS.Dynamics.Dynamic.Components.Templates['layout'] = ' <ba-titledlist         ba-title="System"         ba-selected_item="{{=current_system}}"         ba-listcollection="{{systems}}"></ba-titledlist>  <ba-titledlist ba-title="Device"          ba-selected_item="{{=current_device}}"          ba-listcollection="{{current_system.devices}}"></ba-titledlist> ';

BetaJS.Dynamics.Dynamic.Components.Templates['environment'] = ' <ba-controls></ba-controls>  <ba-simulator></ba-simulator> ';

BetaJS.Dynamics.Dynamic.Components.Templates['simulator'] = '  <appframe         class="             {{current_system.title}}             {{current_device.title}}         ">      <ba-{{current_component.title}}></ba-{{current_component.title}}>  </appframe> ';

BetaJS.Dynamics.Dynamic.Components.Templates['index'] = '<!DOCTYPE html> <html> <head lang="en">     <meta charset="UTF-8">      <!--<script src="../../vendors/jquery-1.9.closure-extern.js"></script>-->     <script src="../../vendors/jquery-2.1.4.js"></script>     <script src="../../vendors/scoped.js"></script>     <script src="../../vendors/beta.js"></script>      <script src="config/components.js"></script>      <script src="../../vendors/beta-browser-noscoped.js"></script>     <script src="../../vendors/betajs-ui.js"></script>     <script src="../../vendors/betajs-dynamics-noscoped.js"></script>      <link rel="stylesheet" href="../../vendors/icomoon/style.css" />      <link rel="stylesheet" href="../../dist/betajs-dynamics-components.css" />     <script src="../../dist/betajs-dynamics-components.js"></script>      <script src="//localhost:1337/livereload.js"></script>      <title></title>  </head> <body>      <ba-environment></ba-environment>      <script src="config/config.js"></script>     <script src="config/router.js"></script>  </body> </html>';


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Overlaycontainer", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.overlaycontainer,

    initial : {

        attrs : {
            overlay : "",
            message : "This is a message",
            value : null,
            showoverlay : true
        }

    }

}).register();



BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Overlaycontainertest", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.overlaycontainertest,

    initial : {

        attrs : {
            showoverlay : false,
            overlay : "timepicker"
        }

    }

}).register();



BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Scrollpicker", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.scrollpicker,

    initial : {

        attrs : {
            value : 22,
            first : 0,
            last : 23,
            increment : 1,
            currentTop : false,
            value_array : []
        },

        create : function () {

            console.log('Create Scrollpicker');

            this.call('initialize_value_array');

            this.compute("displayed_value", function () {
                var inc = this.get('increment');
                var rounded_value = inc * Math.round(this.get('value')/inc);
                var index = this.get('value_array').indexOf(rounded_value);
                var displayed_value = index > -1 ? rounded_value : this.get('value_array')[0];
                return parseInt(displayed_value, 10);
            }, ["value", "increment"]);

        },

        functions : {

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

        }
    },

    _afterActivate : function (element) {

        var scroll = new BetaJS.UI.Interactions.LoopScroll(element, {
            enabled: true,
            currentTop: this.get('currentTop'),
            discrete: true,
            scrollEndTimeout: 200,
            currentCenter: true
        });

        window.test = scroll;
        var ele = $(element.find("[data-id='" + this.get('displayed_value') + "']"));
        scroll.scrollToElement(ele, {
            animate: false
        });
        ele.css({
            "color": "black",
            "background" : "white"
        });

        scroll.on("scrolltoend", function () {
            this.set('value', scroll.currentElement().data( "id" ));
        },this);

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


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Swipecontainer", {

	template: BetaJS.Dynamics.Dynamic.Components.Templates.swipecontainer,

	initial: {

		attrs : {
			type : "clickitem",
			title : "Swipeitem",
			lefticon : 'icon-ok',
			righticon : 'icon-time',
			actions : {
				"other": {
					less: -1/4,
					execute: function () {
						//alert("other?");
						console.log(this.get("model"));
						var m = this.get("model");
						m ? m.set("archived", true) : {};
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
		},

		create : function () {
			console.log("Swipeitem 1 : ");
			console.log(this.get('model'));

			if (this.get("model")) {
				BetaJS.Objs.iter(this.get("model").data(), function (modelValue, attrKey) {
					var attrValue = this.isArgumentAttr(attrKey) ? this.get(attrKey) : modelValue;
					this.set(attrKey, attrValue);
					this.get("model").set(attrKey, attrValue);
					this.properties().bind(attrKey, this.get("model"));
				}, this);
			}

			console.log("Swipeitem 2 : ");
			console.log(this.get('model'));
		},

		functions : {

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

BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Clickitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.clickitem,

    initial: {

        attrs: {
            model: {
                title :'Title'
            }
        },

        create : function () {

        },

        functions : {
            click : function () {
                console.log("Route to ...")
            }
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Selectableitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.selectableitem,

    initial: {

        bind : {
            selected : "<:selected_item",
            parentlistcollection : "<:listcollection"
        },

        attrs: {
            model: {
                title :'Data Placeholder',
                selected : false
            }
        },

        create : function () {

            var index = this.get('parentlistcollection').getIndex(this.get('model'));
            if (index == 0 && !this.parent().get('selected_item'))
                this.parent().set('selected_item',this.get('model'));

        },

        functions : {
            select : function () {
                this.parent().set('selected_item',this.get('model'));
            }
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.List", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.list,

    initial: {

        attrs: {
            listitem : "item"
        },

        collections : {
            listcollection : [
                {title: "Item 1"},
                {title: "Item 2"},
                {title: "Item 3"}
            ]
        },

        create : function () {
            if (this.get("model")) {
                BetaJS.Objs.iter(this.get("model").data(), function (modelValue, attrKey) {
                    var attrValue = this.isArgumentAttr(attrKey) ? this.get(attrKey) : modelValue;
                    this.set(attrKey, attrValue);
                    this.get("model").set(attrKey, attrValue);
                    this.properties().bind(attrKey, this.get("model"));
                }, this);
            }
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Searchlist", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.searchlist,

    initial: {

        attrs: {
            placeholder : "Search for",
            searchvalue : "",
            listitem : "clickitem",
            showsearch : false
        },

        collections : {
            listcollection : [
                {title: "Item 1"},
                {title: "Item 2"},
                {title: "Item 3"}
            ]
        },

        create : function () {
            if (this.get("model")) {
                BetaJS.Objs.iter(this.get("model").data(), function (modelValue, attrKey) {
                    var attrValue = this.isArgumentAttr(attrKey) ? this.get(attrKey) : modelValue;
                    this.set(attrKey, attrValue);
                    this.get("model").set(attrKey, attrValue);
                    this.properties().bind(attrKey, this.get("model"));
                }, this);
            }
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Titledlist", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.titledlist,

    initial: {

        attrs: {
            collapsed : false,
            collapsible : true,
            title : "Title",
            type : "selectableitem"
        },

        collections : {
            listcollection : [
                {title: "Item 1"},
                {title: "Item 2"},
                {title: "Item 3"}
            ]
        },

        create : function () {
            if (this.get("model")) {
                BetaJS.Objs.iter(this.get("model").data(), function (modelValue, attrKey) {
                    var attrValue = this.isArgumentAttr(attrKey) ? this.get(attrKey) : modelValue;
                    this.set(attrKey, attrValue);
                    this.get("model").set(attrKey, attrValue);
                    this.properties().bind(attrKey, this.get("model"));
                }, this);
            }
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Components", {

    templateUrl: "environment/controls/%/%.html",


    initial: {

        attrs : {
            components : components
        },

        create : function () {
            console.log('Components Loaded');
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Controls", {

    templateUrl: "environment/%/%.html",

    initial: {

        create : function () {
            console.log('Controls Loaded');
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Layout", {

    templateUrl: "environment/controls/%/%.html",
    
    initial: {

        collections : {
            systems : [
                {
                    title:'mobile',
                    devices: new BetaJS.Collections.Collection({objects: [
                        {title: 'iphone4'},
                        {title: 'iphone5'}
                    ]})
                },{
                    title:'web',
                    devices: new BetaJS.Collections.Collection({objects: [
                        {title: 'notebook'}
                    ]})
                }
            ]
        },

        create : function () {
            console.log('Layout Selector Loaded');

            this.set('current_system', this.get('systems').getByIndex(0));
            this.set('current_device', this.get('current_system').get('devices').getByIndex(0));
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Environment", {

    templateUrl: "%/%.html",

    initial: {

        attrs: {

        },

        create : function () {
            console.log('Environment Loaded');
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Simulator", {

    templateUrl: "environment/%/%.html",

    initial: {

        bind : {
            current_component: "<>+[tagname='ba-components']:current_component",
            current_system: "<>+[tagname='ba-layout']:current_system",
            current_device: "<>+[tagname='ba-layout']:current_device"
        },

        attrs: {
            component: 'testcomponent'
        },

        create : function () {
            console.log('Simulator Loaded');
        }

    }

}).register();
}).call(Scoped);