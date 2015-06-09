/*!
betajs-dynamics-components - v0.0.1 - 2015-06-09
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
		version: '1.1433871544540'
	};
});


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Template", {

    templateUrl: "component/%.html",

 //   template: BetaJS.Dynamics.Components.Templates["Template"]


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

    templateUrl: "component/%.html",

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



BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Emailinput", {

    templateUrl: "../components/%/%/%.html",

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

    templateUrl: "../components/%/%.html",

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

            if (!this.get("currentitem"))
                this.set('currentitem', this.get('listcollection').getByIndex(0));

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


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Testcomponent", {

    templateUrl: "../components/%/%.html",


    initial: {

        attrs: {
            placeholder: 'This is the Testcomponent template'
        },

        create : function () {
            console.log('Testcomponent Loaded');
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Controls", {

    templateUrl: "environment/%/%.html",


    initial: {

        collections : {
            components : [
                {name:'testcomponent'},
                {name:'emailinput'},
                {name:'list'}
            ]
        },

        create : function () {
            console.log('Controls Loaded');

            this.set('current_component', this.get('components').getByIndex(0));

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
            current_component: "<>+[tagname='ba-controls']:current_component",
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