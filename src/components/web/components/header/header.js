
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Header", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.header,

    collections : {
        left_collection : [
            {
                value : '',
                class : 'icon-reorder',
                callbacks : {
                    click : function () {
                        this.scope("<+[tagname='ba-layout_web']").call('toggle_menu');
                    }
                }
            },
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
