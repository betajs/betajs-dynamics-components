Scoped.define("module:Externaloverlaycontainer", [
    "module:Overlaycontainer"
], function(Overlaycontainer, scoped) {

    return Overlaycontainer.extend({
        scoped: scoped
    }, function(inherited) {
        return {

            constructor: function(options) {
                // intentionally written differently
                var element = document.createElement("baoverlaycontainer");

                var anchorChildren = document.getElementsByTagName(options.anchor)[0].children;
                if (anchorChildren)
                    for (var i = 0; i < anchorChildren.length; i++) {
                        if (anchorChildren[i].tagName.toLowerCase() == 'baoverlaycontainer')
                            return;
                    }


                document.querySelector(options.anchor).appendChild(element);

                delete options.anchor;
                options.element = element;

                inherited.constructor.call(this, options);

                this.on("hide_overlay", function() {

                    this.destroy();
                    element.remove();

                }, this);
            }

        };
    });

});