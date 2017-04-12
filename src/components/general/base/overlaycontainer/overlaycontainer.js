
Scoped.define("module:Overlaycontainer", [
    "dynamics:Dynamic",
    "module:Templates"
], [
    "dynamics:Partials.TapPartial"
], function (Dynamic, Templates, scoped) {

	return Dynamic.extend({scoped: scoped}, {
		
		template: Templates.overlaycontainer,
		
		attrs : function () {
		    return {
                view : {
                    overlay : ""
                },
                model : {
                    message : "This is a message"
                },
                value : null,
                showoverlay : true
            }
        }

	}).register();

});
