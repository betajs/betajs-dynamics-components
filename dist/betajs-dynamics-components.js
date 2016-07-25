/*!
betajs-dynamics-components - v0.0.14 - 2016-07-23
Copyright (c) Oliver Friedmann, Victor Lingenthal
MIT Software License.
*/
/** @flow **//*!
betajs-scoped - v0.0.11 - 2016-06-28
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
			return window[key];
		if (typeof global !== "undefined")
			return global[key];
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
		if (current == this)
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
		if (typeof mod == "object" && mod && "exports" in mod && (forceExport || mod.exports == this || !mod.exports || Helper.isEmpty(mod.exports)))
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
		if (!node.ready)
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
				arguments[arguments.length - 1].ns = ns;
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
				var result = this.options.compile ? {} : args.callback.apply(args.context || this, arguments);
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
				var assumptionValue = argv[0];
				argv[0] = assumptionValue.split(".");
				for (var i = 0; i < argv[0].length; ++i)
					argv[0][i] = parseInt(argv[0][i], 10);
				if (Helper.typeOf(args.callback) === "function") {
					if (!args.callback.apply(args.context || this, args))
						throw ("Scoped Assumption '" + args.assumption + "' failed, value is " + assumptionValue + (args.error ? ", but assuming " + args.error : ""));
				} else {
					var version = (args.callback + "").split(".");
					for (var j = 0; j < Math.min(argv[0].length, version.length); ++j)
						if (parseInt(version[j], 10) > argv[0][j])
							throw ("Scoped Version Assumption '" + args.assumption + "' failed, value is " + assumptionValue + ", but assuming at least " + args.callback);
				}
			});
		},
		
		
		/**
		 * Extends a potentiall existing name space once a list of name space locators is available.
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
	version: '48.1467144390733',
		
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
betajs-dynamics-components - v0.0.14 - 2016-07-23
Copyright (c) Oliver Friedmann, Victor Lingenthal
MIT Software License.
*/
(function () {

var Scoped = this.subScope();

Scoped.binding("module", "global:BetaJS.Dynamics.Components");
Scoped.binding("tests", "global:BetaJS.Dynamics.Components.Tests");
Scoped.binding("dynamics", "global:BetaJS.Dynamics");
Scoped.binding("base", "global:BetaJS");
Scoped.binding("browser", "global:BetaJS.Browser");
Scoped.binding("ui", "global:BetaJS.UI");

Scoped.binding("jquery", "global:jQuery");

Scoped.define("module:", function () {
	return {
		guid: "5d9ab671-06b1-49d4-a0ea-9ff09f55a8b7",
		version: '121.1469292133363'
	};
});

Scoped.extend('module:Templates', function () {
return {"input":"<input autofocus>","overlaycontainer":"<overlaycontainer     ba-tap=\"showoverlay = false\"     ba-if=\"{{showoverlay}}\">      <overlayinner>          <ba-{{view.overlay}} ba-noscope>             <message>{{model.message}}</message>         </ba-{{view.overlay}}>      </overlayinner>  </overlaycontainer>","testoverlaycontainer":" <button ba-click=\"showoverlay = !showoverlay\">Show Overlaycontainer</button>  <ba-overlaycontainer         ba-overlay=\"{{=overlay}}\"         ba-showoverlay=\"{{=showoverlay}}\">          </ba-overlaycontainer>","scrollpicker":"<container>         <element ba-repeat-element=\"{{element_value :: value_array}}\" data-id=\"{{element_value}}\">                 {{element_value}}         </element> </container>","test_scrollpicker":" <ba-scrollpicker id=\"321\"></ba-scrollpicker> <ba-scrollpicker id=\"322\"></ba-scrollpicker> ","loading":" <loading>      <div class='uil-spin-css' style='-webkit-transform:scale(0.32)'><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>  </loading> ","loadmore":" <loadmore ba-click=\"load_more()\">      <button>Load more</button>  </loadmore>","eventitem":" <button         class=\"{{model.class}}\">     {{model.value}} - {{counter}} </button>","selectableitem":" <selectableitem         ba-class=\"{{{selected : selected.cid == this.cid()}}}\"         ba-click=\"select()\">     {{model.value}} </selectableitem>","swipeclickcontainer":" <behind>     <icon class='{{view.lefticon||lefticon}}'></icon>     <div></div>     <icon class='{{view.righticon||righticon}}'></icon> </behind>  <!--style=\"left: {{view.left}}px\"--> <swipe         class='{{start_swipe}}'         ba-gesture:click=\"{{{data: model, options: click_gesture}}}\"         ba-gesture:drag=\"{{drag_gesture}}\"         ba-interaction:drag=\"{{{data: model, options: drag_interaction}}}\"         ba-interaction:drop=\"{{{data: model, options: drop_interaction}}}\"         ba-gesture:swipe=\"{{swipe_gesture}}\"         ba-interaction:swipe=\"{{swipe_interaction}}\">      <container>          <ba-{{view.inner||inner}} ba-noscope>         </ba-{{view.inner||inner}}>          <swipeleft>             <div></div>             <icon class='{{view.lefticon||lefticon}}'></icon>         </swipeleft>          <swiperight>             <icon class='{{view.righticon||righticon}}'></icon>             <div></div>         </swiperight>      </container>  </swipe> ","list":" <list ba-repeat=\"{{collectionitem :: (model.listcollection||listcollection)}}\">      <ba-{{view.listitem||collectionitem.listitem||listitem}}         ba-cache         ba-data:id=\"{{collectionitem.cid()}}\"         ba-functions=\"{{collectionitem.callbacks}}\"         ba-view=\"{{collectionitem.view||view.listinner}}\"         ba-model=\"{{collectionitem}}\">      </ba-{{view.listitem||collectionitem.listitem||listitem}}>  </list>  <ba-loadmore ba-if=\"{{loadmore}}\" ba-show=\"{{!loading}}\" ba-event:loadmore=\"moreitems\"> </ba-loadmore> <ba-loading ba-if=\"{{loadmore}}\" ba-show=\"{{loading}}\"> </ba-loading> ","test_list_clickitem":" <ba-list ba-attrs=\"{{testmodel}}\"> </ba-list>","test_list_listcollection":" <ba-list ba-listcollection=\"{{listcollection}}\"> </ba-list>","test_list_listoflist":" <ba-list         ba-listitem=\"list\"         ba-listcollection=\"{{listcollection}}\"> </ba-list>","test_list_loadmore":" <ba-list ba-view=\"{{view}}\" ba-listcollection=\"{{listcollection}}\"> </ba-list>","test_list_pushfunc":"<button ba-click=\"test(input_value)\">Test func</button> <input ba-return=\"test(input_value)\" placeholder=\"Push item to list\" value=\"{{=input_value}}\"> <ba-titledlist ba-attrs=\"{{testmodel}}\"> </ba-titledlist>","test_list_swipecontainer":" <ba-list         ba-model=\"{{model}}\"         ba-view=\"{{view_model}}\"> </ba-list>","searchlist":" <searchbox ba-if=\"{{view.showsearch}}\">     <icon class=\"icon-search\"></icon>     <input placeholder=\"{{view.placeholder}}\" value=\"{{=searchvalue}}\"> </searchbox>  <ba-loading ba-if=\"{{searchingindication}}\"> </ba-loading>  <ba-list ba-noscope></ba-list> ","test_searchlist":" <ba-searchlist         ba-view=\"{{view}}\">  </ba-searchlist>","test_titledlist":" <ba-titledlist         ba-model=\"{{model}}\"         ba-view=\"{{view}}\"         ba-functions=\"{{callbacks}}\"         ba-listcollection=\"{{listcollection}}\">  </ba-titledlist>","test_titledlist_swipe":" <ba-titledlist         ba-listcollection=\"{{listcollection}}\"         ba-attrs=\"{{push_attrs}}\">  </ba-titledlist>","titledlist":" <ba-{{view.titleitem}}     ba-click=\"click_title()\"     ba-functions=\"{{model.title_callbacks}}\"     ba-model=\"{{model.title_model}}\">{{model.title_model.value}}</ba-{{view.titleitem}}>  <ba-list         ba-noscope         ba-show=\"{{!collapsed}}\">  </ba-list> ","addtitle":" <addtitle>     <title ba-click=\"clicktitle()\">{{model.value}}</title>     <button ba-click=\"addbutton()\">         <span class=\"icon-plus\"></span>     </button> </addtitle>","test_addtitle":" <ba-addtitle         ba-attrs=\"{{testmodel}}\"> </ba-addtitle> ","clickitem":" <button         class=\"{{model.class}}\"         ba-click=\"click()\">     {{model.value}} </button>","clicktestcontainer":" <ba-{{view.inner||inner}}     ba-gesture:click=\"{{{data: model, options: click_gesture}}})\"     ba-noscope>     {{model.value||value}} </ba-{{view.inner||inner}}> ","header":" <ba-list ba-listcollection=\"{{left_collection}}\"></ba-list>","toggle_menu":"<button ba-click=\"toggle_menu()\" class=\"icon-reorder\"></button>","menu_web":" <ba-titledlist         ba-collapsible=\"{{false}}\"         ba-model=\"{{model}}\"         ba-listcollection=\"{{menu_collection}}\">  </ba-titledlist>","layout_web":"<header>     <ba-{{view.header}}>Header</ba-{{view.header}}> </header> <main>     <menu ba-show=\"{{view.display_menu}}\">         <ba-{{view.menu}} ba-view=\"{{view.menuview}}\">Menu</ba-{{view.menu}}>     </menu>     <content>         <ba-{{view.content}} ba-model={{contentmodel}}>Content</ba-{{view.content}}>     </content> </main>","index":"<!DOCTYPE html> <html> <head lang=\"en\">     <meta charset=\"UTF-8\">      <!--<script src=\"../vendors/jquery-1.9.closure-extern.js\"></script>-->     <script src=\"../vendors/jquery-2.1.4.js\"></script>      <script src=\"../vendors/scoped.js\"></script>     <script src=\"../vendors/beta.js\"></script>     <script src=\"../vendors/betajs-browser-noscoped.js\"></script>     <!--<script src=\"../vendors/betajs-ui.js\"></script>-->     <script src=\"../../betajs-ui/dist/betajs-ui.js\"></script>     <script src=\"../vendors/betajs-dynamics-noscoped.js\"></script>      <script src=\"components.js\"></script>      <!--<script src=\"../vendors/betajs-simulator.js\"></script>-->     <script src=\"../../betajs-simulator/dist/betajs-simulator.js\"></script>     <link rel=\"stylesheet\" href=\"../..//betajs-simulator/dist/betajs-simulator.css\" />      <script src=\"../dist/betajs-dynamics-components-noscoped.js\"></script>     <link rel=\"stylesheet\" href=\"../dist/betajs-dynamics-components.css\" />     <link rel=\"stylesheet\" href=\"../vendors/icomoon/style.css\" />      <script src=\"//localhost:1337/livereload.js\"></script>      <title>BetaJS Simulator</title>      <script>      </script>  </head> <body>  <ba-simulator></ba-simulator>  <script>     console.log('Unresolved Dependencies : ');     console.log(Scoped.unresolved('global:')); </script>  </body> </html>"};
});

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
], [
    "dynamics:Partials.TapPartial"
], function (Dynamic, Templates, scoped) {

	return Dynamic.extend({scoped: scoped}, {
		
		template: Templates.overlaycontainer,
		
		attrs : {
            view : {
                overlay : ""
            },
            model : {
                message : "This is a message"
            },
            value : null,
            showoverlay : true
        }
	
	}).register();

});


