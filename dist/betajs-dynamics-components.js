/*!
betajs-dynamics-components - v0.0.4 - 2016-01-24
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
betajs-dynamics-components - v0.0.4 - 2016-01-24
Copyright (c) Oliver Friedmann, Victor Lingenthal
MIT Software License.
*/
(function () {

var Scoped = this.subScope();

Scoped.binding("module", "global:BetaJS.Dynamics.Components");
Scoped.binding("dynamics", "global:BetaJS.Dynamics");
Scoped.binding("base", "global:BetaJS");
Scoped.binding("browser", "global:BetaJS.Browser");
Scoped.binding("ui", "global:BetaJS.UI");

Scoped.binding("jquery", "global:jQuery");

Scoped.define("module:", function () {
	return {
		guid: "5d9ab671-06b1-49d4-a0ea-9ff09f55a8b7",
		version: '77.1453613524855'
	};
});

BetaJS = BetaJS || {};
BetaJS.Dynamics = BetaJS.Dynamics || {};
BetaJS.Dynamics.Components = BetaJS.Dynamics.Components || {};
BetaJS.Dynamics.Components.Templates = BetaJS.Dynamics.Components.Templates || {};
BetaJS.Dynamics.Components.Templates.input = '<input autofocus>';

BetaJS.Dynamics.Components.Templates.overlaycontainer = '<overlaycontainer     ba-tap="showoverlay = false"     ba-if="{{showoverlay}}">      <overlayinner>          <ba-{{overlay}} ba-value=\'{{=value}}\'>             <message>{{message}}</message>         </ba-{{overlay}}>      </overlayinner>  </overlaycontainer>';

BetaJS.Dynamics.Components.Templates.overlaycontainertest = ' <button ba-click="showoverlay = !showoverlay">Show Overlaycontainer</button>  <ba-overlaycontainer         ba-overlay="{{=overlay}}"         ba-showoverlay="{{=showoverlay}}">          </ba-overlaycontainer>';

BetaJS.Dynamics.Components.Templates.scrollpicker = '<element ba-repeat-element="{{element_value :: value_array}}" data-id="{{element_value}}">         {{element_value}} </element>';

BetaJS.Dynamics.Components.Templates.clicktestcontainer = ' <ba-{{view.inner||inner}}     ba-gesture:click="{{{data: model, options: click_gesture}}})"     ba-sharescope>     {{model.value||value}} </ba-{{view.inner||inner}}> ';

BetaJS.Dynamics.Components.Templates.swipeclickcontainer = ' <behind>     <icon class=\'{{view.lefticon||lefticon}}\'></icon>     <div></div>     <icon class=\'{{view.righticon||righticon}}\'></icon> </behind>  <swipe         ba-gesture:click="{{{data: model, options: click_gesture}}}"         ba-gesture:drag="{{drag_gesture}}"         ba-interaction:drag="{{drag_interaction}}"         ba-gesture:swipe="{{swipe_gesture}}"         ba-interaction:swipe="{{swipe_interaction}}">      <container>          <ba-{{view.inner||inner}}         ba-sharescope>         {{model.value||value}}         </ba-{{view.inner||inner}}>          <swipeleft>             <div></div>             <icon class=\'{{model.lefticon}}\'></icon>         </swipeleft>          <swiperight>             <icon class=\'{{model.righticon}}\'></icon>             <div></div>         </swiperight>      </container>  </swipe> ';

BetaJS.Dynamics.Components.Templates.swipecontainer = ' <behind>     <icon class=\'{{view.lefticon||lefticon}}\'></icon>     <div></div>     <icon class=\'{{view.righticon||righticon}}\'></icon> </behind>  <swipe  ba-gesture:swipe="{{swipe_gesture}}"         ba-interaction:swipe="{{swipe_interaction}}">      <ba-{{view.inner||inner}} ba-sharescope>         {{model.value||value}}     </ba-{{view.inner||inner}}>      <swipeleft>         <div></div>         <icon class=\'{{model.lefticon}}\'></icon>     </swipeleft>      <swiperight>         <icon class=\'{{model.righticon}}\'></icon>         <div></div>     </swiperight>  </swipe> ';

BetaJS.Dynamics.Components.Templates.clickitem = ' <button         class="{{model.class}}"         ba-click="click()">     {{model.value}} </button>';

BetaJS.Dynamics.Components.Templates.eventitem = ' <button         class="{{model.class}}">     {{model.value}} - {{counter}} </button>';

BetaJS.Dynamics.Components.Templates.selectableitem = ' <selectableitem         ba-class="{{{selected : selected.cid == this.cid()}}}"         ba-click="select()">     {{model.value}} </selectableitem>';

BetaJS.Dynamics.Components.Templates.list = ' <list ba-repeat="{{collectionitem :: (model.listcollection||listcollection)}}">      <ba-{{view.listitem||collectionitem.listitem||listitem}}         ba-data:id="{{collectionitem.cid()}}"         ba-functions="{{collectionitem.callbacks}}"         ba-view="{{collectionitem.view||view.listinner}}"         ba-model="{{collectionitem}}">         {{collectionitem.title}}     </ba-{{view.listitem||collectionitem.listitem||listitem}}>  </list> ';

BetaJS.Dynamics.Components.Templates.test_list_clickitem = ' <ba-list ba-attrs="{{testmodel}}"> </ba-list>';

BetaJS.Dynamics.Components.Templates.test_list_listcollection = ' <ba-list ba-listcollection="{{listcollection}}"> </ba-list>';

BetaJS.Dynamics.Components.Templates.test_list_listoflist = ' <ba-list         ba-listitem="list"         ba-listcollection="{{listcollection}}"> </ba-list>';

BetaJS.Dynamics.Components.Templates.test_list_pushfunc = '<button ba-click="test(input_value)">Test func</button> <input ba-return="test(input_value)" placeholder="Push item to list" value="{{=input_value}}"> <ba-titledlist ba-attrs="{{testmodel}}"> </ba-titledlist>';

BetaJS.Dynamics.Components.Templates.test_list_swipecontainer = ' <ba-list         ba-model="{{model}}"         ba-view="{{view_model}}"> </ba-list>';

BetaJS.Dynamics.Components.Templates.searchlist = ' <searchbox ba-if="{{view.showsearch}}">     <icon class="icon-search"></icon>     <input placeholder="{{view.placeholder}}" value="{{=searchvalue}}"> </searchbox>  <ba-list ba-sharescope></ba-list> ';

BetaJS.Dynamics.Components.Templates.test_searchlist = ' <ba-searchlist         ba-view="{{view}}">  </ba-searchlist>';

BetaJS.Dynamics.Components.Templates.test_titledlist = ' <ba-titledlist         ba-model="{{model}}"         ba-view="{{view}}"         ba-functions="{{callbacks}}"         ba-listcollection="{{listcollection}}">  </ba-titledlist>';

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

BetaJS.Dynamics.Components.Templates.index = '<!DOCTYPE html> <html> <head lang="en">     <meta charset="UTF-8">      <!--<script src="../vendors/jquery-1.9.closure-extern.js"></script>-->     <script src="../vendors/jquery-2.1.4.js"></script>      <script src="../vendors/scoped.js"></script>     <script src="../vendors/beta.js"></script>     <script src="../vendors/betajs-browser-noscoped.js"></script>     <script src="../vendors/betajs-ui.js"></script>     <script src="../vendors/betajs-dynamics-noscoped.js"></script>      <script src="components.js"></script>      <!--<script src="../vendors/betajs-simulator.js"></script>-->     <script src="../../betajs-simulator/dist/betajs-simulator.js"></script>     <link rel="stylesheet" href="../..//betajs-simulator/dist/betajs-simulator.css" />      <script src="../dist/betajs-dynamics-components-noscoped.js"></script>     <link rel="stylesheet" href="../dist/betajs-dynamics-components.css" />     <link rel="stylesheet" href="../vendors/icomoon/style.css" />      <script src="//localhost:1337/livereload.js"></script>      <title>BetaJS Simulator</title>      <script>      </script>  </head> <body>  <ba-simulator></ba-simulator>  <script>     console.log(\'Unresolved Dependencies : \');     console.log(Scoped.unresolved(\'global:\')); </script>  </body> </html>';


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

Scoped.define("module:Swipeclickcontainer", [
	"dynamics:Dynamic",
	"module:Templates"
],[
	"ui:Dynamics.GesturePartial",
	"ui:Dynamics.InteractionPartial"
], function (Dynamic, Templates, scoped) {

	return Dynamic.extend({scoped: scoped}, {

		template: Templates.swipeclickcontainer,

		attrs: {
			model: {
				value: "Swipeclickitem - Title"
			},
			lefticon: 'icon-ok',
			righticon: 'icon-time',
			inner: "eventitem",
			swipe_actions: {
				"other": {
					less: 0,
					greater: -1,
					execute: function () {
						//this.get("model").set("archived", true);
						console.log("Swipe: other");
					}
				},
				"archive": {
					greater : 0,
					less: 2 / 5,
					execute: function (element) {
						console.log("Swipe: archive");
						//element.parent().slideUp();
					}
				},
				"delete": {
					greater: 2 / 5,
					execute: function (element) {
						console.log("Swipe: delete");
						element.parent().slideUp();
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
				type: "drag",
				clone_element: true,
				start_event: null,
				events: {
					"move": function (doodad, event) {
						event.actionable_modifier.csscls("focus", true);
						event.modifier.csscls("unfocus", true);
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
						console.log('move');
						var element = event.element;
						var parent = element.parent();
						var w = parseInt(element.css("width"), 10)/3;
                        var x = parseInt(element.css("left"), 10) + w;
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
					"release": function (doodad, event) {
						var element = event.element;
						var w = parseInt(element.css("width"), 10)/3;
						var x = parseInt(element.css("left"), 10) + w;
						var actions = this.get('swipe_actions');

						for (var cls in actions) {
							a = actions[cls];

							if ((!('greater' in a) || x <= w * a.less) && (!('less' in a) || x >= w * a.greater)) {
								event.source.abort();
								if (a.execute)
									a.execute.call(this, element);
							}
						}
					}
				}
			},



		},

		functions: {
			click: function (doodad) {
				//this.set('click_counter',this.get('click_counter') + 1);
				console.log("Click ");
			}
		}

	}).register();

});

Scoped.define("module:Swipecontainer", [
	"dynamics:Dynamic",
	"module:Templates"
],[
	"ui:Dynamics.GesturePartial",
	"ui:Dynamics.InteractionPartial"
], function (Dynamic, Templates, scoped) {

	return Dynamic.extend({scoped: scoped}, {

		template: Templates.swipecontainer,

		attrs: {
			model: {
				value: "Swipeitem - Title"
			},
			lefticon: 'icon-ok',
			righticon: 'icon-time',
			inner: "clickitem",
			swipe_actions: {
				"other": {
					less: 0,
					greater: -1,
					execute: function () {
						//this.get("model").set("archived", true);
						console.log("Swipe: other");
					}
				},
				"archive": {
					greater : 0,
					less: 2 / 5,
					execute: function (element) {
						console.log("Swipe: archive");
						//element.parent().slideUp();
					}
				},
				"delete": {
					greater: 2 / 5,
					execute: function (element) {
						console.log("Swipe: delete");
						element.parent().slideUp();
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
						console.log('move');
						var element = event.element;
						var parent = element.parent();
						var w = parseInt(element.css("width"), 10)/3;
                        var x = parseInt(element.css("left"), 10) + w;
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
					"release": function (doodad, event) {
						var element = event.element;
						var w = parseInt(element.css("width"), 10)/3;
						var x = parseInt(element.css("left"), 10) + w;
						var actions = this.get('swipe_actions');

						for (var cls in actions) {
							a = actions[cls];

							if ((!('greater' in a) || x <= w * a.less) && (!('less' in a) || x >= w * a.greater)) {
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

Scoped.define("module:Eventitem", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template: Templates.eventitem,

        attrs: {
            counter : 0,
            model : {
                value : 'Evenitem - Clicked '
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
        }

    }).register();

});

Scoped.define("module:Selectableitem", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {
    Dynamic.extend({scoped: scoped}, {

        template: Templates.selectableitem,

        initial : {
            bind : {
                selected: "<+[tagname='ba-list']:selected_item"
            }
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
                this.scopes.parent_list.set('selected_item',{
                    cid : this.cid(),
                    value : this.properties().getProp('model.value')
                });
            }

        }

    }).register();
});


Scoped.define("module:List", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.list,

        attrs: {
            listitem: "clickitem",
            model: false
        },

        collections: {
            listcollection: [
                {value: "List - Item 1"},
                {value: "List - Item 2"},
                {value: "List - Item 3"}
            ]
        }

    }).register();

});

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


Scoped.define("module:Searchlist", [
    "dynamics:Dynamic",
    "module:Templates"
],[
    "module:List"
],function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.searchlist,

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

});

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


Scoped.define("module:Titledlist", [
    "dynamics:Dynamic",
    "module:Templates"
], [
  "module:List"
], function (Dynamic, Templates, scoped) {
    Dynamic.extend({scoped: scoped}, {

        template: Templates.titledlist,

        attrs: {
            model: {
                title_model: {
                    value: 'Titledlist - Title'
                }
                //listcollection : new BetaJS.Collections.Collection({objects:[
                //    {value: "Titledlist - Item 1"},
                //    {value: "Titledlist - Item 2"},
                //    {value: "Titledlist - Item 3"}
                //]})
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

BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Addtitle", {

    template: BetaJS.Dynamics.Components.Templates.addtitle,

    attrs: {
        model : {value: 'Title'}
    },

    functions : {

        clicktitle : function () {

            console.log("You clicked the Title, no clicktitle() given, toggle");
            this.scope('<').call('togglelist');

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