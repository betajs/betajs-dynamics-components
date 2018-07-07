/*!
betajs-dynamics-components - v0.1.44 - 2018-07-06
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
    "version": "0.1.44"
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

        template: "<button\n        onblur=\"{{this.execute('blur')}}\"\n        ba-tap=\"{{click()}}\"\n        class=\"{{view.icon}}\">\n    <dropdown ba-show=\"{{showdropdown}}\">\n        <ba-{{view.dropdown}}\n            ba-view.listitem=\"{{view.listitem}}\"\n            ba-event:item-click=\"hide_dropdown\"\n            ba-event-forward:dropdown=\"{{[]}}\"\n            ba-model='{{dropdownmodel}}'\n            ba-listcollection='{{dropdownmodel}}'\n\n        ></ba-{{view.dropdown}}>\n    </dropdown>\n</button>\n",

        attrs: function() {
            return {
                view: {
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

    }).registerFunctions({ /**/"this.execute('blur')": function (obj) { with (obj) { return this.execute('blur'); } }, "click()": function (obj) { with (obj) { return click(); } }, "view.icon": function (obj) { with (obj) { return view.icon; } }, "showdropdown": function (obj) { with (obj) { return showdropdown; } }, "view.dropdown": function (obj) { with (obj) { return view.dropdown; } }, "view.listitem": function (obj) { with (obj) { return view.listitem; } }, "[]": function (obj) { with (obj) { return []; } }, "dropdownmodel": function (obj) { with (obj) { return dropdownmodel; } }/**/ }).register();

});
Scoped.define("module:Dropdownselect", [
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

        template: "<button\n        onblur=\"{{this.execute('blur')}}\"\n        ba-tap=\"{{click()}}\"\n        class=\"{{model.icon}}\"\n        style=\"color: {{model.icon_color}}; background: {{model.background}}\" >\n    <dropdownselect ba-show=\"{{showdropdown}}\">\n        <ba-{{view.dropdown}}\n            ba-view.listitem=\"{{view.listitem}}\"\n            ba-event:item-click=\"hide_dropdown\"\n            ba-event-forward:dropdownselect=\"{{[]}}\"\n            ba-model='{{dropdownmodel}}'\n            ba-listcollection='{{dropdownmodel}}'\n\n        ></ba-{{view.dropdown}}>\n        <ba-clickitem\n                ba-model=\"{{removemodel}}\"\n                ba-if=\"{{view.useremove}}\"\n                ba-event:click=\"remove_selected\"\n                ba-event-forward:dropdownselect=\"{{[]}}\"\n        ></ba-clickitem>\n    </dropdownselect>\n    <div></div>\n</button>\n",

        attrs: function() {
            return {
                view: {
                    dropdown: 'list',
                    icon: 'icon-more_vert',
                    color: null,
                    background: null,
                    useremove: true
                },
                model: new Properties({
                    icon: 'icon-more_vert',
                    color: null,
                    background: null
                }),
                removemodel: new Properties({
                    icon: 'icon-remove',
                    background: 'white',
                    value: 'Remove'
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
            remove_selected: function() {
                this.set('model', this.get('view'));
                this.execute('hide_dropdown');
            }
        }

    }).registerFunctions({ /**/"this.execute('blur')": function (obj) { with (obj) { return this.execute('blur'); } }, "click()": function (obj) { with (obj) { return click(); } }, "model.icon": function (obj) { with (obj) { return model.icon; } }, "model.icon_color": function (obj) { with (obj) { return model.icon_color; } }, "model.background": function (obj) { with (obj) { return model.background; } }, "showdropdown": function (obj) { with (obj) { return showdropdown; } }, "view.dropdown": function (obj) { with (obj) { return view.dropdown; } }, "view.listitem": function (obj) { with (obj) { return view.listitem; } }, "[]": function (obj) { with (obj) { return []; } }, "dropdownmodel": function (obj) { with (obj) { return dropdownmodel; } }, "removemodel": function (obj) { with (obj) { return removemodel; } }, "view.useremove": function (obj) { with (obj) { return view.useremove; } }/**/ }).register();

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
    }).registerFunctions({ /**//**/ }).register();

});
Scoped.define("module:Clickinput", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<title\n        ba-if=\"{{!view.edit || !view.externaledit}}\"\n        ba-click=\"{{edititem()}}\"\n>\n    {{model.value}}\n</title>\n\n<input\n        placeholder=\"{{view.placeholder || ''}}\"\n        ba-if=\"{{view.edit}}\"\n        ba-return=\"{{view.edit = false}}\"\n        onblur=\"{{view.edit = false}}\"\n        value=\"{{=model.value}}\" />\n",

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

    }).registerFunctions({ /**/"!view.edit || !view.externaledit": function (obj) { with (obj) { return !view.edit || !view.externaledit; } }, "edititem()": function (obj) { with (obj) { return edititem(); } }, "model.value": function (obj) { with (obj) { return model.value; } }, "view.placeholder || ''": function (obj) { with (obj) { return view.placeholder || ''; } }, "view.edit": function (obj) { with (obj) { return view.edit; } }, "view.edit = false": function (obj) { with (obj) { return view.edit = false; } }/**/ }).register();

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

    }).registerFunctions({ /**/"view.placeholder || ''": function (obj) { with (obj) { return view.placeholder || ''; } }/**/ }).register();

});
Scoped.define("module:Scrollpicker", [
    "dynamics:Dynamic",
    "ui:Interactions.Loopscroll"
], [
    "dynamics:Partials.RepeatElementPartial"
], function(Dynamic, Loopscroll, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<container>\n        <element\n                ba-repeat-element=\"{{element_value :: value_array}}\"\n                ba-click=\"{{select_element(element_value)}}\"\n                data-id=\"{{element_value}}\"\n        >\n                {{element_value}}\n        </element>\n</container>",

        attrs: {
            initial_value: 14,
            current_value: 10,
            first: 0,
            last: 23,
            increment: 1,
            value_array: [],
            last_elem: null
        },

        create: function() {

            this.initialize_value_array();
            this.initialize_value();

        },

        functions: {

            select_element: function(value) {

                var old_element = this.element()[0].querySelector("[data-id='" + this.get('current_value') + "']");

                Object.assign(old_element.style, {
                    color: null,
                    background: null
                });

                this.set('current_value', value);

                var ele = this.element()[0].querySelector("[data-id='" + value + "']");

                this.execute('scroll_to_element', ele);
            },

            scroll_to_element: function(element) {
                this.get('scroll').scrollToElement(element, {
                    animate: false
                });

                Object.assign(element.style, {
                    color: "black",
                    background: "white"
                });
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

            var ele = element.querySelector("[data-id='" + this.get('current_value') + "']");

            this.execute('scroll_to_element', ele);

            scroll.on("scrollend", function() {
                this.set('current_value', scroll.currentElement().dataset.id);
            }, this);

            scroll.on("scroll", function() {
                if (this.get('last_elem')) {
                    Object.assign(this.get('last_elem').style, {
                        color: "#999",
                        background: "#F4F4F4"
                    });
                }

                var current_elem = scroll.currentElement();
                Object.assign(current_elem.style, {
                    color: "black",
                    background: "white"
                });
                this.set('last_elem', current_elem);
            }, this);

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

    }).registerFunctions({ /**/"value_array": function (obj) { with (obj) { return value_array; } }, "select_element(element_value)": function (obj) { with (obj) { return select_element(element_value); } }, "element_value": function (obj) { with (obj) { return element_value; } }/**/ }).register();

});
Scoped.define("module:Search", [
    "dynamics:Dynamic"
], [
    "module:Loading"
], function(Dynamic, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<icon ba-if=\"{{!searching}}\" class=\"icon-search\"></icon>\n<ba-loading ba-if=\"{{searching}}\"></ba-loading>\n<div>\n    <input placeholder=\"{{view.placeholder || ''}}\" value=\"{{=value}}\" />\n</div>\n",

        attrs: {
            value: "",
            loading: false,
            view: {
                placeholder: "Placeholder",
                autofocus: true
            }
        },

        extendables: ['view'],

        events: {
            'change:value': function(value) {
                this.set('loading', !!value);
            }
        }

    }).registerFunctions({ /**/"!searching": function (obj) { with (obj) { return !searching; } }, "searching": function (obj) { with (obj) { return searching; } }, "view.placeholder || ''": function (obj) { with (obj) { return view.placeholder || ''; } }, "value": function (obj) { with (obj) { return value; } }/**/ }).register();

});
Scoped.define("module:Textinput", [
    "dynamics:Dynamic",
    'base:Strings'
], function(Dynamic, Strings, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<textarea\n        onfocus=\"{{this.execute('onfocus')}}\"\n        onfocusout=\"{{this.execute('blur')}}\"\n        value=\"{{=value}}\"\n></textarea>\n<pre>{{=preheighttext}}</pre>\n",

        attrs: {
            value: null,
            height: 0,
            view: {
                placeholder: '',
                autofocus: true
            }
        },

        computed: {
            "preheighttext:value": function() {
                var s = this.get('value');
                return s + (Strings.ends_with(s || '', "\n") ? " " : "");
            }
        },

        functions: {
            blur: function() {
                console.log('Textinput: Blur not working every time');
                this.trigger('blur');
            },
            onfocus: function() {
                this.trigger('onfocus');
            }
        }

    }).registerFunctions({ /**/"this.execute('onfocus')": function (obj) { with (obj) { return this.execute('onfocus'); } }, "this.execute('blur')": function (obj) { with (obj) { return this.execute('blur'); } }, "value": function (obj) { with (obj) { return value; } }, "preheighttext": function (obj) { with (obj) { return preheighttext; } }/**/ }).register();

});
Scoped.define("module:Overlaycontainer", [
    "dynamics:Dynamic"
], [
    "dynamics:Partials.TapPartial"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<overlaycontainer\n    ba-tap=\"{{showoverlay = false}}\"\n    ba-if=\"{{showoverlay}}\"\n    ba-class=\"{{{\n                normal : !view.fullpage,\n                fullpage : view.fullpage\n            }}}\">\n\n    <overlayinner>\n\n        <ba-{{view.overlay}} ba-noscope>\n        <!--<ba-{{view.overlay}} ba-model=\"{{model}}\">-->\n            <message>{{model.message}}</message>\n        </ba-{{view.overlay}}>\n\n    </overlayinner>\n\n</overlaycontainer>",

        attrs: function() {
            return {
                view: {
                    overlay: "",
                    fullpage: false
                },
                model: {
                    message: "This is a message"
                },
                value: null,
                showoverlay: true
            };
        }

    }).registerFunctions({ /**/"showoverlay = false": function (obj) { with (obj) { return showoverlay = false; } }, "showoverlay": function (obj) { with (obj) { return showoverlay; } }, "{\n                normal : !view.fullpage,\n                fullpage : view.fullpage\n            }": function (obj) { with (obj) { return {
                normal : !view.fullpage,
                fullpage : view.fullpage
            }; } }, "view.overlay": function (obj) { with (obj) { return view.overlay; } }, "model.message": function (obj) { with (obj) { return model.message; } }/**/ }).register();

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

    }).registerFunctions({ /**/"logs": function (obj) { with (obj) { return logs; } }, "log.color": function (obj) { with (obj) { return log.color; } }, "log.text": function (obj) { with (obj) { return log.text; } }, "command": function (obj) { with (obj) { return command; } }, "run_command()": function (obj) { with (obj) { return run_command(); } }/**/ }).register();

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
Scoped.define("module:Loading", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<div class=\"sk-circle\">\n    <div class=\"sk-circle1 sk-child\"></div>\n    <div class=\"sk-circle2 sk-child\"></div>\n    <div class=\"sk-circle3 sk-child\"></div>\n    <div class=\"sk-circle4 sk-child\"></div>\n    <div class=\"sk-circle5 sk-child\"></div>\n    <div class=\"sk-circle6 sk-child\"></div>\n    <div class=\"sk-circle7 sk-child\"></div>\n    <div class=\"sk-circle8 sk-child\"></div>\n    <div class=\"sk-circle9 sk-child\"></div>\n    <div class=\"sk-circle10 sk-child\"></div>\n    <div class=\"sk-circle11 sk-child\"></div>\n    <div class=\"sk-circle12 sk-child\"></div>\n</div>\n"

    }).registerFunctions({ /**//**/ }).register();

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

    }).registerFunctions({ /**/"load_more()": function (obj) { with (obj) { return load_more(); } }/**/ }).register();

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

    }).registerFunctions({ /**/"{\n            'icon' : model.background || model.icon,\n            'noicon' : !model.icon && !model.background\n        }": function (obj) { with (obj) { return {
            'icon' : model.background || model.icon,
            'noicon' : !model.icon && !model.background
        }; } }, "click()": function (obj) { with (obj) { return click(); } }, "model.icon": function (obj) { with (obj) { return model.icon; } }, "model.background": function (obj) { with (obj) { return model.background; } }, "model.icon_color": function (obj) { with (obj) { return model.icon_color; } }, "model.value || model.name": function (obj) { with (obj) { return model.value || model.name; } }/**/ }).register();

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

    }).registerFunctions({ /**/"model['class']": function (obj) { with (obj) { return model['class']; } }, "model.value": function (obj) { with (obj) { return model.value; } }, "counter": function (obj) { with (obj) { return counter; } }/**/ }).register();

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

    }).registerFunctions({ /**/"{selected : selected.cid == this.cid()}": function (obj) { with (obj) { return {selected : selected.cid == this.cid()}; } }, "select()": function (obj) { with (obj) { return select(); } }, "model.value": function (obj) { with (obj) { return model.value; } }/**/ }).register();
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

        template: "<ba-loadmore ba-if=\"{{loadmore && loadmorestyle !== 'infinite' && loadmorebackwards}}\" ba-show=\"{{!loading}}\" ba-event:loadmore=\"moreitemsbackwards\">\n</ba-loadmore>\n<ba-loading ba-if=\"{{loadmore && loadmorebackwards}}\" ba-show=\"{{loading}}\">\n</ba-loading>\n\n<list ba-repeat=\"{{view.repeatoptions :: collectionitem :: (model.listcollection||listcollection)}}\"\n      ba-interaction:scroll=\"{{infinite_scroll_options}}\">\n<!--<list ba-repeat=\"{{collectionitem :: (model.listcollection||listcollection)}}\">-->\n    <!--ba-isselected=\"{{isselected(collectionitem)}}\"-->\n\n    <ba-{{getview(collectionitem)}}\n        ba-cache\n        data-id=\"{{collectionitem.cid()}}\"\n        ba-data:id=\"{{collectionitem.cid()}}\"\n        ba-data:pid=\"{{collectionitem.pid()}}\"\n        ba-functions=\"{{collectionitem.callbacks}}\"\n        ba-isselected=\"{{isEqual(collectionitem, selected)}}\"\n        ba-event-forward:item=\"{{[collectionitem]}}\"\n        ba-view=\"{{collectionitem.view||view.listinner}}\"\n        ba-model=\"{{collectionitem}}\">\n\n    </ba-{{getview(collectionitem)}}>\n\n</list>\n\n<ba-loadmore ba-if=\"{{loadmore && loadmorestyle !== 'infinite'}}\" ba-show=\"{{!loading}}\" ba-event:loadmore=\"moreitems\">\n</ba-loadmore>\n<ba-loading ba-if=\"{{loadmore}}\" ba-show=\"{{loading}}\">\n</ba-loading>\n",

        attrs: function() {
            return {
                listitem: "clickitem",
                model: false,
                selected: null,
                scrolltolast: null,
                scrolltofirst: null,
                autoscroll: false,
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
                loadmorebackwards: false,
                loadmoresteps: undefined,
                loadmorestyle: "button" //infinite
            };
        },

        types: {
            scrolltolast: "boolean",
            scrolltofirst: "boolean",
            autoscroll: "boolean"
        },

        create: function() {
            if (this.get("loadmore") && this.get("loadmorestyle") === "infinite")
                this.setProp("infinite_scroll_options.disabled", false);
            /*
            if (this.get("listcollection"))
                this._setupListCollection();
                */
        },

        events: {
            "change:listcollection": function() {
                this._setupListCollection();
            }
        },

        _setupListCollection: function() {
            var evts = "replaced-objects";
            if (this.get("autoscroll"))
                evts += " add";
            Async.eventually(function() {
                if (this.destroyed())
                    return;
                if (this.getCollection()) {
                    if (this.get("scrolltolast")) {
                        this.listenOn(this.getCollection(), evts, function() {
                            this.execute("scrollToLast");
                        }, {
                            eventually: true
                        });
                        this.execute("scrollToLast");
                    }
                    if (this.get("scrolltofirst")) {
                        this.listenOn(this.getCollection(), evts, function() {
                            this.execute("scrollToFirst");
                        }, {
                            eventually: true
                        });
                        this.execute("scrollToFirst");
                    }
                }
            }, this);
        },

        getCollection: function() {
            var coll = this.get("listcollection");
            return coll && coll.value ? coll.value() : coll;
        },

        functions: {
            moreitems: function() {
                var promise = Promise.create();
                this.set("loading", true);
                Async.eventually(function() {
                    this.get("loadmore").increase_forwards(this.get("loadmoresteps")).callback(function() {
                        promise.asyncSuccess(true);
                        this.set("loading", false);
                    }, this);
                }, this);
                return promise;
            },

            moreitemsbackwards: function() {
                var promise = Promise.create();
                this.set("loading", true);
                Async.eventually(function() {
                    this.get("loadmore").increase_backwards(this.get("loadmoresteps")).callback(function() {
                        promise.asyncSuccess(true);
                        this.set("loading", false);
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
            }
        }

    }).registerFunctions({ /**/"loadmore && loadmorestyle !== 'infinite' && loadmorebackwards": function (obj) { with (obj) { return loadmore && loadmorestyle !== 'infinite' && loadmorebackwards; } }, "!loading": function (obj) { with (obj) { return !loading; } }, "loadmore && loadmorebackwards": function (obj) { with (obj) { return loadmore && loadmorebackwards; } }, "loading": function (obj) { with (obj) { return loading; } }, "(model.listcollection||listcollection)": function (obj) { with (obj) { return (model.listcollection||listcollection); } }, "infinite_scroll_options": function (obj) { with (obj) { return infinite_scroll_options; } }, "getview(collectionitem)": function (obj) { with (obj) { return getview(collectionitem); } }, "collectionitem.cid()": function (obj) { with (obj) { return collectionitem.cid(); } }, "collectionitem.pid()": function (obj) { with (obj) { return collectionitem.pid(); } }, "collectionitem.callbacks": function (obj) { with (obj) { return collectionitem.callbacks; } }, "isEqual(collectionitem, selected)": function (obj) { with (obj) { return isEqual(collectionitem, selected); } }, "[collectionitem]": function (obj) { with (obj) { return [collectionitem]; } }, "collectionitem.view||view.listinner": function (obj) { with (obj) { return collectionitem.view||view.listinner; } }, "collectionitem": function (obj) { with (obj) { return collectionitem; } }, "loadmore && loadmorestyle !== 'infinite'": function (obj) { with (obj) { return loadmore && loadmorestyle !== 'infinite'; } }, "loadmore": function (obj) { with (obj) { return loadmore; } }/**/ }).register();

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

        template: "\n<ba-search\n        ba-searching=\"{{=searchingindication}}\"\n        ba-value=\"{{=searchvalue}}\"\n        ba-if=\"{{view.showsearch}}\"\n        ba-view=\"{{view}}\"></ba-search>\n\n<!--<ba-loading ba-if=\"{{searchingindication}}\">-->\n<!--</ba-loading>-->\n\n<ba-list ba-noscope ba-event-forward=\"{{[]}}\"></ba-list>\n",

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

    }).registerFunctions({ /**/"searchingindication": function (obj) { with (obj) { return searchingindication; } }, "searchvalue": function (obj) { with (obj) { return searchvalue; } }, "view.showsearch": function (obj) { with (obj) { return view.showsearch; } }, "view": function (obj) { with (obj) { return view; } }, "[]": function (obj) { with (obj) { return []; } }/**/ }).register();

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

        template: "\n<ba-{{view.titleitem}}\n    ba-click=\"{{click_title()}}\"\n    ba-event-forward:title=\"{{[]}}\"\n    ba-model=\"{{model.title_model}}\">{{model.title_model.value}}</ba-{{view.titleitem}}>\n\n<ba-list\n        ba-noscope\n        ba-event-forward=\"{{[]}}\"\n        ba-show=\"{{!collapsed}}\">\n\n</ba-list>\n",

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
                this.call('togglelist');
            }

        }

    }).registerFunctions({ /**/"view.titleitem": function (obj) { with (obj) { return view.titleitem; } }, "click_title()": function (obj) { with (obj) { return click_title(); } }, "[]": function (obj) { with (obj) { return []; } }, "model.title_model": function (obj) { with (obj) { return model.title_model; } }, "model.title_model.value": function (obj) { with (obj) { return model.title_model.value; } }, "!collapsed": function (obj) { with (obj) { return !collapsed; } }/**/ }).register();

});
Scoped.define("module:Addtitle", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<addtitle>\n    <title ba-click=\"{{clicktitle()}}\">{{model.value}}</title>\n    <button ba-click=\"{{addbutton()}}\">\n        <span class=\"icon-plus\"></span>\n    </button>\n</addtitle>",

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

    }).registerFunctions({ /**/"clicktitle()": function (obj) { with (obj) { return clicktitle(); } }, "model.value": function (obj) { with (obj) { return model.value; } }, "addbutton()": function (obj) { with (obj) { return addbutton(); } }/**/ }).register();

});
}).call(Scoped);