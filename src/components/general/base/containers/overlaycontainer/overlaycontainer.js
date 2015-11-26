Scoped.define("module:Overlaycontainer", [
    "dynamics:Dynamic",
    "module:Templates"
], function (Dynamic, Templates, scoped) {
	return Dynamic.extend({scoped: scoped}, {
		
		template: Templates.overlaycontainer,
		
		attrs : {
            overlay : "",
            message : "This is a message",
            value : null,
            showoverlay : true
        }
	
	}).register();
});


/*
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Overlaycontainer", {

    template: BetaJS.Dynamics.Components.Templates.overlaycontainer,

    initial : {

        attrs : {
            overlay : "",
            message : "This is a message",
            value : null,
            showoverlay : true
        }

    }

}).register();

*/