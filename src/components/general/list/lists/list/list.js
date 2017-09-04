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

        collections: {
            listcollection: [{
                value: "List - Item 1"
            }, {
                value: "List - Item 2"
            }, {
                value: "List - Item 3"
            }]
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