Scoped.define("tests:Testoverlaycontainer", [
    "dynamics:Dynamic",
    "module:Templates"
],[
    "module:Overlaycontainer"
],function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.testoverlaycontainer,

        attrs : {
            showoverlay : false,
            overlay : "timepicker"
        }

    }).register();

});


Scoped.define("module:Scrollpicker", [
    "dynamics:Dynamic",
    "module:Templates",
    "ui:Interactions.Loopscroll"
], [
    "dynamics:Partials.RepeatElementPartial"
], function (Dynamic, Templates, Loopscroll, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.scrollpicker,

        attrs : {
            initial_value : 14,
            current_value : 10,
            first : 0,
            last : 23,
            increment : 1,
            currentTop : false,
            value_array : []
        },

        create : function () {

            this.call('initialize_value_array');
            this.call('initialize_value');

            console.log('Scrollpicker initial value :');
            console.log(this.get('initial_value'));

        },

        functions : {

            initialize_value : function () {
                var inc = this.get('increment');
                var rounded_value = inc * Math.round(this.get('initial_value')/inc);
                var index = this.get('value_array').indexOf(rounded_value);
                var displayed_value = index > -1 ? rounded_value : this.get('value_array')[0];
                this.set('current_value', parseInt(displayed_value, 10));
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

            element = element.find('container');

            var scroll = new Loopscroll(element, {
                enabled: true,
                currentTop: this.get('currentTop'),
                discrete: true,
                scrollEndTimeout: 200,
                currentCenter: true
            });

            //var self = this;
            //element.scroll(function () {
            //    console.log('There is a Scroll happening');
            //    console.log(self.__cid);
            //});

            console.log('Scroll to Value');
            console.log(this.get('current_value'));
            var ele = $(element.find("[data-id='" + this.get('current_value') + "']"));
            scroll.scrollToElement(ele, {
                animate: false
            });
            ele.css({
                "color": "black",
                "background" : "white"
            });

            scroll.on("scrollend", function () {
                console.log(this);
                this.set('current_value', scroll.currentElement().data( "id" ));
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

});

Scoped.define("module:Test_scrollpicker", [
    "dynamics:Dynamic",
    "module:Templates"
], [
   'module:Scrollpicker'
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.test_scrollpicker,

        attrs : {
        },

        create : function () {


        }

    }).register();

});


Scoped.define("module:Loading", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.loading

    }).register();

});

