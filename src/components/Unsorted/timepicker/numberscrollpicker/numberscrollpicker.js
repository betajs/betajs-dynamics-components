
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Numberscrollpicker", {

    templateUrl: "../components/unsorted/timepicker/%/%.html",
    //template: BetaJS.Dynamics.Templates.Numberscrollpicker,

    initial : {

        attrs : {
            value : 5,
            first : 0,
            last : 23,
            increment : 1,
            currentTop : false,
            numbers : []
        },

        create : function () {

            console.log('Create Numberscrollpicker');

            this.call('initializer_numbers');

            this.compute("displayed_value", function () {
                var inc = this.get('increment');
                var rounded_value = inc * Math.round(this.get('value')/inc);
                var index = this.get('numbers').indexOf(rounded_value);
                var displayed_value = index > -1 ? rounded_value : this.get('numbers')[0];
                return parseInt(displayed_value, 10);
            }, ["value", "increment"]);

        },

        functions : {

            initializer_numbers : function () {

                var first = this.get('first');
                var last = this.get('last');
                var inc = this.get('increment');

                var numbers  = [];
                for (var i = last ; i > first ; i -= inc) {
                    numbers.push(i);
                }
                this.set('numbers',numbers);

            }

        }
    },

    _afterActivate : function (element) {

        var scroll = new BetaJS.UI.Interactions.LoopScroll(element, {
            enabled: true,
            currentTop: this.get('currentTop'),
            discrete: true,
            scrollEndTimeout: 200,
            currentCenter: true
        });

        window.test = scroll;
        var ele = $(element.find("[data-number='" + this.get('displayed_value') + "']"));
        scroll.scrollToElement(ele, {
            animate: false
        });
        ele.css({
            "color": "black",
            "background" : "white"
        });

        scroll.on("scrolltoend", function () {
            this.set('value', scroll.currentElement().data( "number" ));
        },this);

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
