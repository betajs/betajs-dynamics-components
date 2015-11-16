/*!
betajs-dynamics-components - v0.0.4 - 2015-11-16
Copyright (c) Oliver Friedmann, Victor Lingenthal
MIT Software License.
*/
/*!
betajs-scoped - v0.0.2 - 2015-07-08
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
				newer = parseInt(my_version[i], 10) > parseInt(current_version[i], 10);
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
	
	function nodeUnresolvedWatchers(node, base, result) {
		node = node || nsRoot;
		result = result || [];
		if (!node.ready)
			result.push(base);
		for (var k in node.children) {
			var c = node.children[k];
			var r = (base ? base + "." : "") + c.route;
			result = nodeUnresolvedWatchers(c, r, result);
		}
		return result;
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
		},
		
		unresolvedWatchers: function (path) {
			return nodeUnresolvedWatchers(nodeNavigate(path), path);
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
		},
		
		unresolved: function (namespaceLocator) {
			var ns = this.resolve(namespaceLocator);
			return ns.namespace.unresolvedWatchers(ns.path);
		}
		
	};
	
}
var globalNamespace = newNamespace({tree: true, global: true});
var rootNamespace = newNamespace({tree: true});
var rootScope = newScope(null, rootNamespace, rootNamespace, globalNamespace);

var Public = Helper.extend(rootScope, {
		
	guid: "4b6878ee-cb6a-46b3-94ac-27d91f58d666",
	version: '9.9436392609879',
		
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
betajs-dynamics-components - v0.0.4 - 2015-11-16
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
		version: '54.1447690737387'
	};
});

BetaJS.Dynamics.Dynamic.Components = {};

window.iterateModel = function (scope) {

    var data = null;

    //console.log("Model : " + scope._tagName);
    if (scope.get('model')) {
        //console.log(scope.get('model'));
        data = "data" in scope.get("model") ? scope.get("model").data() : scope.get("model");
        //console.log(data);
    }
    if (data) {
        BetaJS.Objs.iter(data, function (modelValue, attrKey) {
            var attrValue = this.isArgumentAttr(attrKey) ? scope.get(attrKey) : modelValue;
            scope.set(attrKey, attrValue);
            //this.get("model").set(attrKey, attrValue);
            //this.properties().bind(attrKey, this.get("model"));
        }, scope);
    }
};
BetaJS = BetaJS || {};
BetaJS.Dynamics = BetaJS.Dynamics || {};
BetaJS.Dynamics.Dynamic = BetaJS.Dynamics.Dynamic || {};
BetaJS.Dynamics.Dynamic.Components = BetaJS.Dynamics.Dynamic.Components || {};
BetaJS.Dynamics.Dynamic.Components.Templates = BetaJS.Dynamics.Dynamic.Components.Templates || {};
BetaJS.Dynamics.Dynamic.Components.Templates.overlaycontainer = '<overlaycontainer     ba-click="showoverlay = false"     ba-if="{{showoverlay}}">      <overlayinner>          <ba-{{overlay}} ba-value=\'{{=value}}\'>             <message>{{message}}</message>         </ba-{{overlay}}>      </overlayinner>  </overlaycontainer>';

BetaJS.Dynamics.Dynamic.Components.Templates.overlaycontainertest = ' <button ba-click="showoverlay = !showoverlay">Show Overlaycontainer</button>  <ba-overlaycontainer         ba-overlay="{{=overlay}}"         ba-showoverlay="{{=showoverlay}}">          </ba-overlaycontainer>';

BetaJS.Dynamics.Dynamic.Components.Templates.scrollpicker = '<element ba-repeat-element="{{element_value :: value_array}}" data-id="{{element_value}}">         {{element_value}} </element>';

BetaJS.Dynamics.Dynamic.Components.Templates.swipecontainer = ' <behind>     <icon class=\'{{lefticon}}\'></icon>     <div></div>     <icon class=\'{{righticon}}\'></icon> </behind>  <swipe>      <ba-{{type}} ba-sharescope>         {{title}}     </ba-{{type}}>      <swipeleft>         <div></div>         <icon class=\'{{lefticon}}\'></icon>     </swipeleft>      <swiperight>         <icon class=\'{{righticon}}\'></icon>         <div></div>     </swiperight>  </swipe> ';

BetaJS.Dynamics.Dynamic.Components.Templates.clickitem = ' <clickitem         ba-click="click()">     {{title}} </clickitem>';

BetaJS.Dynamics.Dynamic.Components.Templates.selectableitem = ' <selectableitem         ba-class="{{{selected : selected.cid == this.cid()}}}"         ba-click="select()">     {{model.title}} </selectableitem>';

BetaJS.Dynamics.Dynamic.Components.Templates.test_selectableitem = ' <ba-list ba-model="{{testmodel}}"> </ba-list>';

BetaJS.Dynamics.Dynamic.Components.Templates.list = ' <list ba-repeat="{{collectionitem :: listcollection}}">      <ba-{{listitem}}         ba-data:id="{{collectionitem.cid()}}"         ba-functions="{{callbacks}}"         ba-type="{{type}}"         ba-model="{{collectionitem}}">         {{collectionitem.title}}     </ba-{{listitem}}>  </list>';

BetaJS.Dynamics.Dynamic.Components.Templates.test_list_clickitem = ' <ba-list ba-attrs="{{testmodel}}"> </ba-list>';

BetaJS.Dynamics.Dynamic.Components.Templates.test_list_listcollection = ' <ba-list ba-listcollection="{{listcollection}}"> </ba-list>';

BetaJS.Dynamics.Dynamic.Components.Templates.test_list_listoflist = ' <ba-list         ba-listitem="list"         ba-listcollection="{{listcollection}}"> </ba-list>';

BetaJS.Dynamics.Dynamic.Components.Templates.test_list_pushfunc = '<button ba-click="test(input_value)">Test func</button> <input ba-return="test(input_value)" placeholder="Push item to list" value="{{=input_value}}"> <ba-titledlist ba-attrs="{{testmodel}}"> </ba-titledlist>';

BetaJS.Dynamics.Dynamic.Components.Templates.test_list_swipecontainer = ' <ba-list ba-attrs="{{testmodel}}">  </ba-list>';

BetaJS.Dynamics.Dynamic.Components.Templates.searchlist = '<searchbox ba-if="{{showsearch}}">     <icon class="icon-search"></icon>     <input placeholder="{{placeholder}}" value="{{=searchvalue}}"> </searchbox>  <ba-list         ba-sharescope         ba-attrs="{{model}}"         ba-listcollection="{{listcollection}}">  </ba-list> ';

BetaJS.Dynamics.Dynamic.Components.Templates.test_searchlist = ' <ba-searchlist         ba-attrs="{{model}}">  </ba-searchlist>';

BetaJS.Dynamics.Dynamic.Components.Templates.test_titledlist = ' <ba-titledlist         ba-attrs="{{model}}">  </ba-titledlist>';

BetaJS.Dynamics.Dynamic.Components.Templates.testtitledlistswipe = ' <ba-titledlist         ba-attrs="{{model}}">  </ba-titledlist>';

BetaJS.Dynamics.Dynamic.Components.Templates.test_titledlist_childlist = ' <ba-list         ba-callbacks="{{callbacks}}"         ba-listcollection="{{outer_collection}}"         ba-listitem="titledlist">  </ba-list>  ';

BetaJS.Dynamics.Dynamic.Components.Templates.test_titledlist_pushfunc = ' <button ba-click="test(input_value)">Test func</button> <input ba-return="test(input_value)" placeholder="Push item to list" value="{{=input_value}}"> <ba-titledlist ba-functions="{{callbacks}}" ba-model="{{model}}"> </ba-titledlist> ';

BetaJS.Dynamics.Dynamic.Components.Templates.test_titledlist_pushintochild = ' <ba-titledlist         ba-callbacks="{{callbacks}}"         ba-attrs="{{model}}">  </ba-titledlist>';

BetaJS.Dynamics.Dynamic.Components.Templates.titledlist = '<ba-{{titleitem}}     ba-click="title_click()"     ba-attrs={{titleitem_model}}>{{title}}</ba-{{titleitem}}>  <ba-list         ba-sharescope         ba-if="{{!collapsed && collapsible}}"         ba-functions="{{callbacks}}"         ba-listcollection="{{listcollection}}">  </ba-list> ';

BetaJS.Dynamics.Dynamic.Components.Templates.addtitle = ' <addtitle>     <title ba-click="clicktitle()">{{title}}</title>     <button ba-click="addbutton()">         <span class="icon-plus"></span>     </button> </addtitle>';

BetaJS.Dynamics.Dynamic.Components.Templates.test_addtitle = ' <ba-addtitle         ba-attrs="{{testmodel}}"> </ba-addtitle> ';

BetaJS.Dynamics.Dynamic.Components.Templates.pushfunc = ' <pushfunc         ba-click="log()">     {{model.title}} </pushfunc>';

BetaJS.Dynamics.Dynamic.Components.Templates.test_pushfunc = ' <ba-pushfunc         ba-model="{{testmodel}}"> </ba-pushfunc>';

BetaJS.Dynamics.Dynamic.Components.Templates.test_attrs = ' <ba-titledlist         ba-attrs="{{model}}">  </ba-titledlist>';

BetaJS.Dynamics.Dynamic.Components.Templates.index = '<!DOCTYPE html> <html> <head lang="en">     <meta charset="UTF-8">      <!--<script src="../vendors/jquery-1.9.closure-extern.js"></script>-->     <script src="../vendors/jquery-2.1.4.js"></script>      <script src="../vendors/scoped.js"></script>     <script src="../vendors/beta.js"></script>     <script src="../vendors/beta-browser-noscoped.js"></script>     <script src="../vendors/betajs-ui.js"></script>     <script src="../vendors/betajs-dynamics-noscoped.js"></script>      <script src="components.js"></script>      <!--<script src="../vendors/betajs-simulator.js"></script>-->     <script src="../../../betajs/betajs-simulator/dist/betajs-simulator.js"></script>     <link rel="stylesheet" href="../vendors/betajs-simulator.css" />      <script src="../dist/betajs-dynamics-components-noscoped.js"></script>     <link rel="stylesheet" href="../dist/betajs-dynamics-components.css" />     <link rel="stylesheet" href="../vendors/icomoon/style.css" />      <script src="//localhost:1337/livereload.js"></script>      <title>BetaJS Simulator</title>  </head> <body>  <ba-simulator></ba-simulator>  </body> </html>';


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

	attrs : {
		type : "clickitem",
		title : "Swipeitem - Title",
		lefticon : 'icon-ok',
		righticon : 'icon-time',
		actions : {
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

    attrs: {
        title : 'Clickitem - Title'
    },

    functions : {
        click : function () {
            console.log("You Clicked item : " + this.get('title'));
        }
    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Selectableitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.selectableitem,

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
            title :'Selectableitem - Title'
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
            this.scopes.parent_list.set('selected_item',{
                cid : this.cid(),
                title : this.get('model.title')
            });
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_selectableitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.test_selectableitem,

    initial: {

        attrs: {
            testmodel : {
                listitem: 'swipecontainer',
                type: 'selectableitem',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Test - Selectableitem 1"},
                    {title: "Test - Selectableitem 2"},
                    {title: "Test - Selectableitem 3"}
                ]})
            }
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.List", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.list,

    attrs: {
        listitem : "clickitem"
    },

    collections : {
        listcollection : [
            {title: "List - Item 1"},
            {title: "List - Item 2"},
            {title: "List - Item 3"}
        ]
    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_list_clickitem", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.test_list_clickitem,

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

    template: BetaJS.Dynamics.Dynamic.Components.Templates.test_list_listcollection,

    initial: {

        collections : {
            listcollection : [
                {title: "Test - List - listollection - Item 1"},
                {title: "Test - List - listollection - Item 2"},
                {title: "Test - List - listollection - Item 3"},
                {title: "Test - List - listollection - Item 4"}
            ]
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_list_listoflist", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.test_list_listoflist,

    initial: {

        collections : {
            listcollection : [
                {listcollection : new BetaJS.Collections.Collection({objects: [
                    {title : "Test - list of list - Item 1"},
                    {title : "Test - list of list - Item 2"}
                ]})},
                {listcollection : new BetaJS.Collections.Collection({objects: [
                    {title : "Test - list of list - Item 1"},
                    {title : "Test - list of list - Item 2"}
                ]})}
            ]
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_list_pushfunc", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.test_list_pushfunc,

    initial: {

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
                            {title : argument}
                        );
                    }
                },
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Item 1"},
                    {title: "Item 2"},
                    {title: "Item 3"},
                    {title: "Item 4"},
                    {title: "Item 5"}
                ]})
            }
        },

        functions : {
            test : function (argument) {
                argument = argument ? argument : "no arg given";
                this.scope('>').get('model').functions.testfunc.call(this.scope('>'), argument);
            }
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_list_swipecontainer", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.test_list_swipecontainer,

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
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Searchlist", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.searchlist,

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
    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_searchlist", {

    template : BetaJS.Dynamics.Dynamic.Components.Templates.test_searchlist,

    initial : {

        attrs : {
            model : {
                placeholder : "Test Searchlist",
                listitem : 'swipecontainer',
                type : 'selectableitem',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Test searchlist Item 1"},
                    {title: "Test searchlist Item 2"},
                    {title: "Test searchlist Item 3"}
                ]})
            }
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_titledlist", {

    template : BetaJS.Dynamics.Dynamic.Components.Templates.test_titledlist,

    initial : {

        attrs : {
            model : {
                title : "Testtitle",
                titleitem : 'addtitle',
                titleitem_model : {
                    title : 'Titledlist - Testtitle',
                    titlefunc : 'togglelist',
                    addfunc : 'additem',
                    addbuttonscope :'<<'
                },
                functions : {
                    placeholder_func : function () {
                        console.log('This is a testfunction from the test_titledlist');
                    }
                },
                type : 'clickitem',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Testtitledlist Item 1"},
                    {title: "Testtitledlist Item 2"},
                    {title: "Testtitledlist Item 3"}
                ]})
            }
        },

        functions : {

            additem : function () {

                console.log('This comes from the Test Titledlist : ');
                console.log(this.scope('>').call('additem', {title  : "title"}));

                this.get('test_function').call(this, null);

            }

        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Testtitledlistswipe", {

    template : BetaJS.Dynamics.Dynamic.Components.Templates.testtitledlistswipe,

    initial : {

        attrs : {
            model : {
                titleitem : 'addtitle',
                titleitem_model : {
                    title : 'Titledlist - Testtitle',
                    titlefunc : 'togglelist',
                    addfunc : 'additem'
                },
                listitem: 'swipecontainer',
                type: 'clickitem',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Test - Titledlist - Swipe - Item 1"},
                    {title: "Test - Titledlist - Swipe - Item 2"},
                    {title: "Test - Titledlist - Swipe - Item 3"}
                ]})
            }
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_titledlist_childlist", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.test_titledlist_childlist,

    attrs : {
        callbacks: {
            additem: function () {
                console.log('This is a function pushed into the titledlist from the tasklist : Add Task from here ? ');
            }
        }
    },

    collections : {

        outer_collection : [
            {
                titleitem : 'addtitle',
                titleitem_model : {
                    title : 'Today',
                    titlefunc : 'togglelist',
                    addfunc : 'additem',
                    addbuttonscope : '<'
                },
                listitem : "swipecontainer",
                type : 'clickitem',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title : "Titledlist - Childlist - Task 1"},
                    {title : "Titledlist - Childlist - Task 2"}
                ]})
            }, {
                titleitem : 'addtitle',
                titleitem_model : {
                    title : 'Today',
                    titlefunc : 'togglelist',
                    addfunc : 'additem',
                    addbuttonscope : '<'
                },
                listitem : "swipecontainer",
                type : 'selectableitem',
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title : "Titledlist - Childlist - Task 3"},
                    {title : "Titledlist - Childlist - Task 4"}
                ]})
            }
        ]
    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_titledlist_pushfunc", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.test_titledlist_pushfunc,

    initial: {

        attrs: {
            model : {
                titleitem : 'addtitle',
                titleitem_model : {
                    title : 'Today',
                    titlefunc : 'togglelist',
                    addfunc : 'title_click',
                    addbuttonscope : '<'
                },
                callbacks : {

                    title_click : function (item) {

                        console.log('This is a callback function');

                        item = item ? item : {title : "New Item"};
                        var index = this.get('listcollection').add(item);

                        var item_cid = this.get('listcollection').getByIndex(index).cid();

                        console.log(item_cid);
                        $('#' + item_cid).find('clickitem').css('background', 'red');

                        return item_cid;

                    }

                },
                listcollection : new BetaJS.Collections.Collection({objects: [
                    {title: "Item 1"},
                    {title: "Item 2"},
                    {title: "Item 3"},
                    {title: "Item 4"},
                    {title: "Item 5"}
                ]})
            }
        },

        functions : {

            title_click : function () {
                console.log('haha');
            }

        },

        create : function () {
            window.iterateModel(this);
            console.log('test_titled_list_pushfunc - callback : ');
            console.log(console.log(this.get('callbacks')));
            if (this.get('callbacks') && this.get('callbacks').title_click) {
                console.log(console.log(this.get('callbacks').title_click.toString()));

            }
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_titledlist_pushintochild", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.test_titledlist_pushintochild,

    attrs: {
        callbacks : {

            title_click : function (item) {

                console.log('This is another callback function');

                item = item ? item : {title : "New Item"};
                var index = this.get('listcollection').add(item);

                var item_cid = this.get('listcollection').getByIndex(index).cid();

                console.log(item_cid);
                $('#' + item_cid).find('clickitem').css('background', 'red');

                return item_cid;

            }

        },
        model : {
            titleitem : 'addtitle',
            titleitem_model : {
                title : 'Today',
                titlefunc : 'togglelist',
                addfunc : 'title_click',
                addbuttonscope : '<'
            },
            listitem : 'clickitem',
            listcollection : new BetaJS.Collections.Collection({objects: [
                {title: "Pushintochild - Item 1"},
                {title: "Pushintochild - Item 2"},
                {title: "Pushintochild - Item 3"},
                {title: "Pushintochild - Item 4"}
            ]})
        }
    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Titledlist", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.titledlist,

    attrs: {
        collapsed : false,
        collapsible : true,
        title : 'Titledlist - Title',
        listitem : 'selectableitem',
        titleitem : 'title'
    },

    collections : {
        listcollection : [
            {title: "Titledlist - Item 1"},
            {title: "Titledlist - Item 2"},
            {title: "Titledlist - Item 3"}
        ]
    },

    functions : {

        togglelist : function () {

            this.set('collapsed', !this.get('collapsed'));

        },

        additem : function (item) {

            item = item ? item : {title : "New Item"};
            var index = this.get('listcollection').add(item);

            return this.get('listcollection').getByIndex(index).cid();

        },

        title_click : function () {
            console.log('You clicked the title');
            this.call('togglelist');
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Addtitle", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.addtitle,

    initial: {

        attrs: {
            title : 'Title',
            titlefunc : false,
            addfunc : false,
            titlescope : '<',
            addbuttonscope : '<',
            add_func : function () {

                var params = this.get('addbuttonparams') ? this.get('addbuttonparams') : null;

                if (this.get('addfunc')) {
                    this.scope(this.get('addbuttonscope')).call(this.get('addfunc'), params);
                } else
                    console.log("You clicked the addbuton, no addfunc given");

            }
        },

        functions : {

            clicktitle : function () {

                var params = this.get('titleparams') ? this.get('titleparams') : null;

                if (this.get('titlefunc')) {
                    this.scope(this.get('titlescope')).call(this.get('titlefunc'),params);
                } else
                    console.log("You clicked the Title, no titlefunc given");

            },
            addbutton : function () {

                this.get('add_func').call(this,null);

            }

        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Test_addtitle", {

    template : BetaJS.Dynamics.Dynamic.Components.Templates.test_addtitle,

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

    template: BetaJS.Dynamics.Dynamic.Components.Templates.pushfunc,

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

    template: BetaJS.Dynamics.Dynamic.Components.Templates.test_pushfunc,

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

    template : BetaJS.Dynamics.Dynamic.Components.Templates.test_attrs,

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

}).call(Scoped);