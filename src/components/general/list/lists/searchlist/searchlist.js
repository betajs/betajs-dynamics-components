// TODO:
//  - Link Searchvalue with listcollection
//  - Make Loading look nicer

Scoped.define("module:Searchlist", [
    "dynamics:Dynamic"
], [
    "module:List",
    "module:Searchbox",
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
            //searching: false
            view: {
                show_searchbox: true
            }
        },

        extendables: ['view'],

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