Scoped.define("module:Loadmore", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.loadmore,

        attrs: {
            view: {
                value: "Placeholder"
            }
        },

        functions: {

            load_more: function () {
                this.chainedTrigger('loadmore', this);
            }

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
                value : 'Eventitem - Clicked '
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

            this.parent().on('archive', function () {
                console.log('archived');
            }, this);

        }

    }).register();

});

Scoped.define("module:Selectableitem", [
    "dynamics:Dynamic",
    "module:Templates",
    "base:Objs"
], [
    "dynamics:Partials.ClassPartial"
], function (Dynamic, Templates, Objs, scoped) {

    Dynamic.extend({scoped: scoped}, {

        template: Templates.selectableitem,

        bindings : {
            selected: "<+[tagname='ba-list']:selected_item"
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
                this.scopes.parent_list.set('selected_item', Objs.extend({
                	cid: this.cid()
                }, this.get("model").data()));
            }

        }

    }).register();
});


Scoped.define("module:Swipeclickcontainer", [
	"dynamics:Dynamic",
	"module:Templates",
	"browser:Loader"
],[
	"ui:Dynamics.GesturePartial",
	"ui:Dynamics.InteractionPartial",
	"ui:Interactions.Drag",
	"ui:Interactions.Drop"
], function (Dynamic, Templates, Loader, scoped) {

	return Dynamic.extend({scoped: scoped}, {

		template: Templates.swipeclickcontainer,

		attrs: {
			start_swipe :'',
			view : {
				slide_finish : false,
				left: 0
			},
			value: "Swipeclickitem - Title",
			lefticon: 'icon-ok',
			righticon: 'icon-time',
			inner: "eventitem",
			swipe_actions: {
				"other": {
					less: -1/7,
					greater: -1,
					execute: function (element,pos) {
						this.call('slideout',element,pos,'other');
					}
				},
				"nothing": {
					greater : -1/7,
					less: 1/7
				},
				"archive": {
					greater : 1/7,
					less: 2/3,
					execute: function (element,pos) {
						this.call('slideout',element,pos,'archive');
					}
				},
				"delete": {
					greater: 2 / 3,
					less: 1,
					execute: function (element,pos) {
						this.call('slideout',element,pos,'delete');
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
				droppable: true,
				type: "drag",
				clone_element: true,
				start_event: null,
				events: {
					"move": function (model, event) {
						console.log('Swipeclickcontainer:');
						console.log(model);
						event.actionable_modifier.csscls("focus", true);
						event.modifier.csscls("unfocus", true);

					}
				}
			},
			drop_interaction: {
				enabled: true,
				type: "drop",
				classes: {
					"hover.modifier": "green-style"
				},
				events: {
					"dropped": function (data, event) {
						console.log('Drop successful');
						//var source_doodad = event.source.data;
						//var target_doodad = data;
						//alert(source_doodad.get("v") + " --> " + target_doodad.get("v"));
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
						var element = event.element;
						var parent = element.parent();
						var w = parseInt(element.css("width"), 10);
                        var x = parseInt(element.css("left"), 10);
                        var a = {};
						var actions = this.get('swipe_actions');
						for (var cls in actions) {
							a = actions[cls];
							if ((!a.less || x <= w * a.less) && (!a.greater || x >= w * a.greater))
								element.addClass(cls);
							else
								element.removeClass(cls);
						}
					},
					"release": function (doodad, event) {
						var element = event.element;
						var w = parseInt(element.css("width"), 10);
						var x = parseInt(element.css("left"), 10);
						var actions = this.get('swipe_actions');

						for (var cls in actions) {
							a = actions[cls];

							if ((!('greater' in a) || x <= w * a.less) && (!('less' in a) || x >= w * a.greater)) {
								event.source.abort();
								if (a.execute)
									a.execute.call(this, element, x);
							}
						}
					}
				}
			}

		},

		functions : {
			click : function (doodad) {
				this.scope(">").call('click');
			},
			create_style : function (name,left) {
				var style = document.createElement('style');
				style.type = 'text/css';
				style.innerHTML = '.' + name + ' { left: ' + left + 'px; }';
				document.getElementsByTagName('head')[0].appendChild(style);
			},
			slideout : function (element,pos,trigger) {
				var current_left = pos;

				this.call('create_style','old_class',current_left);
				this.set('start_swipe','old_class');
				
				var self = this;
				element.on("transitionend",function () {
					element.find('ba-eventitem').css('visibility','hidden');
					setTimeout(function () {
						element.parent().slideUp(200);
						// Now we should remove the added element from the dom again, otherwise we have a leak.
						// this.get("temporary_style_element").remove();
					}, 10);
					self.trigger(trigger);
				});

				var max_left = element.width();
				var sign = Math.sign(current_left);

				/*
				 * Instead of the create_style call, you should be able to user betajs browser (please update first):
				 */
				this.set("temporary_style_element", Loader.inlineStyles(
					'.new_class { left: ' + sign*max_left + 'px; }'
				));
				
				this.call('create_style','new_class',sign*max_left);
				this.set('start_swipe','swipe new_class');
			}
		}

	}).register();

});

Scoped.define("module:List", [
    "dynamics:Dynamic",
    "module:Templates",
    "base:Async"
], [
    "dynamics:Partials.RepeatPartial",
    "dynamics:Partials.IfPartial",
    "dynamics:Partials.DataPartial",
    "dynamics:Partials.FunctionsPartial",
    "dynamics:Partials.CachePartial"
], function (Dynamic, Templates, Async, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.list,

        attrs: {
            listitem: "clickitem",
            model: false,
            view : {
            }
        },

        collections: {
            listcollection: [
                {value: "List - Item 1"},
                {value: "List - Item 2"},
                {value: "List - Item 3"}
            ]
        },
        
        functions: {
        	moreitems: function () {
        		this.set("loading", true);
               	Async.eventually(function () {
               		this.get("loadmore").increase_forwards().callback(function () {
               			 this.set("loading", false);
               		}, this);
               	}, this);
        	}
        }

    }).register();

});

