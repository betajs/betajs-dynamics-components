
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Layout", {

    templateUrl: "environment/controls/%/%.html",
    
    initial: {

        collections : {
            systems : [
                {
                    title:'mobile',
                    devices: new BetaJS.Collections.Collection({objects: [
                        {title: 'iphone4'},
                        {title: 'iphone5'}
                    ]})
                },{
                    title:'web',
                    devices: new BetaJS.Collections.Collection({objects: [
                        {title: 'notebook'}
                    ]})
                }
            ]
        },

        create : function () {
            console.log('Layout Selector Loaded');

            this.set('current_system', this.get('systems').getByIndex(0));
            this.set('current_device', this.get('current_system').get('devices').getByIndex(0));
        }

    }

}).register();
