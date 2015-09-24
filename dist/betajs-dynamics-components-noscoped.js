/*!
betajs-dynamics-components - v0.0.3 - 2015-09-24
Copyright (c) Oliver Friedmann
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
		version: '36.1443096623569'
	};
});

BetaJS.Dynamics.Dynamic.Components = {};
BetaJS.Dynamics.Dynamic.Components.Templates = BetaJS.Dynamics.Dynamic.Components.Templates || {};






















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
			model : {title : "Swipeitem"},
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

			if (this.get("model")) {
				BetaJS.Objs.iter(this.get("model"), function (modelValue, attrKey) {
					var attrValue = this.isArgumentAttr(attrKey) ? this.get(attrKey) : modelValue;
					this.set(attrKey, attrValue);
					//this.get("model").set(attrKey, attrValue);
					//this.properties().bind(attrKey, this.get("model"));
				}, this);
			}

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

            //if (this.get("model")) {
            //
            //    BetaJS.Objs.iter(this.get("model"), function (modelValue, attrKey) {
            //        var attrValue = this.isArgumentAttr(attrKey) ? this.get(attrKey) : modelValue;
            //        console.log(attrKey);
            //        this.set(attrKey, attrValue);
            //        //this.get("model").set(attrKey, attrValue);
            //        //this.properties().bind(attrKey, this.get("model"));
            //    }, this);
            //
            //}

        },

        functions : {
            click : function () {
                console.log("You Clicked item : " + this.get('model.title'))
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

        attrs : {
            model : {
                title :'Data Placeholder',
                selected : false
            }
        },

        scopes : {
            parent_list: "<+[tagname='ba-list']"
        },

        create : function () {

            if (this.get("model")) {

                BetaJS.Objs.iter(this.get("model"), function (modelValue, attrKey) {
                    var attrValue = this.isArgumentAttr(attrKey) ? this.get(attrKey) : modelValue;
                    this.set(attrKey, attrValue);
                }, this);

            }

            //var parentlistcollection = this.get('parentlistcollection') ? this.get('parentlistcollection') : this.scopes.parent_list.get('listcollection');
            var parentlist = this.scopes.parent_list;

            console.log('Parent List');
            console.log(parentlist);

            if (parentlist.get('listcollection')) {
                var index = parentlist.get('listcollection').getIndex(this.get('model'));
                if (index == 0 && !parentlist.get('selected_item')) {
                    parentlist.set('selected_item', this.get('model'));
                    console.log('Selected Item');
                    console.log(parentlist.get('selected_item'));
                }
            }
        },

        functions : {
            select : function () {
                this.scopes.parent_list.set('selected_item',this.get('model'));
                console.log('Model');
                console.log(this.get('model'));
            }
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.List", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.list,

    initial: {

        attrs: {
            listitem : "clickitem"
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
                window.list = this.get('model');
                window.listcollection = this.get('listcollection');
                BetaJS.Objs.iter(this.get("model"), function (modelValue, attrKey) {
                    var attrValue = this.isArgumentAttr(attrKey) ? this.get(attrKey) : modelValue;
                    this.set(attrKey, attrValue);
                    //this.get("model").set(attrKey, attrValue);
                    //this.properties().bind(attrKey, this.get("model"));
                }, this);
                window.newlistcollection = this.get('listcollection');
            }
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Testlist_clickitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.testlist_clickitem,

    initial: {

        attrs: {
            testmodel : {
                listitem : 'clickitem',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Item 1"},
                    {title: "Item 2"},
                    {title: "Item 3"},
                    {title: "Item 4"},
                    {title: "Item 5"}
                ]})
            }
        },

        //collections : {
        //    listcollection : [
        //        {title: "Item 1"},
        //        {title: "Item 2"},
        //        {title: "Item 3"},
        //        {title: "Item 4"},
        //        {title: "Item 5"}
        //        //{model : {title: "Item 1"}},
        //        //{model : {title: "Item 2"}},
        //        //{model : {title: "Item 3"}},
        //        //{model : {title: "Item 4"}},
        //        //{model : {title: "Item 5"}}
        //    ]
        //},

        create : function () {
            if (this.get("model")) {
                window.list = this.get('model');
                BetaJS.Objs.iter(this.get("model"), function (modelValue, attrKey) {
                    var attrValue = this.isArgumentAttr(attrKey) ? this.get(attrKey) : modelValue;
                    this.set(attrKey, attrValue);
                    //this.get("model").set(attrKey, attrValue);
                    //this.properties().bind(attrKey, this.get("model"));
                }, this);
            }
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Testlist_swipecontainer", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.testlist_swipecontainer,

    initial: {

        attrs: {
            testmodel : {
                listitem : 'swipecontainer',
                type : 'clickitem',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Item 1"},
                    {title: "Item 2"},
                    {title: "Item 3"},
                    {title: "Item 4"},
                    {title: "Item 5"}
                ]})
            }
        },

        //collections : {
        //    listcollection : [
        //        {model : {title: "Item 1"}},
        //        {model : {title: "Item 2"}},
        //        {model : {title: "Item 3"}},
        //        {model : {title: "Item 4"}},
        //        {model : {title: "Item 5"}}
        //    ]
        //},

        create : function () {
            if (this.get("model")) {
                window.list = this.get('model');
                BetaJS.Objs.iter(this.get("model"), function (modelValue, attrKey) {
                    var attrValue = this.isArgumentAttr(attrKey) ? this.get(attrKey) : modelValue;
                    this.set(attrKey, attrValue);
                    //this.get("model").set(attrKey, attrValue);
                    //this.properties().bind(attrKey, this.get("model"));
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
            showsearch : true
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


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Testtitledlist", {

    template : BetaJS.Dynamics.Dynamic.Components.Templates.testtitledlist,

    initial : {

        attrs : {
            model : {
                title : "Testtitle",
                titleitem : 'addtitle',
                titleitem_model : {
                    title : 'Titledlist - Testtitle',
                    titlefunc : 'togglelist',
                    addfunc : 'additem'
                },
                listitem : 'clickitem',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Item 1"},
                    {title: "Item 2"},
                    {title: "Item 3"},
                    {title: "Item 4"},
                    {title: "Item 5"}
                ]})
            }
        },

        create :  function () {
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Testtitledlistswipe", {

    template : BetaJS.Dynamics.Dynamic.Components.Templates.testtitledlistswipe,

    initial : {

        attrs : {
            model : {
                title : "Testtitle",
                titleitem : 'addtitle',
                titleitem_model : {
                    title : 'Titledlist - Testtitle',
                    titlefunc : 'togglelist',
                    addfunc : 'additem'
                },
                listitem: 'swipecontainer',
                type: 'selectableitem',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Item 1"},
                    {title: "Item 2"},
                    {title: "Item 3"},
                    {title: "Item 4"},
                    {title: "Item 5"}
                ]})
            }
        },

        create :  function () {

        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Titledlist", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.titledlist,

    initial: {

        attrs: {
            collapsed : false,
            collapsible : true,
            title : 'Title',

            model : {
                listitem : 'selectableitem',
                titleitem : 'title'
            }

        },

        collections : {
            listcollection : [
                {title: "Item 1"},
                {title: "Item 2"}
            ]
        },

        create : function () {

            if (this.get("model")) {

                BetaJS.Objs.iter(this.get("model"), function (modelValue, attrKey) {
                    var attrValue = this.isArgumentAttr(attrKey) ? this.get(attrKey) : modelValue;
                    this.set(attrKey, attrValue);
                        //this.get("model").set(attrKey, attrValue);
                        //this.properties().bind(attrKey, this.get("model"));
                }, this);

            }

        },

        functions : {

            togglelist : function () {
                this.set('collapsed', !this.get('collapsed'));
            },

            additem : function (item) {
                console.log('You called Additem');
                console.log(item);
                item = item ? item : {title : "New Item"};
                console.log(item);
                window.test = this;
                console.log(this.get('listcollection'));
                this.get('listcollection').add(item);
            }

        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Addtitle", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.addtitle,

    initial: {

        attrs: {
            title : 'Title',
            titlefunc : false,
            addfunc : false
        },

        create : function () {

            BetaJS.Objs.iter(this.get("model"), function (modelValue, attrKey) {
                var attrValue = this.isArgumentAttr(attrKey) ? this.get(attrKey) : modelValue;
                this.set(attrKey, attrValue);
                //    this.get("model").set(attrKey, attrValue);
                //    this.properties().bind(attrKey, this.get("model"));
            }, this);

        },

        functions : {

            clicktitle : function (params) {
                if (this.get('titlefunc')) {
                    this.parent().call(this.get('titlefunc'), params);
                } else
                    console.log("You clicked the Title, no titlefunc given")
            },
            addbutton : function (params) {
                if (this.get('addfunc')) {
                    this.parent().call(this.get('addfunc'), params);
                } else
                    console.log("You clicked the addbuton, no addfunc given")
            }
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Testaddtitle", {

    template : BetaJS.Dynamics.Dynamic.Components.Templates.testaddtitle,

    initial : {

        attrs : {
            testmodel : {
                title : 'Testaddtitle',
                titlefunc : 'showlist',
                addfunc : 'additem'
            }
        },

        functions : {
            additem : function () {
                console.log("Add Item to List");
            },
            showlist : function () {
                console.log("You clicked the title");
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
    
    initial : {

        attrs : {
          current_system : null
        },

        collections : {
            systems : [
                {title: 'mobile'},
                {title: 'web'}
            ],
            mobile : [
                {title: 'iphone4'},
                {title: 'iphone5'}
            ],
            web:[
                {title: 'notebook'}
            ]
        },

        create : function () {
            console.log('Layout Selector Loaded');

            window.anton = this.get('current_system');
            console.log('current_system');
            console.log(this.get('current_system'));

            //this.set('current_system', this.get('systems').getByIndex(1).data());

            //this.set('current_device', this.get('current_device').getByIndex(0));
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
            //current_component: "<>+[tagname='ba-components']:current_component",
            current_system: "<>+[tagname='ba-layout']:current_system",
            //current_device: "<>+[tagname='ba-layout']:current_device"
        },

        attrs: {
            current_device : {title : 'iphone4'},
            current_component : {title : 'testtitledlist'},
            component: 'testcomponent'
        },

        create : function () {
            console.log('Simulator Loaded');
            //console.log('current_component : ');
            //console.log(this.get('current_component'));
            //console.log('current_system : ');
            //console.log(this.get('current_system'));
            console.log('current_device : ');
            console.log(this.get('current_device'));

        }

    }

}).register();
}).call(Scoped);