Scoped.define("tests:Test_list_clickitem", [
    "dynamics:Dynamic",
    "module:Templates",
    "base:Collections.Collection"
], [
    "module:List"
], function (Dynamic, Templates, Collection, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template: Templates.test_list_clickitem,

        attrs: {
            testmodel : {
                listitem : 'clickitem',
                listcollection : new Collection({objects: [
                    {value: "Item 1"},
                    {value: "Item 2"},
                    {value: "Item 3"},
                    {value: "Item 4"},
                    {value: "Item 5"}
                ]})
            }
        }

    }).register();

});

Scoped.define("tests:Test_list_listcollection", [
    "dynamics:Dynamic",
    "module:Templates"
], [
    "module:List"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template: Templates.test_list_listcollection,

        collections : {
            listcollection : [
                {value: "Test - List - listollection - Item 1"},
                {value: "Test - List - listollection - Item 2"},
                {value: "Test - List - listollection - Item 3"},
                {value: "Test - List - listollection - Item 4"}
            ]
        }

    }).register();

});


Scoped.define("tests:Test_list_listoflist", [
    "dynamics:Dynamic",
    "module:Templates",
    "base:Collections.Collection"
], [
    "module:List"
], function (Dynamic, Templates, Collection, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template: Templates.test_list_listoflist,

        collections : {
            listcollection : [
                {listcollection : new Collection({objects: [
                    {value : "Test - list of list - Item 1"},
                    {value : "Test - list of list - Item 2"}
                ]})},
                {listcollection : new Collection({objects: [
                    {value : "Test - list of list - Item 1"},
                    {value : "Test - list of list - Item 2"}
                ]})}
            ]
        }

    }).register();

});

