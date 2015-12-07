/*!
betajs-dynamics-components - v0.0.4 - 2015-12-07
Copyright (c) Oliver Friedmann, Victor Lingenthal
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
		version: '73.1449512676820'
	};
});

BetaJS = BetaJS || {};
BetaJS.Dynamics = BetaJS.Dynamics || {};
BetaJS.Dynamics.Components = BetaJS.Dynamics.Components || {};
BetaJS.Dynamics.Components.Templates = BetaJS.Dynamics.Components.Templates || {};
BetaJS.Dynamics.Components.Templates.overlaycontainer = '<overlaycontainer     ba-click="showoverlay = false"     ba-if="{{showoverlay}}">      <overlayinner>          <ba-{{overlay}} ba-value=\'{{=value}}\'>             <message>{{message}}</message>         </ba-{{overlay}}>      </overlayinner>  </overlaycontainer>';

BetaJS.Dynamics.Components.Templates.overlaycontainertest = ' <button ba-click="showoverlay = !showoverlay">Show Overlaycontainer</button>  <ba-overlaycontainer         ba-overlay="{{=overlay}}"         ba-showoverlay="{{=showoverlay}}">          </ba-overlaycontainer>';

BetaJS.Dynamics.Components.Templates.scrollpicker = '<element ba-repeat-element="{{element_value :: value_array}}" data-id="{{element_value}}">         {{element_value}} </element>';

BetaJS.Dynamics.Components.Templates.swipecontainer = ' <behind>     <icon class=\'{{view.lefticon||lefticon}}\'></icon>     <div></div>     <icon class=\'{{view.righticon||righticon}}\'></icon> </behind>  <swipe  ba-gesture:swipe="{{swipe_gesture}}"         ba-interaction:swipe="{{swipe_interaction}}">      <ba-{{view.inner||inner}} ba-sharescope>         {{model.value||value}}     </ba-{{view.inner||inner}}>      <swipeleft>         <div></div>         <icon class=\'{{model.lefticon}}\'></icon>     </swipeleft>      <swiperight>         <icon class=\'{{model.righticon}}\'></icon>         <div></div>     </swiperight>  </swipe> ';

BetaJS.Dynamics.Components.Templates.clickitem = ' <button         class="{{model.class}}"         ba-click="click()">     {{model.value}} </button>';

BetaJS.Dynamics.Components.Templates.selectableitem = ' <selectableitem         ba-class="{{{selected : selected.cid == this.cid()}}}"         ba-click="select()">     {{model.value}} </selectableitem>';

BetaJS.Dynamics.Components.Templates.list = ' <list ba-repeat="{{collectionitem :: (model.listcollection||listcollection)}}">      <ba-{{view.listitem||collectionitem.listitem||listitem}}         ba-data:id="{{collectionitem.cid()}}"         ba-functions="{{collectionitem.callbacks}}"         ba-view="{{collectionitem.view||view.listinner}}"         ba-model="{{collectionitem}}">         {{collectionitem.title}}     </ba-{{view.listitem||collectionitem.listitem||listitem}}>  </list> ';

BetaJS.Dynamics.Components.Templates.test_list_clickitem = ' <ba-list ba-attrs="{{testmodel}}"> </ba-list>';

BetaJS.Dynamics.Components.Templates.test_list_listcollection = ' <ba-list ba-listcollection="{{listcollection}}"> </ba-list>';

BetaJS.Dynamics.Components.Templates.test_list_listoflist = ' <ba-list         ba-listitem="list"         ba-listcollection="{{listcollection}}"> </ba-list>';

BetaJS.Dynamics.Components.Templates.test_list_pushfunc = '<button ba-click="test(input_value)">Test func</button> <input ba-return="test(input_value)" placeholder="Push item to list" value="{{=input_value}}"> <ba-titledlist ba-attrs="{{testmodel}}"> </ba-titledlist>';

BetaJS.Dynamics.Components.Templates.test_list_swipecontainer = ' <ba-list         ba-model="{{model}}"         ba-view="{{view_model}}"> </ba-list>';

BetaJS.Dynamics.Components.Templates.searchlist = ' <searchbox ba-if="{{view.showsearch}}">     <icon class="icon-search"></icon>     <input placeholder="{{view.placeholder}}" value="{{=searchvalue}}"> </searchbox>  <ba-list ba-sharescope></ba-list> ';

BetaJS.Dynamics.Components.Templates.test_searchlist = ' <ba-searchlist         ba-view="{{view}}">  </ba-searchlist>';

BetaJS.Dynamics.Components.Templates.test_titledlist = ' <ba-titledlist         ba-model="{{model}}"         ba-attrs="{{view}}"         ba-functions="{{callbacks}}"         ba-listcollection="{{listcollection}}">  </ba-titledlist>';

BetaJS.Dynamics.Components.Templates.test_titledlist_swipe = ' <ba-titledlist         ba-listcollection="{{listcollection}}"         ba-attrs="{{push_attrs}}">  </ba-titledlist>';

BetaJS.Dynamics.Components.Templates.titledlist = ' <ba-{{view.titleitem}}     ba-click="click_title()"     ba-functions="{{model.title_callbacks}}"     ba-model="{{model.title_model}}">{{model.title_model.value}}</ba-{{view.titleitem}}>  <ba-list         ba-sharescope         ba-show="{{!collapsed}}">  </ba-list> ';

BetaJS.Dynamics.Components.Templates.addtitle = ' <addtitle>     <title ba-click="clicktitle()">{{model.value}}</title>     <button ba-click="addbutton()">         <span class="icon-plus"></span>     </button> </addtitle>';

BetaJS.Dynamics.Components.Templates.test_addtitle = ' <ba-addtitle         ba-attrs="{{testmodel}}"> </ba-addtitle> ';

BetaJS.Dynamics.Components.Templates.pushfunc = ' <pushfunc         ba-click="log()">     {{model.title}} </pushfunc>';

BetaJS.Dynamics.Components.Templates.test_pushfunc = ' <ba-pushfunc         ba-model="{{testmodel}}"> </ba-pushfunc>';

BetaJS.Dynamics.Components.Templates.test_attrs = ' <ba-titledlist         ba-attrs="{{model}}">  </ba-titledlist>';

BetaJS.Dynamics.Components.Templates.header = ' <ba-list ba-listcollection="{{left_collection}}"></ba-list>';

BetaJS.Dynamics.Components.Templates.toggle_menu = '<button ba-click="toggle_menu()" class="icon-reorder"></button>';

BetaJS.Dynamics.Components.Templates.menu = ' <ba-titledlist         ba-collapsible="{{false}}"         ba-model="{{model}}"         ba-listcollection="{{menu_collection}}">  </ba-titledlist>';

BetaJS.Dynamics.Components.Templates.layout_web = '<header>     <ba-{{components.header}}>Header</ba-{{components.header}}> </header> <main>     <menu ba-show="{{model.display_menu}}">         <ba-{{components.menu}}>Menu</ba-{{components.menu}}>     </menu>     <content>         <ba-{{components.content}}>Content</ba-{{components.content}}>     </content> </main>';

BetaJS.Dynamics.Components.Templates.index = '<!DOCTYPE html> <html> <head lang="en">     <meta charset="UTF-8">      <!--<script src="../vendors/jquery-1.9.closure-extern.js"></script>-->     <script src="../vendors/jquery-2.1.4.js"></script>      <script src="../vendors/scoped.js"></script>     <script src="../vendors/beta.js"></script>     <script src="../vendors/betajs-browser-noscoped.js"></script>     <script src="../vendors/betajs-ui.js"></script>     <script src="../vendors/betajs-dynamics-noscoped.js"></script>      <script src="components.js"></script>      <!--<script src="../vendors/betajs-simulator.js"></script>-->     <script src="../../betajs-simulator/dist/betajs-simulator.js"></script>     <link rel="stylesheet" href="../..//betajs-simulator/dist/betajs-simulator.css" />      <script src="../dist/betajs-dynamics-components-noscoped.js"></script>     <link rel="stylesheet" href="../dist/betajs-dynamics-components.css" />     <link rel="stylesheet" href="../vendors/icomoon/style.css" />      <script src="//localhost:1337/livereload.js"></script>      <title>BetaJS Simulator</title>      <script>      </script>  </head> <body>  <ba-simulator></ba-simulator>  </body> </html>';

Scoped.define("module:Overlaycontainer", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {
	return Dynamic.extend({scoped: scoped}, {
		
		template: Templates.overlaycontainer,
		
		attrs : {
            overlay : "",
            message : "This is a message",
            value : null,
            showoverlay : true
        }
	
	}).register();
});


/*
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Overlaycontainer", {

    template: BetaJS.Dynamics.Components.Templates.overlaycontainer,

    initial : {

        attrs : {
            overlay : "",
            message : "This is a message",
            value : null,
            showoverlay : true
        }

    }

}).register();

*/

BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Overlaycontainertest", {

    template: BetaJS.Dynamics.Components.Templates.overlaycontainertest,

    initial : {

        attrs : {
            showoverlay : false,
            overlay : "timepicker"
        }

    }

}).register();



BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Scrollpicker", {

    template: BetaJS.Dynamics.Components.Templates.scrollpicker,

    attrs : {
        initial_value : 22,
        value : 22,
        first : 0,
        last : 23,
        increment : 1,
        currentTop : false,
        value_array : []
    },

    create : function () {

        this.call('initialize_value_array');
        this.call('initialize_value');

    },

    functions : {

        initialize_value : function () {
            //var inc = this.get('increment');
            //var rounded_value = inc * Math.round(this.get('value')/inc);
            //var index = this.get('value_array').indexOf(rounded_value);
            //var displayed_value = index > -1 ? rounded_value : this.get('value_array')[0];
            //return parseInt(displayed_value, 10);
            this.set('value', this.get('initial_value'));
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

        var scroll = new BetaJS.UI.Interactions.LoopScroll(element, {
            enabled: true,
            currentTop: this.get('currentTop'),
            discrete: true,
            scrollEndTimeout: 200,
            currentCenter: true
        });

        window.test = scroll;
        var ele = $(element.find("[data-id='" + this.get('value') + "']"));
        scroll.scrollToElement(ele, {
            animate: false
        });
        ele.css({
            "color": "black",
            "background" : "white"
        });

        scroll.on("scrollend", function () {
            console.log(this);
            this.set('value', scroll.currentElement().data( "id" ));
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


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Swipecontainer", {

	template: BetaJS.Dynamics.Components.Templates.swipecontainer,

	attrs : {
		model : {
			value : "Swipeitem - Title"
		},
		lefticon : 'icon-ok',
		righticon : 'icon-time',
		inner : "clickitem",
		swipe_actions : {
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
		},
		swipe_gesture : {
			mouse_up_activate: false,
			wait_time: 250,
			wait_activate: false,
			disable_x: -1,
			disable_y: 10,
			enable_x: 10,
			enable_y: -1,
			interaction: "swipe"
		},
		swipe_interaction : {
			type : "drag",
			enabled : true,
			draggable_y: false,
			start_event: null,
			events : {
				"move" : function (doodad, event) {
					var element = event.element;
					var parent = element.parent();
					var x = parseInt(element.css("left"), 10);
					var w = parseInt(element.css("width"), 10);
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
				"release" : function (doodad, event) {
					var element = event.element;
					var x = parseInt(element.css("left"), 10);
					var w = parseInt(element.css("width"), 10);
					var actions = this.get('swipe_actions');
					for (var cls in actions) {
						a = actions[cls];
						if ((!a.less || x <= w * a.less) && (!a.greater || x >= w * a.greater)) {
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

BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Clickitem", {

    template: BetaJS.Dynamics.Components.Templates.clickitem,

    attrs: {
        model : {
            value : 'Clickitem - Value'
        }
    },

    functions : {
        click : function () {
            console.log("You Clicked item : " + this.properties().getProp('model.value'));
            console.log(this.cid());
            this.trigger('event', this.cid());
        }
    },

    create : function () {
        this.on("event", function (cid) {
            console.log('event from item: ' + cid);
        }, this);
    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Selectableitem", {

    template: BetaJS.Dynamics.Components.Templates.selectableitem,

    initial: {

        bind: {
            selected: "<+[tagname='ba-list']:selected_item"
        },

        scopes: {
            parent_list: "<+[tagname='ba-list']"
        }

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
            this.scopes.parent_list.set('selected_item',{
                cid : this.cid(),
                value : this.properties().getProp('model.value')
            });
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.List", {

    template: BetaJS.Dynamics.Components.Templates.list,

    attrs: {
        listitem : "clickitem",
        model : false
    },

    collections : {
        listcollection : [
            {value: "List - Item 1"},
            {value: "List - Item 2"},
            {value: "List - Item 3"}
        ]
    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_list_clickitem", {

    template: BetaJS.Dynamics.Components.Templates.test_list_clickitem,

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
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_list_listcollection", {

    template: BetaJS.Dynamics.Components.Templates.test_list_listcollection,

    collections : {
        listcollection : [
            {value: "Test - List - listollection - Item 1"},
            {value: "Test - List - listollection - Item 2"},
            {value: "Test - List - listollection - Item 3"},
            {value: "Test - List - listollection - Item 4"}
        ]
    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_list_listoflist", {

    template: BetaJS.Dynamics.Components.Templates.test_list_listoflist,

    collections : {
        listcollection : [
            {listcollection : new BetaJS.Collections.Collection({objects: [
                {value : "Test - list of list - Item 1"},
                {value : "Test - list of list - Item 2"}
            ]})},
            {listcollection : new BetaJS.Collections.Collection({objects: [
                {value : "Test - list of list - Item 1"},
                {value : "Test - list of list - Item 2"}
            ]})}
        ]
    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_list_pushfunc", {

    template: BetaJS.Dynamics.Components.Templates.test_list_pushfunc,

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
            listcollection : new BetaJS.Collections.Collection({objects: [
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


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_list_swipecontainer", {

    template: BetaJS.Dynamics.Components.Templates.test_list_swipecontainer,

    attrs: {
        model : {
            listcollection : new BetaJS.Collections.Collection({objects: [
                {value: "Item 1"},
                {value: "Item 2"},
                {value: "Item 3"},
                {value: "Item 4"},
                {value: "Item 5"}
            ]})
        },
        view_model : {
            listitem : 'swipecontainer',
            inner : 'selectableitem'
        }
    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Searchlist", {

    template: BetaJS.Dynamics.Components.Templates.searchlist,

    attrs: {
        searchvalue : "",
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
    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_searchlist", {

    template : BetaJS.Dynamics.Components.Templates.test_searchlist,

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


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_titledlist", {

    template : BetaJS.Dynamics.Components.Templates.test_titledlist,

    attrs : {
        view : {
            type : 'clickitem'
        },
        model : {
            titleitem : 'addtitle',
            title_model : {
                value : 'Titledlist - Testtitle'
            },
            title_callbacks : {
                addbutton : function () {
                    console.log('This comes from the Test Titledlist : ');
                    this.scope('<').call('additem', {value  : "Testtitledlist Item New"});
                },
                clicktitle : function () {
                    console.log('This comes from the Test Titledlist : ');
                    this.scope('<').call('togglelist');
                }
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


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_titledlist_swipe", {

    template : BetaJS.Dynamics.Components.Templates.test_titledlist_swipe,

    attrs : {
        push_attrs : {
            title_model : {
                value : 'Titledlist - Testtitle'
            },
            listitem: 'swipecontainer',
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


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Titledlist", {

    template: BetaJS.Dynamics.Components.Templates.titledlist,

    attrs: {
        model : {
            title_model : {
                value : 'Titledlist - Title'
            }
            //listcollection : new BetaJS.Collections.Collection({objects:[
            //    {value: "Titledlist - Item 1"},
            //    {value: "Titledlist - Item 2"},
            //    {value: "Titledlist - Item 3"}
            //]})
        },
        collapsed : false,
        collapsible : true,
        listitem : 'selectableitem',
        titleitem : 'title'
    },

    collections : {
        listcollection : [
            {value: "Titledlist - Item 1"},
            {value: "Titledlist - Item 2"},
            {value: "Titledlist - Item 3"}
        ]
    },

    functions : {

        togglelist : function () {

            if (this.get('collapsible'))
                this.set('collapsed', !this.get('collapsed'));

        },

        additem : function (item) {

            item = item ? item : {value : "Titledlist - New Item"};
            var index = this.get('listcollection').add(item);

            return this.get('listcollection').getByIndex(index).cid();

        },

        click_title : function () {
            console.log('You clicked the title');
            this.call('togglelist');
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Addtitle", {

    template: BetaJS.Dynamics.Components.Templates.addtitle,

    attrs: {
        model : {value: 'Title'}
    },

    functions : {

        clicktitle : function () {

            console.log("You clicked the Title, no clicktitle() given");

        },
        addbutton : function () {

            console.log("You clicked the addbuton, no addbutton() function given");

        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_addtitle", {

    template : BetaJS.Dynamics.Components.Templates.test_addtitle,

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


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Pushfunc", {

    template: BetaJS.Dynamics.Components.Templates.pushfunc,

    initial: {

        attrs : {
            model : {
                title :'Pushfunc'
            }
        },

        create : function () {
            window.iterateModel(this);
        },

        functions : {
            log : function () {
                console.log('Model');
                console.log(this.get('model'));
                console.log('Testfunc');
                console.log(this.get('model').testfunc);
                console.log('Testfunc Func');
                this.get('model').testfunc.func.call(this, "This is an argument");
            }
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_pushfunc", {

    template: BetaJS.Dynamics.Components.Templates.test_pushfunc,

    initial: {

        attrs: {
            testfunc : {func: function () {
                console.log('This is a testfunction');
            }},
            testmodel : {
                title : 'This is the Test',
                testfunc : {
                    func : function (argument) {
                        console.log('This is a testfunction');
                        console.log(argument);
                    },
                    args : "Hello"
                }
            }
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_attrs", {

    template : BetaJS.Dynamics.Components.Templates.test_attrs,

    attrs : {
        model : {
            titleitem : 'addtitle',
            titleitem_model : {
                title : 'Titledlist - TestAttrs',
                titlefunc : 'togglelist',
                addfunc : 'additem',
                addbuttonscope :'<<'
            },
            functions : {
                placeholder_func : function () {
                    console.log('This is a testfunction from the test_titledlist');
                }
            },
            model : {
                listitem : 'clickitem'
                //listitem : 'swipecontainer',
                //type : 'clickitem',
            },
            listcollection : new BetaJS.Collections.Collection({objects: [
                {title: "Test - Attrs Item 1"},
                {title: "Test - Attrs Item 2"},
                {title: "Test - Attrs Item 3"}
            ]})
        }
    },

    functions : {

        additem : function () {

            console.log('This comes from the Test Titledlist : ');
            console.log(this.scope('>').call('additem', {title  : "title"}));

        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Header", {

    template: BetaJS.Dynamics.Components.Templates.header,

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


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Toggle_menu", {

    template: BetaJS.Dynamics.Components.Templates.toggle_menu,

    functions : {
        toggle_menu : function () {
            this.scope("<+[tagname='ba-layout_web']").call('toggle_menu');
        }
    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Menu", {

    template: BetaJS.Dynamics.Components.Templates.menu,

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
                listcollection : new BetaJS.Collections.Collection({objects:[
                    {value : "Subitem 1"},
                    {value : "Subitem 2"}
                ]})
            },
            {value : 'Item 4'}
        ]
    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Layout_web", {

    template: BetaJS.Dynamics.Components.Templates.layout_web,

    attrs : {
        components : {
            header : "header",
            //header : null,
            menu : "menu",
            //menu : null,
            main : null
        },
        model : {
            header : 'Header',
            menu : 'Menu',
            main : 'Main',
            display_menu : true
        }
    },

    functions : {
        toggle_menu : function () {
            this.setProp('model.display_menu', !this.getProp('model.display_menu'));
        }
    }

}).register();

}).call(Scoped);