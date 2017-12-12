Scoped.define("module:Scrollpicker", [
    "dynamics:Dynamic",
    "ui:Interactions.Loopscroll"
], [
    "dynamics:Partials.RepeatElementPartial"
], function(Dynamic, Loopscroll, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            initial_value: 14,
            current_value: 10,
            first: 0,
            last: 23,
            increment: 1,
            value_array: [],
            last_elem: null
        },

        create: function() {

            this.initialize_value_array();
            this.initialize_value();

        },

        functions: {

            select_element: function(value) {

                var old_element = this.element()[0].querySelector("[data-id='" + this.get('current_value') + "']");

                Object.assign(old_element.style, {
                    color: null,
                    background: null
                });

                this.set('current_value', value);

                var ele = this.element()[0].querySelector("[data-id='" + value + "']");

                this.execute('scroll_to_element', ele);
            },

            scroll_to_element: function(element) {
                this.get('scroll').scrollToElement(element, {
                    animate: false
                });

                Object.assign(element.style, {
                    color: "black",
                    background: "white"
                });
            }

        },

        _afterActivate: function(element) {

            element = element.querySelector('container');

            var scroll = new Loopscroll(element, {
                enabled: true,
                //currentTop: this.get('currentTop'),
                currentTop: this.get('top'),
                discrete: true,
                scrollEndTimeout: 200,
                currentCenter: true
            });

            this.set('scroll', scroll);

            var ele = element.querySelector("[data-id='" + this.get('current_value') + "']");

            this.execute('scroll_to_element', ele);

            scroll.on("scrollend", function() {
                this.set('current_value', scroll.currentElement().dataset.id);
            }, this);

            scroll.on("scroll", function() {
                if (this.get('last_elem')) {
                    Object.assign(this.get('last_elem').style, {
                        color: "#999",
                        background: "#F4F4F4"
                    });
                }

                var current_elem = scroll.currentElement();
                Object.assign(current_elem.style, {
                    color: "black",
                    background: "white"
                });
                this.set('last_elem', current_elem);
            }, this);

        },

        initialize_value: function() {

            var inc = this.get('increment');
            var rounded_value = inc * Math.round(this.get('initial_value') / inc);
            var index = this.get('value_array').indexOf(rounded_value);
            var displayed_value = index > -1 ? rounded_value : this.get('value_array')[0];

            this.set('current_value', parseInt(displayed_value, 10));

        },

        initialize_value_array: function() {

            var first = this.get('first');
            var last = this.get('last');
            var inc = this.get('increment');

            var value_array = [];

            if (first < last)
                for (var i = first; i <= last; i += inc)
                    value_array.push(i);

            else if (first > last)
                for (var j = first; j >= last; j -= inc)
                    value_array.push(j);

            this.set('value_array', value_array);

        }

    }).registerFunctions({ /*<%= template_function_cache(filepathnoext + '.html') %>*/ }).register();

});