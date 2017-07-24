Scoped.define("tests:Test_list_repeatoptions", [
    "dynamics:Dynamic"
], [
    "module:List"
], function(Dynamic, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        templateUrl: "tests/test_list_repeatoptions/test_list_repeatoptions.html",

        attrs : {
            view : {
                repeatoptions : {
                    onremove: function (item, element) {
                        var promise = BetaJS.Promise.create();
                        //console.log(item, element);
                        Object.assign(element.style,{
                            "-webkit-transition": "opacity 2s linear",
                            opacity : 0
                        });
                        setTimeout(function () {
                            promise.asyncSuccess(true);
                        }, 4000);
                        //promise.asyncSuccess(true);
                        return promise;
                    }
                }
            }
        },

        collections: {
            listcollection: [{
                    value: "Test - List - listollection - Item 1",
                    callbacks : {
                        click : function () {
                            var index = this.scope('<').get('listcollection').getIndex(this.get('model'));
                            this.scope('<<').execute('remove', index);
                        }
                    }
                },
                {
                    value: "Test - List - listollection - Item 2",
                    callbacks : {
                        click : function () {
                            var index = this.scope('<').get('listcollection').getIndex(this.get('model'));
                            this.scope('<<').execute('remove', index);
                        }
                    }
                },
                {
                    value: "Test - List - listollection - Item 3",
                    callbacks : {
                        click : function () {
                            var index = this.scope('<').get('listcollection').getIndex(this.get('model'));
                            this.scope('<<').execute('remove', index);
                        }
                    }
                },
                {
                    value: "Test - List - listollection - Item 4",
                    callbacks : {
                        click : function () {
                            var index = this.scope('<').get('listcollection').getIndex(this.get('model'));
                            this.scope('<<').execute('remove', index);
                        }
                    }
                }
            ]
        },

        functions : {
            remove: function (index) {
                this.get("listcollection").remove(this.get("listcollection").getByIndex(index));
            }
        }

    }).register();

});