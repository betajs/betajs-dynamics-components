
Scoped.define("module:Header", [
    "dynamics:Dynamic",
    "module:Templates"
],function (Dynamic, Templates, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.header,

        collections : {
            left_collection : [
                {listitem : 'toggle_menu'},
                {
                    value : '',
                    class : 'icon-home'
                },
                {
                    value : 'Big Brother',
                    class : 'icon-eye-open'
                },
                {value : 'Header 1'},
                {value : 'Header 2'}
            ]
        }

    }).register();

});
