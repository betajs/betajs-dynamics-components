Scoped.define("module:Menu_web", [
    "dynamics:Dynamic",
    "base:Collections.Collection"
], function(Dynamic, Collection, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

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

    }).registerFunctions({ /*<%= template_function_cache(filepathnoext + '.html') %>*/ }).register();

});