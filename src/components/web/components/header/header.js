Scoped.define("module:Header", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        collections: {
            left_collection: [{
                    listitem: 'toggle_menu'
                },
                {
                    value: '',
                    "class": 'icon-home'
                },
                {
                    value: 'Big Brother',
                    "class": 'icon-eye-open'
                },
                {
                    value: 'Header 1'
                },
                {
                    value: 'Header 2'
                }
            ]
        }

    }).register();

});