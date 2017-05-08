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

        template: "<%= template(filepathnoext + '.html') %>",

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