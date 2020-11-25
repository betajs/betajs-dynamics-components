/*!
betajs-dynamics-components - v0.1.136 - 2020-11-19
Copyright (c) Victor Lingenthal,Oliver Friedmann
Apache-2.0 Software License.
*/
/** @flow **//*!
betajs-scoped - v0.0.22 - 2019-10-23
Copyright (c) Oliver Friedmann
Apache-2.0 Software License.
*/
var Scoped = (function () {
var Globals = (function () {  
/** 
 * This helper module provides functions for reading and writing globally accessible namespaces, both in the browser and in NodeJS.
 * 
 * @module Globals
 * @access private
 */
return {
		
	/**
	 * Returns the value of a global variable.
	 * 
	 * @param {string} key identifier of a global variable
	 * @return value of global variable or undefined if not existing
	 */
	get : function(key/* : string */) {
		if (typeof window !== "undefined")
			return key ? window[key] : window;
		if (typeof global !== "undefined")
			return key ? global[key] : global;
		if (typeof self !== "undefined")
			return key ? self[key] : self;
		return undefined;
	},

	
	/**
	 * Sets a global variable.
	 * 
	 * @param {string} key identifier of a global variable
	 * @param value value to be set
	 * @return value that has been set
	 */
	set : function(key/* : string */, value) {
		if (typeof window !== "undefined")
			window[key] = value;
		if (typeof global !== "undefined")
			global[key] = value;
		if (typeof self !== "undefined")
			self[key] = value;
		return value;
	},
	
	
	/**
	 * Returns the value of a global variable under a namespaced path.
	 * 
	 * @param {string} path namespaced path identifier of variable
	 * @return value of global variable or undefined if not existing
	 * 
	 * @example
	 * // returns window.foo.bar / global.foo.bar 
	 * Globals.getPath("foo.bar")
	 */
	getPath: function (path/* : string */) {
		if (!path)
			return this.get();
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
	},


	/**
	 * Sets a global variable under a namespaced path.
	 * 
	 * @param {string} path namespaced path identifier of variable
	 * @param value value to be set
	 * @return value that has been set
	 * 
	 * @example
	 * // sets window.foo.bar / global.foo.bar 
	 * Globals.setPath("foo.bar", 42);
	 */
	setPath: function (path/* : string */, value) {
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
	}
	
};}).call(this);
/*::
declare module Helper {
	declare function extend<A, B>(a: A, b: B): A & B;
}
*/

var Helper = (function () {  
/** 
 * This helper module provides auxiliary functions for the Scoped system.
 * 
 * @module Helper
 * @access private
 */
return { 
		
	/**
	 * Attached a context to a function.
	 * 
	 * @param {object} obj context for the function
	 * @param {function} func function
	 * 
	 * @return function with attached context
	 */
	method: function (obj, func) {
		return function () {
			return func.apply(obj, arguments);
		};
	},

	
	/**
	 * Extend a base object with all attributes of a second object.
	 * 
	 * @param {object} base base object
	 * @param {object} overwrite second object
	 * 
	 * @return {object} extended base object
	 */
	extend: function (base, overwrite) {
		base = base || {};
		overwrite = overwrite || {};
		for (var key in overwrite)
			base[key] = overwrite[key];
		return base;
	},
	
	
	/**
	 * Returns the type of an object, particulary returning 'array' for arrays.
	 * 
	 * @param obj object in question
	 * 
	 * @return {string} type of object
	 */
	typeOf: function (obj) {
		return Object.prototype.toString.call(obj) === '[object Array]' ? "array" : typeof obj;
	},
	
	
	/**
	 * Returns whether an object is null, undefined, an empty array or an empty object.
	 * 
	 * @param obj object in question
	 * 
	 * @return true if object is empty
	 */
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
	
	
    /**
     * Matches function arguments against some pattern.
     * 
     * @param {array} args function arguments
     * @param {object} pattern typed pattern
     * 
     * @return {object} matched arguments as associative array 
     */	
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
	
	
	/**
	 * Stringifies a value as JSON and functions to string representations.
	 * 
	 * @param value value to be stringified
	 * 
	 * @return stringified value
	 */
	stringify: function (value) {
		if (this.typeOf(value) == "function")
			return "" + value;
		return JSON.stringify(value);
	}	

	
};}).call(this);
var Attach = (function () {  
/** 
 * This module provides functionality to attach the Scoped system to the environment.
 * 
 * @module Attach
 * @access private
 */
return { 
		
	__namespace: "Scoped",
	__revert: null,
	
	
	/**
	 * Upgrades a pre-existing Scoped system to the newest version present. 
	 * 
	 * @param {string} namespace Optional namespace (default is 'Scoped')
	 * @return {object} the attached Scoped system
	 */
	upgrade: function (namespace/* : ?string */) {
		var current = Globals.get(namespace || Attach.__namespace);
		if (current && Helper.typeOf(current) === "object" && current.guid === this.guid && Helper.typeOf(current.version) === "string") {
			if (this.upgradable === false || current.upgradable === false)
				return current;
			var my_version = this.version.split(".");
			var current_version = current.version.split(".");
			var newer = false;
			for (var i = 0; i < Math.min(my_version.length, current_version.length); ++i) {
				newer = parseInt(my_version[i], 10) > parseInt(current_version[i], 10);
				if (my_version[i] !== current_version[i])
					break;
			}
			return newer ? this.attach(namespace) : current;				
		} else
			return this.attach(namespace);		
	},


	/**
	 * Attaches the Scoped system to the environment. 
	 * 
	 * @param {string} namespace Optional namespace (default is 'Scoped')
	 * @return {object} the attached Scoped system
	 */
	attach : function(namespace/* : ?string */) {
		if (namespace)
			Attach.__namespace = namespace;
		var current = Globals.get(Attach.__namespace);
		if (current === this)
			return this;
		Attach.__revert = current;
		if (current) {
			try {
				var exported = current.__exportScoped();
				this.__exportBackup = this.__exportScoped();
				this.__importScoped(exported);
			} catch (e) {
				// We cannot upgrade the old version.
			}
		}
		Globals.set(Attach.__namespace, this);
		return this;
	},
	

	/**
	 * Detaches the Scoped system from the environment. 
	 * 
	 * @param {boolean} forceDetach Overwrite any attached scoped system by null.
	 * @return {object} the detached Scoped system
	 */
	detach: function (forceDetach/* : ?boolean */) {
		if (forceDetach)
			Globals.set(Attach.__namespace, null);
		if (typeof Attach.__revert != "undefined")
			Globals.set(Attach.__namespace, Attach.__revert);
		delete Attach.__revert;
		if (Attach.__exportBackup)
			this.__importScoped(Attach.__exportBackup);
		return this;
	},
	

	/**
	 * Exports an object as a module if possible. 
	 * 
	 * @param {object} mod a module object (optional, default is 'module')
	 * @param {object} object the object to be exported
	 * @param {boolean} forceExport overwrite potentially pre-existing exports
	 * @return {object} the Scoped system
	 */
	exports: function (mod, object, forceExport) {
		mod = mod || (typeof module != "undefined" ? module : null);
		if (typeof mod == "object" && mod && "exports" in mod && (forceExport || mod.exports === this || !mod.exports || Helper.isEmpty(mod.exports)))
			mod.exports = object || this;
		return this;
	}	

};}).call(this);

function newNamespace (opts/* : {tree ?: boolean, global ?: boolean, root ?: Object} */) {

	var options/* : {
		tree: boolean,
	    global: boolean,
	    root: Object
	} */ = {
		tree: typeof opts.tree === "boolean" ? opts.tree : false,
		global: typeof opts.global === "boolean" ? opts.global : false,
		root: typeof opts.root === "object" ? opts.root : {}
	};

	/*::
	type Node = {
		route: ?string,
		parent: ?Node,
		children: any,
		watchers: any,
		data: any,
		ready: boolean,
		lazy: any
	};
	*/

	function initNode(options)/* : Node */ {
		return {
			route: typeof options.route === "string" ? options.route : null,
			parent: typeof options.parent === "object" ? options.parent : null,
			ready: typeof options.ready === "boolean" ? options.ready : false,
			children: {},
			watchers: [],
			data: {},
			lazy: []
		};
	}
	
	var nsRoot = initNode({ready: true});
	
	if (options.tree) {
		if (options.global) {
			try {
				if (window)
					nsRoot.data = window;
			} catch (e) { }
			try {
				if (global)
					nsRoot.data = global;
			} catch (e) { }
			try {
				if (self)
					nsRoot.data = self;
			} catch (e) { }
		} else
			nsRoot.data = options.root;
	}
	
	function nodeDigest(node/* : Node */) {
		if (node.ready)
			return;
		if (node.parent && !node.parent.ready) {
			nodeDigest(node.parent);
			return;
		}
		if (node.route && node.parent && (node.route in node.parent.data)) {
			node.data = node.parent.data[node.route];
			node.ready = true;
			for (var i = 0; i < node.watchers.length; ++i)
				node.watchers[i].callback.call(node.watchers[i].context || this, node.data);
			node.watchers = [];
			for (var key in node.children)
				nodeDigest(node.children[key]);
		}
	}
	
	function nodeEnforce(node/* : Node */) {
		if (node.ready)
			return;
		if (node.parent && !node.parent.ready)
			nodeEnforce(node.parent);
		node.ready = true;
		if (node.parent) {
			if (options.tree && typeof node.parent.data == "object")
				node.parent.data[node.route] = node.data;
		}
		for (var i = 0; i < node.watchers.length; ++i)
			node.watchers[i].callback.call(node.watchers[i].context || this, node.data);
		node.watchers = [];
	}
	
	function nodeSetData(node/* : Node */, value) {
		if (typeof value == "object" && node.ready) {
			for (var key in value)
				node.data[key] = value[key];
		} else
			node.data = value;
		if (typeof value == "object") {
			for (var ckey in value) {
				if (node.children[ckey])
					node.children[ckey].data = value[ckey];
			}
		}
		nodeEnforce(node);
		for (var k in node.children)
			nodeDigest(node.children[k]);
	}
	
	function nodeClearData(node/* : Node */) {
		if (node.ready && node.data) {
			for (var key in node.data)
				delete node.data[key];
		}
	}
	
	function nodeNavigate(path/* : ?String */) {
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
	
	function nodeAddWatcher(node/* : Node */, callback, context) {
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
	
	function nodeUnresolvedWatchers(node/* : Node */, base, result) {
		node = node || nsRoot;
		result = result || [];
		if (!node.ready && node.lazy.length === 0 && node.watchers.length > 0)
			result.push(base);
		for (var k in node.children) {
			var c = node.children[k];
			var r = (base ? base + "." : "") + c.route;
			result = nodeUnresolvedWatchers(c, r, result);
		}
		return result;
	}

	/** 
	 * The namespace module manages a namespace in the Scoped system.
	 * 
	 * @module Namespace
	 * @access public
	 */
	return {
		
		/**
		 * Extend a node in the namespace by an object.
		 * 
		 * @param {string} path path to the node in the namespace
		 * @param {object} value object that should be used for extend the namespace node
		 */
		extend: function (path, value) {
			nodeSetData(nodeNavigate(path), value);
		},
		
		/**
		 * Set the object value of a node in the namespace.
		 * 
		 * @param {string} path path to the node in the namespace
		 * @param {object} value object that should be used as value for the namespace node
		 */
		set: function (path, value) {
			var node = nodeNavigate(path);
			if (node.data)
				nodeClearData(node);
			nodeSetData(node, value);
		},
		
		/**
		 * Read the object value of a node in the namespace.
		 * 
		 * @param {string} path path to the node in the namespace
		 * @return {object} object value of the node or null if undefined
		 */
		get: function (path) {
			var node = nodeNavigate(path);
			return node.ready ? node.data : null;
		},
		
		/**
		 * Lazily navigate to a node in the namespace.
		 * Will asynchronously call the callback as soon as the node is being touched.
		 *
		 * @param {string} path path to the node in the namespace
		 * @param {function} callback callback function accepting the node's object value
		 * @param {context} context optional callback context
		 */
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
		
		/**
		 * Digest a node path, checking whether it has been defined by an external system.
		 * 
		 * @param {string} path path to the node in the namespace
		 */
		digest: function (path) {
			nodeDigest(nodeNavigate(path));
		},
		
		/**
		 * Asynchronously access a node in the namespace.
		 * Will asynchronously call the callback as soon as the node is being defined.
		 *
		 * @param {string} path path to the node in the namespace
		 * @param {function} callback callback function accepting the node's object value
		 * @param {context} context optional callback context
		 */
		obtain: function (path, callback, context) {
			nodeAddWatcher(nodeNavigate(path), callback, context);
		},
		
		/**
		 * Returns all unresolved watchers under a certain path.
		 * 
		 * @param {string} path path to the node in the namespace
		 * @return {array} list of all unresolved watchers 
		 */
		unresolvedWatchers: function (path) {
			return nodeUnresolvedWatchers(nodeNavigate(path), path);
		},
		
		__export: function () {
			return {
				options: options,
				nsRoot: nsRoot
			};
		},
		
		__import: function (data) {
			options = data.options;
			nsRoot = data.nsRoot;
		}
		
	};
	
}
function newScope (parent, parentNS, rootNS, globalNS) {
	
	var self = this;
	var nextScope = null;
	var childScopes = [];
	var parentNamespace = parentNS;
	var rootNamespace = rootNS;
	var globalNamespace = globalNS;
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
                var _arguments = [];
                for (var a = 0; a < arguments.length; ++a)
                    _arguments.push(arguments[a]);
                _arguments[_arguments.length - 1].ns = ns;
				if (this.options.compile) {
					var params = [];
					for (var i = 0; i < argmts.length; ++i)
						params.push(Helper.stringify(argmts[i]));
					this.compiled += this.options.ident + "." + name + "(" + params.join(", ") + ");\n\n";
				}
				if (this.options.dependencies) {
					this.dependencies[ns.path] = this.dependencies[ns.path] || {};
					if (args.dependencies) {
						args.dependencies.forEach(function (dep) {
							this.dependencies[ns.path][this.resolve(dep).path] = true;
						}, this);
					}
					if (args.hiddenDependencies) {
						args.hiddenDependencies.forEach(function (dep) {
							this.dependencies[ns.path][this.resolve(dep).path] = true;
						}, this);
					}
				}
				var result = this.options.compile ? {} : args.callback.apply(args.context || this, _arguments);
				callback.call(this, ns, result);
			}, this);
		};
		
		if (options.lazy)
			ns.namespace.lazy(ns.path, execute, this);
		else
			execute.apply(this);

		return this;
	};
	
	/** 
	 * This module provides all functionality in a scope.
	 * 
	 * @module Scoped
	 * @access public
	 */
	return {
		
		getGlobal: Helper.method(Globals, Globals.getPath),
		setGlobal: Helper.method(Globals, Globals.setPath),
		
		options: {
			lazy: false,
			ident: "Scoped",
			compile: false,
			dependencies: false
		},
		
		compiled: "",
		
		dependencies: {},
		
		
		/**
		 * Returns a reference to the next scope that will be obtained by a subScope call.
		 * 
		 * @return {object} next scope
		 */
		nextScope: function () {
			if (!nextScope)
				nextScope = newScope(this, localNamespace, rootNamespace, globalNamespace);
			return nextScope;
		},
		
		/**
		 * Creates a sub scope of the current scope and returns it.
		 * 
		 * @return {object} sub scope
		 */
		subScope: function () {
			var sub = this.nextScope();
			childScopes.push(sub);
			nextScope = null;
			return sub;
		},
		
		/**
		 * Creates a binding within in the scope. 
		 * 
		 * @param {string} alias identifier of the new binding
		 * @param {string} namespaceLocator identifier of an existing namespace path
		 * @param {object} options options for the binding
		 * 
		 */
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
		
		
		/**
		 * Resolves a name space locator to a name space.
		 * 
		 * @param {string} namespaceLocator name space locator
		 * @return {object} resolved name space
		 * 
		 */
		resolve: function (namespaceLocator) {
			var parts = namespaceLocator.split(":");
			if (parts.length == 1) {
                throw ("The locator '" + parts[0] + "' requires a namespace.");
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

		
		/**
		 * Defines a new name space once a list of name space locators is available.
		 * 
		 * @param {string} namespaceLocator the name space that is to be defined
		 * @param {array} dependencies a list of name space locator dependencies (optional)
		 * @param {array} hiddenDependencies a list of hidden name space locators (optional)
		 * @param {function} callback a callback function accepting all dependencies as arguments and returning the new definition
		 * @param {object} context a callback context (optional)
		 * 
		 */
		define: function () {
			return custom.call(this, arguments, "define", function (ns, result) {
				if (ns.namespace.get(ns.path))
					throw ("Scoped namespace " + ns.path + " has already been defined. Use extend to extend an existing namespace instead");
				ns.namespace.set(ns.path, result);
			});
		},
		
		
		/**
		 * Assume a specific version of a module and fail if it is not met.
		 * 
		 * @param {string} assumption name space locator
		 * @param {string} version assumed version
		 * 
		 */
		assumeVersion: function () {
			var args = Helper.matchArgs(arguments, {
				assumption: true,
				dependencies: "array",
				callback: true,
				context: "object",
				error: "string"
			});
			var dependencies = args.dependencies || [];
			dependencies.unshift(args.assumption);
			this.require(dependencies, function () {
				var argv = arguments;
				var assumptionValue = argv[0].replace(/[^\d\.]/g, "");
				argv[0] = assumptionValue.split(".");
				for (var i = 0; i < argv[0].length; ++i)
					argv[0][i] = parseInt(argv[0][i], 10);
				if (Helper.typeOf(args.callback) === "function") {
					if (!args.callback.apply(args.context || this, args))
						throw ("Scoped Assumption '" + args.assumption + "' failed, value is " + assumptionValue + (args.error ? ", but assuming " + args.error : ""));
				} else {
					var version = (args.callback + "").replace(/[^\d\.]/g, "").split(".");
					for (var j = 0; j < Math.min(argv[0].length, version.length); ++j)
						if (parseInt(version[j], 10) > argv[0][j])
							throw ("Scoped Version Assumption '" + args.assumption + "' failed, value is " + assumptionValue + ", but assuming at least " + args.callback);
				}
			});
		},
		
		
		/**
		 * Extends a potentially existing name space once a list of name space locators is available.
		 * 
		 * @param {string} namespaceLocator the name space that is to be defined
		 * @param {array} dependencies a list of name space locator dependencies (optional)
		 * @param {array} hiddenDependencies a list of hidden name space locators (optional)
		 * @param {function} callback a callback function accepting all dependencies as arguments and returning the new additional definitions.
		 * @param {object} context a callback context (optional)
		 * 
		 */
		extend: function () {
			return custom.call(this, arguments, "extend", function (ns, result) {
				ns.namespace.extend(ns.path, result);
			});
		},
				
		
		/**
		 * Requires a list of name space locators and calls a function once they are present.
		 * 
		 * @param {array} dependencies a list of name space locator dependencies (optional)
		 * @param {array} hiddenDependencies a list of hidden name space locators (optional)
		 * @param {function} callback a callback function accepting all dependencies as arguments
		 * @param {object} context a callback context (optional)
		 * 
		 */
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

		
		/**
		 * Digest a name space locator, checking whether it has been defined by an external system.
		 * 
		 * @param {string} namespaceLocator name space locator
		 */
		digest: function (namespaceLocator) {
			var ns = this.resolve(namespaceLocator);
			ns.namespace.digest(ns.path);
			return this;
		},
		
		
		/**
		 * Returns all unresolved definitions under a namespace locator
		 * 
		 * @param {string} namespaceLocator name space locator, e.g. "global:"
		 * @return {array} list of all unresolved definitions 
		 */
		unresolved: function (namespaceLocator) {
			var ns = this.resolve(namespaceLocator);
			return ns.namespace.unresolvedWatchers(ns.path);
		},
		
		/**
		 * Exports the scope.
		 * 
		 * @return {object} exported scope
		 */
		__export: function () {
			return {
				parentNamespace: parentNamespace.__export(),
				rootNamespace: rootNamespace.__export(),
				globalNamespace: globalNamespace.__export(),
				localNamespace: localNamespace.__export(),
				privateNamespace: privateNamespace.__export()
			};
		},
		
		/**
		 * Imports a scope from an exported scope.
		 * 
		 * @param {object} data exported scope to be imported
		 * 
		 */
		__import: function (data) {
			parentNamespace.__import(data.parentNamespace);
			rootNamespace.__import(data.rootNamespace);
			globalNamespace.__import(data.globalNamespace);
			localNamespace.__import(data.localNamespace);
			privateNamespace.__import(data.privateNamespace);
		}
		
	};
	
}
var globalNamespace = newNamespace({tree: true, global: true});
var rootNamespace = newNamespace({tree: true});
var rootScope = newScope(null, rootNamespace, rootNamespace, globalNamespace);

var Public = Helper.extend(rootScope, (function () {  
/** 
 * This module includes all public functions of the Scoped system.
 * 
 * It includes all methods of the root scope and the Attach module.
 * 
 * @module Public
 * @access public
 */
return {
		
	guid: "4b6878ee-cb6a-46b3-94ac-27d91f58d666",
	version: '0.0.22',

	upgradable: true,
		
	upgrade: Attach.upgrade,
	attach: Attach.attach,
	detach: Attach.detach,
	exports: Attach.exports,
	
	/**
	 * Exports all data contained in the Scoped system.
	 * 
	 * @return data of the Scoped system.
	 * @access private
	 */
	__exportScoped: function () {
		return {
			globalNamespace: globalNamespace.__export(),
			rootNamespace: rootNamespace.__export(),
			rootScope: rootScope.__export()
		};
	},
	
	/**
	 * Import data into the Scoped system.
	 * 
	 * @param data of the Scoped system.
	 * @access private
	 */
	__importScoped: function (data) {
		globalNamespace.__import(data.globalNamespace);
		rootNamespace.__import(data.rootNamespace);
		rootScope.__import(data.rootScope);
	}
	
};

}).call(this));

Public = Public.upgrade();
Public.exports();
	return Public;
}).call(this);
/*!
betajs-dynamics-components - v0.1.136 - 2020-11-19
Copyright (c) Victor Lingenthal,Oliver Friedmann
Apache-2.0 Software License.
*/

