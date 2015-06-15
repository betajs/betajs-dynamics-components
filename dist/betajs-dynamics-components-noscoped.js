/*!
betajs-dynamics-components - v0.0.1 - 2015-06-15
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
		version: '4.1434398606510'
	};
});

BetaJS.Dynamics.Dynamic.Components = {};
BetaJS.Dynamics.Dynamic.Components.Templates = BetaJS.Dynamics.Dynamic.Components.Templates || {};
BetaJS.Dynamics.Dynamic.Components.Templates['overlaycontainer'] = '<overlaycontainer     ba-click="showoverlay = false"     ba-if="{{showoverlay}}">      <overlayinner>          <ba-{{overlay}}>             <message>This is an overlay</message>         </ba-{{overlay}}>      </overlayinner>  </overlaycontainer>';

BetaJS.Dynamics.Dynamic.Components.Templates['testoverlaycontainer'] = ' <button ba-click="showoverlay = !showoverlay">Show Overlaycontainer</button>  <ba-overlaycontainer         ba-overlay="{{=overlay}}"         ba-showoverlay="{{=showoverlay}}">          </ba-overlaycontainer>';

BetaJS.Dynamics.Dynamic.Components.Templates['generalsetting'] = '<item ba-tap="showwidget = !showwidget">          <icon class="{{type_icon}}"></icon>         <key>{{key_value}}</key>         <value>{{value_value}}</value>         <icon class="icon-chevron-right"></icon>  </item>  <ba-{{widget}} ba-if="{{showwidget}}"> </ba-{{widget}}>';

BetaJS.Dynamics.Dynamic.Components.Templates['titlesetting'] = ' <icon class="{{type_icon}}"></icon> <input         autofocus="true"         placeholder="{{placeholder}}"         value="{{=value_title}}"> <icon ba-if="{{dictation}}" class="icon-microphone"></icon>';

BetaJS.Dynamics.Dynamic.Components.Templates['scrollpicker'] = '<element ba-repeat-element="{{element_value :: value_array}}" data-id="{{element_value}}">         {{element_value}} </element>';

BetaJS.Dynamics.Dynamic.Components.Templates['template'] = '<div>     {{placeholder}} </div>';

BetaJS.Dynamics.Dynamic.Components.Templates['emailinput'] = ' <inputarea onkeydown="{{keydown(event)}}">      <button class="icon-user"></button>      <p>TO:</p>      <div ba-repeat-element="{{recipient :: recipients}}">          <div                 ba-class="{{{active : recipient.email == selected_recipient.email}}}"                 ba-tap="selected_recipient = recipient">             {{recipient.email}}&nbsp;         </div>      </div>      <div ba-tap="select(recipient)">          <input ba-keypress="showcontacts=true"                ba-click="selected=null"                value="{{=value}}"                id="recipient_input" autofocus>          <button ba-tap="showcontacts = !showcontacts">             <span ba-if="{{!showcontacts}}" class="icon-plus"></span>             <span ba-if="{{showcontacts}}" class="icon-minus"></span>         </button>      </div>  </inputarea>  <ba-itemlist type="contact"         ba-if="{{showcontacts}}"         search-query="searchQueryValue"> </ba-itemlist> ';

BetaJS.Dynamics.Dynamic.Components.Templates['list'] = ' <title ba-if="{{title}}">{{title}}</title>  <list ba-repeat="{{listitem :: listcollection}}">      <listitem             ba-class="{{{\'selected\' : listitem == currentitem}}}"             ba-click="select_item(listitem)">         {{listitem.name}}     </listitem>  </list>  ';

BetaJS.Dynamics.Dynamic.Components.Templates['testcomponent'] = ' <h4>This is a Testcomponent</h4>  <br>  <div>     {{placeholder}} </div>';

BetaJS.Dynamics.Dynamic.Components.Templates['datepicker'] = '<numbers>  </numbers> ';

BetaJS.Dynamics.Dynamic.Components.Templates['daypicker'] = '<div>Today</div> <div>Tomorrow</div> <div>Weekend</div> <div>Next Week</div> <div>Someday</div> <div>Pick Date</div>';

BetaJS.Dynamics.Dynamic.Components.Templates['numberscrollpicker'] = '<number ba-repeat-element="{{number :: numbers}}" data-number="{{number}}">         {{number}} </number>';

BetaJS.Dynamics.Dynamic.Components.Templates['timepicker'] = ' <time>      <ba-numberscrollpicker             ba-currentTop="{{false}}"             ba-value="{{=valueHour}}">     </ba-numberscrollpicker>      <ba-numberscrollpicker             ba-currentTop="{{false}}"             ba-value="{{=valueMinute}}"             ba-increment="{{5}}"             ba-last="{{55}}">     </ba-numberscrollpicker>  </time>  <divider>      <div>Time</div>      <div>Date</div>  </divider>  <date>      <ba-datepicker>     </ba-datepicker>  </date> ';

BetaJS.Dynamics.Dynamic.Components.Templates['itemlist'] = ' <div ba-repeat="{{collectionitem :: listcollection}}">     <div>     <ba-{{itemtype}} ba-data="{{collectionitem}}">         {{collectionitem.title}}     </ba-{{itemtype}}>      </div> </div>';

BetaJS.Dynamics.Dynamic.Components.Templates['selectable'] = ' <selectable_item         ba-class="{{{highlight_selected : highlight_element}}}"         ba-click="select(data)">     {{data.title}} </selectable_item>';

BetaJS.Dynamics.Dynamic.Components.Templates['components'] = '<ba-list         ba-title="Components"         ba-currentitem="{{=current_component}}"         ba-listcollection="{{components}}"></ba-list> ';

BetaJS.Dynamics.Dynamic.Components.Templates['controls'] = ' <h4>Controls </h4>  <controls>      <ba-layout></ba-layout>      <ba-components></ba-components>  </controls>';

BetaJS.Dynamics.Dynamic.Components.Templates['layout'] = ' <ba-list         ba-title="System"         ba-currentitem="{{=current_system}}"         ba-listcollection="{{systems}}"></ba-list>  <ba-list ba-title="Device"          ba-currentitem="{{=current_device}}"          ba-listcollection="{{current_system.devices}}"></ba-list> ';

BetaJS.Dynamics.Dynamic.Components.Templates['environment'] = ' <ba-controls></ba-controls>  <ba-simulator></ba-simulator> ';

BetaJS.Dynamics.Dynamic.Components.Templates['simulator'] = '  <appframe         class="             {{current_system.name}}             {{current_device.name}}         ">      <ba-{{current_component.name}}></ba-{{current_component.name}}>  </appframe> ';

BetaJS.Dynamics.Dynamic.Components.Templates['index'] = '<!DOCTYPE html> <html> <head lang="en">     <meta charset="UTF-8">      <!--<script src="../../vendors/jquery-1.9.closure-extern.js"></script>-->     <script src="../../vendors/jquery-2.1.4.js"></script>     <script src="../../vendors/scoped.js"></script>     <script src="../../vendors/beta.js"></script>     <script src="../../vendors/betajs-ui.js"></script>     <script src="../../vendors/beta-browser-noscoped.js"></script>     <script src="../../vendors/betajs-dynamics-noscoped.js"></script>      <link rel="stylesheet" href="../../vendors/icomoon/style.css" />      <link rel="stylesheet" href="../../dist/betajs-dynamics-components.css" />     <script src="../../dist/betajs-dynamics-components.js"></script>      <script src="//localhost:1337/livereload.js"></script>      <title></title>  </head> <body>      <ba-environment></ba-environment>      <script src="config/config.js"></script>     <script src="config/router.js"></script>  </body> </html>';


window.components = new BetaJS.Collections.Collection({objects: [
    {name:'aa_template'},
    {name:'testoverlaycontainer'},
    {name:'titlesetting'},
    {name:'generalsetting'},
    {name:'numberscrollpicker'},
    {name:'scrollpicker'},
    {name:'timepicker'},
    {name:'emailinput'}
]});

window.componentsByName = function (name) {
    var comp = window.components;
    for (var i = 0; i < comp.count(); ++i)
        if (comp.getByIndex(i).get("name") == name)
            return comp.getByIndex(i);
    return null;
};

BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Overlaycontainer", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.overlaycontainer,

    initial : {

        attrs : {
            overlay : "",
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
            key_value : "Duration",
            type_icon : "icon-time",
            value_value : "Value",
            showwidget : false,
            widget : "emailinput"
        },

        create : function () {

        },

        functions : {
            on_click : function () {
                console.log('You clicked the ' + this.get('key_value') + ' Settings');
            }
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


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Scrollpicker", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.scrollpicker,

    initial : {

        attrs : {
            value : 5,
            first : 0,
            last : 23,
            increment : 1,
            currentTop : true,
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
                for (var i = last ; i > first ; i -= inc) {
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


//app.directive('diEmailinput', function() {
//	return {
//		restrict : 'E',
//		replace : true,
//        templateUrl : App.Paths.asset("{pages-directives}/doodadcontainer/inputs/email_input/template.html"),
//        controller: function($scope) {
//            $scope.searchQueryValue = {
//                value: ""
//            };
//            $scope.items = [{
//                name: "Oliver Friedmann", email: "Oliver.Friedmann@gmail.com"},{
//                name: "Victor Lingenthal", email: "Victor.Lingenthal@gmail.com"
//            }];
//            var findIndexByKeyValue = function(obj, key, value) {
//                for (var i = 0; i < obj.length; i++) {
//                    if (obj[i][key] == value) {
//                        return i;
//                    }
//                }
//                return null;
//            };
//            this.add = function (email) {
//                $scope.add(email);
//            };
//            $scope.add = function(email) {
//                if (email != undefined && BetaJS.Strings.is_email_address(email)) {
//                    if (findIndexByKeyValue($scope.items, "email", email) == null) {
//                        $scope.items.push({name: null, email: email});
//                        $scope.to = "";
//                    }
//                    else $scope.to = "";
//                }
//            };
//            $scope.globalKeypress = function(key) {
//                if (key == 32 || key == 13) {
//                    $scope.add($scope.to);
//                } else if (key != 8) {
//                    $scope.selected = null;
//                } else if ($scope.selected && key == 8) {
//                    var index = findIndexByKeyValue($scope.items, "email", $scope.selected);
//                    console.log(index);
//                    $scope.items.splice(index, 1);
//                    $scope.selected = null;
//                    $("#emails").focus();
//                } else if (key == 8 && !($scope.searchQueryValue.value) && $("#emails").is(":focus")) {
//                    var lastitem = $scope.items[$scope.items.length-1];
//                    $scope.setMaster(lastitem.email);
//                }
//            };
//            $scope.isSelected = function(email) {
//                return $scope.selected === email;
//            };
//        },
//		link : function(scope, elem, attrs) {
//            scope.setMaster = function (email) {
//                scope.selected = email;
//            };
//		}
//	};
//});
//
//app.directive('onKeyupFn', function() {
//    return function(scope, elm, attrs) {
//        var keyupFn = scope.$eval(attrs.onKeyupFn);
//        $("body").bind('keyup', function(evt) {
//            scope.$apply(function() {
//                keyupFn.call(scope, evt.which);
//            });
//        });
//    };
//});


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.List", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.list,

    initial: {

        attrs : {
            title: null
        },

        collections : {
            listcollection : [
                {
                    name:'Item 1'
                },{
                    name:'Item 2'
                }
            ]
        },

        create : function () {

            console.log( this.get('title') + ' List Loaded');

            if (!this.get("currentitem")) {
                console.log(this.get('listcollection'));
                this.set('currentitem', this.get('listcollection').getByIndex(0));
            }

            this.on("change:listcollection", function () {
                this.set('currentitem', this.get('listcollection').getByIndex(0));
            }, this);
        },

        functions : {
            select_item : function (system) {
                if (system != this.get('currentitem'))
                    this.set('currentitem',system);
            }
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Testcomponent", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.testcomponent,

    initial: {

        attrs: {
            placeholder: 'This is the Testcomponent template'
        },

        create : function () {
            console.log('Testcomponent Loaded');
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Datepicker", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.datepicker

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Daypicker", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.daypicker

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Numberscrollpicker", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.numberscrollpicker,

    initial : {

        attrs : {
            value : 5,
            first : 0,
            last : 23,
            increment : 1,
            currentTop : false,
            numbers : []
        },

        create : function () {

            console.log('Create Numberscrollpicker');

            this.call('initializer_numbers');

            this.compute("displayed_value", function () {
                var inc = this.get('increment');
                var rounded_value = inc * Math.round(this.get('value')/inc);
                var index = this.get('numbers').indexOf(rounded_value);
                var displayed_value = index > -1 ? rounded_value : this.get('numbers')[0];
                return parseInt(displayed_value, 10);
            }, ["value", "increment"]);

        },

        functions : {

            initializer_numbers : function () {

                var first = this.get('first');
                var last = this.get('last');
                var inc = this.get('increment');

                var numbers  = [];
                for (var i = last ; i > first ; i -= inc) {
                    numbers.push(i);
                }
                this.set('numbers',numbers);

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
        var ele = $(element.find("[data-number='" + this.get('displayed_value') + "']"));
        scroll.scrollToElement(ele, {
            animate: false
        });
        ele.css({
            "color": "black",
            "background" : "white"
        });

        scroll.on("scrolltoend", function () {
            this.set('value', scroll.currentElement().data( "number" ));
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


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Timepicker", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.timepicker,

    initial : {

        attrs: {
            valueHour : BetaJS.Time.decodeTime(BetaJS.Time.now(),true).hour,
            valueMinute : BetaJS.Time.decodeTime(BetaJS.Time.now(),true).minute
        },

        create : function () {

            this.on("change:valueMinute",function () {
                console.log('Minute was changed to : ' + this.get('valueMinute'));
            });

        }
    }

}).register();



BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.List2", {

    templateUrl: "component/%.html",

    initial: {

        attrs: {
            itemtype : "basicitem"
        },

        collections : {
            listcollection : [
                {title: "Item 1"}, {title: "Item 2"},{title:  "Item 3"}]
        },

        create : function () {


        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Selectable", {

    templateUrl: "component/subcomponents/%/%.html",

    initial: {

        attrs: {
            data: {
                title :'Data Placeholder',
                highlight_element : false
            }
        },

        create : function () {


        },

        functions : {
            select : function (data) {
                this.set('highlight_element',!this.get('highlight_element'));
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
                    name:'mobile',
                    devices: new BetaJS.Collections.Collection({objects: [
                        {name: 'iphone4'},
                        {name: 'iphone5'}
                    ]})
                },{
                    name:'web',
                    devices: new BetaJS.Collections.Collection({objects: [
                        {name: 'notebook'}
                    ]})
                }
            ]
        },

        create : function () {
            console.log('Layout Selector Loaded');

            this.set('current_system', this.get('systems').getByIndex(0));
            this.set('current_device', this.get('current_system').get('devices').getByIndex(0));
        },

        functions : {

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