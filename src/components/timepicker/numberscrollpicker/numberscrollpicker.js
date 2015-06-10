
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Numberscrollpicker", {

    templateUrl: "../components/timepicker/%/%.html",
    //template: BetaJS.Dynamics.Templates.Numberscrollpicker,

    initial : {

        attrs : {
            value : 5,
            first : 0,
            last : 23,
            increment : 1,
            currentTop : true,
            numbers : []
        },

        create : function () {

            console.log('Create Numberscrollpicker');
            console.log(this.get('value'));

            this.call('initializer_numbers');

        },

        functions : {

            initializer_numbers : function () {

                var first = this.get('first');
                var last = this.get('last');
                var inc = this.get('increment');

                var numbers  = [];
                for (var i = first ; i <= last ; i += inc) {
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

        var ele = $(element.find("[data-number='" + parseInt(this.get('value')) + "']"));
        scroll.scrollToElement(ele, {
            animate: false
        });
        ele.css("color", "black");
        ele.css("background", "white");

        scroll.on("scrolltoend", function () {
            this.set('value', scroll.currentElement().data( "number" ));
        },this);

        scroll.on("scroll", function () {
            element.children().css("color", "#999999");
            element.children().css("background", "#F4F4F4");
            //console.log("Current Element: " + scroll.currentElement());
            scroll.currentElement().css("color", "black");
            scroll.currentElement().css("background", "white");
        });

    }

}).register();
