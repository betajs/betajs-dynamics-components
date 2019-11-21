/*!
betajs-dynamics-components - v0.1.106 - 2019-11-21
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
    "version": "0.1.106",
    "datetime": 1574333228490
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

        template: "<button\n        onblur=\"{{this.execute('blur')}}\"\n        ba-tap=\"{{click()}}\"\n        class=\"{{showdropdown ? 'icon-angle-up' : view.icon}}\">\n    <dropdown ba-show=\"{{showdropdown}}\">\n        <description ba-if=\"{{view.description}}\">\n            {{view.description}}\n        </description>\n        <ba-{{view.dropdown}}\n            ba-view.listitem=\"{{view.listitem}}\"\n            ba-event:item-click=\"hide_dropdown\"\n            ba-event-forward:dropdown\n            ba-event-forward\n            ba-model='{{dropdownmodel}}'\n            ba-listcollection='{{dropdownmodel}}'\n        ></ba-{{view.dropdown}}>\n    </dropdown>\n</button>\n",

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

        template: "<button\n        onblur=\"{{this.execute('blur')}}\"\n        ba-tap=\"{{click()}}\"\n        class=\"{{model.icon || view.icon}}\"\n        style=\"color: {{model.icon_color}}; background: {{model.background}}\" >\n    <dropdownselect ba-show=\"{{showdropdown}}\">\n        <description ba-if=\"{{view.description}}\">\n            {{view.description}}\n        </description>\n        <ba-{{view.dropdown}}\n            ba-view.listitem=\"{{view.listitem}}\"\n            ba-event:item-click=\"hide_dropdown\"\n            ba-event-forward:dropdownselect=\"{{[]}}\"\n            ba-model='{{dropdownmodel}}'\n            ba-listcollection='{{dropdownmodel}}'\n\n        ></ba-{{view.dropdown}}>\n        <ba-clickitem\n                ba-model=\"{{removemodel}}\"\n                ba-if=\"{{view.useremove}}\"\n                ba-event:click=\"remove_selected\"\n                ba-event-forward:dropdownselect=\"{{[]}}\"\n        ></ba-clickitem>\n    </dropdownselect>\n</button>\n",

        attrs: function() {
            return {
                view: {
                    description: null,
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
            remove_selected: function() {
                this.set('model', this.get('view'));
                this.execute('hide_dropdown');
            }
        }

    }).registerFunctions({
        /**/"this.execute('blur')": function (obj) { with (obj) { return this.execute('blur'); } }, "click()": function (obj) { with (obj) { return click(); } }, "model.icon || view.icon": function (obj) { with (obj) { return model.icon || view.icon; } }, "model.icon_color": function (obj) { with (obj) { return model.icon_color; } }, "model.background": function (obj) { with (obj) { return model.background; } }, "showdropdown": function (obj) { with (obj) { return showdropdown; } }, "view.description": function (obj) { with (obj) { return view.description; } }, "view.dropdown": function (obj) { with (obj) { return view.dropdown; } }, "view.listitem": function (obj) { with (obj) { return view.listitem; } }, "[]": function (obj) { with (obj) { return []; } }, "dropdownmodel": function (obj) { with (obj) { return dropdownmodel; } }, "removemodel": function (obj) { with (obj) { return removemodel; } }, "view.useremove": function (obj) { with (obj) { return view.useremove; } }/**/
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
], function(Dynamic, Loopscroll, Async, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<container ba-interaction:loopscroll=\"{{loopscroll}}\">\n        <element ba-repeat-element=\"{{value :: values}}\" data-value=\"{{value}}\">\n                {{value}}\n        </element>\n</container>\n<scrolloverlay ba-class=\"{{{\n                  valuetop : top\n               }}}\">\n        <pickeroverlay></pickeroverlay>\n        <valueoverlay></valueoverlay>\n</scrolloverlay>",

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
            // This is not particularly nice, but we'll improve on this later.
            return this.activeElement().querySelector("container").dynnodehandler.interactions.loopscroll;
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

        template: "<overlaycontainer\n    ba-click=\"{{check_split()}}\"\n    ba-if=\"{{showoverlay}}\"\n    ba-class=\"{{{\n                normal : !view.fullpage,\n                fullpage : view.fullpage,\n                overlaysplit: view.overlaysplit,\n                nosplit: !view.overlaysplit\n            }}}\">\n\n    <overlaysplit ba-if=\"{{view.overlaysplit}}\">\n        <top ba-click=\"{{hide_overlay()}}\"\n                 style=\"height: {{view.offsetTop}}px\"></top>\n        <ba-{{view.splitinsert}}\n            ba-if={{view.splitinsert}}\n            ba-model={{model}}\n        ></ba-{{view.splitinsert}}>\n        <split style=\"height: {{view.offsetHeight}}px\"></split>\n        <bottom ba-click=\"{{hide_overlay()}}\"\n                    ba-if=\"{{view.offsetHeight}}\"></bottom>\n    </overlaysplit>\n\n    <overlayinner\n            ba-click=\"\"\n            ba-if=\"{{view.overlay || model.message}}\">\n\n        <ba-{{view.overlay}}\n            ba-event-forward\n            ba-event:hide-overlay='hide_overlay'\n            ba-noscope>\n        \n            <message ba-if=\"{{model.message}}\">{{model.message}}</message>\n        </ba-{{view.overlay}}>\n\n    </overlayinner>\n\n</overlaycontainer>",

        attrs: function() {
            return {
                // overlaysplit: true,

                view: {
                    insertsubview: false,
                    overlay: "",
                    fullpage: false,
                    overlaysplit: false
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
            }; } }, "view.overlaysplit": function (obj) { with (obj) { return view.overlaysplit; } }, "hide_overlay()": function (obj) { with (obj) { return hide_overlay(); } }, "view.offsetTop": function (obj) { with (obj) { return view.offsetTop; } }, "view.splitinsert": function (obj) { with (obj) { return view.splitinsert; } }, "model": function (obj) { with (obj) { return model; } }, "view.offsetHeight": function (obj) { with (obj) { return view.offsetHeight; } }, "view.overlay || model.message": function (obj) { with (obj) { return view.overlay || model.message; } }, "view.overlay": function (obj) { with (obj) { return view.overlay; } }, "model.message": function (obj) { with (obj) { return model.message; } }/**/
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

        template: "\n\n<ba-loading ba-show=\"{{loadmorebackwards && loading}}\">\n</ba-loading>\n\n<list ba-repeat=\"{{view.repeatoptions :: collectionitem :: (model.listcollection||listcollection)}}\"\n      ba-interaction:scroll=\"{{infinite_scroll_options}}\"\n      ba-interaction:droplist=\"{{drop_list_options}}\">\n\n    \n\n    <ba-{{getview(collectionitem)}}\n        ba-cache\n        ba-experimental=\"{{!!collectionitem.experimental}}\"\n        data-id=\"{{collectionitem.cid()}}\"\n        ba-data:id=\"{{collectionitem.cid()}}\"\n        ba-data:pid=\"{{collectionitem.pid()}}\"\n        ba-selection=\"{{=selection}}\"\n        ba-droplist=\"{{droplist}}\"\n        ba-functions=\"{{collectionitem.callbacks}}\"\n        ba-itemcontext=\"{{itemContext(collectionitem)}}\"\n        ba-isselected=\"{{isEqual(collectionitem, selected)}}\"\n        ba-event-forward:item=\"{{[collectionitem]}}\"\n        ba-view=\"{{collectionitem.view||view.listinner||{}}}\"\n        ba-model=\"{{collectionitem}}\"\n    ></ba-{{getview(collectionitem)}}>\n\n</list>\n\n<div class=\"doodad\" data-id=\"floater\" style=\"display:none\">\n    <div class=\"inner\" style=\"height: 44px; line-height: 44px; background-color: #EEEEEE\">\n        Move Here\n    </div>\n</div>\n<ba-loadmore\n        ba-if=\"{{!!loadmore && loadmorestyle !== 'infinite'}}\"\n        ba-show=\"{{!loading && collection_count > 0}}\"\n        ba-event:loadmore=\"moreitems\"\n></ba-loadmore>\n<ba-loading ba-show=\"{{loading}}\">\n</ba-loading>\n<div ba-if=\"{{emptymessage && !loading && collection_count === 0}}\">\n    {{emptymessage}}\n</div>",

        attrs: function() {
            return {
                listitem: "clickitem",
                model: false,
                selected: null,
                selection: null,
                scrolltolast: null,
                scrolltofirst: null,
                autoscroll: false,
                stickybottom: false,
                emptymessage: false,
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
            droplist: "boolean"
        },

        create: function() {
            this.set("collection_count", 0);
            if (this.get("loadmore") && this.get("loadmorestyle") === "infinite")
                this.setProp("infinite_scroll_options.disabled", false);
            if (this.get("droplist"))
                this.setProp("drop_list_options.disabled", false);
            if (this.get("listcollection"))
                this._setupListCollection();
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
                if (this.getCollection() && this.getCollection().on) {
                    this.set("collection_count", this.getCollection().count());
                    this.listenOn(this.getCollection(), "replaced-objects add remove collection-updating collection-updated", function() {
                        this.set("collection_count", this.getCollection().count());
                    });
                    if (this.get("scrolltolast")) {
                        this.listenOn(this.getCollection(), evts, function() {
                            this.execute("scrollToLast");
                        }, {
                            eventually: true,
                            off_on_destroyed: true
                        });
                        this.execute("scrollToLast");
                    }
                    if (this.get("scrolltofirst")) {
                        this.listenOn(this.getCollection(), evts, function() {
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
        /**/"loadmorebackwards && loading": function (obj) { with (obj) { return loadmorebackwards && loading; } }, "(model.listcollection||listcollection)": function (obj) { with (obj) { return (model.listcollection||listcollection); } }, "infinite_scroll_options": function (obj) { with (obj) { return infinite_scroll_options; } }, "drop_list_options": function (obj) { with (obj) { return drop_list_options; } }, "getview(collectionitem)": function (obj) { with (obj) { return getview(collectionitem); } }, "!!collectionitem.experimental": function (obj) { with (obj) { return !!collectionitem.experimental; } }, "collectionitem.cid()": function (obj) { with (obj) { return collectionitem.cid(); } }, "collectionitem.pid()": function (obj) { with (obj) { return collectionitem.pid(); } }, "selection": function (obj) { with (obj) { return selection; } }, "droplist": function (obj) { with (obj) { return droplist; } }, "collectionitem.callbacks": function (obj) { with (obj) { return collectionitem.callbacks; } }, "itemContext(collectionitem)": function (obj) { with (obj) { return itemContext(collectionitem); } }, "isEqual(collectionitem, selected)": function (obj) { with (obj) { return isEqual(collectionitem, selected); } }, "[collectionitem]": function (obj) { with (obj) { return [collectionitem]; } }, "collectionitem.view||view.listinner||{}": function (obj) { with (obj) { return collectionitem.view||view.listinner||{}; } }, "collectionitem": function (obj) { with (obj) { return collectionitem; } }, "!!loadmore && loadmorestyle !== 'infinite'": function (obj) { with (obj) { return !!loadmore && loadmorestyle !== 'infinite'; } }, "!loading && collection_count > 0": function (obj) { with (obj) { return !loading && collection_count > 0; } }, "loading": function (obj) { with (obj) { return loading; } }, "emptymessage && !loading && collection_count === 0": function (obj) { with (obj) { return emptymessage && !loading && collection_count === 0; } }, "emptymessage": function (obj) { with (obj) { return emptymessage; } }/**/
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

        template: "\n<ba-{{view.titleitem}}\n    ba-click=\"{{click_title()}}\"\n    ba-event-forward:title=\"{{[]}}\"\n    ba-model=\"{{model.title_model}}\">{{model.title_model.value}}</ba-{{view.titleitem}}>\n\n<ba-list\n        ba-noscope\n        ba-event-forward\n        ba-show=\"{{!collapsed}}\">\n\n</ba-list>\n",

        attrs: {
            model: {
                title_model: {
                    value: 'Titledlist - Title'
                }
            },
            selectable: true,
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

    }).registerFunctions({
        /**/"view.titleitem": function (obj) { with (obj) { return view.titleitem; } }, "click_title()": function (obj) { with (obj) { return click_title(); } }, "[]": function (obj) { with (obj) { return []; } }, "model.title_model": function (obj) { with (obj) { return model.title_model; } }, "model.title_model.value": function (obj) { with (obj) { return model.title_model.value; } }, "!collapsed": function (obj) { with (obj) { return !collapsed; } }/**/
    }).register();

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

    }).registerFunctions({
        /**/"clicktitle()": function (obj) { with (obj) { return clicktitle(); } }, "model.value": function (obj) { with (obj) { return model.value; } }, "addbutton()": function (obj) { with (obj) { return addbutton(); } }/**/
    }).register();

});
}).call(Scoped);