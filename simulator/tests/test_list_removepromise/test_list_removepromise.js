Scoped.define("tests:Test_list_removepromise", [
    "dynamics:Dynamic",
    "base:Collections.Collection",
    "base:Promise"
], [
    "module:List"
], function(Dynamic, Collection, Promise, scoped) {

    return Dynamic.extend({
        scoped: scoped
    }, {

        templateUrl: "tests/test_list_removepromise/test_list_removepromise.html",

        attrs: {
            view : {
                repeatoptions : {
                    onremove: function (item, element) {

                        console.log('onremove is called');

                        var promise = Promise.create();

                        var fadetime = 1000
                        Object.assign(element.style, {
                            "-webkit-transition": "opacity " + fadetime/1000 + "s linear",
                            opacity: 0
                        });
                        setTimeout(function () {
                           promise.asyncSuccess(true);
                        }, fadetime+1);

                        return promise;
                    }
                }
            },
            testmodel: {
                listitem: 'clickitem',
                listcollection: new Collection({
                    objects: [{
                            value: "Item 1",
                            callbacks : {
                                click : function () {
                                    this.parent().parent().execute('remove',this);
                                }
                            }
                        },
                        {
                            value: "Item 2",
                            callbacks : {
                                click : function () {
                                    this.parent().parent().execute('remove',this);
                                }
                            }
                        },
                        {
                            value: "Item 3",
                            callbacks : {
                                click : function () {
                                    this.parent().parent().execute('remove',this);
                                }
                            }
                        }
                    ]
                })
            }
        },

        functions: {
            remove: function (self) {
                console.log('Callback arrives');
                self.parent().get('listcollection').remove(self.get('model'));
            }
        }

    }).register();

});