(function () {
var Scoped = this.subScope();
Scoped.binding('module', 'global:BetaJS.Dynamics.Components');
Scoped.binding('base', 'global:BetaJS');
Scoped.binding('browser', 'global:BetaJS.Browser');
Scoped.binding('dynamics', 'global:BetaJS.Dynamics');
Scoped.binding('ui', 'global:BetaJS.UI');
Scoped.define("module:", function () {
	return {
    "guid": "ced27948-1e6f-490d-b6c1-548d39e8cd8d",
    "version": "0.1.136",
    "datetime": 1605775634651
};
});
Scoped.assumeVersion('base:version', '~1.0.96');
Scoped.assumeVersion('browser:version', '~1.0.65');
Scoped.assumeVersion('dynamics:version', '~0.0.83');
Scoped.assumeVersion('ui:version', '~1.0.37');
Scoped.define("module:Dropdown", [
    "dynamics:Dynamic",
    "base:Properties.Properties"
], [
    "dynamics:Partials.EventForwardPartial",
    "dynamics:Partials.EventPartial",
    "dynamics:Partials.TapPartial",
    "module:List"
], function(Dynamic, Properties, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<button\n        onblur=\"{{this.execute('blur')}}\"\n        ba-tap=\"{{click()}}\"\n        class=\"{{showdropdown ? 'icon-angle-up' : view.icon}}\">\n    <dropdown ba-show=\"{{showdropdown}}\">\n        <description ba-if=\"{{view.description}}\">\n            {{view.description}}\n        </description>\n        <ba-{{view.dropdown}}\n            ba-view.listitem=\"{{view.listitem}}\"\n            ba-event:item-click=\"hide_dropdown\"\n            ba-event:hide-dropdown=\"hide_dropdown\"\n            ba-event-forward:dropdown\n            ba-event-forward\n            ba-model='{{dropdownmodel}}'\n            ba-listcollection='{{dropdownmodel}}'\n        ></ba-{{view.dropdown}}>\n    </dropdown>\n</button>\n",

        attrs: function() {
            return {
                view: {
                    description: null,
                    dropdown: 'list',
                    icon: 'icon-more_vert',
                    useremove: true
                },
                dropdownmodel: {},
                value: null,
                showdropdown: false
            };
        },

        extendables: ['view'],

        functions: {
            click: function() {
                if (this.get('showdropdown') === false) {
                    this.set('showdropdown', true);
                    this.element()[0].focus();
                } else
                    this.set('showdropdown', false);
            },
            blur: function() {
                if (window.getComputedStyle(this.element()[0]).getPropertyValue("opacity") == 1) {
                    this.execute('hide_dropdown');
                }
            },
            hide_dropdown: function() {
                this.set('showdropdown', false);
            }
        }

    }).registerFunctions({
        /**/"this.execute('blur')": function (obj) { with (obj) { return this.execute('blur'); } }, "click()": function (obj) { with (obj) { return click(); } }, "showdropdown ? 'icon-angle-up' : view.icon": function (obj) { with (obj) { return showdropdown ? 'icon-angle-up' : view.icon; } }, "showdropdown": function (obj) { with (obj) { return showdropdown; } }, "view.description": function (obj) { with (obj) { return view.description; } }, "view.dropdown": function (obj) { with (obj) { return view.dropdown; } }, "view.listitem": function (obj) { with (obj) { return view.listitem; } }, "dropdownmodel": function (obj) { with (obj) { return dropdownmodel; } }/**/
    }).register();

});
Scoped.define("module:Dropdownselect", [
    "dynamics:Dynamic",
    "base:Properties.Properties"
], [
    "dynamics:Partials.EventForwardPartial",
    "dynamics:Partials.EventPartial",
    "dynamics:Partials.TapPartial",
    "module:List",
    "module:Clickitem"
], function(Dynamic, Properties, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<button\n        onblur=\"{{this.execute('blur')}}\"\n        ba-tap=\"{{click()}}\"\n        class=\"{{model.icon || view.icon}}\"\n        style=\"color: {{model.icon_color}}; background: {{model.background}}\" >\n    <dropdownselect ba-show=\"{{showdropdown}}\">\n        <description ba-if=\"{{view.description}}\">\n            {{view.description}}\n        </description>\n        <ba-clickitem\n                ba-model=\"{{addmodel}}\"\n                ba-if=\"{{view.useradd}}\"\n                ba-event:click=\"add_model\"\n                ba-event-forward:dropdownselect=\"{{[]}}\"\n        ></ba-clickitem>\n        <ba-{{view.dropdown}}\n            ba-view.listitem=\"{{view.listitem}}\"\n            ba-event:item-click=\"hide_dropdown\"\n            ba-event-forward:dropdownselect=\"{{[]}}\"\n            ba-model='{{dropdownmodel}}'\n            ba-listcollection='{{dropdownmodel}}'\n\n        ></ba-{{view.dropdown}}>\n        <ba-clickitem\n                ba-model=\"{{removemodel}}\"\n                ba-if=\"{{view.useremove}}\"\n                ba-event:click=\"remove_selected\"\n                ba-event-forward:dropdownselect=\"{{[]}}\"\n        ></ba-clickitem>\n    </dropdownselect>\n</button>\n",

        attrs: function() {
            return {
                view: {
                    description: null,
                    dropdown: 'list',
                    icon: 'icon-more_vert',
                    color: null,
                    background: null,
                    useremove: true,
                    useradd: true
                },
                model: new Properties({
                    icon: 'icon-more_vert',
                    color: null,
                    background: null
                }),
                addmodel: new Properties({
                    icon: 'icon-plus',
                    background: 'white',
                    value: 'New Group'
                }),
                removemodel: new Properties({
                    icon: 'icon-remove',
                    background: 'white',
                    value: 'None'
                }),
                dropdownmodel: {},
                value: null,
                showdropdown: false
            };
        },

        create: function() {
            if (!this.get('model')) this.set('model', this.get('view'));
        },

        extendables: ['view'],

        functions: {
            click: function() {
                if (this.get('showdropdown') === false) {
                    this.set('showdropdown', true);
                    this.element()[0].focus();
                } else
                    this.set('showdropdown', false);
            },
            blur: function() {
                if (window.getComputedStyle(this.element()[0]).getPropertyValue("opacity") == 1) {
                    this.execute('hide_dropdown');
                }
            },
            hide_dropdown: function() {
                this.set('showdropdown', false);
            },
            add_model: function() {
                this.trigger('add-model');
                this.execute('hide_dropdown');
            },
            remove_selected: function() {
                this.set('model', this.get('view'));
                this.execute('hide_dropdown');
            }
        }

    }).registerFunctions({
        /**/"this.execute('blur')": function (obj) { with (obj) { return this.execute('blur'); } }, "click()": function (obj) { with (obj) { return click(); } }, "model.icon || view.icon": function (obj) { with (obj) { return model.icon || view.icon; } }, "model.icon_color": function (obj) { with (obj) { return model.icon_color; } }, "model.background": function (obj) { with (obj) { return model.background; } }, "showdropdown": function (obj) { with (obj) { return showdropdown; } }, "view.description": function (obj) { with (obj) { return view.description; } }, "addmodel": function (obj) { with (obj) { return addmodel; } }, "view.useradd": function (obj) { with (obj) { return view.useradd; } }, "[]": function (obj) { with (obj) { return []; } }, "view.dropdown": function (obj) { with (obj) { return view.dropdown; } }, "view.listitem": function (obj) { with (obj) { return view.listitem; } }, "dropdownmodel": function (obj) { with (obj) { return dropdownmodel; } }, "removemodel": function (obj) { with (obj) { return removemodel; } }, "view.useremove": function (obj) { with (obj) { return view.useremove; } }/**/
    }).register();

});
Scoped.define("module:Htmlview", [
    "dynamics:Dynamic",
    "base:Async",
    "browser:Loader",
    "browser:Dom",
    "ui:Interactions.Pinch"
], function(Dynamic, Async, Loader, Dom, Pinch, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<iframe frameBorder='0' scrolling='no'></iframe>",

        attrs: {
            "html": "",
            "loadhtml": "",
            "fakezoom": false
        },

        types: {
            "fakezoom": "boolean"
        },

        events: {
            "change:html": function() {
                if (this.activated())
                    this._updateIFrame();
            },
            "change:loadhtml": function() {
                this._loadHtml();
            }
        },

        _loadHtml: function() {
            if (this.get("loadhtml")) {
                Loader.loadHtml(this.get("loadhtml"), function(content) {
                    this.set("html", content);
                }, this);
            }
        },

        _cleanupContent: function(content) {
            var contentHtml = Dom.elementByTemplate("<div>" + content + "</div>");
            // Remove malicious scripts
            var scripts = contentHtml.querySelectorAll("script");
            for (var i = 0; i < scripts.length; ++i)
                scripts[i].parentNode.removeChild(scripts[i]);
            // Remove malicious iframes
            var iframes = contentHtml.querySelectorAll("iframe");
            for (var j = 0; j < iframes.length; ++j)
                iframes[j].parentNode.removeChild(iframes[j]);
            return contentHtml;
        },

        create: function() {
            var helper = function() {
                Async.eventually(function() {
                    if (this.destroyed())
                        return;
                    this._updateSize();
                    this._timeout *= 2;
                    helper.call(this);
                }, this, this._timeout);
            };
            helper.call(this);
            this._loadHtml();
        },

        _iframe: function() {
            return this.activeElement().querySelector("iframe");
        },

        _iframeHtml: function() {
            return this._iframe().contentDocument.querySelector("html");
        },

        _iframeBody: function() {
            return this._iframe().contentDocument.querySelector("body");
        },

        _afterActivate: function() {
            this._updateIFrame();
            Async.eventually(function() {
                if (this.destroyed())
                    return;
                if (this.get("fakezoom")) {
                    var zoom = 100;
                    var iframe = this._iframe();
                    var element = this._iframeBody();
                    var pinch = this.auto_destroy(new Pinch(element, {
                        enabled: true
                    }));
                    pinch.on("pinch", function(details) {
                        var delta = details.delta_last.x;
                        zoom += delta / 5;
                        iframe.style.zoom = zoom + "%";
                    });
                }
            }, this, 1000);
        },

        _updateIFrame: function() {
            this._iframeHtml().innerHTML = this._cleanupContent(this.get('html')).innerHTML;
            this._updateSize();
            this._timeout = 100;
        },

        _updateSize: function() {
            var iframe = this.activeElement().querySelector("iframe");
            var iframe_body = iframe.contentDocument.querySelector("html") || iframe.contentDocument.querySelector("body");
            var inner_width = iframe_body.scrollWidth;
            var inner_height = iframe_body.scrollHeight;
            if (!iframe.contentDocument.querySelector("body")) {
                inner_height = 1;
                var children = iframe.contentDocument.querySelector("html");
                for (var i = 0; i < children.length; ++i) {
                    var tn = children[i].tagName.toLowerCase();
                    if (tn === "style" || tn === "script" || tn === "head")
                        return;
                    inner_height = Math.max(inner_height, children[i].innerHeight + children[i].offsetTop);
                }
            }
            var outer_width = iframe.clientWidth;
            var scale = outer_width / inner_width;
            if (Math.abs(inner_height - iframe.clientHeight) < 2)
                return;
            iframe_body.style.MozTransform = 'scale(' + scale + ')';
            iframe_body.style.zoom = (scale * 100) + '%';
            iframe.style.width = iframe.parentNode.offsetWidth + "px";
            iframe.style.height = Math.ceil(inner_height * scale + 10) + "px";
        }
    }).registerFunctions({
        /**//**/
    }).register();

});
Scoped.define("module:Clickinput", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<title\n        ba-if=\"{{!view.edit && !view.externaledit}}\"\n        ba-click=\"{{edititem()}}\"\n>{{model.value}}</title>\n\n<input\n        placeholder=\"{{view.placeholder || ''}}\"\n        ba-if=\"{{view.edit || view.externaledit}}\"\n        ba-return=\"{{view.edit = false}}\"\n        onblur=\"{{view.edit = false}}\"\n        value=\"{{=model.value}}\" />\n",

        attrs: function() {
            return {
                model: {
                    value: "Test"
                },
                view: {
                    placeholder: "",
                    edit: false,
                    autofocus: true,
                    externaledit: false
                }
            };
        },

        extendables: ['view'],

        functions: {
            edititem: function() {

                this.trigger('edititem');

                if (this.getProp('view.externaledit')) {

                    this.setProp('view.edit', true);

                    var SearchInput = this.activeElement().querySelector("input");
                    var strLength = this.getProp('model.value').length;
                    SearchInput.focus();
                    SearchInput.setSelectionRange(strLength, strLength);

                }
            }
        }

    }).registerFunctions({
        /**/"!view.edit && !view.externaledit": function (obj) { with (obj) { return !view.edit && !view.externaledit; } }, "edititem()": function (obj) { with (obj) { return edititem(); } }, "model.value": function (obj) { with (obj) { return model.value; } }, "view.placeholder || ''": function (obj) { with (obj) { return view.placeholder || ''; } }, "view.edit || view.externaledit": function (obj) { with (obj) { return view.edit || view.externaledit; } }, "view.edit = false": function (obj) { with (obj) { return view.edit = false; } }/**/
    }).register();

});
Scoped.define("module:Input", [
    "dynamics:Dynamic"
], [
    "dynamics:Partials.OnPartial"
], function(Dynamic, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<input\n        value=\"{{value}}\"\n        ba-on:keydown=\"{{keydown(event)}}\"\n        placeholder=\"{{view.placeholder || ''}}\"\n        autofocus />",

        attrs: {
            value: "",
            view: {
                placeholder: "",
                autofocus: true
            }

        },

        functions: {
            blur: function() {
                this.trigger('blur');
                this.element()[0].blur();
            },
            keydown: function(event) {
                if (event.code === "Enter" && !event.shiftKey) {
                    this.execute("blur");
                    event.preventDefault();
                }
            }

        }

    }).registerFunctions({
        /**/"value": function (obj) { with (obj) { return value; } }, "keydown(event)": function (obj) { with (obj) { return keydown(event); } }, "view.placeholder || ''": function (obj) { with (obj) { return view.placeholder || ''; } }/**/
    }).register();

});
Scoped.define("module:Scrollpicker", [
    "dynamics:Dynamic",
    "ui:Interactions.Loopscroll",
    "base:Async"
], [
    // It has to be a repeat element partial, otherwise whitespace is removed from container
    "dynamics:Partials.RepeatElementPartial"
], function (Dynamic, Loopscroll, Async, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {
        template: "<container ba-interaction:loopscroll=\"{{loopscroll}}\">\n        <element ba-repeat-element=\"{{value :: values}}\" data-value=\"{{value}}\">\n                {{value}}\n        </element>\n</container>\n<scrolloverlay ba-class=\"{{{\n                  valuetop : top\n               }}}\">\n        <pickeroverlay></pickeroverlay>\n        <valueoverlay></valueoverlay>\n</scrolloverlay>",
        proxyAttrs: true,
        attrs: {
            first: 0,
            last: 23,
            atleast: 100,
            increment: 1,
            top: false,
            value: 10,
            valueadd: 0
        },
        types: {
            first: "int",
            last: "int",
            increment: "int",
            top: "bool",
            value: "int",
            valueadd: "int"
        },
        events: {
            "change:value": function (value) {
                if (!this.activeElement() || !this.activeElement().querySelector("container"))
                    return;
                if (!this.__ignoreValue)
                    this._loopScroll().scrollToElement(this.getElementByValue(this.attrs.value));
            }
        },
        create: function () {
            var values = [];
            var dir = (this.attrs.first <= this.attrs.last ? 1 : -1);
            while (values.length < this.attrs.atleast) {
                for (var i = this.attrs.first; dir * (this.attrs.last - i) >= 0; i += dir * this.attrs.increment)
                    values.push(i);
            }
            this.set('values', values);
            this.set("loopscroll", {
                type: "loopscroll",
                enabled: true,
                currentTop: this.attrs.top,
                discrete: true,
                scrollEndTimeout: 200,
                elementMargin: 0,
                currentCenter: true,
                currentElementClass: "selected",
                discreteUpperThreshold: 0.99,
                discreteLowerThreshold: 0.01,
                scrollToOnClick: true
            });
        },
        _loopScroll: function () {
            var loopscroll = null;
            // This is not particularly nice, but we'll improve on this later.
            var interactions = this.activeElement().querySelector("container").dynnodehandler.interactions;
            if (interactions)
                loopscroll = interactions.loopscroll;
            else
                return;
            return loopscroll;
        },
        _encodeValue: function (value) {
            value += this.attrs.valueadd;
            var delta = this.attrs.first - value;
            delta = Math.round(delta / this.attrs.increment) * this.attrs.increment;
            value = this.attrs.first - delta;
            value = this.attrs.first <= this.attrs.last ?
                Math.max(this.attrs.first, Math.min(this.attrs.last, value)) :
                Math.max(this.attrs.last, Math.min(this.attrs.first, value));
            return value;
        },
        _decodeValue: function (value) {
            return value - this.attrs.valueadd;
        },
        getElementByValue: function (value) {
            return this.activeElement().querySelector("[data-value='" + this._encodeValue(value) + "']");
        },
        getValueByElement: function (element) {
            return this._decodeValue(parseInt(element.dataset.value, 10));
        },
        _afterActivate: function (element) {
            // This is a massive hack.
            this.activeElement().querySelector("[ba-repeat-element]").remove();
            Async.eventually(function () {
                this._loopScroll().scrollToElement(this.getElementByValue(this.attrs.value));
                this._loopScroll().on("change-current-element", function (element) {
                    this.__ignoreValue = true;
                    this.attrs.value = this.getValueByElement(element);
                    this.__ignoreValue = false;
                }, this);
            }, this);
        }
    }).registerFunctions({
    /**/"loopscroll": function (obj) { with (obj) { return loopscroll; } }, "values": function (obj) { with (obj) { return values; } }, "value": function (obj) { with (obj) { return value; } }, "{\n                  valuetop : top\n               }": function (obj) { with (obj) { return {
                  valuetop : top
               }; } }/**/
    }).register();
});

