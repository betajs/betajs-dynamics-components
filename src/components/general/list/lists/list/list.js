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

        template: "<%= template(filepathnoext + '.html') %>",

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

        getLoadMore: function() {
            var coll = this.get("loadmore");
            return coll && coll.value ? coll.value() : coll;
        },

        functions: {
            moreitems: function() {
                var promise = Promise.create();
                this.set("loading", true);
                Async.eventually(function() {
                    var promise = this.get("loadmorereverse") ? this.getLoadMore().increase_backwards(this.get("loadmoresteps")) : this.getLoadMore().increase_forwards(this.get("loadmoresteps"));
                    promise.callback(function() {
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
                    var promise = this.get("loadmorereverse") ? this.getLoadMore().increase_forwards(this.get("loadmoresteps")) : this.getLoadMore().increase_backwards(this.get("loadmoresteps"));
                    promise.callback(function() {
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
        /*<%= template_function_cache(filepathnoext + '.html') %>*/
    }).register();

});