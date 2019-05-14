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

        template: "<%= template(filepathnoext + '.html') %>",

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
        /*<%= template_function_cache(filepathnoext + '.html') %>*/
    }).register();

});