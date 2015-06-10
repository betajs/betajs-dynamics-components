/*!
betajs-dynamics-components - v0.0.1 - 2015-06-09
Copyright (c) Oliver Friedmann,Victor Lingenthal
MIT Software License.
*/
/*!
betajs-scoped - v0.0.1 - 2015-03-26
Copyright (c) Oliver Friedmann
MIT Software License.
*/
var Scoped = (function () {
var Globals = {

	get : function(key) {
		if (typeof window !== "undefined")
			return window[key];
		if (typeof global !== "undefined")
			return global[key];
		return null;
	},

	set : function(key, value) {
		if (typeof window !== "undefined")
			window[key] = value;
		if (typeof global !== "undefined")
			global[key] = value;
		return value;
	},
	
	setPath: function (path, value) {
		var args = path.split(".");
		if (args.length == 1)
			return this.set(path, value);		
		var current = this.get(args[0]) || this.set(args[0], {});
		for (var i = 1; i < args.length - 1; ++i) {
			if (!(args[i] in current))
				current[args[i]] = {};
			current = current[args[i]];
		}
		current[args[args.length - 1]] = value;
		return value;
	},
	
	getPath: function (path) {
		var args = path.split(".");
		if (args.length == 1)
			return this.get(path);		
		var current = this.get(args[0]);
		for (var i = 1; i < args.length; ++i) {
			if (!current)
				return current;
			current = current[args[i]];
		}
		return current;
	}

};
var Helper = {
		
	method: function (obj, func) {
		return function () {
			return func.apply(obj, arguments);
		};
	},
	
	extend: function (base, overwrite) {
		base = base || {};
		overwrite = overwrite || {};
		for (var key in overwrite)
			base[key] = overwrite[key];
		return base;
	},
	
	typeOf: function (obj) {
		return Object.prototype.toString.call(obj) === '[object Array]' ? "array" : typeof obj;
	},
	
	isEmpty: function (obj) {
		if (obj === null || typeof obj === "undefined")
			return true;
		if (this.typeOf(obj) == "array")
			return obj.length === 0;
		if (typeof obj !== "object")
			return false;
		for (var key in obj)
			return false;
		return true;
	},
	
	matchArgs: function (args, pattern) {
		var i = 0;
		var result = {};
		for (var key in pattern) {
			if (pattern[key] === true || this.typeOf(args[i]) == pattern[key]) {
				result[key] = args[i];
				i++;
			} else if (this.typeOf(args[i]) == "undefined")
				i++;
		}
		return result;
	},
	
	stringify: function (value) {
		if (this.typeOf(value) == "function")
			return "" + value;
		return JSON.stringify(value);
	}	

};
var Attach = {
		
	__namespace: "Scoped",
	
	upgrade: function (namespace) {
		var current = Globals.get(namespace || Attach.__namespace);
		if (current && Helper.typeOf(current) == "object" && current.guid == this.guid && Helper.typeOf(current.version) == "string") {
			var my_version = this.version.split(".");
			var current_version = current.version.split(".");
			var newer = false;
			for (var i = 0; i < Math.min(my_version.length, current_version.length); ++i) {
				newer = my_version[i] > current_version[i];
				if (my_version[i] != current_version[i]) 
					break;
			}
			return newer ? this.attach(namespace) : current;				
		} else
			return this.attach(namespace);		
	},

	attach : function(namespace) {
		if (namespace)
			Attach.__namespace = namespace;
		var current = Globals.get(Attach.__namespace);
		if (current == this)
			return this;
		Attach.__revert = current;
		Globals.set(Attach.__namespace, this);
		return this;
	},
	
	detach: function (forceDetach) {
		if (forceDetach)
			Globals.set(Attach.__namespace, null);
		if (typeof Attach.__revert != "undefined")
			Globals.set(Attach.__namespace, Attach.__revert);
		delete Attach.__revert;
		return this;
	},
	
	exports: function (mod, object, forceExport) {
		mod = mod || (typeof module != "undefined" ? module : null);
		if (typeof mod == "object" && mod && "exports" in mod && (forceExport || mod.exports == this || !mod.exports || Helper.isEmpty(mod.exports)))
			mod.exports = object || this;
		return this;
	}	

};

function newNamespace (options) {
	
	options = Helper.extend({
		tree: false,
		global: false,
		root: {}
	}, options);
	
	function initNode(options) {
		return Helper.extend({
			route: null,
			parent: null,
			children: {},
			watchers: [],
			data: {},
			ready: false,
			lazy: []
		}, options);
	}
	
	var nsRoot = initNode({ready: true});
	
	var treeRoot = null;
	
	if (options.tree) {
		if (options.global) {
			try {
				if (window)
					treeRoot = window;
			} catch (e) { }
			try {
				if (global)
					treeRoot = global;
			} catch (e) { }
		} else
			treeRoot = options.root;
		nsRoot.data = treeRoot;
	}
	
	function nodeDigest(node) {
		if (node.ready)
			return;
		if (node.parent && !node.parent.ready) {
			nodeDigest(node.parent);
			return;
		}
		if (node.route in node.parent.data) {
			node.data = node.parent.data[node.route];
			node.ready = true;
			for (var i = 0; i < node.watchers.length; ++i)
				node.watchers[i].callback.call(node.watchers[i].context || this, node.data);
			node.watchers = [];
			for (var key in node.children)
				nodeDigest(node.children[key]);
		}
	}
	
	function nodeEnforce(node) {
		if (node.ready)
			return;
		if (node.parent && !node.parent.ready)
			nodeEnforce(node.parent);
		node.ready = true;
		if (options.tree && typeof node.parent.data == "object")
			node.parent.data[node.route] = node.data;
		for (var i = 0; i < node.watchers.length; ++i)
			node.watchers[i].callback.call(node.watchers[i].context || this, node.data);
		node.watchers = [];
	}
	
	function nodeSetData(node, value) {
		if (typeof value == "object") {
			for (var key in value) {
				node.data[key] = value[key];
				if (node.children[key])
					node.children[key].data = value[key];
			}
		} else
			node.data = value;
		nodeEnforce(node);
		for (var k in node.children)
			nodeDigest(node.children[k]);
	}
	
	function nodeClearData(node) {
		if (node.ready && node.data) {
			for (var key in node.data)
				delete node.data[key];
		}
	}
	
	function nodeNavigate(path) {
		if (!path)
			return nsRoot;
		var routes = path.split(".");
		var current = nsRoot;
		for (var i = 0; i < routes.length; ++i) {
			if (routes[i] in current.children)
				current = current.children[routes[i]];
			else {
				current.children[routes[i]] = initNode({
					parent: current,
					route: routes[i]
				});
				current = current.children[routes[i]];
				nodeDigest(current);
			}
		}
		return current;
	}
	
	function nodeAddWatcher(node, callback, context) {
		if (node.ready)
			callback.call(context || this, node.data);
		else {
			node.watchers.push({
				callback: callback,
				context: context
			});
			if (node.lazy.length > 0) {
				var f = function (node) {
					if (node.lazy.length > 0) {
						var lazy = node.lazy.shift();
						lazy.callback.call(lazy.context || this, node.data);
						f(node);
					}
				};
				f(node);
			}
		}
	}

	return {
		
		extend: function (path, value) {
			nodeSetData(nodeNavigate(path), value);
		},
		
		set: function (path, value) {
			var node = nodeNavigate(path);
			if (node.data)
				nodeClearData(node);
			nodeSetData(node, value);
		},
		
		lazy: function (path, callback, context) {
			var node = nodeNavigate(path);
			if (node.ready)
				callback(context || this, node.data);
			else {
				node.lazy.push({
					callback: callback,
					context: context
				});
			}
		},
		
		digest: function (path) {
			nodeDigest(nodeNavigate(path));
		},
		
		obtain: function (path, callback, context) {
			nodeAddWatcher(nodeNavigate(path), callback, context);
		}
		
	};
	
}
function newScope (parent, parentNamespace, rootNamespace, globalNamespace) {
	
	var self = this;
	var nextScope = null;
	var childScopes = [];
	var localNamespace = newNamespace({tree: true});
	var privateNamespace = newNamespace({tree: false});
	
	var bindings = {
		"global": {
			namespace: globalNamespace
		}, "root": {
			namespace: rootNamespace
		}, "local": {
			namespace: localNamespace
		}, "default": {
			namespace: privateNamespace
		}, "parent": {
			namespace: parentNamespace
		}, "scope": {
			namespace: localNamespace,
			readonly: false
		}
	};
	
	var custom = function (argmts, name, callback) {
		var args = Helper.matchArgs(argmts, {
			options: "object",
			namespaceLocator: true,
			dependencies: "array",
			hiddenDependencies: "array",
			callback: true,
			context: "object"
		});
		
		var options = Helper.extend({
			lazy: this.options.lazy
		}, args.options || {});
		
		var ns = this.resolve(args.namespaceLocator);
		
		var execute = function () {
			this.require(args.dependencies, args.hiddenDependencies, function () {
				arguments[arguments.length - 1].ns = ns;
				if (this.options.compile) {
					var params = [];
					for (var i = 0; i < argmts.length; ++i)
						params.push(Helper.stringify(argmts[i]));
					this.compiled += this.options.ident + "." + name + "(" + params.join(", ") + ");\n\n";
				}
				var result = args.callback.apply(args.context || this, arguments);
				callback.call(this, ns, result);
			}, this);
		};
		
		if (options.lazy)
			ns.namespace.lazy(ns.path, execute, this);
		else
			execute.apply(this);

		return this;
	};
	
	return {
		
		getGlobal: Helper.method(Globals, Globals.getPath),
		setGlobal: Helper.method(Globals, Globals.setPath),
		
		options: {
			lazy: false,
			ident: "Scoped",
			compile: false			
		},
		
		compiled: "",
		
		nextScope: function () {
			if (!nextScope)
				nextScope = newScope(this, localNamespace, rootNamespace, globalNamespace);
			return nextScope;
		},
		
		subScope: function () {
			var sub = this.nextScope();
			childScopes.push(sub);
			nextScope = null;
			return sub;
		},
		
		binding: function (alias, namespaceLocator, options) {
			if (!bindings[alias] || !bindings[alias].readonly) {
				var ns;
				if (Helper.typeOf(namespaceLocator) != "string") {
					ns = {
						namespace: newNamespace({
							tree: true,
							root: namespaceLocator
						}),
						path: null	
					};
				} else
					ns = this.resolve(namespaceLocator);
				bindings[alias] = Helper.extend(options, ns);
			}
			return this;
		},
		
		resolve: function (namespaceLocator) {
			var parts = namespaceLocator.split(":");
			if (parts.length == 1) {
				return {
					namespace: privateNamespace,
					path: parts[0]
				};
			} else {
				var binding = bindings[parts[0]];
				if (!binding)
					throw ("The namespace '" + parts[0] + "' has not been defined (yet).");
				return {
					namespace: binding.namespace,
					path : binding.path && parts[1] ? binding.path + "." + parts[1] : (binding.path || parts[1])
				};
			}
		},
		
		define: function () {
			return custom.call(this, arguments, "define", function (ns, result) {
				ns.namespace.set(ns.path, result);
			});
		},
		
		extend: function () {
			return custom.call(this, arguments, "extend", function (ns, result) {
				ns.namespace.extend(ns.path, result);
			});
		},
		
		condition: function () {
			return custom.call(this, arguments, "condition", function (ns, result) {
				if (result)
					ns.namespace.set(ns.path, result);
			});
		},
		
		require: function () {
			var args = Helper.matchArgs(arguments, {
				dependencies: "array",
				hiddenDependencies: "array",
				callback: "function",
				context: "object"
			});
			args.callback = args.callback || function () {};
			var dependencies = args.dependencies || [];
			var allDependencies = dependencies.concat(args.hiddenDependencies || []);
			var count = allDependencies.length;
			var deps = [];
			var environment = {};
			if (count) {
				var f = function (value) {
					if (this.i < deps.length)
						deps[this.i] = value;
					count--;
					if (count === 0) {
						deps.push(environment);
						args.callback.apply(args.context || this.ctx, deps);
					}
				};
				for (var i = 0; i < allDependencies.length; ++i) {
					var ns = this.resolve(allDependencies[i]);
					if (i < dependencies.length)
						deps.push(null);
					ns.namespace.obtain(ns.path, f, {
						ctx: this,
						i: i
					});
				}
			} else {
				deps.push(environment);
				args.callback.apply(args.context || this, deps);
			}
			return this;
		},
		
		digest: function (namespaceLocator) {
			var ns = this.resolve(namespaceLocator);
			ns.namespace.digest(ns.path);
			return this;
		}		
		
	};
	
}
var globalNamespace = newNamespace({tree: true, global: true});
var rootNamespace = newNamespace({tree: true});
var rootScope = newScope(null, rootNamespace, rootNamespace, globalNamespace);

var Public = Helper.extend(rootScope, {
		
	guid: "4b6878ee-cb6a-46b3-94ac-27d91f58d666",
	version: '9.1427403679672',
		
	upgrade: Attach.upgrade,
	attach: Attach.attach,
	detach: Attach.detach,
	exports: Attach.exports
	
});

Public = Public.upgrade();
Public.exports();
	return Public;
}).call(this);
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
		version: '2.1433897049305'
	};
});


