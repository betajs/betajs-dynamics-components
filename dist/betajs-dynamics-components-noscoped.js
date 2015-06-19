/*!
betajs-dynamics-components - v0.0.1 - 2015-06-19
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
		version: '11.1434742117931'
	};
});

BetaJS.Dynamics.Dynamic.Components = {};
BetaJS.Dynamics.Dynamic.Components.Templates = BetaJS.Dynamics.Dynamic.Components.Templates || {};
BetaJS.Dynamics.Dynamic.Components.Templates['scrollpicker'] = '<element ba-repeat-element="{{element_value :: value_array}}" data-id="{{element_value}}">         {{element_value}} </element>';

BetaJS.Dynamics.Dynamic.Components.Templates['overlaycontainer'] = '<overlaycontainer     ba-click="showoverlay = false"     ba-if="{{showoverlay}}">      <overlayinner>          <ba-{{overlay}} ba-value=\'{{=value}}\'>             <message>This is an overlay</message>         </ba-{{overlay}}>      </overlayinner>  </overlaycontainer>';

BetaJS.Dynamics.Dynamic.Components.Templates['testoverlaycontainer'] = ' <button ba-click="showoverlay = !showoverlay">Show Overlaycontainer</button>  <ba-overlaycontainer         ba-overlay="{{=overlay}}"         ba-showoverlay="{{=showoverlay}}">          </ba-overlaycontainer>';

BetaJS.Dynamics.Dynamic.Components.Templates['generalsetting'] = '<item ba-tap="showwidget = !showwidget">          <icon class="{{type_icon}}"></icon>         <key>{{key_value}}</key>         <value>{{displayed_value}}</value>         <icon class="icon-chevron-right"></icon>  </item>  <ba-{{widget}}         ba-if="{{showwidget && !overlay}}"         ba-value="{{=value}}"> </ba-{{widget}}>  <ba-overlaycontainer         ba-if="{{showwidget && overlay}}"         ba-value="{{=value}}"         ba-showoverlay="{{=showwidget}}"         ba-overlay="{{overlay}}"> </ba-overlaycontainer>';

BetaJS.Dynamics.Dynamic.Components.Templates['timesetting'] = ' <ba-generalsetting         ba-key_value="{{key_value}}"         ba-value="{{=value}}"         ba-displayed_value="{{displayed_value}}"         ba-overlay="timepicker">  </ba-generalsetting> ';

BetaJS.Dynamics.Dynamic.Components.Templates['titlesetting'] = ' <icon class="{{type_icon}}"></icon> <input         autofocus="true"         placeholder="{{placeholder}}"         value="{{=value_title}}"> <icon ba-if="{{dictation}}" class="icon-microphone"></icon>';

BetaJS.Dynamics.Dynamic.Components.Templates['emailinput'] = ' <inputarea onkeydown="{{keydown(event)}}">      <button class="icon-user"></button>      <p>TO:</p>      <div ba-repeat-element="{{recipient :: recipients}}">          <div                 ba-class="{{{active : recipient.email == selected_recipient.email}}}"                 ba-tap="selected_recipient = recipient">             {{recipient.email}}&nbsp;         </div>      </div>      <div ba-tap="select(recipient)">          <input ba-keypress="showcontacts=true"                ba-click="selected=null"                value="{{=value}}"                id="recipient_input" autofocus>          <button ba-tap="showcontacts = !showcontacts">             <span ba-if="{{!showcontacts}}" class="icon-plus"></span>             <span ba-if="{{showcontacts}}" class="icon-minus"></span>         </button>      </div>  </inputarea>  <ba-itemlist type="contact"         ba-if="{{showcontacts}}"         search-query="searchQueryValue"> </ba-itemlist> ';

BetaJS.Dynamics.Dynamic.Components.Templates['daypicker'] = '<div>Today</div> <div>Tomorrow</div> <div>Weekend</div> <div>Next Week</div> <div>Someday</div> <div>Pick Date</div>';

BetaJS.Dynamics.Dynamic.Components.Templates['timepicker'] = ' <time>      <ba-scrollpicker             ba-currentTop="{{false}}"             ba-value="{{=timevalue.hour}}">     </ba-scrollpicker>      <ba-scrollpicker             ba-currentTop="{{false}}"             ba-value="{{=timevalue.minute}}"             ba-increment="{{5}}"             ba-last="{{55}}">     </ba-scrollpicker>  </time>  <timepicker-divider>      <div>Time</div>      <div>Date</div>  </timepicker-divider>  <date>      <ba-datepicker>     </ba-datepicker>  </date> ';

BetaJS.Dynamics.Dynamic.Components.Templates['tasklist'] = ' <ba-list         ba-listcollection="{{outer_collection}}"         ba-listitem="titledlist">  </ba-list>';

BetaJS.Dynamics.Dynamic.Components.Templates['swipeitem'] = ' <behind>     <icon class=\'{{lefticon}}\'></icon>     <div></div>     <icon class=\'{{righticon}}\'></icon> </behind>  <swipe>      <ba-{{type}}         class=\'{{itemclass}}\'         ba-model=\'{{model}}\'>         {{title}}     </ba-{{type}}>      <swipeleft>         <div></div>         <icon class=\'{{lefticon}}\'></icon>     </swipeleft>      <swiperight>         <icon class=\'{{righticon}}\'></icon>         <div></div>     </swiperight>  </swipe> ';

BetaJS.Dynamics.Dynamic.Components.Templates['clickitem'] = ' <clickitem         ba-click="click(model)">     {{model.title}} </clickitem>';

BetaJS.Dynamics.Dynamic.Components.Templates['contactitem'] = '<div ba-tap="addEmail(doodad)">      <iconbox>         <icon>             {{doodad.symbol}}         </icon>     </iconbox>      <contactmain>          <contactname>             {{doodad.name}}         </contactname>          <contactemail>             {{doodad.email}}         </contactemail>      </contactmain>  </div>';

BetaJS.Dynamics.Dynamic.Components.Templates['emailitem'] = ' <email-status class="icon-circle show-{{doodad.read}}"></email-status>  <email-main>     <email-topline>         <from>{{sender_salutatory_display}} to {{recipient_salutatory_display}}</from>         <time>{{time}}</time>     </email-topline>     <email-bottom>         <email-content>             <subject>                 {{subject}}             </subject>             <firstline>{{preview}}</firstline>         </email-content>         <star class="icon-star"></star>     </email-bottom> </email-main>';

BetaJS.Dynamics.Dynamic.Components.Templates['eventitem'] = '<time ba-tap-href="#">     <start>         {{two_digits(doodad.start_date_decoded.hour)}}:{{two_digits(doodad.start_date_decoded.minute)}}     </start>     <duration>         {{doodad.duration}}h     </duration> </time>  <title>     {{doodad.preview}} </title>  <span class="icon-star-empty" ba-tap-href="#"></span>';

BetaJS.Dynamics.Dynamic.Components.Templates['noteitem'] = '<noteitem>     {{doodad.preview}}     <!--{{type}}--> </noteitem> ';

BetaJS.Dynamics.Dynamic.Components.Templates['taskitem'] = '<div>     {{title}} </div>';

BetaJS.Dynamics.Dynamic.Components.Templates['selectableitem'] = ' <selectableitem         ba-class="{{{selected : selected == model}}}"         ba-click="select(model)">     {{model.title}} </selectableitem>';

BetaJS.Dynamics.Dynamic.Components.Templates['list'] = ' <list ba-repeat="{{collectionitem :: listcollection}}">      <ba-{{listitem}}         ba-model="{{collectionitem}}">         {{collectionitem.title}}     </ba-{{listitem}}>  </list>';

BetaJS.Dynamics.Dynamic.Components.Templates['searchlist'] = '<searchbox>     <icon class="icon-search"></icon>     <input placeholder="{{placeholder}}" value="{{=searchvalue}}"> </searchbox> <ba-list         ba-listitem="{{listitem}}"         ba-listollection="{{listcollection}}">  </ba-list>';

BetaJS.Dynamics.Dynamic.Components.Templates['titledlist'] = '<title ba-click="collapsed = !collapsed">{{title}}</title>  <listrepeat ba-if="{{!collapsed && collapsible}}" ba-repeat="{{collectionitem :: listcollection}}">      <ba-{{type}} ba-model="{{collectionitem}}">         {{collectionitem.title}}     </ba-{{type}}>  </listrepeat>';

BetaJS.Dynamics.Dynamic.Components.Templates['template'] = '<div>     {{placeholder}} </div>';

BetaJS.Dynamics.Dynamic.Components.Templates['components'] = '<ba-titledlist         ba-title="Components"         ba-selected_item="{{=current_component}}"         ba-listcollection="{{components}}"></ba-titledlist> ';

BetaJS.Dynamics.Dynamic.Components.Templates['controls'] = ' <h4>Controls </h4>  <controls>      <ba-layout></ba-layout>      <ba-components></ba-components>  </controls>';

BetaJS.Dynamics.Dynamic.Components.Templates['layout'] = ' <ba-titledlist         ba-title="System"         ba-selected_item="{{=current_system}}"         ba-listcollection="{{systems}}"></ba-titledlist>  <ba-titledlist ba-title="Device"          ba-selected_item="{{=current_device}}"          ba-listcollection="{{current_system.devices}}"></ba-titledlist> ';

BetaJS.Dynamics.Dynamic.Components.Templates['environment'] = ' <ba-controls></ba-controls>  <ba-simulator></ba-simulator> ';

BetaJS.Dynamics.Dynamic.Components.Templates['simulator'] = '  <appframe         class="             {{current_system.title}}             {{current_device.title}}         ">      <ba-{{current_component.title}}></ba-{{current_component.title}}>  </appframe> ';

BetaJS.Dynamics.Dynamic.Components.Templates['index'] = '<!DOCTYPE html> <html> <head lang="en">     <meta charset="UTF-8">      <!--<script src="../../vendors/jquery-1.9.closure-extern.js"></script>-->     <script src="../../vendors/jquery-2.1.4.js"></script>     <script src="../../vendors/scoped.js"></script>     <script src="../../vendors/beta.js"></script>     <script src="../../vendors/beta-browser-noscoped.js"></script>     <script src="../../vendors/betajs-ui.js"></script>     <script src="../../vendors/betajs-dynamics-noscoped.js"></script>      <link rel="stylesheet" href="../../vendors/icomoon/style.css" />      <link rel="stylesheet" href="../../dist/betajs-dynamics-components.css" />     <script src="../../dist/betajs-dynamics-components.js"></script>      <script src="//localhost:1337/livereload.js"></script>      <title></title>  </head> <body>      <ba-environment></ba-environment>      <script src="config/config.js"></script>     <script src="config/router.js"></script>  </body> </html>';


window.components = new BetaJS.Collections.Collection({objects: [
    {title:'searchlist'},
    {title:'tasklist'},
    {title:'aa_template'},
    {title:'emailitem'},
    {title:'clickitem'},
    {title:'swipeitem'},
    {title:'list'},
    {title:'titledlist'},
    {title:'simplelist'},
    {title:'timesetting'},
    {title:'generalsetting'},
    {title:'scrollpicker'},
    {title:'timepicker'},
]});

window.componentsBytitle = function (title) {
    var comp = window.components;
    for (var i = 0; i < comp.count(); ++i)
        if (comp.getByIndex(i).get("title") == title)
            return comp.getByIndex(i);
    return null;
};


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Selectableitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.selectableitem,

    initial: {

        bind : {
            selected : "<:selected_item",
            parentlistcollection : "<:listcollection"
        },

        attrs: {
            //selected: false,
            value: {
                name :'Data Placeholder',
                selected : false
            }
        },

        create : function () {

            console.log("Selected Item : !!! :");
            console.log(this.parent());
            console.log(this.parent().get('selected_item'));
            console.log(this.get('selected'));

            var index = this.get('parentlistcollection').getIndex(this.get('value'));
            if (index == 0 && !this.parent().get('selected_item'))
                this.parent().set('selected_item',this.get('value'));

            console.log("Index : " + index);
            console.log(this.get('value'));

        },

        functions : {
            select : function (data) {
                this.parent().set('selected_item',this.get('value'));
                console.log('Set new');
                console.log(this.get('value'));
                console.log(this.parent().get('selected_item'));
                console.log(this.get('selected'));
                //this.set('selected',!this.get('selected'));
            }
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


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Overlaycontainer", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.overlaycontainer,

    initial : {

        attrs : {
            overlay : "",
            value : null,
            showoverlay : true
        }

    }

}).register();



BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Testoverlaycontainer", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.testoverlaycontainer,

    initial : {

        attrs : {
            showoverlay : false,
            overlay : "timepicker"
        }

    }

}).register();



BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Generalsetting", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.generalsetting,

    initial : {

        attrs : {
            value : null,
            key_value : "Duration",
            type_icon : "icon-time",
            displayed_value : "Value",

            showwidget : false,
            widget : "emailinput",
            overlay : null
        },

        create : function () {


            this.set('')

        },

        functions : {

        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Timesetting", {

    template : BetaJS.Dynamics.Dynamic.Components.Templates.timesetting,

    initial : {

        attrs : {
            value : 1434418496419,
            displayed_value : null,
            key_value: 'Time'
        },

        create : function () {

            this.compute('displayed_value', function() {

                var time = BetaJS.Time.decodeTime(this.get('value'));

                var r = function (n) {return ("0" + n).slice(-2);}

                return r(time.hour) + ":" + r(time.minute);

            }, ['value']);

        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Titlesetting", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.titlesetting,

    initial : {

        attrs : {
            value_title : "",
            type_icon : "icon-ok-circle",
            placeholder: "New Title",
            dictation: true
        },

        create : function () {

        },

        functions : {

        }
    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Emailinput", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.emailinput,

    initial : {

        attrs : {
            selected_recipient : null,
            showcontacts : false
        },

        collections : {
            recipients : [
                {name: "Oliver Friedmann", email: "Oliver.Friedmann@gmail.com"},
                {name: "Victor Lingenthal", email: "Victor.Lingenthal@gmail.com"}
            ]
        },

        create : function () {
            this.get("recipients").add_secondary_index("email");

        },

        functions : {
            select: function () {},
            add_recipient : function (email) {
                if (email != undefined && BetaJS.Strings.is_email_address(email)) {
                    this.get("recipients").add({name: null, email: email});
                    this.set('value','');
                } else
                    App.Dynamics.notifications.call('error', {message: 'This is not a valid Email'});
            },
            keydown : function (event) {
                var key = event[0].keyCode;
                if (key == 32 || key == 13) {
                    this.call('add_recipient',this.get('value'));
                } else if (key != 8) {
                    this.set('selected_recipient', null);
                } else if (this.get('selected_recipient') && (key == 8 || key == 68)) {
                    this.get("recipients").remove(this.get('selected_recipient'));
                    this.set('selected_recipient', null);
                    $("#recipient_input").focus();
                } else if (key == 8 && !this.get('value') && $("#recipient_input").is(":focus")) {
                    var r = this.get('recipients');
                    var last_recipient = r.getByIndex(r.count() - 1);
                    this.set('selected_recipient', last_recipient);
                }
            }
        }

    }

}).register();

BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Daypicker", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.daypicker

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Timepicker", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.timepicker,

    initial : {

        attrs: {
            value : 0,
            timevalue : {
                hour : 0,
                minute : 0
            }
        },

        create : function () {

            if (!this.get('value'))
                this.set('timevalue',{
                    hour : BetaJS.Time.decodeTime(BetaJS.Time.now(),true).hour,
                    minute : BetaJS.Time.decodeTime(BetaJS.Time.now(),true).minute
                });

            this.on("change:timevalue.minute",function () {
                var newvalue = BetaJS.Time.updateTime(this.get('value'),{
                    minute : this.get('timevalue.minute')
                });
                this.set('value',newvalue);
            });

            this.on("change:timevalue.hour",function () {
                var newvalue = BetaJS.Time.updateTime(this.get('value'),{
                    hour : this.get('timevalue.hour')
                });
                this.set('value',newvalue);
            });
        }
    }

}).register();



BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Tasklist", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.tasklist,

    initial: {

        attrs: {
            listitem : "swipeitem"
        },

        collections : {
            outer_collection : [
                {
                    title : "Group - 1",
                    collapsed : false,
                    type : "swipeitem",
                    listcollection : new BetaJS.Collections.Collection({objects: [
                        {
                            type : "clickitem",
                            title : "Name 1"
                        },
                        {
                            type : "clickitem",
                            title : "Name 2"
                        }
                    ]})
                },
                {
                    title: "Group - 2",
                    collapsed : true,
                    type : "swipeitem",
                    listcollection : new BetaJS.Collections.Collection({objects: [
                        {
                            type : "clickitem",
                            title : "Name 1"
                        },
                        {
                            type : "clickitem",
                            title : "Name 2"
                        }
                    ]})
                }
            ]
        },

        create : function () {
            //var outer_n = 10;
            //var inner_n = 10;
            //var outer_collection = new BetaJS.Collections.Collection();
            //for (var outer_index = 0; outer_index < outer_n; ++outer_index) {
            //    var outer_properties = new BetaJS.Properties.Properties();
            //    outer_collection.add(outer_properties);
            //    outer_properties.set("title", "Group " + outer_index);
            //    var inner_collection = new BetaJS.Collections.Collection();
            //    outer_properties.set("listcollection", inner_collection);
            //    for (var inner_index = 0; inner_index < inner_n; ++inner_index) {
            //        var inner_properties = new BetaJS.Properties.Properties();
            //        inner_collection.add(inner_properties);
            //        inner_properties.set("title", "Item " + outer_index + ", " + inner_index);
            //    }
            //}
            //this.set("outer_collection", outer_collection);
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Swipeitem", {

	template: BetaJS.Dynamics.Dynamic.Components.Templates.swipeitem,

	initial: {

		attrs : {
			type : "emailitem",
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

			if (this.get("model")) {
				BetaJS.Objs.iter(this.get("model").data(), function (modelValue, attrKey) {
					var attrValue = this.isArgumentAttr(attrKey) ? this.get(attrKey) : modelValue;
					this.set(attrKey, attrValue);
					this.get("model").set(attrKey, attrValue);
					this.properties().bind(attrKey, this.get("model"));
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

        },

        functions : {
            click : function () {
                console.log("Route to ...")
            }
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Contactitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.contactitem

}).register();

//
//app.directive('diContactitem', function () {
//    return {
//        restrict : 'E',
//        templateUrl : App.Paths.asset("{pages-directives}/list/multilist/listitems/items/contactitem/template.html"),
//        replace : true,
//        scope : false,
//        link : function(scope,element) {
//            scope.addEmail = function(doodad) {
////                if (emailinputCtrl)
////                    emailinputCtrl.add(doodad.email);
////                else
//                 console.log("add email");
//            };
//
//            // what should happen when we drop onto an item? for now, we simply replace it's number with the original one as an example
//            var drop = new BetaJS.UI.Interactions.Drop(element, {
//                enabled: true,
//                droppable: function () {
//                    return true;
//                },
//                bounding_box: function (bb) {
//                    var height = bb.bottom - bb.top + 1;
//                    var margin = Math.floor(height * 0.2);
//                    bb.top += margin;
//                    bb.bottom -= margin;
//                    return bb;
//                }
//            });
//            drop.on("hover", function (dr) {
//                dr.modifier.css("background-color", "green");
//            });
//            drop.on("hover-invalid", function (dr) {
//                dr.modifier.css("background-color", "gray");
//            });
//            drop.on("dropped", function (event) {
//                console.log("Dropped Data: " + JSON.stringify(event.source.data));
//                scope.number = event.source.data.number;
//                scope.$digest();
//            });
//        }
//    };
//});

BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Emailitem", {

    template : BetaJS.Dynamics.Dynamic.Components.Templates.emailitem,

    initial : {
        attrs : {
            sender_salutatory_display : "Sender",
            recipient_salutatory_display : "Recipient",
            subject : "Subject",
            preview : "First Line...",
            time : "18:30"
        }
    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Eventitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.eventitem

}).register("ba-eventitem");

//app.directive('diEventitem', function () {
//    return {
//        restrict: 'E',
//        templateUrl: App.Paths.asset("{pages-directives}/list/multilist/listitems/items/eventitem/template.html"),
//        replace: true,
//        scope: false,
//
//        link: function($scope,element) {
//
//            // TODO: what should happen when we drop onto an item? for now, we simply replace it's number with the original one as an example
//            var drop = new BetaJS.UI.Interactions.Drop(element, {
//                enabled: true,
//                droppable: function () {
//                    return true;
//                },
//                bounding_box: function (bb) {
//                    var height = bb.bottom - bb.top + 1;
//                    var margin = Math.floor(height * 0.2);
//                    bb.top += margin;
//                    bb.bottom -= margin;
//                    return bb;
//                }
//            });
//            drop.on("hover", function (dr) {
//                dr.modifier.css("background-color", "green");
//            });
//            drop.on("hover-invalid", function (dr) {
//                dr.modifier.css("background-color", "gray");
//            });
//            drop.on("dropped", function (event) {
//                console.log("Dropped Data: " + JSON.stringify(event.source.data));
//                $scope.number = event.source.data.number;
//                $scope.$digest();
//            });
//        }
//    };
//});

BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Noteitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.noteitem,

    initial : {

        create : function () {}

    }

}).register();

//app.directive('diNoteitem', function () {
//    return {
//        restrict: 'E',
//        templateUrl: App.Paths.asset("{pages-directives}/list/multilist/listitems/items/noteitem/template.html"),
//        replace: true,
//        scope: false,
//        link: function(scope,element) {
//            // what should happen when we drop onto an item? for now, we simply replace it's number with the original one as an example
//            var drop = new BetaJS.UI.Interactions.Drop(element, {
//                enabled: true,
//                droppable: function () {
//                    return true;
//                },
//                bounding_box: function (bb) {
//                    var height = bb.bottom - bb.top + 1;
//                    var margin = Math.floor(height * 0.2);
//                    bb.top += margin;
//                    bb.bottom -= margin;
//                    return bb;
//                }
//            });
//            drop.on("hover", function (dr) {
//                dr.modifier.css("background-color", "green");
//            });
//            drop.on("hover-invalid", function (dr) {
//                dr.modifier.css("background-color", "gray");
//            });
//            drop.on("dropped", function (event) {
//                console.log("Dropped Data: " + JSON.stringify(event.source.data));
//                scope.number = event.source.data.number;
//                scope.$digest();
//            });
//        }
//    };
//});

BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Taskitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.taskitem,

    initial : {

        attrs : {
            title : "Task"
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

        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Searchlist", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.searchlist,

    initial: {

        attrs: {
            placeholder : "Search for",
            searchvalue : "",
            listitem : "emailitem"
        },

        collections : {
            listcollection : [
                {title: "Item 1"},
                {title: "Item 2"},
                {title: "Item 3"}
            ]
        },

        create : function () {

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


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Aa_template", {

    templateUrl: "../components/unsorted/aa_template/template.html",

    initial: {

        attrs: {
            placeholder: 'This is a demo template'
        },

        create : function () {
            console.log('Dynamic Loaded');
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

            this.set('current_component', appstate.get("component_type") ? componentsByName(appstate.get("component_type")) : this.get('components').getByIndex(0));
            appstate.on("change:component_type", function (component_type) {
                this.set('current_component', componentsByName(component_type));
            }, this);

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