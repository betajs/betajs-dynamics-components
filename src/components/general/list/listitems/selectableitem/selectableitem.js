
/*
 *
 * selected_item = null, means the list will automatically select the first item in the list
 * selected_item = undefined, means the list will no select any item
 *
 * */

Scoped.define("module:Selectableitem", [
    "dynamics:Dynamic",
    "base:Objs",
	"base:Loggers.Logger"
], [
    "dynamics:Partials.ClassPartial"
], function (Dynamic, Objs, Logger, scoped) {

	var logger = Logger.global().tag("dynamic", "list");
	
    Dynamic.extend({scoped: scoped}, {

        template: "<%= template(filepathnoext + '.html') %>",

        bindings : {
            selected: "<+[tagname='ba-list']:selected_item"
        },

        scopes: {
            parent_list: "<+[tagname='ba-list']"
        },

        attrs : {
            model : {
                value :'Selectableitem - Value'
            }
        },

        create : function () {

            var parentlist = this.scopes.parent_list;

            if (!parentlist)

                logger.log('There is no parent list the selector can attach to, this currently only works  with ba-list');
            else if (parentlist.get('listcollection'))
                if (!this.scopes.parent_list.get('selected_item'))
                    //var selected_item = parentlist.get('selected_item');
                    //if (!selected_item && selected_item !== undefined)
                    this.call('select')
            },
//            [8/9/16, 4:06:11 PM] Oliver Friedmann: this === selected_item
//                [8/9/16, 4:06:56 PM] Oliver Friedmann: this.get(selected_key_name) === selected_item_key
//                [8/9/16, 4:07:16 PM] Oliver Friedmann: selected_key_name = “classname”
//[8/9/16, 4:07:25 PM] Oliver Friedmann: selected_item_key = “swipeclickcontainer”

        functions : {

            select : function () {
                this.scopes.parent_list.set('selected_item', Objs.extend({
                	cid: this.cid()
                }, this.get("model").data()));
            }

        }

    }).register();
});