Scoped.define("module:Search", [
    "dynamics:Dynamic"
], [
    "module:Loading",
    "module:Dropdown"
], function(Dynamic, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<icon\n        ba-if=\"{{!searching}}\"\n        class=\"icon-search\"\n></icon>\n\n<ba-loading ba-if=\"{{searching}}\"></ba-loading>\n\n<div>\n    <input\n            onfocus=\"{{this.execute('onfocus')}}\"\n            onblur=\"{{this.execute('onblur')}}\"\n            placeholder=\"{{view.placeholder || ''}}\"\n            value=\"{{=value}}\"\n    />\n    <span\n            class=\"icon-remove\"\n            ba-if=\"{{value}}\"\n            ba-tap=\"{{clearsearch()}}\"\n    ></span>\n</div>\n\n<ba-{{view.searchbuttons}}\n        ba-if=\"{{nosearch}}\"\n        ba-event-forward\n></ba-{{view.searchbuttons}}>\n\n<ba-dropdown\n        ba-if=\"{{view.filter_visible}}\"\n        ba-event:~dropdown-item-click=\"searchdropdown-click\"\n        ba-view.icon=\"icon-filter\"\n        ba-dropdownmodel=\"{{view.dropdownmodel}}\"\n></ba-dropdown>\n",

        attrs: {
            value: "",
            loading: false,
            nosearch: true,
            view: {
                placeholder: "Placeholder",
                autofocus: true,
                filter_visible: false,
                searchbuttons: null
            }
        },

        extendables: ['view'],

        events: {
            'change:value': function(value) {
                this.set('loading', !!value);
            }
        },

        functions: {
            onfocus: function() {
                this.set('nosearch', false);
            },
            onblur: function() {
                this.set('nosearch', true);
            },
            clearsearch: function() {
                this.set('value', '');
            }
        }

    }).registerFunctions({
        /**/"!searching": function (obj) { with (obj) { return !searching; } }, "searching": function (obj) { with (obj) { return searching; } }, "this.execute('onfocus')": function (obj) { with (obj) { return this.execute('onfocus'); } }, "this.execute('onblur')": function (obj) { with (obj) { return this.execute('onblur'); } }, "view.placeholder || ''": function (obj) { with (obj) { return view.placeholder || ''; } }, "value": function (obj) { with (obj) { return value; } }, "clearsearch()": function (obj) { with (obj) { return clearsearch(); } }, "view.searchbuttons": function (obj) { with (obj) { return view.searchbuttons; } }, "nosearch": function (obj) { with (obj) { return nosearch; } }, "view.filter_visible": function (obj) { with (obj) { return view.filter_visible; } }, "view.dropdownmodel": function (obj) { with (obj) { return view.dropdownmodel; } }/**/
    }).register();

});
Scoped.define("module:Swipepicker", [
    "dynamics:Dynamic",
    "ui:Interactions.Loopscroll",
    "base:Async"
], [
    // It has to be a repeat element partial, otherwise whitespace is removed from container
    "dynamics:Partials.RepeatElementPartial"
], function(Dynamic, Loopscroll, Async, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<container ba-interaction:loopscroll=\"{{loopscroll}}\">\n        <element ba-repeat-element=\"{{value :: values}}\" data-value=\"{{value}}\">\n                {{value}}\n        </element>\n</container>\n<scrolloverlay ba-class=\"{{{\n                  valuetop : top\n               }}}\">\n        <pickeroverlay></pickeroverlay>\n        <valueoverlay></valueoverlay>\n</scrolloverlay>\n",

        attrs: {
            first: 0,
            last: 23,
            atleast: 100,
            increment: 1,
            top: false,
            value: 10,
            valueadd: 0
        },

        types: {
            first: "int",
            last: "int",
            increment: "int",
            top: "bool",
            value: "int",
            valueadd: "int"
        },

        events: {
            "change:value": function(value) {
                if (!this.activeElement() || !this.activeElement().querySelector("container"))
                    return;
                if (!this.__ignoreValue)
                    this._loopScroll().scrollToElement(this.getElementByValue(this.get("value")));
            }
        },

        create: function() {
            var values = [];
            var dir = (this.get("first") <= this.get("last") ? 1 : -1);
            while (values.length < this.get("atleast")) {
                for (var i = this.get("first"); dir * (this.get("last") - i) >= 0; i += dir * this.get("increment"))
                    values.push(i);
            }
            this.set('values', values);

            this.set("loopscroll", {
                type: "loopscroll",
                enabled: true,
                currentTop: this.get("top"),
                discrete: true,
                scrollEndTimeout: 200,
                elementMargin: 0,
                currentCenter: true,
                currentElementClass: "selected",
                discreteUpperThreshold: 0.99,
                discreteLowerThreshold: 0.01,
                scrollToOnClick: true
            });
        },

        _loopScroll: function() {

            var loopscroll = null;
            // This is not particularly nice, but we'll improve on this later.
            var interactions = this.activeElement().querySelector("container").dynnodehandler.interactions;
            if (interactions)
                loopscroll = interactions.loopscroll;
            else return;

            return loopscroll;

        },

        _encodeValue: function(value) {
            value += this.get("valueadd");
            var delta = this.get("first") - value;
            delta = Math.round(delta / this.get("increment")) * this.get("increment");
            value = this.get("first") - delta;
            value = this.get("first") <= this.get("last") ?
                Math.max(this.get("first"), Math.min(this.get('last'), value)) :
                Math.max(this.get("last"), Math.min(this.get('first'), value));
            return value;
        },

        _decodeValue: function(value) {
            return value - this.get("valueadd");
        },

        getElementByValue: function(value) {
            return this.activeElement().querySelector("[data-value='" + this._encodeValue(value) + "']");
        },

        getValueByElement: function(element) {
            return this._decodeValue(parseInt(element.dataset.value, 10));
        },

        _afterActivate: function(element) {
            // This is a massive hack.
            this.activeElement().querySelector("[ba-repeat-element]").remove();
            Async.eventually(function() {
                this._loopScroll().scrollToElement(this.getElementByValue(this.get("value")));
                this._loopScroll().on("change-current-element", function(element) {
                    this.__ignoreValue = true;
                    this.set("value", this.getValueByElement(element));
                    this.__ignoreValue = false;
                }, this);
            }, this);
        }

    }).registerFunctions({
        /**/"loopscroll": function (obj) { with (obj) { return loopscroll; } }, "values": function (obj) { with (obj) { return values; } }, "value": function (obj) { with (obj) { return value; } }, "{\n                  valuetop : top\n               }": function (obj) { with (obj) { return {
                  valuetop : top
               }; } }/**/
    }).register();

});
Scoped.define("module:Textinput", [
    "dynamics:Dynamic",
    'base:Async',
    'base:Strings'
], [
    "dynamics:Partials.OnPartial"
], function(Dynamic, Async, Strings, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<placeholder\n        ba-if=\"{{view.placeholder_visible && !value}}\"\n>{{view.placeholder}}</placeholder>\n\n\n\n\n<textarea\n        onfocus=\"{{this.execute('onfocus')}}\"\n        onfocusout=\"{{this.execute('onblur')}}\"\n        value=\"{{=value}}\"\n></textarea>\n<pre>{{=preheighttext}}</pre>\n",

        attrs: {
            value: null,
            height: 0,
            view: {
                placeholder: '',
                placeholder_visible: true,
                autofocus: true
            }
        },

        extendables: ['view'],

        computed: {
            "preheighttext:value": function() {
                var s = this.get('value');
                return s + (Strings.ends_with(s || '', "\n") ? " " : "");
            }
        },

        windowevents: {
            "touchstart": function(event) {
                if (document.activeElement.nodeName == 'TEXTAREA' && event.target.nodeName == 'TEXTAREA' || event.target.nodeName == 'INPUT') return;
                else this.execute('blur');
            }
        },

        functions: {
            caretPos: function(position) {
                if (position)
                    this.activeElement().querySelector("textarea").selectionStart = position;
                else
                    return this.activeElement().querySelector("textarea").selectionStart;
            },
            focus_textarea: function() {
                if (document.activeElement.nodeName == 'TEXTAREA') console.log('Textinput - focus_textarea() - Textarea already focused');
                else this.element()[1].select();
            },
            blur: function() {
                this.element()[1].blur();
            },
            onblur: function() {
                this.trigger('onblur');
            },
            onfocus: function() {
                this.trigger('onfocus');
            }
        }

    }).registerFunctions({
        /**/"view.placeholder_visible && !value": function (obj) { with (obj) { return view.placeholder_visible && !value; } }, "view.placeholder": function (obj) { with (obj) { return view.placeholder; } }, "this.execute('onfocus')": function (obj) { with (obj) { return this.execute('onfocus'); } }, "this.execute('onblur')": function (obj) { with (obj) { return this.execute('onblur'); } }, "value": function (obj) { with (obj) { return value; } }, "preheighttext": function (obj) { with (obj) { return preheighttext; } }/**/
    }).register();

});
Scoped.define("module:Externaloverlaycontainer", [
    "module:Overlaycontainer"
], function(Overlaycontainer, scoped) {

    return Overlaycontainer.extend({
        scoped: scoped
    }, function(inherited) {
        return {

            constructor: function(options) {

                // intentionally written differently
                var element = document.createElement("baoverlaycontainer");

                var anchorChildren = document.getElementsByTagName(options.anchor)[0].children;
                if (anchorChildren)
                    for (var i = 0; i < anchorChildren.length; i++) {
                        if (anchorChildren[i].tagName.toLowerCase() == 'baoverlaycontainer')
                            return;
                    }


                document.querySelector(options.anchor).appendChild(element);

                delete options.anchor;
                options.element = element;

                inherited.constructor.call(this, options);

                this.on("hide_overlay", function() {

                    this.destroy();
                    element.remove();

                }, this);
            }

        };
    });

});
Scoped.define("module:Overlaycontainer", [
    "dynamics:Dynamic",
    "base:Objs"
], [
    "dynamics:Partials.TapPartial"
], function(Dynamic, Objs, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<overlaycontainer\n    ba-click=\"{{check_split()}}\"\n    ba-if=\"{{showoverlay}}\"\n    ba-class=\"{{{\n                normal : !view.fullpage,\n                fullpage : view.fullpage,\n                overlaysplit: view.overlaysplit,\n                nosplit: !view.overlaysplit\n            }}}\">\n\n    <overlaysplit ba-if=\"{{view.overlaysplit}}\">\n        <top ba-click=\"{{hide_overlay()}}\"\n                 style=\"height: {{view.offsetTop}}px\"></top>\n        <ba-{{view.splitinsert}}\n            ba-if={{view.splitinsert}}\n            ba-model={{model}}\n        ></ba-{{view.splitinsert}}>\n        <split style=\"height: {{view.offsetHeight}}px\"></split>\n        <bottom ba-click=\"{{hide_overlay()}}\"\n                    ba-if=\"{{view.offsetHeight}}\"></bottom>\n    </overlaysplit>\n\n    <overlayinner\n            ba-click=\"\"\n            ba-if=\"{{view.overlay || model.message}}\"\n            style=\"{{=view.externalstyle}}\">\n\n        <ba-{{view.overlay}}\n            ba-event-forward\n            ba-event:hide-overlay='hide_overlay'\n            ba-noscope>\n        \n            <message ba-if=\"{{model.message}}\">{{model.message}}</message>\n        </ba-{{view.overlay}}>\n\n    </overlayinner>\n\n</overlaycontainer>",

        attrs: function() {
            return {
                // overlaysplit: true,

                view: {
                    insertsubview: false,
                    overlay: "",
                    fullpage: false,
                    overlaysplit: false,
                    externalstyle: ''
                },
                model: {
                    message: "This is a message"
                },
                value: null,
                showoverlay: true
            };
        },

        events: {
            "hide-overlay": function() {
                this.execute('hide_overlay');
            }
        },

        extendables: ['view'],

        create: function() {
            this.set("view", Objs.tree_extend(this.attrs().view, this.get("view")));
        },

        functions: {
            check_split: function() {
                if (this.getProp('view.overlaysplit')) return;
                else
                    this.execute('hide_overlay');
            },
            hide_overlay: function() {
                this.set('showoverlay', false);
                this.trigger('hide_overlay');
            }
        }

    }).registerFunctions({
        /**/"check_split()": function (obj) { with (obj) { return check_split(); } }, "showoverlay": function (obj) { with (obj) { return showoverlay; } }, "{\n                normal : !view.fullpage,\n                fullpage : view.fullpage,\n                overlaysplit: view.overlaysplit,\n                nosplit: !view.overlaysplit\n            }": function (obj) { with (obj) { return {
                normal : !view.fullpage,
                fullpage : view.fullpage,
                overlaysplit: view.overlaysplit,
                nosplit: !view.overlaysplit
            }; } }, "view.overlaysplit": function (obj) { with (obj) { return view.overlaysplit; } }, "hide_overlay()": function (obj) { with (obj) { return hide_overlay(); } }, "view.offsetTop": function (obj) { with (obj) { return view.offsetTop; } }, "view.splitinsert": function (obj) { with (obj) { return view.splitinsert; } }, "model": function (obj) { with (obj) { return model; } }, "view.offsetHeight": function (obj) { with (obj) { return view.offsetHeight; } }, "view.overlay || model.message": function (obj) { with (obj) { return view.overlay || model.message; } }, "view.externalstyle": function (obj) { with (obj) { return view.externalstyle; } }, "view.overlay": function (obj) { with (obj) { return view.overlay; } }, "model.message": function (obj) { with (obj) { return model.message; } }/**/
    }).register();

});
Scoped.define("module:Jsconsole", [
    "dynamics:Dynamic",
    "base:Functions"
], [
    "dynamics:Partials.RepeatPartial",
    "dynamics:Partials.ReturnPartial"
], function(Dynamic, Functions, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<console-output ba-repeat=\"{{log::logs}}\">\n    <p style=\"color:{{log.color}}\">{{log.text}}</p>\n</console-output>\n<console-input>\n    <input value=\"{{=command}}\" ba-return=\"{{run_command()}}\" />\n</console-input>",

        collections: ["logs"],

        create: function() {
            this.set("command", "");
            var oldLog = console.log;
            var logs = this.get("logs");
            console.log = function() {
                logs.add({
                    color: "gray",
                    text: Functions.getArguments(arguments).join(" ")
                });
                return oldLog.apply(this, arguments);
            };
        },

        functions: {
            run_command: function() {
                var logs = this.get("logs");
                logs.add({
                    color: "black",
                    text: this.get("command")
                });
                var result = window["ev" + "al"](this.get("command"));
                logs.add({
                    color: "blue",
                    text: result
                });
                this.set("command", "");
            }
        }

    }).registerFunctions({
        /**/"logs": function (obj) { with (obj) { return logs; } }, "log.color": function (obj) { with (obj) { return log.color; } }, "log.text": function (obj) { with (obj) { return log.text; } }, "command": function (obj) { with (obj) { return command; } }, "run_command()": function (obj) { with (obj) { return run_command(); } }/**/
    }).register();

});
Scoped.define("module:Clickcontainer", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<clickcontainer\n        ba-click=\"click()\">\n<ba-{{view.inner}}\n    ba-noscope></ba-{{view.inner}}>\n</clickcontainer>\n\n",

        attrs: {
            view: {
                inner: 'eventitem'
            }
        },

        functions: {
            click: function() {
                this.trigger('clickcontainerclick', this.get('model'));
            }
        }

    }).register();

});
Scoped.define("module:Multiselectcontainer", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<multiselectcontainer ba-click=\"click()\">\n    <selecticon ba-class=\"{{{\n        'icon-radio_button_unchecked' : !selected,\n        'icon-lens' : selected\n    }}}\"></selecticon>\n    <ba-{{view.inner}}\n        class=\"container\"\n        ba-noscope\n    ></ba-{{view.inner}}>\n</multiselectcontainer>\n\n",

        attrs: {
            selected: false,
            view: {
                inner: 'eventitem'
            }
        },

        functions: {
            click: function() {
                this.flipProp('selected');
                this.trigger('multiselect');
            }
        }

    }).register();

});
Scoped.define("module:Positioncontainer", [
    "dynamics:Dynamic",
    "base:Time",
    "browser:Dom",
    "browser:Info"
], [
    "ui:Dynamics.GesturePartial",
    "ui:Dynamics.InteractionPartial",
    "ui:Interactions.Drag",
    "ui:Interactions.Drop"
], function(Dynamic, Time, Dom, Info, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<positioncontainer\n        style=\"top: {{top}}%\"\n        ba-gesture:click=\"{{{data: model, options: click_gesture}}}\"\n        ba-gesture:drag=\"{{drag_gesture}}\"\n        ba-interaction:drag=\"{{{data: model, options: drag_interaction}}}\"\n        ba-interaction:drop=\"{{{data: model, options: drop_interaction}}}\"\n>\n\n    <ba-{{view.inner}}\n        ba-noscope\n    ></ba-{{view.inner}}>\n\n</positioncontainer>\n\n",

        attrs: {
            view: {
                inner: 'eventitem'
            },
            dragMouseOffset: null,
            dragY: 0,
            top: 20,
            listPos: {
                top: 0,
                height: 0
            },
            click_gesture: {
                mouse_up_activate: true,
                up_event_allow_propagation: Info.isMobile(),
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
                up_event_allow_propagation: Info.isMobile(),
                wait_time: 250,
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
                clone_element: false,
                start_event: null,
                no_animation: true,
                events: {
                    "move": function(model, event) {
                        this.set('dragYPercent', this._coordToPercent(event));
                        event.actionable_modifier.csscls("focus", true);
                        event.modifier.csscls("unfocus", true);
                    },
                    "release": function(model, event) {
                        this.set('top', this._coordToPercent(event));
                        this.set('dragMouseOffset', null);
                        this.trigger('release', this._coordToPercent(event));
                    }
                }
            },
            drop_interaction: {
                enabled: true,
                type: "drop",
                events: {
                    "dropped": function(data, event) {
                        this.execute('dropped', event.source.data);
                    }
                }
            },
            lefticon: 'icon-ok',
            righticon: 'icon-time'
        },

        create: function() {
            this._setinitialTop();
        },

        _afterActivate: function() {
            this._getListPos();
        },

        _setinitialTop: function() {
            var decodeTime = Time.decodeTime(this.getProp('model.start_date_utc'));
            var hour = decodeTime.hour + decodeTime.minute / 60;
            var percentage = hour < 5 ? 0 : (hour - 5) / 19 * 100;

            this.set('top', percentage);
        },

        _getListPos: function() {
            var bounding = this.parent().activeElement().getBoundingClientRect();
            this.set('listPos', {
                top: bounding.top,
                height: bounding.height
            });
        },

        _coordToPercent: function(event) {
            var listHeight = this.getProp('listPos.height');
            var listTop = this.getProp('listPos.top');
            var relativePos = event.page_coords.y - listTop;

            if (!this.get('dragMouseOffset')) {
                var offsetTop = this.activeElement().getElementsByTagName('positioncontainer')[0].offsetTop;
                this.set('dragMouseOffset', relativePos - offsetTop);
            }

            if (0 > relativePos || listHeight < relativePos) {
                console.log('Positioncontainer: Outside Range');
            } else
                return newPos = (relativePos - this.get('dragMouseOffset')) / listHeight * 100;

        }

    }).register();

});
Scoped.define("module:Removableclickcontainer", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<removableclickcontainer>\n\n    <ba-{{view.inner}}\n        class=\"inner\"\n        ba-noscope\n        ba-click=\"click()\"\n    ></ba-{{view.inner}}>\n\n    <icon ba-show=\"{{!itemcontext || !itemcontext.readonly}}\"\n            class=\"{{view.removeicon}}\"\n            ba-click=\"removed()\"\n    ></icon>\n\n</removableclickcontainer>\n\n",

        attrs: {
            view: {
                inner: 'eventitem',
                removeicon: 'icon-remove'
            }
        },

        extendables: ['view'],

        functions: {
            click: function() {
                this.trigger('click', this.get('model'));
            },
            removed: function() {
                this.trigger('removed', this.get('model'));
            }
        }

    }).register();

});
Scoped.define("module:Loading", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<div class=\"sk-circle\">\n    <div class=\"sk-circle1 sk-child\"></div>\n    <div class=\"sk-circle2 sk-child\"></div>\n    <div class=\"sk-circle3 sk-child\"></div>\n    <div class=\"sk-circle4 sk-child\"></div>\n    <div class=\"sk-circle5 sk-child\"></div>\n    <div class=\"sk-circle6 sk-child\"></div>\n    <div class=\"sk-circle7 sk-child\"></div>\n    <div class=\"sk-circle8 sk-child\"></div>\n    <div class=\"sk-circle9 sk-child\"></div>\n    <div class=\"sk-circle10 sk-child\"></div>\n    <div class=\"sk-circle11 sk-child\"></div>\n    <div class=\"sk-circle12 sk-child\"></div>\n</div>\n"

    }).registerFunctions({
        /**//**/
    }).register();

});
Scoped.define("module:Loadmore", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<loadmore ba-click=\"{{load_more()}}\">\n\n    <button class=\"icon-ellipsis\"></button>\n\n</loadmore>",

        attrs: {
            view: {
                value: "Placeholder"
            }
        },

        functions: {

            load_more: function() {
                this.chainedTrigger('loadmore', this);
            }

        }

    }).registerFunctions({
        /**/"load_more()": function (obj) { with (obj) { return load_more(); } }/**/
    }).register();

});
Scoped.define("module:Clickitem", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<button\n        ba-class=\"{{{\n            'icon' : model.background || model.icon,\n            'noicon' : !model.icon && !model.background\n        }}}\"\n        ba-tap=\"{{click()}}\">\n    <icon\n            class=\"{{model.icon}}\"\n            style=\"background : {{model.background}}; color : {{model.icon_color}}\"\n    ></icon>\n    <value>\n        {{model.value || model.name}}\n    </value>\n</button>\n\n",

        attrs: {
            model: {
                icon: '',
                value: 'Clickitem - Value',
                eventid: 'noid'
            }
        },

        functions: {
            click: function() {
                this.trigger('click', this.get('model'));
                this.trigger('event', this.cid());
            }
        }

    }).registerFunctions({
        /**/"{\n            'icon' : model.background || model.icon,\n            'noicon' : !model.icon && !model.background\n        }": function (obj) { with (obj) { return {
            'icon' : model.background || model.icon,
            'noicon' : !model.icon && !model.background
        }; } }, "click()": function (obj) { with (obj) { return click(); } }, "model.icon": function (obj) { with (obj) { return model.icon; } }, "model.background": function (obj) { with (obj) { return model.background; } }, "model.icon_color": function (obj) { with (obj) { return model.icon_color; } }, "model.value || model.name": function (obj) { with (obj) { return model.value || model.name; } }/**/
    }).register();

});
Scoped.define("module:Eventitem", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<button\n        class=\"{{model['class']}}\">\n    {{model.value}} - {{counter}}\n</button>",

        attrs: {
            counter: 0,
            model: {
                value: 'Eventitem - Clicked '
            }
        },

        functions: {
            click: function() {
                this.trigger('event', this.cid());
            }
        },

        create: function() {

            this.on("event", function(cid) {
                this.set('counter', this.get('counter') + 1);
            }, this);

        }

    }).registerFunctions({
        /**/"model['class']": function (obj) { with (obj) { return model['class']; } }, "model.value": function (obj) { with (obj) { return model.value; } }, "counter": function (obj) { with (obj) { return counter; } }/**/
    }).register();

});
/*
 *
 * selected_item = null, means the list will automatically select the first item in the list
 * selected_item = undefined, means the list will no select any item
 *
 * */

