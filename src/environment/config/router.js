
var router = new BetaJS.Router.Router({
        routes: {
            "/components/(.*)" : {
                state: "Component",
                mapping: ["component_type"]
            }
        }
    });

    router.hashRoute = new BetaJS.Browser.HashRouteBinder(router);
    router.stateHost = new BetaJS.States.Host();
    router.stateRoute = new BetaJS.Router.StateRouteBinder(router, router.stateHost);

    router.stateHost.register("Base", {});

    router.stateHost.register("Component", {
        _globals: ["component_type"],
        _defaults: {
            component_type: components[0]
        }
    });

    router.stateHost.initialize("Base");
    router.navigate(document.location.hash.substring(1));

    window.appstate = router.stateHost;