Scoped.define("tests:Test_list_loadmore", [
    "dynamics:Dynamic",
    "module:Templates",
    "base:Collections.Collection"
],[
    "module:List",
    "module:Loading"
], function (Dynamic, Templates, Collection, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template: Templates.test_list_loadmore,

        attrs : {
          view : {
              listend : {
                  item : 'loadmore',
                  value : 'Test Value'
              }
          }
        },

        collections : {
            listcollection : [
                {value: "Test - List - Loadmore - Item 1"},
                {value: "Test - List - Loadmore - Item 2"},
                {value: "Test - List - Loadmore - Item 3"},
                {value: "Test - List - Loadmore - Item 4"}
            ]
        },

        create : function () {
            var collection = new Collection({
                objects: [
                    {value: "Test - List - Loadmore - Item 0"}
                ]
            });
            for (var i = 1; i < 15; i++) {
                collection.add(
                    {value: "Test - List - Loadmore - Item " + i}
                );
            }
            this.set('listcollection',collection);
        }

    }).register();

});

Scoped.define("module:Test_list_pushfunc", [
    "dynamics:Dynamic",
    "module:Templates",
    "base:Collections.Collection"
],[
    "module:Titledlist",
    "module:Clickitem"
], function (Dynamic, Templates, Collection, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template: Templates.test_list_pushfunc,

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
                listcollection : new Collection({objects: [
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

});

Scoped.define("tests:Test_list_swipecontainer", [
        "dynamics:Dynamic",
        "module:Templates",
        "base:Collections.Collection"
    ],[
        "module:List",
        "module:Swipeclickcontainer",
        "module:Selectableitem"
    ], function (Dynamic, Templates, Collection, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.test_list_swipecontainer,

        attrs: {
            model : {
                listcollection : new Collection({objects: [
                    {value: "Item 1"},
                    {value: "Item 2"},
                    {value: "Item 3"},
                    {value: "Item 4"},
                    {value: "Item 5"}
                ]})
            },
            view_model : {
                listitem : 'swipeclickcontainer',
                inner : 'selectableitem'
            }
        }

    }).register();

});

Scoped.define("module:Searchlist", [
    "dynamics:Dynamic",
    "module:Templates"
],[
    "module:List",
    "dynamics:Partials.NoScopePartial"
],function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.searchlist,

        attrs: {
            searchvalue : "",
            searchingindication: false,
            //searching: false,
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
        },
        
        create: function () {
        	this.on("change:searchvalue", function () {
        		this.set("searchingindication", true);
        	}, this);
        	this.on("change:searching", function () {
        		this.set("searchingindication", this.get("searching"));
        	}, this);
            this.on("change:searchvalue", function () {
            	this.set("searching", true);
            }, this, {
                min_delay: 750
            });
        }

    }).register();

});