window.componentsJSON = [
    {name:'aa_template'},
    {name:'numberscrollpicker'},
    {name:'timepicker'},
    {name:'testcomponent'},
    {name:'emailinput'},
    {name:'list'}
];

window.components = BetaJS.Objs.map(window.componentsJSON, function (entry) {
   return new BetaJS.Properties.Properties(entry);
});

window.componentsByName = function (name) {
    var comp = window.components;
    for (var i = 0; i < comp.length; ++i)
        if (comp[i].get("name") == name)
            return comp[i];
    return null;
};

BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Aa_template", {

    templateUrl: "../components/aa_template/template.html",

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

    templateUrl: "../components/%/%.html",

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


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Datepicker", {

    templateUrl: "../components/timepicker/%/%.html"

}).register();

//app.directive('diDatepicker', function() {
//
//    return {
//        restrict : 'E',
//        replace : true,
//        templateUrl : App.Paths.asset("{pages-directives}/doodadcontainer/inputs/timepicker/datepicker/template.html"),
//        scope : {
//            data : "=",
//            increment : "@"
//        },
//        controller : function ($scope) {
//
//            $scope.start_value = $scope.data.value || BetaJS.Time.now();
//
//        },
//        link : function ($scope, $element) {
//
//            var numberselement = $element.find( 'numbers' );
//
//            BetaJS.Async.eventually(function () {
//                var element = numberselement;
//
//                var today = BetaJS.Time.floorTime($scope.start_value, "hours");
//                inc_day = function (i) {
//                    var inc_day = new Date(BetaJS.Time.incrementTime(today, {day: i}));
//                    return inc_day;
//                };
//
//                var low = 0;
//                var high = 35;
//
//                appendedelement = function (i) {
//                    return "<number data-date='" + inc_day(i).getTime() + "'>"
//                        + "<p>" + App.Helpers.Time.day_to_string(inc_day(i).getDay()).slice(0,3).toLowerCase() + "&nbsp;" + "</p>"
//                        + "<p>" + App.Helpers.Time.two_digits(inc_day(i).getDate()) + "</p>"
//                        + "<p>" + App.Helpers.Time.month_to_string(inc_day(i).getMonth()).slice(0,3).toLowerCase() + "</p>"
//                        + "</number>";
//                };
//
//                for (var i = 0; i <= high; ++i)
//                    element.append(appendedelement(i));
//
//                element.find( '>:nth-child(1)' ).css({"background":"white","color":"black"});
//
//                var scroll = new BetaJS.UI.Interactions.InfiniteScroll(element, {
//                    enabled: true,
//                    discrete: true,
//                    currentCenter: true,
//                    append: function (count, callback) {
//                        for (var i = high+1; i <= high+1 + count; ++i)
//                            element.append(appendedelement(i));
//                        high += count;
//                        document.title = low + " - " + high;
//                        callback(count, true);
//                    },
//                    prepend: function (count, callback) {
//                        for (var i = low-1; i >= low-1-count; --i)
//                            element.prepend(appendedelement(i));
//                        low -= count;
//                        document.title = low + " - " + high;
//                        callback(count, true);
//                    }
//                });
//
//                scroll.on("scroll", function () {
//                    numberselement.children().css({"background":"#F4F4F4","color":"#999999"});
//                    scroll.currentElement().css({"background":"white","color":"black"});
//                });
//
//                scroll.on("scrolltoend", function () {
//                    $scope.data.value = scroll.currentElement().data( "date" );
//                    $scope.$apply();
//                });
//
//            });
//
//        }
//    };
//
//});


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Dynamic.Components.Daypicker", {

    templateUrl: "../components/timepicker/daypicker/daypicker.html"

}).register("ba-daypicker");

