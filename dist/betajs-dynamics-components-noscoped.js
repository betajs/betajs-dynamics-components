/*!
betajs-dynamics-components - v0.1.19 - 2017-11-01
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
    "version": "0.1.19"
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

        template: "<button\n        onblur=\"{{this.execute('blur')}}\"\n        ba-tap=\"click()\"\n        class=\"icon-more_vert\">\n    <dropdown ba-if=\"{{showdropdown}}\">\n        <ba-{{view.dropdown}}\n            ba-event:item-click=\"hide_dropdown\"\n            ba-event-forward:dropdown=\"{{[]}}\"\n            ba-model='{{dropdownmodel}}'\n\n        ></ba-{{view.dropdown}}>\n    </dropdown>\n    <div></div>\n</button>\n",

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
Scoped.define("module:Clickcontainer", [
    "dynamics:Dynamic",
    "base:Loggers.Logger"
], function(Dynamic, Logger, scoped) {

    var logger = Logger.global().tag("dynamic", "list");

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<clickcontainer\n        ba-click=\"click()\">\n<ba-{{view.inner}}></ba-{{view.inner}}>\n</clickcontainer>\n\n",

        attrs: {
            view: {
                inner: 'contactitem'
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

        template: "<ba-loadmore ba-if=\"{{loadmore && loadmorestyle !== 'infinite' && loadmorebackwards}}\" ba-show=\"{{!loading}}\" ba-event:loadmore=\"moreitemsbackwards\">\n</ba-loadmore>\n<ba-loading ba-if=\"{{loadmore && loadmorebackwards}}\" ba-show=\"{{loading}}\">\n</ba-loading>\n\n<list ba-repeat=\"{{view.repeatoptions :: collectionitem :: (model.listcollection||listcollection)}}\"\n      ba-interaction:scroll=\"{{infinite_scroll_options}}\">\n<!--<list ba-repeat=\"{{collectionitem :: (model.listcollection||listcollection)}}\">-->\n\n    <ba-{{getview(collectionitem)}}\n        ba-cache\n        data-id=\"{{collectionitem.cid()}}\"\n        ba-data:id=\"{{collectionitem.cid()}}\"\n        ba-data:pid=\"{{collectionitem.pid()}}\"\n        ba-functions=\"{{collectionitem.callbacks}}\"\n        ba-isselected=\"{{selected === collectionitem}}\"\n        ba-event-forward:item=\"{{[collectionitem]}}\"\n        ba-view=\"{{collectionitem.view||view.listinner}}\"\n        ba-model=\"{{collectionitem}}\">\n\n    </ba-{{getview(collectionitem)}}>\n\n</list>\n\n<ba-loadmore ba-if=\"{{loadmore && loadmorestyle !== 'infinite'}}\" ba-show=\"{{!loading}}\" ba-event:loadmore=\"moreitems\">\n</ba-loadmore>\n<ba-loading ba-if=\"{{loadmore}}\" ba-show=\"{{loading}}\">\n</ba-loading>\n",

        attrs: {
            listitem: "clickitem",
            model: false,
            selected: null,
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
            loadmorebackwards: false,
            loadmoresteps: undefined,
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
                return this.activeElement().querySelector("[data-id='" + item.cid() + "']");
            },

            scrollTo: function(item) {
                var element = this.execute("elementByItem", item);
                var parent = this.activeElement();
                parent.scrollTop = element.offsetTop - parent.offsetTop;
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

        template: "\n<ba-{{view.titleitem}}\n    ba-click=\"click_title()\"\n    ba-event-forward:title=\"{{[]}}\"\n    ba-model=\"{{model.title_model}}\">{{model.title_model.value}}</ba-{{view.titleitem}}>\n\n<ba-list\n        ba-noscope\n        ba-event-forward=\"{{[]}}\"\n        ba-show=\"{{!collapsed}}\">\n\n</ba-list>\n",

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