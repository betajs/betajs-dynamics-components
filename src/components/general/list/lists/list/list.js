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

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            listitem: "clickitem",
            model: false,
            view: {}
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
                this.set("loading", true);
                Async.eventually(function() {
                    this.get("loadmore").increase_forwards().callback(function() {
                        this.set("loading", false);
                    }, this);
                }, this);
            },

            getview: function(item) {
                return this.getProp("view.listitem") || item.get("listitem") || (this.get("listitemfunc") ? (this.get("listitemfunc"))(item) : this.get("listitem"));
            }
        },

        events: {
            "change:listcollection": function() {

            }
        }

    }).register();

});