//app.directive('diDaypicker', function() {
//    return {
//        restrict : 'E',
//        replace : true,
//        templateUrl : App.Paths.asset("{pages-directives}/doodadcontainer/inputs/timepicker/daypicker/template.html")
//    };
//});


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Numberscrollpicker", {

    templateUrl: "../components/timepicker/%/%.html",
    //template: BetaJS.Dynamics.Templates.Numberscrollpicker,

    initial : {

        attrs : {
            value : 5,
            first : 0,
            last : 23,
            increment : 1,
            currentTop : true,
            numbers : []
        },

        create : function () {

            console.log('Create Numberscrollpicker');
            console.log(this.get('value'));

            this.call('initializer_numbers');

        },

        functions : {

            initializer_numbers : function () {

                var first = this.get('first');
                var last = this.get('last');
                var inc = this.get('increment');

                var numbers  = [];
                for (var i = first ; i <= last ; i += inc) {
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

        var ele = $(element.find("[data-number='" + parseInt(this.get('value')) + "']"));
        scroll.scrollToElement(ele, {
            animate: false
        });
        ele.css("color", "black");
        ele.css("background", "white");

        scroll.on("scrolltoend", function () {
            this.set('value', scroll.currentElement().data( "number" ));
        },this);

        scroll.on("scroll", function () {
            element.children().css("color", "#999999");
            element.children().css("background", "#F4F4F4");
            //console.log("Current Element: " + scroll.currentElement());
            scroll.currentElement().css("color", "black");
            scroll.currentElement().css("background", "white");
        });

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Timepicker", {

    templateUrl: "../components/%/%.html",

    initial : {

        attrs: {
            valueMinute : 10,
            valueHour : 3
        },

        create : function () {

            console.log(this.get('valueMinute'));
            console.log(this.get('valueHour'));

            this.on("change:valueMinute",function () {
                console.log('Minute was changed!!');
            });

            //this.set('valueMinute',20);

        }
    },

    _afterActivate : function () {

        console.log(this.get('valueMinute'));
        console.log(this.get('valueHour'));

    }

}).register();



BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Components", {

    templateUrl: "environment/controls/%/%.html",


    initial: {

        attrs : {
            components : components
        },

        create : function () {
            console.log('Controls Loaded');

            this.set('current_component', appstate.get("component_type") ? componentsByName(appstate.get("component_type")) : this.get('components')[0]);
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