Scoped.define("module:Selectableitem", [
    "dynamics:Dynamic",
    "base:Objs"
], [
    "dynamics:Partials.ClassPartial"
], function(Dynamic, Objs, scoped) {

    Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<selectableitem\n        ba-class=\"{{{selected : selected.cid == this.cid()}}}\"\n        ba-click=\"{{select()}}\">\n    {{model.value}}\n</selectableitem>",

        bindings: {
            selected: "<+[tagname='ba-list']:selected_item"
        },

        scopes: {
            parent_list: "<+[tagname='ba-list']"
        },

        attrs: {
            model: {
                value: 'Selectableitem - Value'
            }
        },

        create: function() {

            var parentlist = this.scopes.parent_list;

            if (!parentlist)

                console.warn('There is no parent list the selector can attach to, this currently only works with ba-list');
            else if (parentlist.get('listcollection'))
                if (!this.scopes.parent_list.get('selected_item'))
                    //var selected_item = parentlist.get('selected_item');
                    //if (!selected_item && selected_item !== undefined)
                    this.call('select');
        },


        functions: {

            select: function() {
                this.scopes.parent_list.set('selected_item', Objs.extend({
                    cid: this.cid()
                }, this.get("model").data()));
            }

        }

    }).registerFunctions({
        /**/"{selected : selected.cid == this.cid()}": function (obj) { with (obj) { return {selected : selected.cid == this.cid()}; } }, "select()": function (obj) { with (obj) { return select(); } }, "model.value": function (obj) { with (obj) { return model.value; } }/**/
    }).register();
});
Scoped.define("module:List", [
    "dynamics:Dynamic",
    "browser:Dom",
    "base:Async",
    "base:Promise",
    "base:Types"
], [
    "dynamics:Partials.EventForwardPartial",
    "dynamics:Partials.RepeatPartial",
    "dynamics:Partials.IfPartial",
    "dynamics:Partials.DataPartial",
    "dynamics:Partials.FunctionsPartial",
    "dynamics:Partials.CachePartial",
    "module:Loading",
    "module:Loadmore",
    "ui:Interactions.Infinitescroll",
    "ui:Interactions.Droplist"
], function(Dynamic, Dom, Async, Promise, Types, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<ba-loadmore ba-if=\"{{!!loadmore && loadmorestyle !== 'infinite' && loadmorebackwards}}\"\n             ba-show=\"{{!loading && !!loadmore && loadmorestyle !== 'infinite' && loadmorebackwards}}\" ba-event:loadmore=\"moreitemsbackwards\">\n</ba-loadmore>\n<ba-loading ba-show=\"{{loadmorebackwards && loading}}\">\n</ba-loading>\n\n<list ba-repeat=\"{{view.repeatoptions :: collectionitem :: (model.listcollection||listcollection)}}\"\n      ba-interaction:scroll=\"{{infinite_scroll_options}}\"\n      ba-interaction:droplist=\"{{drop_list_options}}\"\n>\n\n    \n\n    <ba-{{getview(collectionitem)}}\n        ba-cache\n        ba-experimental=\"{{!!collectionitem.experimental}}\"\n        data-id=\"{{collectionitem.cid()}}\"\n        ba-data:id=\"{{collectionitem.cid()}}\"\n        ba-data:pid=\"{{collectionitem.pid()}}\"\n        ba-selection=\"{{=selection}}\"\n        ba-droplist=\"{{droplist}}\"\n        ba-functions=\"{{collectionitem.callbacks}}\"\n        ba-itemcontext=\"{{itemContext(collectionitem)}}\"\n        ba-isselected=\"{{isEqual(collectionitem, selected)}}\"\n        ba-event-forward:item=\"{{[collectionitem]}}\"\n        ba-view=\"{{collectionitem.view||view.listinner||{}}}\"\n        ba-model=\"{{collectionitem}}\"\n    ></ba-{{getview(collectionitem)}}>\n\n</list>\n\n<div class=\"moveplaceholder\" data-id=\"floater\" style=\"display:none\">\n    <div class=\"inner\">Move Here</div>\n</div>\n\n<ba-loadmore\n        ba-if=\"{{!!loadmore && loadmorestyle !== 'infinite' && loadmoreforwards}}\"\n        ba-show=\"{{!loading && collection_count > 0 && !!loadmore && loadmorestyle !== 'infinite' && loadmoreforwards}}\"\n        ba-event:loadmore=\"moreitems\"\n></ba-loadmore>\n\n<ba-loading ba-show=\"{{loading}}\">\n</ba-loading>\n\n<div\n        ba-if=\"{{emptymessage && !loading && collection_count === 0}}\"\n        class=\"emptymessage\">\n    {{emptymessage}}\n</div>\n\n<div\n        ba-if=\"{{emptymessage && !loading && collection_count === 0 && refreshable}}\"\n        class=\"refresh\">\n    <button ba-click=\"refreshable.refresh()\">Refresh</button>\n</div>",

        attrs: function() {
            return {
                listitem: "clickitem",
                model: false,
                selected: null,
                selection: null,
                scrolltolast: null,
                scrolltofirst: null,
                autoscroll: false,
                scrolling_disabled: false,
                stickybottom: false,
                emptymessage: false,
                refreshable: null,
                droplist: false,
                view: {},
                infinite_scroll_options: {
                    disabled: true,
                    parent_elem: true,
                    enable_scroll_modifier: "",
                    type: "infinitescroll",
                    append: function(count, callback) {
                        this.execute("moreitems").success(function() {
                            callback(1, true);
                        });
                    }
                },
                drop_list_options: {
                    disabled: true,
                    type: "droplist",
                    floater: "[data-id='floater']",
                    droppable: function(source) {
                        return this.get("droplistcheck") ? this.get("droplistcheck").call(this, source.data) : true;
                    },
                    bounding_box: function(bb) {
                        var height = bb.bottom - bb.top + 1;
                        var margin = Math.floor(height * 0.2);
                        bb.top += margin;
                        bb.bottom -= margin;
                        return bb;
                    },
                    events: {
                        "dropped": function(dummy, event) {
                            var item = event.source.data;
                            var before = this.getCollection().getByIndex(event.index - 1);
                            var after = this.getCollection().getByIndex(event.index);
                            this.trigger("droplist-dropped", item, before, after);
                        }
                    }
                },
                loadmorebackwards: false,
                loadmoreforwards: true,
                loadmorereverse: false,
                loadmoresteps: undefined,
                "async-timeout": false,
                loadmorestyle: "button" //infinite
            };
        },

        types: {
            scrolltolast: "boolean",
            scrolltofirst: "boolean",
            autoscroll: "boolean",
            stickybottom: "boolean",
            "async-timeout": "int",
            droplist: "boolean",
            loadmorebackwards: "boolean",
            loadmoreforwards: "boolean",
            loadmorereverse: "boolean"
        },

        create: function() {
            this.set("collection_count", 0);
            if (this.get("loadmore") && this.get("loadmorestyle") === "infinite")
                this.setProp("infinite_scroll_options.disabled", false);
            if (this.get("droplist"))
                this.setProp("drop_list_options.disabled", false);
            if (this.get("listcollection"))
                this._setupListCollection(true);
        },

        events: {
            "change:listcollection": function() {
                this._setupListCollection(false);
            }
        },

        _setupListCollection: function() {
            this.__oldloadmoreforwards = this.get("loadmoreforwards");
            this.__oldloadmorebackwards = this.get("loadmorebackwards");
            var evts = "replaced-objects";
            if (this.get("autoscroll"))
                evts += " add";
            Async.eventually(function() {
                if (this.destroyed())
                    return;
                if (this.getCollection() && this.getCollection().on) {
                    this.set("collection_count", this.getCollection().count());
                    this.listenOn(this.getCollection(), "replaced-objects add remove collection-updating collection-updated", function() {
                        this.set("collection_count", this.getCollection().count());
                        this.set("loadmoreforwards", this.__oldloadmoreforwards);
                        this.set("loadmorebackwards", this.__oldloadmorebackwards);
                    });

                    if (this.get("scrolltolast")) {
                        this.listenOn(this.getCollection(), evts, function() {
                            if (!this.get('scrolling_disabled'))
                                this.execute("scrollToLast");
                        }, {
                            eventually: true,
                            off_on_destroyed: true
                        });
                        this.execute("scrollToLast");
                    }
                    if (this.get("scrolltofirst")) {
                        this.listenOn(this.getCollection(), evts, function() {
                            if (!this.get('scrolling_disabled'))
                                this.execute("scrollToFirst");
                        }, {
                            eventually: true,
                            off_on_destroyed: true
                        });
                        this.execute("scrollToFirst");
                    }
                    this.listenOn(this.getCollection(), "collection-updating", function() {
                        this.set("loading", true);
                    });
                    this.listenOn(this.getCollection(), "collection-updated", function() {
                        this.set("loading", false);
                    });
                    if (this.getCollection().count() === 0 && this.get("async-timeout")) {
                        /*
                        this.getCollection().once("add", function() {
                            this.set("loading", false);
                        }, this);
                        */
                        this.set("loading", true);
                        Async.eventually(function() {
                            this.set("loading", false);
                        }, this, this.get("async-timeout"));
                    }
                }
            }, this);
        },

        _afterActivate: function() {
            if (this.get("stickybottom"))
                Dom.containerStickyBottom(this.activeElement());
        },

        getCollection: function() {
            var coll = this.get("listcollection");
            return coll && coll.value ? coll.value() : coll;
        },

        getLoadMore: function() {
            var coll = this.get("loadmore");
            return coll && coll.value ? coll.value() : coll;
        },

        functions: {

            moreitems: function() {
                var oldCount = this.getCollection().count();
                var promise = Promise.create();
                this.set("loading", true);
                Async.eventually(function() {
                    var promise = this.get("loadmorereverse") ? this.getLoadMore().increase_backwards(this.get("loadmoresteps")) : this.getLoadMore().increase_forwards(this.get("loadmoresteps"));
                    promise.callback(function() {
                        promise.asyncSuccess(true);
                        Async.eventually(function() {
                            this.set("loading", false);
                            var newCount = this.getCollection().count();
                            if (newCount === oldCount) {
                                this.__oldloadmoreforwards = this.get("loadmoreforwards");
                                this.set("loadmoreforwards", false);
                            }
                        }, this);
                    }, this);
                }, this);
                return promise;
            },

            moreitemsbackwards: function() {
                var oldCount = this.getCollection().count();
                var promise = Promise.create();
                this.set("loading", true);
                Async.eventually(function() {
                    var promise = this.get("loadmorereverse") ? this.getLoadMore().increase_forwards(this.get("loadmoresteps")) : this.getLoadMore().increase_backwards(this.get("loadmoresteps"));
                    promise.callback(function() {

                        promise.asyncSuccess(true);

                        Async.eventually(function() {
                            this.set("loading", false);
                            var newCount = this.getCollection().count();
                            if (newCount === oldCount) {
                                this.__oldloadmorebackwards = this.get("loadmorebackwards");
                                this.set("loadmorebackwards", false);
                            }
                        }, this);

                    }, this);
                }, this);
                return promise;
            },

            getview: function(item) {
                return this.getProp("view.listitem") || item.get("listitem") || (this.get("listitemfunc") ? (this.get("listitemfunc"))(item) : this.get("listitem"));
            },

            elementByItem: function(item) {
                return item ? this.activeElement().querySelector("[data-id='" + item.cid() + "']") : null;
            },

            scrollTo: function(item) {
                if (!item)
                    return;
                var element = this.execute("elementByItem", item);
                if (!element)
                    return;
                var parent = this.activeElement();

                parent.scrollTop = element.offsetTop - parent.offsetTop;
            },

            scrollToLast: function() {
                this.execute("scrollTo", this.getCollection().last());
            },

            scrollToFirst: function() {
                this.execute("scrollTo", this.getCollection().first());
            },

            isEqual: function(collectionitem, selected) {
                if (selected) {
                    if (selected === collectionitem) return true;
                    else if (selected.pid() === collectionitem.pid()) return true;
                }
                return false;
            },

            itemContext: function(collectionitem) {
                return this.get("itemcontext") && Types.is_function(this.get("itemcontext")) ? this.get("itemcontext")(collectionitem) : {};
            }
        }

    }).registerFunctions({
        /**/"!!loadmore && loadmorestyle !== 'infinite' && loadmorebackwards": function (obj) { with (obj) { return !!loadmore && loadmorestyle !== 'infinite' && loadmorebackwards; } }, "!loading && !!loadmore && loadmorestyle !== 'infinite' && loadmorebackwards": function (obj) { with (obj) { return !loading && !!loadmore && loadmorestyle !== 'infinite' && loadmorebackwards; } }, "loadmorebackwards && loading": function (obj) { with (obj) { return loadmorebackwards && loading; } }, "(model.listcollection||listcollection)": function (obj) { with (obj) { return (model.listcollection||listcollection); } }, "infinite_scroll_options": function (obj) { with (obj) { return infinite_scroll_options; } }, "drop_list_options": function (obj) { with (obj) { return drop_list_options; } }, "getview(collectionitem)": function (obj) { with (obj) { return getview(collectionitem); } }, "!!collectionitem.experimental": function (obj) { with (obj) { return !!collectionitem.experimental; } }, "collectionitem.cid()": function (obj) { with (obj) { return collectionitem.cid(); } }, "collectionitem.pid()": function (obj) { with (obj) { return collectionitem.pid(); } }, "selection": function (obj) { with (obj) { return selection; } }, "droplist": function (obj) { with (obj) { return droplist; } }, "collectionitem.callbacks": function (obj) { with (obj) { return collectionitem.callbacks; } }, "itemContext(collectionitem)": function (obj) { with (obj) { return itemContext(collectionitem); } }, "isEqual(collectionitem, selected)": function (obj) { with (obj) { return isEqual(collectionitem, selected); } }, "[collectionitem]": function (obj) { with (obj) { return [collectionitem]; } }, "collectionitem.view||view.listinner||{}": function (obj) { with (obj) { return collectionitem.view||view.listinner||{}; } }, "collectionitem": function (obj) { with (obj) { return collectionitem; } }, "!!loadmore && loadmorestyle !== 'infinite' && loadmoreforwards": function (obj) { with (obj) { return !!loadmore && loadmorestyle !== 'infinite' && loadmoreforwards; } }, "!loading && collection_count > 0 && !!loadmore && loadmorestyle !== 'infinite' && loadmoreforwards": function (obj) { with (obj) { return !loading && collection_count > 0 && !!loadmore && loadmorestyle !== 'infinite' && loadmoreforwards; } }, "loading": function (obj) { with (obj) { return loading; } }, "emptymessage && !loading && collection_count === 0": function (obj) { with (obj) { return emptymessage && !loading && collection_count === 0; } }, "emptymessage": function (obj) { with (obj) { return emptymessage; } }, "emptymessage && !loading && collection_count === 0 && refreshable": function (obj) { with (obj) { return emptymessage && !loading && collection_count === 0 && refreshable; } }/**/
    }).register();

});
Scoped.define("module:Positionlist", [
    "dynamics:Dynamic",
    "browser:Dom",
    "base:Async",
    "base:Promise",
    "base:Types"
], [
    "dynamics:Partials.EventForwardPartial",
    "dynamics:Partials.RepeatPartial",
    "dynamics:Partials.IfPartial",
    "dynamics:Partials.DataPartial",
    "dynamics:Partials.FunctionsPartial",
    "dynamics:Partials.CachePartial",
    "module:Loading",
    "module:Loadmore",
    "ui:Interactions.Infinitescroll",
    "ui:Interactions.Droplist"
], function(Dynamic, Dom, Async, Promise, Types, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<ba-loadmore ba-if=\"{{!!loadmore && loadmorestyle !== 'infinite' && loadmorebackwards}}\"\n             ba-show=\"{{!loading && !!loadmore && loadmorestyle !== 'infinite' && loadmorebackwards}}\" ba-event:loadmore=\"moreitemsbackwards\">\n</ba-loadmore>\n<ba-loading ba-show=\"{{loadmorebackwards && loading}}\">\n</ba-loading>\n\n<list ba-repeat=\"{{view.repeatoptions :: collectionitem :: (model.listcollection||listcollection)}}\"\n      ba-interaction:scroll=\"{{infinite_scroll_options}}\"\n      ba-interaction:droplist=\"{{drop_list_options}}\"\n>\n\n    \n\n    <ba-{{getview(collectionitem)}}\n        ba-cache\n        ba-experimental=\"{{!!collectionitem.experimental}}\"\n        data-id=\"{{collectionitem.cid()}}\"\n        ba-data:id=\"{{collectionitem.cid()}}\"\n        ba-data:pid=\"{{collectionitem.pid()}}\"\n        ba-selection=\"{{=selection}}\"\n        ba-droplist=\"{{droplist}}\"\n        ba-functions=\"{{collectionitem.callbacks}}\"\n        ba-itemcontext=\"{{itemContext(collectionitem)}}\"\n        ba-isselected=\"{{isEqual(collectionitem, selected)}}\"\n        ba-event-forward:item=\"{{[collectionitem]}}\"\n        ba-view=\"{{collectionitem.view||view.listinner||{}}}\"\n        ba-model=\"{{collectionitem}}\"\n\n\n\n    ></ba-{{getview(collectionitem)}}>\n\n</list>\n\n<div class=\"moveplaceholder\" data-id=\"floater\" style=\"display:none\">\n    <div class=\"inner\">Move Here</div>\n</div>\n\n<ba-loadmore\n        ba-if=\"{{!!loadmore && loadmorestyle !== 'infinite' && loadmoreforwards}}\"\n        ba-show=\"{{!loading && collection_count > 0 && !!loadmore && loadmorestyle !== 'infinite' && loadmoreforwards}}\"\n        ba-event:loadmore=\"moreitems\"\n></ba-loadmore>\n\n<ba-loading ba-show=\"{{loading}}\">\n</ba-loading>\n\n<div\n        ba-if=\"{{emptymessage && !loading && collection_count === 0}}\"\n        class=\"emptymessage\">\n    {{emptymessage}}\n</div>\n\n<div\n        ba-if=\"{{emptymessage && !loading && collection_count === 0 && refreshable}}\"\n        class=\"refresh\">\n    <button ba-click=\"refreshable.refresh()\">Refresh</button>\n</div>",

        attrs: function() {
            return {
                listitem: "clickitem",
                model: false,
                selected: null,
                selection: null,
                scrolltolast: null,
                scrolltofirst: null,
                autoscroll: false,
                scrolling_disabled: false,
                stickybottom: false,
                emptymessage: false,
                refreshable: null,
                droplist: false,
                view: {},
                infinite_scroll_options: {
                    disabled: true,
                    parent_elem: true,
                    enable_scroll_modifier: "",
                    type: "infinitescroll",
                    append: function(count, callback) {
                        this.execute("moreitems").success(function() {
                            callback(1, true);
                        });
                    }
                },
                drop_list_options: {
                    disabled: true,
                    type: "droplist",
                    floater: "[data-id='floater']",
                    droppable: function(source) {
                        return this.get("droplistcheck") ? this.get("droplistcheck").call(this, source.data) : true;
                    },
                    bounding_box: function(bb) {
                        var height = bb.bottom - bb.top + 1;
                        var margin = Math.floor(height * 0.2);
                        bb.top += margin;
                        bb.bottom -= margin;
                        return bb;
                    },
                    events: {
                        "dropped": function(dummy, event) {
                            var item = event.source.data;
                            var before = this.getCollection().getByIndex(event.index - 1);
                            var after = this.getCollection().getByIndex(event.index);
                            this.trigger("droplist-dropped", item, before, after);
                        }
                    }
                },
                loadmorebackwards: false,
                loadmoreforwards: true,
                loadmorereverse: false,
                loadmoresteps: undefined,
                "async-timeout": false,
                loadmorestyle: "button" //infinite
            };
        },

        types: {
            scrolltolast: "boolean",
            scrolltofirst: "boolean",
            autoscroll: "boolean",
            stickybottom: "boolean",
            "async-timeout": "int",
            droplist: "boolean",
            loadmorebackwards: "boolean",
            loadmoreforwards: "boolean",
            loadmorereverse: "boolean"
        },

        create: function() {
            this.set("collection_count", 0);
            if (this.get("loadmore") && this.get("loadmorestyle") === "infinite")
                this.setProp("infinite_scroll_options.disabled", false);
            if (this.get("droplist"))
                this.setProp("drop_list_options.disabled", false);
            if (this.get("listcollection"))
                this._setupListCollection(true);
        },

        events: {
            "change:listcollection": function() {
                this._setupListCollection(false);
            }
        },

        _setupListCollection: function() {
            var evts = "replaced-objects";
            if (this.get("autoscroll"))
                evts += " add";
            Async.eventually(function() {
                if (this.destroyed())
                    return;
                if (this.getCollection() && this.getCollection().on) {
                    this.set("collection_count", this.getCollection().count());
                    this.listenOn(this.getCollection(), "replaced-objects add remove collection-updating collection-updated", function() {
                        this.set("collection_count", this.getCollection().count());
                    });

                    if (this.get("scrolltolast")) {
                        this.listenOn(this.getCollection(), evts, function() {
                            if (!this.get('scrolling_disabled'))
                                this.execute("scrollToLast");
                        }, {
                            eventually: true,
                            off_on_destroyed: true
                        });
                        this.execute("scrollToLast");
                    }
                    if (this.get("scrolltofirst")) {
                        this.listenOn(this.getCollection(), evts, function() {
                            if (!this.get('scrolling_disabled'))
                                this.execute("scrollToFirst");
                        }, {
                            eventually: true,
                            off_on_destroyed: true
                        });
                        this.execute("scrollToFirst");
                    }
                    this.listenOn(this.getCollection(), "collection-updating", function() {
                        this.set("loading", true);
                    });
                    this.listenOn(this.getCollection(), "collection-updated", function() {
                        this.set("loading", false);
                    });
                    if (this.getCollection().count() === 0 && this.get("async-timeout")) {
                        /*
                        this.getCollection().once("add", function() {
                            this.set("loading", false);
                        }, this);
                        */
                        this.set("loading", true);
                        Async.eventually(function() {
                            this.set("loading", false);
                        }, this, this.get("async-timeout"));
                    }
                }
            }, this);
        },

        _afterActivate: function() {
            if (this.get("stickybottom"))
                Dom.containerStickyBottom(this.activeElement());
        },

        getCollection: function() {
            var coll = this.get("listcollection");
            return coll && coll.value ? coll.value() : coll;
        },

        getLoadMore: function() {
            var coll = this.get("loadmore");
            return coll && coll.value ? coll.value() : coll;
        },

        functions: {

            // moreitems: function() {
            //     var oldCount = this.getCollection().count();
            //     var promise = Promise.create();
            //     this.set("loading", true);
            //     Async.eventually(function() {
            //         var promise = this.get("loadmorereverse") ? this.getLoadMore().increase_backwards(this.get("loadmoresteps")) : this.getLoadMore().increase_forwards(this.get("loadmoresteps"));
            //         promise.callback(function() {
            //             promise.asyncSuccess(true);
            //             Async.eventually(function() {
            //                 this.set("loading", false);
            //                 var newCount = this.getCollection().count();
            //                 if (newCount === oldCount)
            //                     this.set("loadmoreforwards", false);
            //             }, this);
            //         }, this);
            //     }, this);
            //     return promise;
            // },
            //
            // moreitemsbackwards: function() {
            //     var oldCount = this.getCollection().count();
            //     var promise = Promise.create();
            //     this.set("loading", true);
            //     Async.eventually(function() {
            //         var promise = this.get("loadmorereverse") ? this.getLoadMore().increase_forwards(this.get("loadmoresteps")) : this.getLoadMore().increase_backwards(this.get("loadmoresteps"));
            //         promise.callback(function() {
            //
            //             promise.asyncSuccess(true);
            //
            //             Async.eventually(function() {
            //                 this.set("loading", false);
            //                 var newCount = this.getCollection().count();
            //                 if (newCount === oldCount)
            //                     this.set("loadmorebackwards", false);
            //             }, this);
            //
            //         }, this);
            //     }, this);
            //     return promise;
            // },

            getview: function(item) {
                return this.getProp("view.listitem") || item.get("listitem") || (this.get("listitemfunc") ? (this.get("listitemfunc"))(item) : this.get("listitem"));
            },

            elementByItem: function(item) {
                return item ? this.activeElement().querySelector("[data-id='" + item.cid() + "']") : null;
            },

            // scrollTo: function(item) {
            //     if (!item)
            //         return;
            //     var element = this.execute("elementByItem", item);
            //     if (!element)
            //         return;
            //     var parent = this.activeElement();
            //
            //     parent.scrollTop = element.offsetTop - parent.offsetTop;
            // },
            //
            // scrollToLast: function() {
            //     this.execute("scrollTo", this.getCollection().last());
            // },
            //
            // scrollToFirst: function() {
            //     this.execute("scrollTo", this.getCollection().first());
            // },

            isEqual: function(collectionitem, selected) {
                if (selected) {
                    if (selected === collectionitem) return true;
                    else if (selected.pid() === collectionitem.pid()) return true;
                }
                return false;
            },

            itemContext: function(collectionitem) {
                return this.get("itemcontext") && Types.is_function(this.get("itemcontext")) ? this.get("itemcontext")(collectionitem) : {};
            }
        }

    }).registerFunctions({
        /**/"!!loadmore && loadmorestyle !== 'infinite' && loadmorebackwards": function (obj) { with (obj) { return !!loadmore && loadmorestyle !== 'infinite' && loadmorebackwards; } }, "!loading && !!loadmore && loadmorestyle !== 'infinite' && loadmorebackwards": function (obj) { with (obj) { return !loading && !!loadmore && loadmorestyle !== 'infinite' && loadmorebackwards; } }, "loadmorebackwards && loading": function (obj) { with (obj) { return loadmorebackwards && loading; } }, "(model.listcollection||listcollection)": function (obj) { with (obj) { return (model.listcollection||listcollection); } }, "infinite_scroll_options": function (obj) { with (obj) { return infinite_scroll_options; } }, "drop_list_options": function (obj) { with (obj) { return drop_list_options; } }, "getview(collectionitem)": function (obj) { with (obj) { return getview(collectionitem); } }, "!!collectionitem.experimental": function (obj) { with (obj) { return !!collectionitem.experimental; } }, "collectionitem.cid()": function (obj) { with (obj) { return collectionitem.cid(); } }, "collectionitem.pid()": function (obj) { with (obj) { return collectionitem.pid(); } }, "selection": function (obj) { with (obj) { return selection; } }, "droplist": function (obj) { with (obj) { return droplist; } }, "collectionitem.callbacks": function (obj) { with (obj) { return collectionitem.callbacks; } }, "itemContext(collectionitem)": function (obj) { with (obj) { return itemContext(collectionitem); } }, "isEqual(collectionitem, selected)": function (obj) { with (obj) { return isEqual(collectionitem, selected); } }, "[collectionitem]": function (obj) { with (obj) { return [collectionitem]; } }, "collectionitem.view||view.listinner||{}": function (obj) { with (obj) { return collectionitem.view||view.listinner||{}; } }, "collectionitem": function (obj) { with (obj) { return collectionitem; } }, "!!loadmore && loadmorestyle !== 'infinite' && loadmoreforwards": function (obj) { with (obj) { return !!loadmore && loadmorestyle !== 'infinite' && loadmoreforwards; } }, "!loading && collection_count > 0 && !!loadmore && loadmorestyle !== 'infinite' && loadmoreforwards": function (obj) { with (obj) { return !loading && collection_count > 0 && !!loadmore && loadmorestyle !== 'infinite' && loadmoreforwards; } }, "loading": function (obj) { with (obj) { return loading; } }, "emptymessage && !loading && collection_count === 0": function (obj) { with (obj) { return emptymessage && !loading && collection_count === 0; } }, "emptymessage": function (obj) { with (obj) { return emptymessage; } }, "emptymessage && !loading && collection_count === 0 && refreshable": function (obj) { with (obj) { return emptymessage && !loading && collection_count === 0 && refreshable; } }/**/
    }).register();

});
// TODO:
//  - Link Searchvalue with listcollection
//  - Make Loading look nicer

