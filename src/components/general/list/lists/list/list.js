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

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            listitem: "clickitem",
            model: false,
            selected: null,
            scrolltolast: null,
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
        },

        types: {
            scrolltolast: "boolean"
        },

        create: function() {
            if (this.get("loadmore") && this.get("loadmorestyle") === "infinite")
                this.setProp("infinite_scroll_options.disabled", false);
        },

        events: {
            "change:listcollection": function() {
                Async.eventually(function() {
                    if (this.getCollection() && this.get("scrolltolast")) {
                        this.listenOn(this.getCollection(), "replaced-objects", function() {
                            this.execute("scrollToLast");
                        }, {
                            eventually: true
                        });
                        this.execute("scrollToLast");
                    }
                }, this);
            }
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
                this.execute("scrollTo", this.getCollection().first());
            },

            scrollToFirst: function() {
                this.execute("scrollTo", this.getCollection().last());
            }

        }

    }).registerFunctions({ /*<%= template_function_cache(filepathnoext + '.html') %>*/ }).register();

});