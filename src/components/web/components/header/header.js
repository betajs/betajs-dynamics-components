Scoped.define("module:Header", [
    "dynamics:Dynamic"
], [
    "module:Toggle_menu"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

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

    }).registerFunctions({ /*<%= template_function_cache(filepathnoext + '.html') %>*/ }).register();

});