Scoped.define("tests:Test_searchlist", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template : Templates.test_searchlist,

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

});

Scoped.define("module:Test_titledlist", [
    "dynamics:Dynamic",
    "module:Templates"
],function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.test_titledlist,

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

});


Scoped.define("module:Test_titledlist_swipe", [
    "dynamics:Dynamic",
    "module:Templates"
],[
    "module:Titledlist",
    "module:Selectableitem"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template : Templates.test_titledlist_swipe,

        attrs : {
            push_attrs : {
                title_model : {
                    value : 'Titledlist - Testtitle'
                },
                listitem: 'swipeclickcontainer',
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

});

Scoped.define("module:Titledlist", [
    "dynamics:Dynamic",
    "module:Templates"
], [
  "module:List",
  "dynamics:Partials.NoScopePartial",
  "dynamics:Partials.ClickPartial"
], function (Dynamic, Templates, scoped) {
    Dynamic.extend({scoped: scoped}, {

        template: Templates.titledlist,

        attrs: {
            model: {
                title_model: {
                    value: 'Titledlist - Title'
                }
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

Scoped.define("module:Addtitle", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template:Templates.addtitle,

        attrs: {
            model : {value: 'Title'}
        },

        functions : {

            clicktitle : function () {

                this.parent().call('togglelist');

            },
            addbutton : function () {

                console.log("You clicked the addbuton, no addbutton() function given");

            }

        }

    }).register();

});

Scoped.define("tests:Test_addtitle", [
    "dynamics:Dynamic",
    "module:Templates"
], [
    "module:Addtitle"
], function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped : scoped}, {

        template : Templates.test_addtitle,

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

Scoped.define("module:Header", [
    "dynamics:Dynamic",
    "module:Templates"
],function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.header,

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

});


Scoped.define("module:Toggle_menu", [
    "dynamics:Dynamic",
    "module:Templates"
],function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.toggle_menu,

        functions : {
            toggle_menu : function () {
                this.scope("<+[tagname='ba-layout_web']").call('toggle_menu');
            }
        }

    }).register();

});




Scoped.define("module:Menu_web", [
    "dynamics:Dynamic",
    "module:Templates",
    "base:Collections.Collection"
],function (Dynamic, Templates, Collection, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.menu_web,

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
                    listcollection : new Collection({objects:[
                        {value : "Subitem 1"},
                        {value : "Subitem 2"}
                    ]})
                },
                {value : 'Item 4'}
            ]
        }

    }).register();

});



Scoped.define("module:Layout_web", [
    "dynamics:Dynamic",
    "module:Templates"
],function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.layout_web,

        attrs : {
            view : {
                header : "header",
                //header : null,
                menu : "menu_web",
                //menu : null,
                content : null,
                display_menu : true
            },
            model : {

            }
        },

        functions : {
            toggle_menu : function () {
                this.setProp('view.display_menu', !this.getProp('view.display_menu'));
            }
        }

    }).register();

});



}).call(Scoped);