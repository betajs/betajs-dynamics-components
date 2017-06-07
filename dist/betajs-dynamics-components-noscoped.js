/*!
betajs-dynamics-components - v0.1.10 - 2017-06-07
Copyright (c) Victor Lingenthal
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
    "version": "0.1.10"
};
});
Scoped.assumeVersion('base:version', '~1.0.96');
Scoped.assumeVersion('browser:version', '~1.0.65');
Scoped.assumeVersion('dynamics:version', '~0.0.83');
Scoped.assumeVersion('ui:version', '~1.0.37');
Scoped.define("module:Clickinput", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<title\n        ba-if=\"{{!view.edit}}\"\n        ba-click=\"edititem()\"\n>\n    {{model.value}}\n</title>\n\n<input\n        placeholder=\"{{view.placeholder}}\"\n        ba-if=\"{{view.edit}}\"\n        ba-return=\"view.edit = false\"\n        onblur=\"{{view.edit = false}}\"\n        value=\"{{=model.value}}\">",

        attrs: {
            model: {
                value: "Test"
            },
            view: {
                placeholder: "",
                edit: false,
                autofocus: true
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
Scoped.define("module:Input", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<input placeholder=\"{{view.placeholder}}\" autofocus>",

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

        template: "<container>\n        <element\n                ba-repeat-element=\"{{element_value :: value_array}}\"\n                ba-tap=\"select_element(element_value)\"\n                data-id=\"{{element_value}}\"\n        >\n                {{element_value}}\n        </element>\n</container>",

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
Scoped.define("module:Textinput", [
    "dynamics:Dynamic",
    'base:Strings'
], function(Dynamic, Strings, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<textarea autofocus onblur=\"{{this.call('blur')}}\" value=\"{{=value}}\"></textarea>\n<pre>{{=preheighttext}}</pre>",

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
Scoped.define("module:Loading", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<loading>\n\n    <div class='uil-spin-css' style='-webkit-transform:scale(0.32)'><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>\n\n</loading>\n"

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

        template: "\n<button\n        class=\"{{model.class}}\"\n        ba-click=\"click()\">\n    {{model.value}}\n</button>",

        attrs: {
            model: {
                value: 'Clickitem - Value'
            }
        },

        functions: {
            click: function() {
                logger.log('Click');
                //logger.log("You Clicked item : " + this.properties().getProp('model.value'));
                //logger.log(this.cid());
                //this.trigger('event', this.cid());
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
Scoped.define("module:Hoverbuttoncontainer", [
    "dynamics:Dynamic",
    "browser:Loader",
    "browser:Dom",
    "base:Loggers.Logger"
], [
    "ui:Dynamics.GesturePartial",
    "ui:Dynamics.InteractionPartial",
    "ui:Interactions.Drag",
    "ui:Interactions.Drop"
], function(Dynamic, Loader, Dom, Logger, scoped) {

    var logger = Logger.global().tag("dynamic", "list");

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<hoverbuttoncontainer\n        ba-on:mouseover=\"show_hover_buttons = true\"\n        ba-on:mouseleave=\"show_hover_buttons = false\"\n        ba-gesture:click=\"{{{data: model, options: click_gesture}}}\"\n        ba-gesture:drag=\"{{drag_gesture}}\"\n        ba-interaction:drag=\"{{{data: model, options: drag_interaction}}}\"\n        ba-interaction:drop=\"{{{data: model, options: drop_interaction}}}\">\n\n    <container>\n        <ba-{{view.inner||inner}} ba-noscope>\n        </ba-{{view.inner||inner}}>\n    </container>\n\n    <hoverbuttons\n            ba-show=\"{{show_hover_buttons}}\"\n            ba-repeat=\"{{button :: buttons}}\">\n        <button ba-tap=\"button.click()\">\n            <span class=\"{{button.icon}}\"></span>\n            <tooltip>{{button.tooltip}}</tooltip>\n        </button>\n    </hoverbuttons>\n\n</hoverbuttoncontainer>\n",

        attrs: {
            show_hover_buttons: false,
            view: {
                slide_finish: false,
                left: 0
            },
            buttons: {
                "delete": {
                    icon: 'icon-trash',
                    tooltip: 'Delete',
                    click: function() {
                        console.log('Delete was clicked')
                    }
                },
                "archive": {
                    icon: 'icon-archive',
                    tooltip: 'Archive',
                    click: function() {
                        console.log('Archive was clicked')
                    }
                },
                "snooze": {
                    icon: 'icon-time',
                    tooltip: 'Snooze',
                    click: function() {
                        console.log('Snooze was clicked')
                    }
                }
            },
            value: "Swipeclickitem - Title",
            inner: "eventitem",
            // swipe_actions: {
            // 	"other": {
            // 		execute: function (element,pos) {
            // 			this.execute('slideout',element,pos,'other');
            // 		}
            // 	},
            // 	"nothing": {
            // 	},
            // 	"archive": {
            // 		execute: function (element,pos) {
            // 			this.execute('slideout',element,pos,'archive');
            // 		}
            // 	},
            // 	"delete": {
            // 		execute: function (element,pos) {
            // 			this.execute('slideout',element,pos,'delete');
            // 		}
            // 	}
            // },
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
                    "move": function(model, event) {
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
                    "dropped": function(data, event) {

                        var source_doodad = event.source.data;

                        this.scope(">").execute('dropped', source_doodad);

                    }
                }
            }

        },

        functions: {
            click: function(doodad) {
                this.scope(">").call('click');
            },
            create_style: function(name, left) {
                var style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = '.' + name + ' { left: ' + left + 'px; }';
                document.getElementsByTagName('head')[0].appendChild(style);
            },
            slideout: function(element, pos, trigger) {
                var current_left = pos;

                this.call('create_style', 'old_class', current_left);
                this.set('start_swipe', 'old_class');

                var self = this;
                //				element.addEventListener("transitionend",function () {
                //element.find('ba-eventitem').css('visibility','hidden');
                setTimeout(function() {
                    //element.parent().slideUp(200);
                    element.parentNode.style.display = 'none';
                    // Now we should remove the added element from the dom again, otherwise we have a leak.
                    // this.get("temporary_style_element").remove();
                    self.trigger(trigger);
                }, 10);
                //			});

                var max_left = parseInt(element.style.width, 10);
                var sign = Math.sign(current_left);

                //Instead of the create_style call, you should be able to user betajs browser (please update first):
                this.set("temporary_style_element", Loader.inlineStyles(
                    '.new_class { left: ' + sign * max_left + 'px; }'
                ));

                this.call('create_style', 'new_class', sign * max_left);
                this.set('start_swipe', 'swipe new_class');
            }
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
Scoped.define("module:Swipeclickcontainer", [
    "dynamics:Dynamic",
    "browser:Loader",
    "browser:Dom",
    "base:Loggers.Logger"
], [
    "ui:Dynamics.GesturePartial",
    "ui:Dynamics.InteractionPartial",
    "ui:Interactions.Drag",
    "ui:Interactions.Drop"
], function(Dynamic, Loader, Dom, Logger, scoped) {

    var logger = Logger.global().tag("dynamic", "list");

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<behind>\n    <icon class='{{view.lefticon||lefticon}}'></icon>\n    <div></div>\n    <icon class='{{view.righticon||righticon}}'></icon>\n</behind>\n\n<!--style=\"left: {{view.left}}px\"-->\n<swipe\n        class='{{start_swipe}}'\n        ba-gesture:click=\"{{{data: model, options: click_gesture}}}\"\n        ba-gesture:drag=\"{{drag_gesture}}\"\n        ba-interaction:drag=\"{{{data: model, options: drag_interaction}}}\"\n        ba-interaction:drop=\"{{{data: model, options: drop_interaction}}}\"\n        ba-gesture:swipe=\"{{swipe_gesture}}\"\n        ba-interaction:swipe=\"{{swipe_interaction}}\">\n\n    <container>\n\n        <ba-{{view.inner||inner}} ba-noscope>\n        </ba-{{view.inner||inner}}>\n\n        <swipeleft>\n            <div></div>\n            <icon class='{{view.lefticon||lefticon}}'></icon>\n        </swipeleft>\n\n        <swiperight>\n            <icon class='{{view.righticon||righticon}}'></icon>\n            <div></div>\n        </swiperight>\n\n    </container>\n\n</swipe>\n",

        attrs: {
            start_swipe: '',
            view: {
                slide_finish: false,
                left: 0
            },
            value: "Swipeclickitem - Title",
            lefticon: 'icon-ok',
            righticon: 'icon-time',
            inner: "eventitem",
            swipe_actions: {
                "other": {
                    less: -1 / 7,
                    greater: -1,
                    execute: function(element, pos) {
                        this.execute('slideout', element, pos, 'other');
                    }
                },
                "nothing": {
                    greater: -1 / 7,
                    less: 1 / 7
                },
                "archive": {
                    greater: 1 / 7,
                    less: 2 / 3,
                    execute: function(element, pos) {
                        this.execute('slideout', element, pos, 'archive');
                    }
                },
                "delete": {
                    greater: 2 / 3,
                    less: 1,
                    execute: function(element, pos) {
                        this.execute('slideout', element, pos, 'delete');
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
                    "move": function(model, event) {
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
                    "dropped": function(data, event) {

                        var source_doodad = event.source.data;

                        this.scope(">").execute('dropped', source_doodad);

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
                    "move": function(doodad, event) {
                        var element = event.element;
                        var w = Dom.elementDimensions(element).width;
                        var x = parseInt(element.style.left, 10);
                        var a = {};
                        var actions = this.get('swipe_actions');
                        for (var cls in actions) {
                            a = actions[cls];
                            if ((!a.less || x <= w * a.less) && (!a.greater || x >= w * a.greater))
                                Dom.elementAddClass(element, cls);
                            else
                                Dom.elementRemoveClass(element, cls);
                        }
                    },
                    "release": function(doodad, event) {
                        var element = event.element;
                        var w = Dom.elementDimensions(element).width;
                        var x = parseInt(element.style.left, 10);
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

        functions: {
            click: function(doodad) {
                this.scope(">").call('click');
            },
            create_style: function(name, left) {
                var style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = '.' + name + ' { left: ' + left + 'px; }';
                document.getElementsByTagName('head')[0].appendChild(style);
            },
            slideout: function(element, pos, trigger) {
                var current_left = pos;

                this.call('create_style', 'old_class', current_left);
                this.set('start_swipe', 'old_class');

                var self = this;
                //				element.addEventListener("transitionend",function () {
                //element.find('ba-eventitem').css('visibility','hidden');
                setTimeout(function() {
                    //element.parent().slideUp(200);
                    element.parentNode.style.display = 'none';
                    // Now we should remove the added element from the dom again, otherwise we have a leak.
                    // this.get("temporary_style_element").remove();
                    self.trigger(trigger);
                }, 10);
                //			});

                var max_left = parseInt(element.style.width, 10);
                var sign = Math.sign(current_left);

                //Instead of the create_style call, you should be able to user betajs browser (please update first):
                this.set("temporary_style_element", Loader.inlineStyles(
                    '.new_class { left: ' + sign * max_left + 'px; }'
                ));

                this.call('create_style', 'new_class', sign * max_left);
                this.set('start_swipe', 'swipe new_class');
            }
        }

    }).register();

});
Scoped.define("module:List", [
    "dynamics:Dynamic",
    "base:Async"
], [
    "dynamics:Partials.RepeatPartial",
    "dynamics:Partials.IfPartial",
    "dynamics:Partials.DataPartial",
    "dynamics:Partials.FunctionsPartial",
    "dynamics:Partials.CachePartial",
    "module:Loading",
    "module:Loadmore"
], function(Dynamic, Async, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<list ba-repeat=\"{{collectionitem :: (model.listcollection||listcollection)}}\">\n\n    <ba-{{view.listitem||collectionitem.listitem||getview(collectionitem)}}\n        ba-cache\n        ba-data:id=\"{{collectionitem.cid()}}\"\n        ba-data:pid=\"{{collectionitem.pid()}}\"\n        ba-functions=\"{{collectionitem.callbacks}}\"\n        ba-view=\"{{collectionitem.view||view.listinner}}\"\n        ba-model=\"{{collectionitem}}\">\n\n    </ba-{{view.listitem||collectionitem.listitem||getview(collectionitem)}}>\n\n</list>\n\n<ba-loadmore ba-if=\"{{loadmore}}\" ba-show=\"{{!loading}}\" ba-event:loadmore=\"moreitems\">\n</ba-loadmore>\n<ba-loading ba-if=\"{{loadmore}}\" ba-show=\"{{loading}}\">\n</ba-loading>\n",

        attrs: {
            listitem: "clickitem",
            model: false,
            view: {}
        },

        collections: {
            listcollection: [{
                    value: "List - Item 1"
                },
                {
                    value: "List - Item 2"
                },
                {
                    value: "List - Item 3"
                }
            ]
        },

        functions: {
            moreitems: function() {
                this.set("loading", true);
                Async.eventually(function() {
                    this.get("loadmore").increase_forwards().callback(function() {
                        this.set("loading", false);
                    }, this);
                }, this);
            },

            getview: function(item) {
                return this.get("listitemfunc") ? (this.get("listitemfunc"))(item) : this.get("listitem");
            }
        }

    }).register();

});
Scoped.define("module:Searchlist", [
    "dynamics:Dynamic"
], [
    "module:List",
    "module:Loading",
    "dynamics:Partials.NoScopePartial"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<searchbox ba-if=\"{{view.showsearch}}\">\n    <icon class=\"icon-search\"></icon>\n    <input placeholder=\"{{view.placeholder}}\" value=\"{{=searchvalue}}\">\n</searchbox>\n\n<ba-loading ba-if=\"{{searchingindication}}\">\n</ba-loading>\n\n<ba-list ba-noscope></ba-list>\n",

        attrs: {
            searchvalue: "",
            searchingindication: false,
            //searching: false,
            view: {
                placeholder: "Search for",
                listitem: "clickitem",
                showsearch: true
            }
        },

        collections: {
            listcollection: [{
                    value: "Searchlist - Item 1"
                },
                {
                    value: "Searchlist - Item 2"
                },
                {
                    value: "Searchlist - Item 3"
                }
            ]
        },

        create: function() {
            this.on("change:searchvalue", function() {
                this.set("searchingindication", true);
            }, this);
            this.on("change:searching", function() {
                this.set("searchingindication", this.get("searching"));
            }, this);
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
    "module:List",
    "dynamics:Partials.NoScopePartial",
    "dynamics:Partials.ClickPartial"
], function(Dynamic, Logger, scoped) {

    var logger = Logger.global().tag("dynamic", "list");

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<ba-{{view.titleitem}}\n    ba-click=\"click_title()\"\n    ba-functions=\"{{model.title_callbacks}}\"\n    ba-model=\"{{model.title_model}}\">{{model.title_model.value}}</ba-{{view.titleitem}}>\n\n<ba-list\n        ba-noscope\n        ba-show=\"{{!collapsed}}\">\n\n</ba-list>\n",

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
            listcollection: [{
                    value: "Titledlist - Item 1"
                },
                {
                    value: "Titledlist - Item 2"
                },
                {
                    value: "Titledlist - Item 3"
                }
            ]
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

                logger.log("You clicked the addbuton, no addbutton() function given");

            }

        }

    }).register();

});
Scoped.define("module:Header", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<ba-list ba-listcollection=\"{{left_collection}}\"></ba-list>",

        collections: {
            left_collection: [{
                    listitem: 'toggle_menu'
                },
                {
                    value: '',
                    "class": 'icon-home'
                },
                {
                    value: 'Big Brother',
                    "class": 'icon-eye-open'
                },
                {
                    value: 'Header 1'
                },
                {
                    value: 'Header 2'
                }
            ]
        }

    }).register();

});
Scoped.define("module:Toggle_menu", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<button ba-click=\"toggle_menu()\" class=\"icon-reorder\"></button>",

        functions: {
            toggle_menu: function() {
                this.scope("<+[tagname='ba-layout_web']").call('toggle_menu');
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

        template: "<header>\n    <ba-{{view.header}}>Header</ba-{{view.header}}>\n</header>\n<main>\n    <ba-{{view.menu}}\n        class=\"menu\"\n        ba-show=\"{{view.display_menu}}\"\n        ba-view=\"{{view.menuview}}\">\n        Menu\n    </ba-{{view.menu}}>\n    <ba-{{view.content}}\n        class=\"content\"\n        ba-model={{contentmodel}}\n        ba-attrs=\"{{view.contentattrs}}\">\n        Content\n    </ba-{{view.content}}>\n</main>",

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

        functions: {
            toggle_menu: function() {
                this.setProp('view.display_menu', !this.getProp('view.display_menu'));
            }
        }

    }).register();

});
}).call(Scoped);