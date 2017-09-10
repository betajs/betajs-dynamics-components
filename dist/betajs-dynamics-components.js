/*!
betajs-dynamics-components - v0.1.16 - 2017-09-10
Copyright (c) Victor Lingenthal,Oliver Friedmann
Apache-2.0 Software License.
*/
/** @flow **//*!
betajs-scoped - v0.0.16 - 2017-07-23
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
		if (typeof self !== "undefined")
			return self[key];
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
	version: '0.0.16',
		
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
betajs-dynamics-components - v0.1.16 - 2017-09-10
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
    "version": "0.1.16"
};
});
Scoped.assumeVersion('base:version', '~1.0.96');
Scoped.assumeVersion('browser:version', '~1.0.65');
Scoped.assumeVersion('dynamics:version', '~0.0.83');
Scoped.assumeVersion('ui:version', '~1.0.37');
Scoped.define("module:Dropdown", [
    "dynamics:Dynamic",
    "base:Loggers.Logger"
], [
    "dynamics:Partials.EventForwardPartial",
    "dynamics:Partials.EventPartial",
    "dynamics:Partials.TapPartial",
    "module:List"
], function(Dynamic, Logger, scoped) {

    var logger = Logger.global().tag("dynamic", "list");

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<button\n        onblur=\"{{this.execute('blur')}}\"\n        ba-tap=\"click()\"\n        class=\"icon-more_vert\">\n    <dropdown ba-if=\"{{showdropdown}}\">\n        <ba-{{view.dropdown}}\n            ba-event:item-click=\"hide_dropdown\"\n            ba-event-forward:dropdown=\"{{}}\"\n            ba-model='{{dropdownmodel}}'\n\n        ></ba-{{view.dropdown}}>\n    </dropdown>\n    <div></div>\n</button>\n",

        attrs: function() {
            return {
                view: {
                    dropdown: 'list'
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

    }).register();

});
Scoped.define("module:Htmlview", [
    "dynamics:Dynamic",
    "base:Async",
    "browser:Loader",
    "browser:Dom"
], function(Dynamic, Async, Loader, Dom, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<iframe frameBorder='0' scrolling='no'></iframe>",

        attrs: {
            "html": "",
            "loadhtml": ""
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

        _afterActivate: function() {
            this._updateIFrame();
        },

        _updateIFrame: function() {
            this.activeElement().querySelector("iframe").contentDocument.querySelector("html").innerHTML = this._cleanupContent(this.get('html')).innerHTML;
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
    }).register();

});
Scoped.define("module:Clickinput", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<title\n        ba-if=\"{{!view.edit || !view.externaledit}}\"\n        ba-click=\"edititem()\"\n>\n    {{model.value}}\n</title>\n\n<input\n        placeholder=\"{{view.placeholder || ''}}\"\n        ba-if=\"{{view.edit}}\"\n        ba-return=\"view.edit = false\"\n        onblur=\"{{view.edit = false}}\"\n        value=\"{{=model.value}}\" />\n",

        attrs: {
            model: {
                value: "Test"
            },
            view: {
                placeholder: "",
                edit: false,
                autofocus: true,
                externaledit: true
            }
        },

        extendables: ['view'],

        functions: {
            edititem: function() {

                this.setProp('view.edit', true);

                var SearchInput = this.activeElement().querySelector("input");
                var strLength = this.getProp('model.value').length;
                SearchInput.focus();
                SearchInput.setSelectionRange(strLength, strLength);

            }
        }

    }).register();

});
Scoped.define("module:Input", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<input placeholder=\"{{view.placeholder || ''}}\" autofocus />",

        attrs: {
            model: {
                value: ""
            },
            view: {
                placeholder: "",
                autofocus: true
            }

        }

    }).register();

});
Scoped.define("module:Scrollpicker", [
    "dynamics:Dynamic",
    "ui:Interactions.Loopscroll",
    "base:Loggers.Logger"
], [
    "dynamics:Partials.RepeatElementPartial"
], function(Dynamic, Loopscroll, Logger, scoped) {

    var logger = Logger.global().tag("dynamic", "scroll");

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<container>\n        <element\n                ba-repeat-element=\"{{element_value :: value_array}}\"\n                ba-click=\"select_element(element_value)\"\n                data-id=\"{{element_value}}\"\n        >\n                {{element_value}}\n        </element>\n</container>",

        attrs: {
            initial_value: 14,
            current_value: 10,
            first: 0,
            last: 23,
            increment: 1,
            value_array: []
        },

        create: function() {

            this.initialize_value_array();
            this.initialize_value();

        },

        functions: {

            select_element: function(value) {

                var old_element = this.element()[0].querySelector("[data-id='" + this.get('current_value') + "']");

                old_element.style.color = "";
                old_element.style.background = "";

                this.set('current_value', value);

                var ele = this.element()[0].querySelector("[data-id='" + value + "']");

                this.execute('scroll_to_element', ele);
            },

            scroll_to_element: function(element) {
                this.get('scroll').scrollToElement(element, {
                    animate: false
                });
                element.style.color = "black";
                element.style.background = "white";
            }

        },

        _afterActivate: function(element) {

            element = element.querySelector('container');

            var scroll = new Loopscroll(element, {
                enabled: true,
                //currentTop: this.get('currentTop'),
                currentTop: this.get('top'),
                discrete: true,
                scrollEndTimeout: 200,
                currentCenter: true
            });

            this.set('scroll', scroll);

            //var self = this;
            //element.scroll(function () {
            //    logger.log('There is a Scroll happening');
            //    logger.log(self.__cid);
            //});

            var ele = element.querySelector("[data-id='" + this.get('current_value') + "']");

            this.execute('scroll_to_element', ele);

            scroll.on("scrollend", function() {
                logger.log(this);
                this.set('current_value', scroll.currentElement().dataset.id);
            }, this);

            scroll.on("scroll", function() {
                for (var i = 0; i < element.children.length; ++i) {
                    element.children[i].style.color = "#999";
                    element.children[i].style.background = "#F4F4F4";
                }
                scroll.currentElement().style.color = "black";
                scroll.currentElement().style.background = "white";
            });

        },

        initialize_value: function() {

            var inc = this.get('increment');
            var rounded_value = inc * Math.round(this.get('initial_value') / inc);
            var index = this.get('value_array').indexOf(rounded_value);
            var displayed_value = index > -1 ? rounded_value : this.get('value_array')[0];

            this.set('current_value', parseInt(displayed_value, 10));

        },

        initialize_value_array: function() {

            var first = this.get('first');
            var last = this.get('last');
            var inc = this.get('increment');

            var value_array = [];

            if (first < last)
                for (var i = first; i <= last; i += inc)
                    value_array.push(i);

            else if (first > last)
                for (var j = first; j >= last; j -= inc)
                    value_array.push(j);

            this.set('value_array', value_array);

        }

    }).register();

});
Scoped.define("module:Search", [
    "dynamics:Dynamic"
], [
    "module:Loading"
], function(Dynamic, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<icon ba-if=\"{{!loading}}\" class=\"icon-search\"></icon>\n<ba-loading ba-if=\"{{loading}}\"></ba-loading>\n<div>\n    <input placeholder=\"{{view.placeholder || ''}}\" value=\"{{=value}}\" />\n</div>",

        attrs: {
            value: "",
            loading: false,
            view: {
                placeholder: "Placeholder",
                autofocus: true
            }
        },

        events: {
            'change:value': function() {
                this.set('loading', true);
            }
        }

    }).register();

});
Scoped.define("module:Textinput", [
    "dynamics:Dynamic",
    'base:Strings'
], function(Dynamic, Strings, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<textarea autofocus onblur=\"{{this.execute('blur')}}\" value=\"{{=value}}\"></textarea>\n<pre>{{=preheighttext}}</pre>\n",

        attrs: {
            value: 'Test',
            height: 0,
            view: {
                placeholder: "",
                autofocus: true
            }

        },

        computed: {
            "preheighttext:value": function() {
                var s = this.get('value');
                return s + (Strings.ends_with(s, "\n") ? " " : "");
            }
        },

        functions: {
            blur: function() {
                this.trigger('blur');
            },
            focus: function() {
                this.activeElement().getElementsByTagName("textarea")[0].focus();
            }
        }

    }).register();

});
Scoped.define("module:Overlaycontainer", [
    "dynamics:Dynamic"
], [
    "dynamics:Partials.TapPartial"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<overlaycontainer\n    ba-tap=\"showoverlay = false\"\n    ba-if=\"{{showoverlay}}\">\n\n    <overlayinner>\n\n        <ba-{{view.overlay}} ba-noscope>\n            <message>{{model.message}}</message>\n        </ba-{{view.overlay}}>\n\n    </overlayinner>\n\n</overlaycontainer>",

        attrs: function() {
            return {
                view: {
                    overlay: ""
                },
                model: {
                    message: "This is a message"
                },
                value: null,
                showoverlay: true
            };
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

    }).register();

});
Scoped.define("module:Loadmore", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<loadmore ba-click=\"load_more()\">\n\n    <button>Load more</button>\n\n</loadmore>",

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

    }).register();

});
Scoped.define("module:Clickitem", [
    "dynamics:Dynamic",
    "base:Loggers.Logger"
], function(Dynamic, Logger, scoped) {

    var logger = Logger.global().tag("dynamic", "list");

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<button\n        ba-class=\"{{{\n            'icon' : model.icon,\n            'noicon' : !model.icon\n        }}}\"\n        ba-click=\"click()\">\n    <icon class=\"{{model.icon}}\"></icon>\n    <value>\n        {{model.value}}\n    </value>\n</button>\n\n",

        attrs: {
            model: {
                icon: '',
                value: 'Clickitem - Value',
                eventid: 'noid'
            }
        },

        functions: {
            click: function() {
                logger.log('Click');

                this.trigger('click', this.getProp('model.eventid'));
                //logger.log("You Clicked item : " + this.properties().getProp('model.value'));
                //logger.log(this.cid());
                this.trigger('event', this.cid());
            }
        },

        create: function() {
            this.on("event", function(cid) {
                logger.log('event from item: ' + cid);
            }, this);
        }

    }).register();

});
Scoped.define("module:Eventitem", [
    "dynamics:Dynamic",
    "base:Loggers.Logger"
], function(Dynamic, Logger, scoped) {

    var logger = Logger.global().tag("dynamic", "calendar");

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<button\n        class=\"{{model.class}}\">\n    {{model.value}} - {{counter}}\n</button>",

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

            this.parent().on('archive', function() {
                logger.log('archived');
            }, this);

        }

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
    "base:Objs",
    "base:Loggers.Logger"
], [
    "dynamics:Partials.ClassPartial"
], function(Dynamic, Objs, Logger, scoped) {

    var logger = Logger.global().tag("dynamic", "list");

    Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<selectableitem\n        ba-class=\"{{{selected : selected.cid == this.cid()}}}\"\n        ba-click=\"select()\">\n    {{model.value}}\n</selectableitem>",

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

                logger.log('There is no parent list the selector can attach to, this currently only works  with ba-list');
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

    }).register();
});
Scoped.define("module:List", [
    "dynamics:Dynamic",
    "base:Async",
    "base:Promise"
], [
    "dynamics:Partials.EventForwardPartial",
    "dynamics:Partials.RepeatPartial",
    "dynamics:Partials.IfPartial",
    "dynamics:Partials.DataPartial",
    "dynamics:Partials.FunctionsPartial",
    "dynamics:Partials.CachePartial",
    "module:Loading",
    "module:Loadmore"
], function(Dynamic, Async, Promise, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<list ba-repeat=\"{{view.repeatoptions :: collectionitem :: (model.listcollection||listcollection)}}\"\n      ba-interaction:scroll=\"{{infinite_scroll_options}}\">\n<!--<list ba-repeat=\"{{collectionitem :: (model.listcollection||listcollection)}}\">-->\n\n    <ba-{{getview(collectionitem)}}\n        ba-cache\n        ba-data:id=\"{{collectionitem.cid()}}\"\n        ba-data:pid=\"{{collectionitem.pid()}}\"\n        ba-functions=\"{{collectionitem.callbacks}}\"\n        ba-event-forward:item=\"{{[collectionitem]}}\"\n        ba-view=\"{{collectionitem.view||view.listinner}}\"\n        ba-model=\"{{collectionitem}}\">\n\n    </ba-{{getview(collectionitem)}}>\n\n</list>\n\n<ba-loadmore ba-if=\"{{loadmore && loadmorestyle !== 'infinite'}}\" ba-show=\"{{!loading}}\" ba-event:loadmore=\"moreitems\">\n</ba-loadmore>\n<ba-loading ba-if=\"{{loadmore}}\" ba-show=\"{{loading}}\">\n</ba-loading>\n",

        attrs: {
            listitem: "clickitem",
            model: false,
            view: {},
            infinite_scroll_options: {
                disabled: true,
                parent_elem: true,
                enable_scroll_modifier: "",
                type: "infinitescroll",
                append: function(count, callback) {
                    console.log("append");
                    this.execute("moreitems").success(function() {
                        callback(1, true);
                    });
                }
            },
            loadmorestyle: "button" //infinite
        },

        create: function() {
            if (this.get("loadmore") && this.get("loadmorestyle") === "infinite")
                this.setProp("infinite_scroll_options.disabled", false);
        },

        functions: {
            moreitems: function() {
                var promise = Promise.create();
                this.set("loading", true);
                Async.eventually(function() {
                    this.get("loadmore").increase_forwards().callback(function() {
                        promise.asyncSuccess(true);
                        this.set("loading", false);
                    }, this);
                }, this);
                return promise;
            },

            getview: function(item) {
                return this.getProp("view.listitem") || item.get("listitem") || (this.get("listitemfunc") ? (this.get("listitemfunc"))(item) : this.get("listitem"));
            }
        }

    }).register();

});
// TODO:
//  - Link Searchvalue with listcollection
//  - Make Loading look nicer

Scoped.define("module:Searchlist", [
    "dynamics:Dynamic"
], [
    "module:List",
    "module:Search",
    "module:Loading",
    "dynamics:Partials.NoScopePartial"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<ba-search\n        ba-loading=\"{{searchingindication}}\"\n        ba-value=\"{{=searchvalue}}\"\n        ba-if=\"{{view.show_searchbox}}\"\n        ba-view=\"{{view}}\"></ba-search>\n\n<ba-loading ba-if=\"{{searchingindication}}\">\n</ba-loading>\n\n<ba-list ba-noscope ba-event-forward=\"{{[]}}\"></ba-list>\n",

        attrs: {
            searchvalue: "",
            searchingindication: false,
            searching: false,
            view: {
                show_searchbox: true
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

    }).register();

});
Scoped.define("module:Titledlist", [
    "dynamics:Dynamic",
    "base:Loggers.Logger"
], [
    "dynamics:Partials.EventForwardPartial",
    "module:List",
    "dynamics:Partials.NoScopePartial",
    "dynamics:Partials.ClickPartial"
], function(Dynamic, Logger, scoped) {

    var logger = Logger.global().tag("dynamic", "list");

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<ba-{{view.titleitem}}\n    ba-click=\"click_title()\"\n    ba-event-forward:title=\"{{[]}}\"\n    ba-model=\"{{model.title_model}}\">{{model.title_model.value}}</ba-{{view.titleitem}}>\n\n<ba-list\n        ba-noscope\n        ba-show=\"{{!collapsed}}\">\n\n</ba-list>\n",

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

        functions: {

            togglelist: function() {

                if (this.get('collapsible'))
                    this.set('collapsed', !this.get('collapsed'));

            },

            additem: function(item) {

                item = item ? item : {
                    value: "Titledlist - New Item"
                };
                var index = this.get('listcollection').add(item);

                return this.get('listcollection').getByIndex(index).cid();

            },

            click_title: function() {
                logger.log('You clicked the title');
                this.call('togglelist');
            }

        }

    }).register();

});
Scoped.define("module:Addtitle", [
    "dynamics:Dynamic",
    "base:Loggers.Logger"
], function(Dynamic, Logger, scoped) {

    var logger = Logger.global().tag("dynamic", "list");

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<addtitle>\n    <title ba-click=\"clicktitle()\">{{model.value}}</title>\n    <button ba-click=\"addbutton()\">\n        <span class=\"icon-plus\"></span>\n    </button>\n</addtitle>",

        attrs: {
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

    }).register();

});
Scoped.define("module:Header", [
    "dynamics:Dynamic"
], [
    "module:Toggle_menu"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<ba-list ba-listcollection=\"{{left_collection}}\"></ba-list>",

        collections: {
            left_collection: [{
                listitem: 'toggle_menu'
            }, {
                listitem: 'searchbox',
                view: {
                    placeholder: 'Test'
                }
            }, {
                value: '',
                "class": 'icon-home'
            }, {
                value: 'Big Brother',
                "class": 'icon-eye-open'
            }, {
                value: 'Header 1'
            }, {
                value: 'Header 2'
            }]
        }

    }).register();

});
Scoped.define("module:Toggle_menu", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<button ba-click=\"toggle_menu()\" class=\"{{toggle_icon}}\"></button>",

        attrs: {
            toggle_icon: 'icon-reorder'
        },

        functions: {
            toggle_menu: function() {
                this.channel('global').trigger('toggle_menu');
            }
        }

    }).register();

});
Scoped.define("module:Toggle", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<button ba-click=\"toggle_menu()\" class=\"{{toggle_icon}}\"></button>",

        attrs: {
            toggle_icon: 'icon-reorder'
        },

        functions: {
            toggle_menu: function() {
                this.scope("<+[tagname='ba-layout_web']").call('toggle_menu');

                this.channel('toggle').trigger('toggle', 'menu');
            }
        }

    }).register();

});
Scoped.define("module:Menu_web", [
    "dynamics:Dynamic",
    "base:Collections.Collection"
], function(Dynamic, Collection, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<ba-titledlist\n        ba-collapsible=\"{{false}}\"\n        ba-model=\"{{model}}\"\n        ba-listcollection=\"{{menu_collection}}\">\n\n</ba-titledlist>",

        attrs: {
            model: {
                title_model: {
                    value: "Menu Title"
                }
            }
        },

        collections: {
            menu_collection: [{
                    value: 'Item 1'
                },
                {
                    value: 'Item 2'
                },
                {
                    listitem: 'titledlist',
                    title_model: {
                        value: 'Item 3'
                    },
                    listcollection: new Collection({
                        objects: [{
                                value: "Subitem 1"
                            },
                            {
                                value: "Subitem 2"
                            }
                        ]
                    })
                },
                {
                    value: 'Item 4'
                }
            ]
        }

    }).register();

});
Scoped.define("module:Layout_web", [
    "dynamics:Dynamic"
], [
    "dynamics:Partials.AttrsPartial"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<ba-{{view.header}}\n    class=\"header\"\n>Header</ba-{{view.header}}>\n\n\n<main>\n    <ba-{{view.menu}}\n        class=\"menu\"\n        ba-show=\"{{view.display_menu}}\"\n        ba-view=\"{{view.menuview}}\">\n        Menu\n    </ba-{{view.menu}}>\n    <ba-{{view.content}}\n        class=\"content\"\n        ba-model={{contentmodel}}\n        ba-view=\"{{view.contentview}}\"\n        ba-attrs=\"{{view.contentattrs}}\">\n        Content\n    </ba-{{view.content}}>\n</main>",

        attrs: {
            view: {
                header: "header",
                //header : null,
                menu: "menu_web",
                //menu : null,
                content: null,
                display_menu: true
            },
            model: {

            }
        },

        extendables: ['view'],

        channels: {
            "global:toggle_menu": function() {
                this.execute('toggle_menu');
            }
        },

        functions: {
            toggle_menu: function() {
                this.setProp('view.display_menu', !this.getProp('view.display_menu'));
            }
        },

        create: function() {
            this.on('toggle', function() {
                console.log('Toggle the menu');
            });
        }

    }).register();

});
}).call(Scoped);