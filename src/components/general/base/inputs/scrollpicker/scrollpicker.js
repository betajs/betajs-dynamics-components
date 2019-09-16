Scoped.define("module:Scrollpicker", [
    "dynamics:Dynamic",
    "ui:Interactions.Loopscroll",
    "base:Async"
], [
    // It has to be a repeat element partial, otherwise whitespace is removed from container
    "dynamics:Partials.RepeatElementPartial"
], function(Dynamic, Loopscroll, Async, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        attrs: {
            first: 0,
            last: 23,
            atleast: 100,
            increment: 1,
            top: false,
            value: 10,
            valueadd: 0
        },

        types: {
            first: "int",
            last: "int",
            increment: "int",
            top: "bool",
            value: "int",
            valueadd: "int"
        },

        events: {
            "change:value": function(value) {
                if (!this.activeElement() || !this.activeElement().querySelector("container"))
                    return;
                if (!this.__ignoreValue)
                    this._loopScroll().scrollToElement(this.getElementByValue(this.get("value")));
            }
        },

        create: function() {
            var values = [];
            var dir = (this.get("first") <= this.get("last") ? 1 : -1);
            while (values.length < this.get("atleast")) {
                for (var i = this.get("first"); dir * (this.get("last") - i) >= 0; i += dir * this.get("increment"))
                    values.push(i);
            }
            this.set('values', values);

            this.set("loopscroll", {
                type: "loopscroll",
                enabled: true,
                currentTop: this.get("top"),
                discrete: true,
                scrollEndTimeout: 200,
                elementMargin: 0,
                currentCenter: true,
                currentElementClass: "selected",
                discreteUpperThreshold: 0.99,
                discreteLowerThreshold: 0.01,
                scrollToOnClick: true
            });
        },

        _loopScroll: function() {
            // This is not particularly nice, but we'll improve on this later.
            return this.activeElement().querySelector("container").dynnodehandler.interactions.loopscroll;
        },

        _encodeValue: function(value) {
            value += this.get("valueadd");
            var delta = this.get("first") - value;
            delta = Math.round(delta / this.get("increment")) * this.get("increment");
            value = this.get("first") - delta;
            value = this.get("first") <= this.get("last") ?
                Math.max(this.get("first"), Math.min(this.get('last'), value)) :
                Math.max(this.get("last"), Math.min(this.get('first'), value));
            return value;
        },

        _decodeValue: function(value) {
            return value - this.get("valueadd");
        },

        getElementByValue: function(value) {
            return this.activeElement().querySelector("[data-value='" + this._encodeValue(value) + "']");
        },

        getValueByElement: function(element) {
            return this._decodeValue(parseInt(element.dataset.value, 10));
        },

        _afterActivate: function(element) {
            // This is a massive hack.
            this.activeElement().querySelector("[ba-repeat-element]").remove();
            Async.eventually(function() {
                this._loopScroll().scrollToElement(this.getElementByValue(this.get("value")));
                this._loopScroll().on("change-current-element", function(element) {
                    this.__ignoreValue = true;
                    this.set("value", this.getValueByElement(element));
                    this.__ignoreValue = false;
                }, this);
            }, this);
        }

    }).registerFunctions({
        /*<%= template_function_cache(filepathnoext + '.html') %>*/
    }).register();

});