
Scoped.define("module:Scrollpicker", [
    "dynamics:Dynamic",
    "module:Templates",
    "ui:Interactions.Loopscroll"
],function (Dynamic, Templates, Loopscroll, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template: Templates.scrollpicker,

        attrs : {
            initial_value : 14,
            current_value : 10,
            first : 0,
            last : 23,
            increment : 1,
            currentTop : false,
            value_array : []
        },

        create : function () {

            this.call('initialize_value_array');
            this.call('initialize_value');

            console.log('Scrollpicker initial value :');
            console.log(this.get('initial_value'));

        },

        functions : {

            initialize_value : function () {
                var inc = this.get('increment');
                var rounded_value = inc * Math.round(this.get('initial_value')/inc);
                var index = this.get('value_array').indexOf(rounded_value);
                var displayed_value = index > -1 ? rounded_value : this.get('value_array')[0];
                this.set('current_value', parseInt(displayed_value, 10));
            },

            initialize_value_array : function () {

                var first = this.get('first');
                var last = this.get('last');
                var inc = this.get('increment');

                var value_array  = [];
                for (var i = last ; i >= first ; i -= inc) {
                    value_array.push(i);
                }
                this.set('value_array',value_array);

            }

        },

        _afterActivate : function (element) {

            element = element.find('container');

            var scroll = new Loopscroll(element, {
                enabled: true,
                currentTop: this.get('currentTop'),
                discrete: true,
                scrollEndTimeout: 200,
                currentCenter: true
            });

            //var self = this;
            //element.scroll(function () {
            //    console.log('There is a Scroll happening');
            //    console.log(self.__cid);
            //});

            console.log('Scroll to Value');
            console.log(this.get('current_value'));
            var ele = $(element.find("[data-id='" + this.get('current_value') + "']"));
            scroll.scrollToElement(ele, {
                animate: false
            });
            ele.css({
                "color": "black",
                "background" : "white"
            });

            scroll.on("scrollend", function () {
                console.log(this);
                this.set('current_value', scroll.currentElement().data( "id" ));
            }, this);

            scroll.on("scroll", function () {
                element.children().css({
                    "color" : "#999999",
                    "background" : "#F4F4F4"
                });
                scroll.currentElement().css({
                    "color" : "black",
                    "background" : "white"
                });
            });

        }

    }).register();

});