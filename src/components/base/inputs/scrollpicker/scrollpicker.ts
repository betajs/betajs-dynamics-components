interface DynamicClass {

    extend(options: any, extension: any): any;

}

interface DynamicIntf {

    set(key: string, value: any)
    activeElement(): any

}

interface MyClass extends DynamicIntf {

    attrs: {
        first: number,
        last: number,
        atleast: number,
        increment: number,
        top: boolean,
        valueadd: number
    }

    _encodeValue(this:MyClass, value: number): number
    _decodeValue(this:MyClass, value: number): number

}


declare var Scoped: any;

Scoped.define("module:Scrollpicker", [
    "dynamics:Dynamic",
    "ui:Interactions.Loopscroll",
    "base:Async"
], [
    // It has to be a repeat element partial, otherwise whitespace is removed from container
    "dynamics:Partials.RepeatElementPartial"
], function(Dynamic: DynamicClass, Loopscroll: any, Async: any, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        proxyAttrs: true,

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
                    this._loopScroll().scrollToElement(this.getElementByValue(this.attrs.value));
            }
        },

        create: function(this:MyClass) {

            var values = [];
            var dir = (this.attrs.first <= this.attrs.last ? 1 : -1);
            while (values.length < this.attrs.atleast) {
                for (var i = this.attrs.first; dir * (this.attrs.last - i) >= 0; i += dir * this.attrs.increment)
                    values.push(i);
            }
            this.set('values', values);

            this.set("loopscroll", {
                type: "loopscroll",
                enabled: true,
                currentTop: this.attrs.top,
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

        _loopScroll: function(this:MyClass) {

            var loopscroll = null;
            // This is not particularly nice, but we'll improve on this later.
            var interactions = this.activeElement().querySelector("container").dynnodehandler.interactions;
            if (interactions)
                loopscroll = interactions.loopscroll;
            else return;

            return loopscroll;

        },

        _encodeValue: function(this:MyClass, value: number): number {
            value += this.attrs.valueadd;
            var delta = this.attrs.first - value;
            delta = Math.round(delta / this.attrs.increment) * this.attrs.increment;
            value = this.attrs.first - delta;
            value = this.attrs.first <= this.attrs.last ?
                Math.max(this.attrs.first, Math.min(this.attrs.last, value)) :
                Math.max(this.attrs.last, Math.min(this.attrs.first, value));
            return value;
        },

        _decodeValue: function(this:MyClass, value: number): number {
            return value - this.attrs.valueadd;
        },

        getElementByValue: function(this:MyClass, value: number): any {
            return this.activeElement().querySelector("[data-value='" + this._encodeValue(value) + "']");
        },

        getValueByElement: function(this:MyClass, element: any): number {
            return this._decodeValue(parseInt(element.dataset.value, 10));
        },

        _afterActivate: function(this:MyClass, element: any) {
            // This is a massive hack.
            this.activeElement().querySelector("[ba-repeat-element]").remove();
            Async.eventually(function() {
                this._loopScroll().scrollToElement(this.getElementByValue(this.attrs.value));
                this._loopScroll().on("change-current-element", function(element) {
                    this.__ignoreValue = true;
                    this.attrs.value = this.getValueByElement(element);
                    this.__ignoreValue = false;
                }, this);
            }, this);
        }

    }).registerFunctions({
        /*<%= template_function_cache(filepathnoext + '.html') %>*/
    }).register();

});