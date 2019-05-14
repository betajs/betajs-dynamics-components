Scoped.define("module:Jsconsole", [
    "dynamics:Dynamic",
    "base:Functions"
], [
    "dynamics:Partials.RepeatPartial",
    "dynamics:Partials.ReturnPartial"
], function(Dynamic, Functions, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        collections: ["logs"],

        create: function() {
            this.set("command", "");
            var oldLog = console.log;
            var logs = this.get("logs");
            console.log = function() {
                logs.add({
                    color: "gray",
                    text: Functions.getArguments(arguments).join(" ")
                });
                return oldLog.apply(this, arguments);
            };
        },

        functions: {
            run_command: function() {
                var logs = this.get("logs");
                logs.add({
                    color: "black",
                    text: this.get("command")
                });
                var result = window["ev" + "al"](this.get("command"));
                logs.add({
                    color: "blue",
                    text: result
                });
                this.set("command", "");
            }
        }

    }).registerFunctions({
        /*<%= template_function_cache(filepathnoext + '.html') %>*/
    }).register();

});