Scoped.define("module:Searchlist", [
    "dynamics:Dynamic"
], [
    "dynamics:Partials.EventForwardPartial",
    "module:List",
    "module:Search",
    "module:Loading",
    "dynamics:Partials.NoScopePartial"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<ba-search\n        ba-searching=\"{{=searchingindication}}\"\n        ba-value=\"{{=searchvalue}}\"\n        ba-if=\"{{view.showsearch}}\"\n        ba-view=\"{{view.searchview}}\"\n        ba-event-forward\n></ba-search>\n\n<ba-list ba-noscope ba-event-forward></ba-list>\n",

        attrs: {
            searchvalue: "",
            searchingindication: false,
            searching: false,
            view: {
                showsearch: true
            }
        },

        extendables: ['view'],

        events: {
            "change:searchvalue": function() {
                this.set("searchingindication", true);
            },
            "change:searching": function() {
                this.set("searchingindication", this.get("searching"));
            }
        },

        create: function() {
            this.on("change:searchvalue", function() {
                this.set("searching", true);
            }, this, {
                min_delay: 750
            });
        }

    }).registerFunctions({
        /**/"searchingindication": function (obj) { with (obj) { return searchingindication; } }, "searchvalue": function (obj) { with (obj) { return searchvalue; } }, "view.showsearch": function (obj) { with (obj) { return view.showsearch; } }, "view.searchview": function (obj) { with (obj) { return view.searchview; } }/**/
    }).register();

});
Scoped.define("module:Titledlist", [
    "dynamics:Dynamic"
], [
    "dynamics:Partials.EventForwardPartial",
    "module:List",
    "dynamics:Partials.NoScopePartial",
    "dynamics:Partials.ClickPartial"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<ba-{{view.titleitem}}\n    ba-click=\"{{click_title()}}\"\n    ba-event-forward:title=\"{{[]}}\"\n    ba-model=\"{{model.title_model}}\"\n    ba-listcount=\"{{listcount}}\"\n>{{model.title_model.value}}</ba-{{view.titleitem}}>\n\n<ba-list\n        ba-noscope\n        ba-event-forward\n        ba-show=\"{{!model.collapsed}}\"\n></ba-list>\n\n\n\n        \n        \n        \n\n",

        attrs: {
            model: {
                title_model: {
                    value: 'Titledlist - Title',
                    collapsed: true
                }
            },
            selectable: true,
            collapsed: false,
            collapsible: true,
            listitem: 'selectableitem',
            titleitem: 'title',
            listcount: null
        },

        create: function() {
            this.listenOn(this.get('model').listcollection, "add", function() {
                this._set_count();
            });
            this.listenOn(this.get('model').listcollection, "remove", function() {
                this._set_count();
            });
        },

        functions: {

            togglelist: function() {

                if (this.get('collapsible'))
                    this.setProp('model.collapsed', !this.getProp('model.collapsed'));

            },

            additem: function(item) {

                item = item ? item : {
                    value: "Titledlist - New Item"
                };
                var index = this.get('listcollection').add(item);

                return this.get('listcollection').getByIndex(index).cid();

            },

            click_title: function() {
                this.call('togglelist');
            }

        },

        _set_count: function() {
            var count = this.get('model').listcollection.count();
            this.set('listcount', count);
        }

    }).registerFunctions({
        /**/"view.titleitem": function (obj) { with (obj) { return view.titleitem; } }, "click_title()": function (obj) { with (obj) { return click_title(); } }, "[]": function (obj) { with (obj) { return []; } }, "model.title_model": function (obj) { with (obj) { return model.title_model; } }, "listcount": function (obj) { with (obj) { return listcount; } }, "model.title_model.value": function (obj) { with (obj) { return model.title_model.value; } }, "!model.collapsed": function (obj) { with (obj) { return !model.collapsed; } }/**/
    }).register();

});
Scoped.define("module:Addtitle", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<addtitle>\n    <div ba-click=\"{{clicktitle()}}\">\n        <span>{{model.value}}</span>\n        <span ba-if=\"{{listcount}}\"> - ({{listcount}})</span>\n    </div>\n    <button ba-click=\"{{addbutton()}}\">\n        <span class=\"icon-plus\"></span>\n    </button>\n</addtitle>",

        attrs: {
            listcount: null,
            model: {
                value: 'Title'
            }
        },

        functions: {
            clicktitle: function() {
                this.parent().call('togglelist');
            },
            addbutton: function() {
                this.trigger("add-button");
            }
        }

    }).registerFunctions({
        /**/"clicktitle()": function (obj) { with (obj) { return clicktitle(); } }, "model.value": function (obj) { with (obj) { return model.value; } }, "listcount": function (obj) { with (obj) { return listcount; } }, "addbutton()": function (obj) { with (obj) { return addbutton(); } }/**/
    }).register();

});
}).call(Scoped);