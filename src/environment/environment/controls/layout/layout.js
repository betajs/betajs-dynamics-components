
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Layout", {

    templateUrl: "environment/controls/%/%.html",
    
    initial : {

        attrs : {
          current_system : null
        },

        collections : {
            systems : [
                {title: 'mobile'},
                {title: 'web'}
            ],
            mobile : [
                {title: 'iphone4'},
                {title: 'iphone5'}
            ],
            web:[
                {title: 'notebook'}
            ]
        },

        create : function () {
            console.log('Layout Selector Loaded');

            window.anton = this.get('current_system');
            console.log('current_system');
            console.log(this.get('current_system'));

            //this.set('current_system', this.get('systems').getByIndex(1).data());

            //this.set('current_device', this.get('current_device').getByIndex(0));
        }

    }

}).register();

