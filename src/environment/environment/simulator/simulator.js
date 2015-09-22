
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Simulator", {

    templateUrl: "environment/%/%.html",

    initial: {

        bind : {
            //current_component: "<>+[tagname='ba-components']:current_component",
            current_system: "<>+[tagname='ba-layout']:current_system",
            //current_device: "<>+[tagname='ba-layout']:current_device"
        },

        attrs: {
            current_device : {title : 'iphone4'},
            current_component : {title : 'testtitledlist'},
            component: 'testcomponent'
        },

        create : function () {
            console.log('Simulator Loaded');
            //console.log('current_component : ');
            //console.log(this.get('current_component'));
            //console.log('current_system : ');
            //console.log(this.get('current_system'));
            console.log('current_device : ');
            console.log(this.get('current_device'));

        }

    }

}).register();