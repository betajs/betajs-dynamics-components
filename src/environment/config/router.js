var router = new BetaJS.Router.Router();

window.appstate = new BetaJS.Properties.Properties({
	component_type: components[0]
});

router.bind("components", "/components/(component:.+)", function (args) {
	window.appstate.set("component_type", args.component);
});

router.navigate(document.location.hash.substring(1));
